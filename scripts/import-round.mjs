#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

const args = parseArgs(process.argv.slice(2));

async function main() {
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
    keepManifest: false
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

Example:
node scripts/import-round.mjs --source ../RallyShow/docs/ui-audit/screenshots --round 2026-06-13-ui-audit --push
`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

