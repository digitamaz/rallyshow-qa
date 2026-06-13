# Source Sweep

Round: `2026-06-13-meteora-dbc-research`  
Scope: evidence lookup only. No Rally Show app code was changed.

## Existing Rally Show Lookup

Searched source groups:

- `docs/technical/`
- `packages/`
- `apps/`
- current QA rounds under `rounds/`
- `codex-outbox.md`

Representative search terms:

- `DBC`
- `Meteora`
- `DAMM`
- `dynamic bonding curve`
- `fee`
- `creator_trading_fee`
- `migration_quote_threshold`
- `migration`
- `graduation`
- `Token-2022`
- `Token2022`
- `first-buy`
- `pool creation fee`
- `LP`
- `claim`

Key existing records found:

| Topic | Existing record |
| --- | --- |
| TV_001 fee target and routing caution | `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md` |
| Quote/fee display boundary | `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003B_quote_route_and_fee_display.md` |
| Migration lifecycle boundary | `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003E_migration_lifecycle_boundary.md` |
| Pump.fun-aligned devnet threshold/budget packet | `docs/technical/DV001_O_PUMPFUN_ALIGNED_DEVNET_RUNNER_DRY_RUN_CLOSEOUT_2026-05-31.md` |
| Devnet execute pre-send packet | `docs/technical/DV001_P_PUMPFUN_ALIGNED_DEVNET_EXECUTE_PRESEND_PACKET_2026-05-31.md` |
| DAMM v2 fixture fee-claim closeout | `docs/technical/DV001_L_T11_DAMM_V2_POSITION_FEE_CLAIM_CLOSEOUT_2026-05-28.md` |
| First-buy future builder boundary | `docs/technical/PTP003_FIRST_BUY_BUILDER_PACKET_2026-06-02.md` |
| Minimal DBC IDL artifact | `packages/solana/src/meteora-dbc-minimal-idl.ts` |
| Prior economics/token/scope lookup | `rounds/2026-06-13-prior-decisions/prior-decisions.md` |
| Full technical system inventory | `rounds/2026-06-13-full-tech-spec/system-inventory.md` |
| Full technical gap/roadmap | `rounds/2026-06-13-full-tech-spec/gaps-and-roadmap.md` |
| Open questions | `rounds/2026-06-13-full-tech-spec/open-questions.md` |

## New Research Lookup

Primary sources used:

- Meteora official documentation pages:
  - `https://docs.meteora.ag/overview/products/dbc/dbc-fee-calculation`
  - `https://docs.meteora.ag/overview/products/dbc/pool-configuration`
  - `https://docs.meteora.ag/overview/products/dbc/dbc-flow`
  - `https://docs.meteora.ag/overview/products/dbc/migration`
  - `https://docs.meteora.ag/overview/products/dbc/curve-configuration`
  - `https://docs.meteora.ag/overview/products/dbc/dbc-config-key`
- Meteora public source:
  - `https://github.com/MeteoraAg/dynamic-bonding-curve`
  - inspected commit: `b4f954733f0e88258f1eb3f0eff75e4314c9610c`

Public-source files checked:

- `programs/dynamic-bonding-curve/src/instructions/partner/ix_create_config.rs`
- `programs/dynamic-bonding-curve/src/state/config.rs`
- `programs/dynamic-bonding-curve/src/constants.rs`
- `programs/dynamic-bonding-curve/src/lib.rs`
- `programs/dynamic-bonding-curve/src/instructions/partner/ix_claim_partner_trading_fee.rs`
- `programs/dynamic-bonding-curve/src/instructions/migration/ix_withdraw_migration_fee.rs`
- `programs/dynamic-bonding-curve/src/instructions/swap/ix_swap.rs`
- `programs/dynamic-bonding-curve/src/utils/token.rs`
- `dynamic-bonding-curve-sdk/src/quote_exact_in.rs`

Not treated as final Rally decisions:

- Devnet fixture defaults.
- Pump.fun-aligned dry-run threshold values.
- Minimal IDL fixture.
- Mock adapter quote math.
- Single devnet DAMM v2 position fee claim closeout.

## No Sensitive Values Included

This round intentionally does not include:

- private keys
- seed phrases
- tokens
- local absolute paths
- devnet wallet addresses or transaction signatures from historical evidence
- local RPC URLs
