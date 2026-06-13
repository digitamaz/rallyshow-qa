# Round Manifest: 2026-06-13-meteora-dbc-research

## Scope

Documentation/research only. No Rally Show app code was changed.

## Files

| File | Purpose | Verification Point |
| --- | --- | --- |
| `meteora-dbc-research.md` | Existing Rally Show discussion lookup + Meteora DBC research for fee split, curve params, migration, LP, token standard, and costs/accounts. | Each requested item is split into existing discussion and new research, with `Meteora 강제`, `우리가 정할 수 있는 것`, `근거`, and `불확실`. |
| `source-sweep.md` | Search scope and primary source list. | Confirms repo/QA/outbox lookup happened before new research and records official docs/public source paths. |
| `manifest.md` | Round routing metadata. | Enables Claude/raw review of the round. |

## Verification Points

- Existing Rally Show records are separated from new Meteora research.
- No final production value is inferred from mock/devnet fixture values.
- Fee separation explicitly preserves the unresolved TV_001 questions.
- Token-2022 vs SPL is not treated as final.
- Show creation fee and first-buy minimum remain unresolved unless owner decides them later.
- No secrets, wallet keys, local absolute paths, or private URLs are included.

## External Sources

- Meteora DBC Fee Calculation: `https://docs.meteora.ag/overview/products/dbc/dbc-fee-calculation`
- Meteora DBC Pool Configuration: `https://docs.meteora.ag/overview/products/dbc/pool-configuration`
- Meteora DBC Flow: `https://docs.meteora.ag/overview/products/dbc/dbc-flow`
- Meteora DBC Migration: `https://docs.meteora.ag/overview/products/dbc/migration`
- Meteora DBC Curve Configuration: `https://docs.meteora.ag/overview/products/dbc/curve-configuration`
- Meteora DBC Config Key: `https://docs.meteora.ag/overview/products/dbc/dbc-config-key`
- Meteora public source inspected: `https://github.com/MeteoraAg/dynamic-bonding-curve` at `b4f954733f0e88258f1eb3f0eff75e4314c9610c`
