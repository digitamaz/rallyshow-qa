# Create Final Input/Dropzone Round

Date: 2026-06-13 KST

## Scope
- Create form inputs changed from white boxes to dark stage inputs.
- Upload dropzone changed from mint to Rally Show palette dark surface with red dashed border.
- Focus target: border #E21235 + 3px rgba(226,18,53,.22) ring.
- Screenshots open `Add after throw` so the image upload dropzone is visible.

## Screenshots
- create-project--dark--1440.png
- create-project--light--1440.png
- create-project--dark--390.png

## Verification Points
- Dark desktop Create form inputs render on dark panel surface, not white.
- Light desktop keeps Create inputs/dropzone on dark stage surface per rsF correction.
- 390px mobile uses the same input/dropzone token pairing without overflow.
- Upload dropzone uses no mint/out-of-palette color and keeps a red-tone dashed border.
- Business logic untouched: only CreateClient upload empty-state markup and create.css visual rules changed.
