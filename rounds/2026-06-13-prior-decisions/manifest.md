# Manifest

Round: `2026-06-13-prior-decisions`

## Purpose

Lookup existing Rally Show decisions for economy, token policy, launch scope, and operations. This is a documentation/evidence round only.

## Files

| Path | Purpose |
| --- | --- |
| `prior-decisions.md` | Item-by-item classification for A-E: `결정됨`, `논의만됨`, or `미정`, with file/line evidence. |
| `source-sweep.md` | Source sets, search terms, evidence selection rules, and directly read files. |
| `manifest.md` | This manifest. |

## Verification Points

1. Every requested item A1-E4 is classified.
2. Each classification cites concrete file paths and line ranges.
3. Final values are not inferred from mocks, fixtures, UI-only displays, or test data.
4. App repo code is untouched; only QA documentation is added in this round.
5. No secret values, wallet addresses, private contact values, local private paths, or provider tokens are included.

## Classification Summary

| Category | 결정됨 | 논의만됨 | 미정 |
| --- | --- | --- | --- |
| Economy | none | A1, A2 | A3 |
| Bonding curve / DEX | none | B1, B2, B3 | none |
| Token policy | C3 | C1, C2 | none |
| Launch scope | D1, D2 | none | none |
| Operations | none | E1, E2, E4 | E3 |

## Capture / Code Change Conditions

No screenshots or app code changes were part of this request. No computed style evidence is required for this documentation-only round.

## 불가침 영역 접촉 여부

No Rally Show app files were edited. This round does not touch:

- TradePanel state machine
- CreateClient draft/activation/first-buy boundary
- Phantom wallet boundary
- Donation routing/claim logic
- Workspace authority/treasury/mission/payout logic
- ReportPanel / RestrictedShow
- Legal copy in the app
- Any money-path execution route

## Review Instructions

Claude should verify that:

1. The cited line ranges support the status labels.
2. Values marked `논의만됨` are not accidentally treated as launch-final.
3. Values marked `미정` have no stronger final evidence elsewhere in the cited source sets.
4. The no-sensitive-value rule is preserved.
