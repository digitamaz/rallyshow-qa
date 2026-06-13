# Light Canonical + VMC Fallback Final Round

Date: 2026-06-13 KST

Purpose:
- Revert owner-rejected light-mode extrapolations to the canonical light tokens.
- Preserve the approved dark-mode Create input/dropzone treatment.
- Remove the VMC fixture image so the closed-curtain fallback is visible.

Screenshots:
- `create-project--light--1440.png`: Create Project, light mode, 1440px.
- `show-meme--light--1440.png`: Meme Show detail, light mode, 1440px.
- `discovery--dark--1440.png`: Discovery, dark mode, 1440px, VMC fallback visible.

Verification Points:
- Create light inputs use `panel`/`panel2` light surfaces, `line` border, `ink` text, `muted` placeholder, and the red focus ring.
- Create light image dropzone uses a light surface plus red dashed border; no mint palette leakage.
- Show Detail light market and trade panels use light surfaces; dark terminal treatment remains limited to stage/poster surfaces.
- Market chart labels and axes use light-mode readable ink/line colors.
- VMC image URL is null in the local discovery response, so the closed-curtain fallback renders.

Guardrails:
- TradePanel state machine was not changed.
- CreateClient draft/activation logic was not changed.
- No wallet, signing, donation claim, workspace payout, or safety copy logic was changed.

Validation:
- `pnpm --filter @rally-show/web test -- create visual-qa-automation.test.ts trade-panel-temporary-launch-ui.test.ts`
- `pnpm --filter @rally-show/web typecheck`
- `pnpm --filter @rally-show/config test -- repo-owner-identifying-info-boundary.test.ts`
