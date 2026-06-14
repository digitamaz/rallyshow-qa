# Dark Fallback Sweep — 2026-06-13

## Scope

Final dark-theme leak and fallback sweep against `docs/design-reference/DESIGN_REFERENCE.md` and rsF captures.

## Capture Conditions

| Condition | Value |
| --- | --- |
| Viewport | 1380 x 960 |
| Theme | Dark |
| Motion | `prefers-reduced-motion: reduce` |
| Interaction state | Rest, no hover/focus |
| Screenshot mode | Viewport cut, not full page |
| Fixture policy | P803564 / RECOV1 / HTTP1 keep review-safe poster images; VMC only has `imageUrl=null` |

## Files

| Page | Screenshot |
| --- | --- |
| Discovery | `discovery--dark--1380.png` |
| Show Detail — Project | `show-project--dark--1380.png` |
| Show Detail — Donation | `show-donation--dark--1380.png` |
| Show Detail — Meme / no image | `show-meme--dark--1380.png` |
| Create — Project | `create-project--dark--1380.png` |
| Create — Meme | `create-meme--dark--1380.png` |
| Dashboard | `dashboard--dark--1380.png` |
| Profile | `profile--dark--1380.png` |
| Search | `search--dark--1380.png` |
| Terms | `terms--dark--1380.png` |
| 404 | `404--dark--1380.png` |
| Computed styles and slot audit | `computed.json` |

## Changed Elements

| Area | Change |
| --- | --- |
| Show Detail chart | Dark chart theme applied to container and chart runtime: dark background, dark grid, cream axis/labels. |
| Show Detail trade surfaces | You pay / Slippage input wrappers, quick amount buttons, inactive activity tabs, status chips, and boundary notes now use dark panel tokens in dark theme. |
| Create disclosure summary | `Rules / Fees / Risk` and option summaries no longer inherit legacy light-card background in dark mode. |
| Dashboard activation note | `Draft activation is reviewed separately...` boundary box now follows dark panel2 surface and muted cream text. |
| Card/Search fallback | Image-less show cards remove initials and render closed curtain plus `NO IMAGE · STAGE WAITING` caption. |
| Show Detail hero fallback | VMC/no-image hero removes initials and uses closed curtain in the 290px tile with right curtain rail retained. |
| Profile avatar fallback | Avatar keeps initials but now uses closed curtain, folds, footlight, 64px radius 14, dark base, and brass border. |
| Dashboard token thumbnails | Token position mini marks use the shared closed-curtain fallback instead of the old red blob; optional image branch is supported when an `imageUrl` exists. |
| Profile wallet/chips | Copy/Solscan buttons and Creator/Owner role chips use inline-flex, consistent min-height, padding, line-height, and centered alignment. |

## White Leak Sweep Result

`computed.json` records `whiteSurfaceSuspects.length === 0` for:

- `discovery--dark--1380`
- `show-project--dark--1380`
- `show-donation--dark--1380`
- `show-meme--dark--1380`
- `create-project--dark--1380`
- `create-meme--dark--1380`
- `dashboard--dark--1380`
- `profile--dark--1380`
- `search--dark--1380`
- `terms--dark--1380`
- `404--dark--1380`

## Fallback Verification

| Slot | Expected | Evidence |
| --- | --- | --- |
| Discovery P803564 / RECOV1 / HTTP1 | Poster image decoded | `computed.json` image slots: `hasImage=true`, natural size `573x349` |
| Discovery VMC | No image fallback only | `hasImage=false`, `hasNoImageCaption=true`, no avatar initials |
| Show Project hero | Poster image decoded and fills image frame | `show-project--dark--1380`, `computed.json` first hero slot has `hasImage=true` |
| Show Meme hero / VMC | Closed-curtain fallback only | `show-meme--dark--1380`, hero slot `hasHeroFallback=true`, `hasImage=false` |
| Dashboard mini thumbnails | Closed-curtain fallback | `dashboard--dark--1380`, `hasDashboardFallback=true` for dashboard marks |
| Profile avatar | Avatar fallback with initials retained | `profile--dark--1380`, `hasAvatarInitials=true` |

## Profile Upload Flow Answer

The requested avatar upload flow is not implemented yet.

Current behavior: clicking the avatar moves the user to the Identity tab, where an avatar URL can be edited and saved. There is no local file picker, 1:1 crop UI, upload save path, curtain-open save animation, or remove-to-closed-curtain workflow.

Status: register as P1. This should be implemented only after the avatar storage/upload boundary is defined, because it touches profile persistence and file handling.

## Forbidden-Area Contact Check

No forbidden state-machine or money-path component was intentionally edited.

Exact forbidden component files not edited:

- `apps/web/src/app/show/[showId]/TradePanel.tsx`
- `apps/web/src/app/create/CreateClient.tsx`
- `apps/web/src/app/show/[showId]/DonationPanel.tsx`
- `apps/web/src/app/show/[showId]/ProjectWorkspacePanel.tsx`
- `apps/web/src/app/show/[showId]/ReportPanel.tsx`

Touched files were limited to presentation/style and image-slot rendering paths:

- `apps/web/src/app/discovery/DiscoveryCard.tsx`
- `apps/web/src/app/discovery/discovery.css`
- `apps/web/src/app/show/[showId]/page.tsx` — hero image-slot/fallback markup only
- `apps/web/src/app/show/[showId]/MarketChart.tsx` — chart theme rendering only
- `apps/web/src/app/show/show.css`
- `apps/web/src/app/dashboard/page.tsx` — thumbnail image-slot rendering only
- `apps/web/src/app/dashboard/dashboard.css`
- `apps/web/src/app/profile/[walletAddress]/profile.css`
- `docs/design-reference/DESIGN_REFERENCE.md`
- `docs/design-reference/amendments/fallback-no-initials-2026-06-14.md`

## Verification

- `pnpm --filter @rally-show/web typecheck` passed after implementation.
- Screenshots and `computed.json` generated from local dev server at `http://localhost:3000`.
- `computed.json` includes selected computed styles, white-surface sweep, and image/fallback slot audit.
