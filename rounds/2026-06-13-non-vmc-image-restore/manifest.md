# Non-VMC Fixture Image Restore Round

Date: 2026-06-13 KST

Purpose:
- Correct over-broad no-image review state.
- Keep only VMC (`Visual Meme Check`) in the no-image fallback state.
- Restore review-safe sample poster images for other fixture shows that should have images.

Screenshots:
- `discovery--dark--1440.png`: Discovery dark desktop. P803564, RECOV1, and HTTP1 show poster images; VMC alone shows the closed-curtain fallback.
- `show-project--dark--1440.png`: Project Show detail dark desktop. Hero tile shows image area plus separate right curtain rail and lightbox control.
- `show-meme--dark--1440.png`: VMC Meme Show detail dark desktop. Hero remains no-image closed-curtain fallback.

Verification Points:
- VMC image URL remains null in local discovery data.
- P803564, RECOV1, and HTTP1 use the review-safe sample poster path.
- Discovery/search card image fallback is limited to image-missing shows.
- Show Detail hero 290 tile structure is preserved for image-bearing shows.
- No fake metric, price, volume, market cap, or bonding curve data was introduced.

Guardrails:
- No app source files were changed for this correction round.
- TradePanel state machine, CreateClient draft/activation, wallet/signing boundaries, donation claim, workspace payout, and legal/safety copy remain untouched.
