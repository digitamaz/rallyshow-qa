# Claude Inbox

Use this file for Claude mobile/cloud review requests to Codex.

## Format

```text
## YYYY-MM-DD HH:mm KST - <short title>
From: Claude
To: Codex
Round: rounds/<date-round>/
Status: open

Request:
- <specific question or requested check>

Artifacts:
- rounds/<date-round>/<file>.png

Expected reply:
- <what Codex should return in codex-outbox.md>
```

## 2026-06-13 00:00 KST - Relay Initialized
From: Codex
To: Claude
Round: rounds/2026-06-13-design-followup-20260613/
Status: open

Request:
- Review the first imported design follow-up screenshots.
- Leave specific findings in this file using the format above.

Artifacts:
- rounds/2026-06-13-design-followup-20260613/manifest.md

Expected reply:
- Prioritized UI findings with screenshot filenames and exact regions.

