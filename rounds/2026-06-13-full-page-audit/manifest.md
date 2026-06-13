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
| Fixture image policy | VMC image is null; P803564, HTTP1, RECOV1 use `/ux-review/test-show-representative.jpg` |
| Image verification | Capture waits for relevant poster images to decode and records natural dimensions in `computed.json` |
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
| Poster fixture | Replaced beam-like placeholder poster paths with repo sample poster path for P803564, HTTP1, RECOV1 | Discovery/Search cards and Show Project/Donation heroes show decoded poster image |
| VMC fallback | VMC remains `imageUrl=null` | VMC card and Show Meme hero use closed-curtain fallback only |
| Image decode wait | Capture waits for poster image decode before screenshot | `computed.json` includes `imageResults` and `decodedImages` audit signals |

## Image Render Confirmation

- `discovery--impl.png`: first four cards are P803564, VMC, HTTP1, RECOV1; P803564/HTTP1/RECOV1 have decoded poster images and VMC is the only fallback.
- `show-project--impl.png`: hero poster image is decoded and fills the 236x236 image frame inside the 290px tile.
- `show-donation--impl.png`: hero poster image is decoded and fills the 236x236 image frame.
- `show-meme--impl.png`: VMC intentionally remains fallback.
- `search--impl.png`: visible result cards use decoded poster images.

## Forbidden-Area Contact Check

No forbidden logic components were edited. This revision changes local fixture image URLs and capture evidence only; TradePanel state machine, Create draft/activation/first-buy boundary, Phantom wallet boundary, Donation routing/claim, Workspace payout/treasury/mission authority, ReportPanel, RestrictedShow, and legal copy were not changed.
