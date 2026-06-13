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
| App logic | No app logic or forbidden money-path code changed for this round |

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

## Included Files

- 11 implementation PNGs named as requested
- `computed.json` with core token and element computed styles

## Verification Notes

- Show Project and Donation hero poster metrics in `computed.json`: poster tile 290px wide, image frame 236x236, right curtain rail separate, lightbox trigger 32px.
- Show Meme uses VMC with image-null fallback; Project and Donation render image posters.
- Discovery first row is capture-aligned to P803564, VMC, HTTP1, RECOV1 by DOM ordering in the browser context only. The app's production sorting logic was not changed.
- No private wallet string, token, endpoint, or local path is intentionally included in this packet.
