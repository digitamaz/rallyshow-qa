# Manifest

Round: `2026-06-13-full-tech-spec`
Purpose: Rally Show full technical/function baseline for Claude and owner discussion.

## Files

| Path | Purpose |
| --- | --- |
| `rounds/2026-06-13-full-tech-spec/system-inventory.md` | Full code-grounded feature/system inventory with implementation status. |
| `rounds/2026-06-13-full-tech-spec/architecture.md` | User action data-flow map and mock/guard breakpoints. |
| `rounds/2026-06-13-full-tech-spec/gaps-and-roadmap.md` | Launch gaps, blockers, P0/P1/P2 roadmap. |
| `rounds/2026-06-13-full-tech-spec/wbs.md` | Devnet-real adapter WBS W0-W8 and artifact status. |
| `rounds/2026-06-13-full-tech-spec/open-questions.md` | Owner/external decisions that Codex should not invent. |

## Verification Points

1. Docs are based on code paths under `apps/web`, `packages/core`, `packages/db`, `packages/solana`, and `programs`.
2. App repo source code was not modified for this round.
3. Sensitive values are intentionally omitted or described as redacted.
4. Money-path status distinguishes DB/UI lifecycle, mock/fixture paths, guarded devnet paths, and missing live end-to-end execution.
5. Devnet-real adapter work remains blocked until owner selects private devnet RPC provider and approves DBC/Meteora runtime builder work.

## Capture / Artifact Conditions

No screenshots in this round. This is a document-only technical specification dump.

