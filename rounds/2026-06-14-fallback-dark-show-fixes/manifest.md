# Rally Show QA Round — Fallback + Show Detail Dark Fixes

## Scope

This round validates two owner-requested visual fixes:

1. Show image fallback update:
   - Discovery/Search cards with no image no longer render Anton initials.
   - Empty poster cards keep the closed-curtain fallback and show `NO IMAGE · STAGE WAITING`.
   - Show Detail hero with no image no longer renders initials and uses a closed-curtain tile.
   - Avatar fallback is intentionally unchanged.
2. Show Detail dark-mode surface repair:
   - Bonding curve chart uses a dark chart theme.
   - Buy/Sell panel amount inputs and preset buttons use dark surfaces and cream text.
   - Holder/trade chips and inactive tab surfaces use dark surfaces and cream text.
   - Light-mode token rules were not changed in this round.

## Implementation Files Touched

App repo files changed:

| File | Change |
| --- | --- |
| `apps/web/src/app/discovery/DiscoveryCard.tsx` | Removed card fallback initials and added empty-image caption. |
| `apps/web/src/app/discovery/discovery.css` | Styled `NO IMAGE · STAGE WAITING` caption. |
| `apps/web/src/app/show/[showId]/page.tsx` | Added no-image hero fallback class and non-interactive placeholder lightbox glyph. |
| `apps/web/src/app/show/show.css` | Closed-curtain hero fallback, placeholder lightbox styling, and dark-mode Show Detail surface fixes. |
| `apps/web/src/app/show/[showId]/MarketChart.tsx` | Made chart theme follow `data-rs-theme`, including dark background/grid/axis colors. |
| `docs/design-reference/DESIGN_REFERENCE.md` | Updated fallback rules to remove Show card/hero initials while keeping avatar initials. |
| `docs/design-reference/amendments/fallback-no-initials-2026-06-14.md` | Recorded the fallback amendment. |

## Capture Conditions

| Field | Value |
| --- | --- |
| Viewport | `1380x900` |
| Theme | Dark |
| Motion | `prefers-reduced-motion: reduce` |
| State | Rest, no hover/focus |
| Screenshot mode | Viewport, not full-page |

## Fixture Policy

| Show | Expected image state |
| --- | --- |
| `P803564` | repo review-safe poster image |
| `HTTP1` | repo review-safe poster image |
| `RECOV1` | repo review-safe poster image |
| `VMC` | `imageUrl=null`, closed-curtain fallback only |

Current first-row order captured from local discovery data:

`P803564 -> RECOV1 -> HTTP1 -> VMC`

## Artifacts

| Artifact | Verification point |
| --- | --- |
| `discovery--dark--1440.png` | First row shows three image-backed cards and VMC with no initials plus `NO IMAGE · STAGE WAITING`. |
| `show-project--dark--1440.png` | Project hero uses poster image; chart/inputs/presets are dark. |
| `show-meme--dark--1440.png` | VMC hero uses closed-curtain fallback without initials; chart/inputs/presets are dark. |
| `show-donation--dark--1440.png` | Donation hero uses poster image; chart/inputs/presets are dark. |
| `show-project-activity--dark--1440.png` | Holder view / N trades chips and inactive Trades tab use dark surface + cream text. |
| `show-meme-activity--dark--1440.png` | Same activity-surface verification for VMC. |
| `show-donation-activity--dark--1440.png` | Same activity-surface verification for Donation Meme. |
| `computed.json` | Computed styles and image/fallback state checks. |

## Verification Points

- `computed.json.fixturePolicy.VMC` is `null`.
- `computed.json.fixturePolicy.P803564`, `HTTP1`, and `RECOV1` are `repo_ux_review`.
- Discovery first four card states include exactly one fallback card in the captured row: VMC.
- Discovery fallback card has `fallbackCaption: "No image · stage waiting"` and `hasFallbackInitials: false`.
- VMC Show Detail hero has `hasFallbackClass: true`, `hasFallbackInitials: false`, and `triggerIsPlaceholder: true`.
- Project and Donation Show Detail heroes have `hasPosterImage: true`.
- Show Detail dark `.market-chart` computed background is `rgb(12, 4, 6)`.
- Trade amount/slippage inputs, quick amount buttons, status badges, and activity chips compute to dark surfaces with cream text in dark mode.

## Forbidden Area Check

This round intentionally changes markup and styles only. The following forbidden behavior boundaries were not edited:

- TradePanel state machine
- CreateClient draft, activation, and first-buy boundary
- PhantomWallet boundary
- Donation routing and claim meaning
- Workspace authority, treasury, mission, and payout logic
- ReportPanel
- RestrictedShow
- Legal/safety copy

Touched app files were limited to presentation components/CSS and `MarketChart` theme options. No route handler, wallet, claim, payout, or submission logic was changed.

## Local Verification

- `pnpm --filter @rally-show/web typecheck`

