# Show Detail rsF Pixel Delta Round

Date: 2026-06-13 KST

Purpose:
- Close the Show Detail rsF pixel deltas found by full comparison.
- Include the requested Show Detail pages plus adjacent pages for continued review.

Primary Fixes:
- Hero image tile: image-bearing shows now render a 236x236 image frame with `object-fit: cover`; the separate 54px right curtain rail and 32px lightbox control remain.
- Hero mode chip: Show Detail mode chip uses Brass fill `#D9A94E` with dark text, matching the Discovery card chip grammar.
- Section headings: public Show Detail section h2 headings use Anton uppercase. Modal titles and body copy remain Inter.

Screenshots:
- `01-discovery--dark--1440.png`
- `02-show-project--dark--1440.png`
- `03-show-donation--dark--1440.png`
- `04-show-meme--dark--1440.png`
- `05-create-project--dark--1440.png`
- `06-dashboard--dark--1440.png`
- `07-profile--dark--1440.png`
- `08-search--dark--1440.png`
- `09-terms--dark--1440.png`
- `10-404--dark--1440.png`
- `11-create-meme--dark--1440.png`

Computed Checks:
- Hero poster: 290x236.
- Hero image frame: 236x236.
- Hero image: 236x236, `object-fit: cover`.
- Hero mode chip: `rgb(217, 169, 78)` background, `rgb(18, 6, 8)` text.
- Market heading: Anton stack, uppercase.
- Project/Workspace/Safety section headings: Anton stack, uppercase.

Guardrails:
- TradePanel state machine was not changed.
- CreateClient draft/activation logic was not changed.
- Wallet/signing, donation claim, workspace payout, and legal/safety copy logic were not changed.
