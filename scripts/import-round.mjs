#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { basename, extname, join, relative, resolve } from "node:path";

const args = parseArgs(process.argv.slice(2));
const OUTBOX_PATH = "codex-outbox.md";
const REVIEW_STATE_PATH = "qa-review-state.json";
const scanDenylist = [
  { id: "telegram_bot_token", pattern: /[0-9]{6,}:[A-Za-z0-9_-]{20,}/ },
  { id: "github_token", pattern: /(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})/ },
  { id: "openai_key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { id: "slack_token", pattern: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ },
  { id: "private_key_block", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { id: "email_address", pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/ },
  { id: "local_user_path", pattern: /(?:\/Users\/[^/\s]+|\/home\/[^/\s]+|[A-Za-z]:\\Users\\[^\\\s]+)/ },
  { id: "local_or_private_url", pattern: /\bhttps?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+|[^/\s)]+\.local)(?::\d+)?(?:\/[^\s)]*)?/i },
  { id: "solana_wallet_like", pattern: /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/ },
  { id: "evm_wallet", pattern: /\b0x[a-fA-F0-9]{40}\b/ },
  { id: "secret_assignment", pattern: /\b(?:secret|token|api[_-]?key|password|private[_-]?key|mnemonic|seed(?:[_-]?phrase)?)\b\s*[:=]\s*["']?[^"'\s]{8,}/i }
];
const textExtensions = new Set([".md", ".mjs", ".js", ".json", ".txt", ".yml", ".yaml", ".html", ".css", ".svg"]);

async function main() {
  if (args.scanOnly) {
    await assertSensitiveScanClean();
    return;
  }

  if (args.publish) {
    await assertSensitiveScanClean();
    editVisibility("public");
    return;
  }

  if (args.markReviewed) {
    await assertSensitiveScanClean();
    await markOutboxReviewed();
    return;
  }

  if (args.close) {
    await assertCloseAllowed();
    editVisibility("private");
    return;
  }

  if (!args.source || !args.round) {
    usage();
    process.exitCode = 1;
    return;
  }

  const sourceDir = resolve(args.source);
  const roundDir = resolve("rounds", safeRoundName(args.round));
  const files = (await readdir(sourceDir))
    .filter((file) => file.toLowerCase().endsWith(".png"))
    .sort();

  if (files.length === 0) {
    throw new Error(`no PNG files found in source=${sourceDir}`);
  }

  if (args.replace) {
    await rm(roundDir, { recursive: true, force: true });
  }

  await mkdir(roundDir, { recursive: true });

  for (const file of files) {
    await cp(join(sourceDir, file), join(roundDir, file));
  }

  if (!args.keepManifest) {
    await writeFile(join(roundDir, "manifest.md"), buildManifest(args.round, files), "utf8");
  }

  console.log(`qa_round_imported round=${safeRoundName(args.round)} png_count=${files.length}`);

  if (args.push) {
    await assertSensitiveScanClean();
    commitAndPush(safeRoundName(args.round), files.length);
  }
}

function buildManifest(round, files) {
  const rows = files
    .map((file) => {
      const guessed = guessScreenAndTheme(file);
      return `| \`${file}\` | ${guessed.screen} | ${guessed.theme} | ${guessed.checkpoint} |`;
    })
    .join("\n");

  return `# Round Manifest: ${round}

| File | Screen | Theme | Verification Point |
| --- | --- | --- | --- |
${rows}
`;
}

function guessScreenAndTheme(file) {
  const name = file.toLowerCase();
  const theme = name.includes("light") ? "light" : name.includes("dark") ? "dark" : "unknown";
  const screen = basename(file, ".png").replace(/^[0-9]+-/, "").replaceAll("-", " ");
  return {
    screen,
    theme,
    checkpoint: "Fill this line with the exact QA checkpoint before review."
  };
}

function commitAndPush(round, count) {
  run("git", ["add", "README.md", "claude-inbox.md", "codex-outbox.md", "scripts/import-round.mjs", `rounds/${round}`]);
  const status = spawnSync("git", ["diff", "--cached", "--quiet"], { stdio: "ignore" });
  if (status.status === 0) {
    console.log("qa_push_skipped no_staged_changes");
    return;
  }
  run("git", ["commit", "-m", `Add QA round ${round} (${count} screenshots)`]);
  run("git", ["push", "origin", "HEAD"]);
  console.log(`qa_round_pushed round=${round}`);
}

async function assertCloseAllowed() {
  const currentHash = await hashFile(OUTBOX_PATH);
  const state = await readReviewState();
  if (!state.reviewedOutboxSha256) {
    throw new Error(
      `qa_close_blocked review_state_missing; run --mark-reviewed only after explicit Claude review complete`
    );
  }
  if (state.reviewedOutboxSha256 !== currentHash) {
    throw new Error(
      `qa_close_blocked unreviewed_outbox_submissions_detected; run --mark-reviewed only after explicit Claude review complete`
    );
  }
}

async function markOutboxReviewed() {
  const reviewedOutboxSha256 = await hashFile(OUTBOX_PATH);
  const reviewedGitCommit = currentGitCommit();
  const reviewedAt = new Date().toISOString();
  const state = {
    reviewedAt,
    reviewedBy: "claude_explicit_review_complete",
    reviewedGitCommit,
    reviewedOutboxSha256,
    closePolicy:
      "--close is allowed only when codex-outbox.md matches this reviewedOutboxSha256."
  };
  await writeFile(REVIEW_STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  console.log(`qa_review_state_updated commit=${reviewedGitCommit}`);
}

async function readReviewState() {
  try {
    return JSON.parse(await readFile(REVIEW_STATE_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function hashFile(path) {
  const content = await readFile(path);
  return createHash("sha256").update(content).digest("hex");
}

async function assertSensitiveScanClean() {
  const findings = await scanRepoFiles(".");
  if (findings.length > 0) {
    console.error(`sensitive_scan_failed finding_count=${findings.length}`);
    for (const finding of findings) {
      console.error(`finding file=${finding.file} category=${finding.category}`);
    }
    throw new Error("sensitive scan blocked operation");
  }
  console.log("sensitive_scan_passed");
}

async function scanRepoFiles(root) {
  const files = await listFiles(root);
  const findings = [];

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const isText = textExtensions.has(ext);
    const content = await readFile(file);
    const haystack = isText ? content.toString("utf8") : content.toString("latin1");

    for (const rule of scanDenylist) {
      if (rule.pattern.test(haystack)) {
        findings.push({ file: relative(process.cwd(), file), category: rule.id });
      }
    }
  }

  return findings;
}

async function listFiles(root) {
  const result = [];
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await listFiles(fullPath)));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const info = await stat(fullPath);
    if (info.size > 20 * 1024 * 1024) {
      continue;
    }

    result.push(fullPath);
  }

  return result;
}

function editVisibility(visibility) {
  const repo = currentRepoSlug();
  run("gh", ["repo", "edit", repo, "--visibility", visibility, "--accept-visibility-change-consequences"]);
  console.log(`qa_repo_visibility=${visibility}`);
}

function currentRepoSlug() {
  const result = spawnSync("gh", ["repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  });
  const slug = result.stdout.trim();
  if (result.status !== 0 || !slug) {
    throw new Error("gh CLI repo lookup failed");
  }
  return slug;
}

function currentGitCommit() {
  const result = spawnSync("git", ["rev-parse", "--short", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  });
  const commit = result.stdout.trim();
  if (result.status !== 0 || !commit) {
    throw new Error("git commit lookup failed");
  }
  return commit;
}

function run(command, argv) {
  const result = spawnSync(command, argv, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`${command} failed`);
  }
}

function parseArgs(argv) {
  const result = {
    source: "",
    round: "",
    push: false,
    replace: false,
    keepManifest: false,
    scanOnly: false,
    publish: false,
    close: false,
    markReviewed: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (item === "--source") {
      result.source = argv[++index] || "";
    } else if (item === "--round") {
      result.round = argv[++index] || "";
    } else if (item === "--push") {
      result.push = true;
    } else if (item === "--replace") {
      result.replace = true;
    } else if (item === "--keep-manifest") {
      result.keepManifest = true;
    } else if (item === "--scan-only") {
      result.scanOnly = true;
    } else if (item === "--publish") {
      result.publish = true;
    } else if (item === "--close") {
      result.close = true;
    } else if (item === "--mark-reviewed") {
      result.markReviewed = true;
    }
  }

  return result;
}

function safeRoundName(value) {
  return value.trim().replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
}

function usage() {
  console.log(`Usage:
node scripts/import-round.mjs --source <png-directory> --round <date-round> [--push] [--replace]
node scripts/import-round.mjs --scan-only
node scripts/import-round.mjs --publish
node scripts/import-round.mjs --mark-reviewed
node scripts/import-round.mjs --close

Example:
node scripts/import-round.mjs --source ../RallyShow/docs/ui-audit/screenshots --round 2026-06-13-ui-audit --push
`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
