# Full Page Design Audit Round — 2026-06-13

Single source of truth: `docs/design-reference/DESIGN_REFERENCE.md` plus `docs/design-reference/captures/final/`.

Note: `docs/design-reference/mockups/` is not present in the local app repo snapshot for this round, so this packet is aligned to DESIGN_REFERENCE.md and the final rsF captures available locally.

## Capture Conditions

| Condition | Value |
| --- | --- |
| Viewport | 1380px wide, reference-matched height per source capture |
| Screenshot mode | Viewport cut, not full page |
| Theme | Dark |
| Motion | `prefers-reduced-motion: reduce` |
| Interaction state | Rest state, no hover/focus |
| Discovery fixture order | P803564 -> VMC -> HTTP1 -> RECOV1 |
| Fixture image policy | VMC image is null; P803564, HTTP1, RECOV1 use distinct review-safe posters |
| App logic | No production sorting, money-path, wallet, donation, or workspace logic changed for this round |

## Source-to-Implementation Mapping

| Original rsF stem | Implementation file |
| --- | --- |
| `rsF-discovery.png` | `discovery--impl.png` |
| `rsF-show-project.png` | `show-project--impl.png` |
| `rsF-show-donation.png` | `show-donation--impl.png` |
| `rsF-hero.png` + shared Show Detail rules; no dedicated `rsF-show-meme.png` in local reference | `show-meme--impl.png` |
| `rsF-create.png` | `create-project--impl.png` |
| `rsF-create-meme.png` | `create-meme--impl.png` |
| `rsF-dashboard.png` | `dashboard--impl.png` |
| `rsF-profile.png` | `profile--impl.png` |
| `rsF-search.png` | `search--impl.png` |
| `rsF-terms.png` | `terms--impl.png` |
| `rsF-404.png` | `404--impl.png` |

## Delta Fixes in This Revision

| Area | Change | Verification point |
| --- | --- | --- |
| Protocol | Added permanent QA evidence protocol to `AGENTS.md` | Future rounds require QA repo push, manifest, raw path, measured evidence, and no close before review pass |
| Section H1 typography | Search, Dashboard, Profile, Terms page-level section H1s use Anton uppercase | `computed.json` font family and text transform |
| Dashboard H1 emphasis | `AND WORK` is red with red glow | `dashboard--impl.png` and computed span color |
| Fixture images | P803564, HTTP1, RECOV1 retain review-safe poster images; VMC remains image-null | `computed.json` image/fallback audit signals |
| Show mode chip | Show Detail hero mode chip renders uppercase JetBrains Mono and brass fill | `show-project--impl.png` and computed mode chip styles |
| Search utility link | Search `Clear search` uses gold token family | `search--impl.png` and computed link color |

## Forbidden-Area Contact Check

No forbidden logic files were intentionally edited. Touched app files are limited to `AGENTS.md`, Search/Dashboard/Show Detail presentational markup, and CSS for Discovery/Dashboard/Profile/Terms/Show styling. TradePanel state machine, Create draft/activation/first-buy boundary, Phantom wallet boundary, Donation routing/claim, Workspace payout/treasury/mission authority, ReportPanel, RestrictedShow, and legal copy were not changed.
