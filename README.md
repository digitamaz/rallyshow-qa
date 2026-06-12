# Rally Show QA Relay

This private repo is a relay channel for Rally Show QA review artifacts.

It is not the Rally Show application codebase. Use it for screenshots,
manifests, and Claude/Codex handoff notes only.

## Routine

1. At session start, check `claude-inbox.md`.
2. After captures, import screenshots into `rounds/<date-round>/`.
3. Keep `manifest.md` inside each round with one line per image:
   filename, screen, theme, verification point.
4. Write Codex replies and status notes in `codex-outbox.md`.
5. Telegram remains a backup channel. If Bot API env is available, send there
   too. If not, this repo is the source of truth for review artifacts.

## Import A Capture Round

```sh
node scripts/import-round.mjs \
  --source ../RallyShow/docs/ui-audit/screenshots \
  --round 2026-06-13-ui-audit \
  --push
```

Use `--replace` only when intentionally replacing a previously imported round.

## Public Review Cycle

Default rule: keep this repo private except during a Claude review window.

```sh
# 1. Import and push a round. Sensitive text/binary scan runs before push.
node scripts/import-round.mjs \
  --source ../RallyShow/docs/ui-audit/screenshots \
  --round 2026-06-13-ui-audit \
  --push

# 2. Open the review window. Sensitive scan runs again before public visibility.
node scripts/import-round.mjs --publish

# 3. After Claude confirms review is complete, close the review window.
node scripts/import-round.mjs --close
```

Use `--scan-only` before any manual visibility change.
