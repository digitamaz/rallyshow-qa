# Dark Fallback Sweep Reround — 2026-06-13

## Scope

Follow-up round for two rejected misses from `2026-06-13-dark-fallback-sweep`.

## Fixes

| Issue | Fix |
| --- | --- |
| Create submit button `Sign in to prepare Throw` stayed light/white in dark theme | Added explicit dark disabled submit token rule: panel `#1C0A0E`, line border `#3A1820`, ink `#F6ECDF`, no white surface. |
| Terms `V1 STANCE` block used off-palette violet `#6f31ca` | Replaced status eyebrow with brass `#D9A94E` and emphasis line with footlight `#FFB85C`. Removed matching violet use found in Create CSS by replacing with brass token. |

## Capture Conditions

| Condition | Value |
| --- | --- |
| Viewport | 1380 x 960 |
| Theme | Dark |
| Motion | `prefers-reduced-motion: reduce` |
| Interaction state | Rest, no hover/focus |

## Files

| Page | Screenshot |
| --- | --- |
| Create — Project | `create-project--dark--1380.png` |
| Create — Meme | `create-meme--dark--1380.png` |
| Terms | `terms--dark--1380.png` |
| Computed audit | `computed.json` |

## Computed Verification

`computed.json` now explicitly includes:

- `form button[type="submit"]`
- `.create-policy-disclosure > summary`
- `.terms-status-card span`
- `.terms-status-card strong`

Computed values:

- Create Project submit: background `rgb(28, 10, 14)`, border `rgb(58, 24, 32)`, text `rgb(246, 236, 223)`.
- Create Meme submit: background `rgb(28, 10, 14)`, border `rgb(58, 24, 32)`, text `rgb(246, 236, 223)`.
- Terms `V1 STANCE`: `rgb(217, 169, 78)`.
- Terms `No platform wallet. No platform custody.`: `rgb(255, 184, 92)`.

## Scans

- `whiteSurfaceSuspects.length === 0` for all three captured pages.
- `offPaletteSuspects.length === 0` for all three captured pages.
- Source grep for `#6f31ca`, `#8b5cf6`, `#7c3aed`, `#a855f7`, `purple`, `violet`, `indigo` in `create` and `terms` returned no matches after the fix.

## Forbidden-Area Contact Check

No money-path, wallet, donation, workspace, or trade state-machine files were touched in this reround.

Touched app files:

- `apps/web/src/app/create/create.css`
- `apps/web/src/app/terms/terms.css`

## Verification

- `pnpm --filter @rally-show/web typecheck` passed.
- Captures and `computed.json` generated from local dev server at `http://localhost:3000`.
