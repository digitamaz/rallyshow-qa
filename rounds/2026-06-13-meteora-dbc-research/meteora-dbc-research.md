# Meteora DBC Research: Existing Decisions + Pre-Implementation Inputs

Round: `2026-06-13-meteora-dbc-research`  
Scope: documentation/research only. Rally Show app code was not changed.  
Rule: existing Rally Show records first; only missing or unresolved points were checked against Meteora official documentation and public source/SDK. If a point is not proven by code/docs, it is marked `불확실`.

## Executive Summary

1. Rally already recorded a target fee posture: Rally allocation `1.5%`, platform `1.0%`, creator/show `0.5%`, external Meteora/protocol/pool/network fees separate. This is still a target, not a production-approved settlement design.
2. Meteora DBC natively supports launchpad partner / pool creator fee sharing through `creator_trading_fee_percentage`, separate partner and creator claim paths, and migration-fee sharing. That makes the 2:1 platform/creator shape plausible, but not yet approved for Rally because Project/Donation routing, claim authority, rounding, post-migration fee behavior, and same-trace accounting still need devnet-real proof.
3. DBC curve, token type, migration threshold, LP split, vesting, migrated pool fee, pool creation fee, and activation parameters are configurable. Rally has not finalized production values.
4. DBC migration is quote-reserve-threshold based. Official docs say it is automatic and permissionless once `quote_reserve >= migration_quote_threshold`; public source also blocks swaps after curve completion.
5. Token support is not a simple "Token-2022 is always fine" decision. DBC supports SPL and Token-2022 initialization, but `MeteoraDamm` migration requires SPL token in source validation; Token-2022 transfer-fee extension support in the DBC path was not proven.
6. Show creation cost / first-buy minimum remains unresolved. DBC has a configurable pool creation fee and quote input must be `> 0`, but Rally still needs a launch decision for creation fee, first-buy amount, and rent budget.

## Sources Used

### Existing Rally Show Records

- `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md:100-191`
- `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003B_quote_route_and_fee_display.md:66-149`
- `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003E_migration_lifecycle_boundary.md:71-205`
- `docs/technical/DV001_O_PUMPFUN_ALIGNED_DEVNET_RUNNER_DRY_RUN_CLOSEOUT_2026-05-31.md:50-174`
- `docs/technical/DV001_P_PUMPFUN_ALIGNED_DEVNET_EXECUTE_PRESEND_PACKET_2026-05-31.md:46-90`
- `docs/technical/DV001_L_T11_DAMM_V2_POSITION_FEE_CLAIM_CLOSEOUT_2026-05-28.md:49-61,174-180`
- `docs/technical/PTP003_FIRST_BUY_BUILDER_PACKET_2026-06-02.md:60-94`
- `packages/solana/src/meteora-dbc-minimal-idl.ts:1-7,91-117`
- `rounds/2026-06-13-prior-decisions/prior-decisions.md:15-33,35-235`
- `rounds/2026-06-13-full-tech-spec/system-inventory.md:64-98`
- `rounds/2026-06-13-full-tech-spec/gaps-and-roadmap.md:20-43`
- `rounds/2026-06-13-full-tech-spec/open-questions.md:18-23`

### New Primary Research

Meteora official documentation:

- DBC fee calculation: `https://docs.meteora.ag/overview/products/dbc/dbc-fee-calculation`
- DBC pool configuration: `https://docs.meteora.ag/overview/products/dbc/pool-configuration`
- DBC flow: `https://docs.meteora.ag/overview/products/dbc/dbc-flow`
- DBC migration: `https://docs.meteora.ag/overview/products/dbc/migration`
- DBC curve configuration: `https://docs.meteora.ag/overview/products/dbc/curve-configuration`
- DBC config key: `https://docs.meteora.ag/overview/products/dbc/dbc-config-key`

Meteora public source:

- Repository: `https://github.com/MeteoraAg/dynamic-bonding-curve`
- Source commit inspected: `b4f954733f0e88258f1eb3f0eff75e4314c9610c`

## 1. Fee Separation [TV_001 Core]

### Existing Discussion

Status: **기존 논의 있음**

Evidence:

- `TV_001_005...:162-169` records the product target: Rally fee allocation `1.5%`, platform `1.0%`, creator/show `0.5%`, external protocol/pool fees separate.
- `TV_001_005...:142-155` says Meteora DBC is not approved until exact target routing, authority, migration, post-migration claim behavior, and boundary preservation are proven.
- `TV_001_005...:179-191` says if native DBC split cannot express exact `1.0% / 0.5%`, Rally should use a program-controlled per-Show fee router instead of forcing the native split.
- `PRODUCTION_IMPLEMENTATION_PLAN_003B...:128-149` requires Rally fee allocation, external protocol/pool fees, and network fees to be displayed separately; granular platform/creator estimates are gated on D4 validation.
- `rounds/2026-06-13-prior-decisions/prior-decisions.md:19-20,51-64` classifies fee rate and fee recipients/split as `논의만됨`, not final.
- `rounds/2026-06-13-full-tech-spec/system-inventory.md:84-85` classifies fee display as mock/read model and actual fee distribution execution as missing.

### New Research

#### Meteora 강제

- DBC total trading fee includes base fee and optional dynamic fee. Official docs say protocol receives `20%` of total trading fee and virtual liquidity positions receive `80%`.
- DBC fee sharing is between launchpad partner and pool creator: `creator_trading_fee_percentage` controls the creator share of the trading-fee share.
- Public source stores one `fee_claimer` on `PoolConfig` and one pool creator on the virtual pool.
- Partner fee claim is access-controlled by `config.fee_claimer`.
- Creator trading fee claim is access-controlled by pool creator.
- Pool creation fee is separately configurable and split protocol/partner by source constants.
- Migration fee is also split between partner and creator and withdrawn separately after curve completion.

#### 우리가 정할 수 있는 것

- The DBC config can choose `pool_fees`, `collect_fee_mode`, `creator_trading_fee_percentage`, `migration_fee`, `pool_creation_fee`, partner/creator liquidity percentages, and post-migration fee settings.
- Rally can attempt a native DBC mapping where:
  - DBC partner = Rally/platform fee claimer or a Rally-controlled program/router;
  - DBC creator = Show creator or a Show-scoped program authority;
  - `creator_trading_fee_percentage = 33` or another exact/rounded value if the DBC fee share equals the Rally allocation target.
- For exact `1.0% / 0.5%`, a safer Rally path remains a program-controlled per-Show fee router if native split produces rounding drift, wrong claimant authority, or wrong Project/Donation destination.

#### 근거

- Official DBC fee docs: total fee = base + variable; fixed base fee range `0.25%` to `99%`; protocol fee `20%`; referral may take `20%` of protocol fee; migration protocol fee `0.2%`; DAMM v2 post-migration fee modes include quote, output, and compounding.
- Official DBC pool config docs: `creator_trading_fee_percentage` is `0-100` percent of the trading-fee share; DBC migration target is DAMM v1 or DAMM v2; migration fee is split by `creator_migration_fee_percentage`; pool creation fee is claimable by partner.
- Public source:
  - `programs/dynamic-bonding-curve/src/instructions/partner/ix_create_config.rs:41-72`
  - `programs/dynamic-bonding-curve/src/instructions/partner/ix_create_config.rs:388-392`
  - `programs/dynamic-bonding-curve/src/state/config.rs:486-565`
  - `programs/dynamic-bonding-curve/src/state/config.rs:979-1008`
  - `programs/dynamic-bonding-curve/src/lib.rs:86-163`
  - `programs/dynamic-bonding-curve/src/instructions/partner/ix_claim_partner_trading_fee.rs:64-97`
  - `programs/dynamic-bonding-curve/src/instructions/migration/ix_withdraw_migration_fee.rs:70-125`

#### 불확실

- Whether Rally's full `1.5%` target should be implemented as DBC trading fee, DBC partner/creator share, a separate transaction leg, or a post-claim router.
- Whether exact `1.0% / 0.5%` can be native without rounding drift at all trade sizes.
- Whether creator claim authority can safely be program-controlled without weakening creator rights or Project/Donation routing.
- Whether post-migration fee claim behavior preserves Rally's Project Treasury, Donation recipient, and creator/show allocation boundaries without an extra settlement layer.
- Whether referral/host/protocol fee combinations create additional display or receipt fields beyond the current quote contract.

## 2. Bonding-Curve Parameters

### Existing Discussion

Status: **기존 논의 있음**

Evidence:

- `DV001_O...:50-68` added explicit devnet runner inputs for migration quote threshold, threshold-approach buy, trader funding target, and hard-stop budget; it also preserved old fixture defaults.
- `DV001_O...:90-140` records a dry-run with a Pump.fun-aligned migration quote threshold value and associated budget caps.
- `DV001_O...:162-174` says this proves explicit values can replace hidden fixture constants, but does not prove production adapter approval, fee routing, custody/claim architecture, wallet UX, indexer/RPC reliability, or mainnet readiness.
- `DV001_P...:46-63` scopes the execute pre-send packet to T1-T7 and explicitly excludes migration, DAMM swap/read, fee claim, reward, payout, custody, and production behavior.
- `rounds/2026-06-13-prior-decisions/prior-decisions.md:85-99` classifies bonding-curve parameters as `논의만됨`.
- `rounds/2026-06-13-full-tech-spec/system-inventory.md:68-85` classifies bonding display as UI-only, quote math as mock, and DEX listing/migration as missing end-to-end.

### New Research

#### Meteora 강제

- DBC uses a piecewise concentrated-liquidity bonding curve with up to `16` active segments.
- Each segment has a `sqrt_price` upper bound and virtual `liquidity`; `sqrt_price` values must be strictly ascending and liquidity must be positive.
- `migration_quote_threshold` must be greater than zero.
- Source validation in the inspected commit requires `token_decimal >= 6 && token_decimal <= 9`.
- If `pool_creation_fee > 0`, it must be between `0.001 SOL` and `100 SOL`.
- Liquidity allocation percentages plus vesting percentages must sum to `100`.

#### 우리가 정할 수 있는 것

- Initial price (`sqrt_start_price`), curve shape/segments, migration threshold, token supply model, decimal count, token type, activation mode, pool fees, first-swap min-fee option, liquidity distribution, vesting, migration target, migrated pool fee, and pool creation fee.
- Rally still needs final owner/product decisions for start price, curve shape, total supply, graduation target, whether Project Show uses fixed supply or dynamic supply, and whether Pump.fun-like threshold remains the default.

#### 근거

- Official curve docs: DBC uses up to `16` price/liquidity segments; key parameters include `sqrt_start_price`, segment `sqrt_price`, `migration_sqrt_price`, and `swap_base_amount`.
- Official curve docs include SDK helper inputs such as `totalTokenSupply`, `initialMarketCap`, `migrationMarketCap`, `migrationOption`, token decimals, and fee scheduler mode.
- Official pool config docs list token configuration, fee configuration, migration target/threshold, LP distribution, post-migration settings, activation type, and pool creation fee.
- Public source:
  - `programs/dynamic-bonding-curve/src/instructions/partner/ix_create_config.rs:41-72`
  - `programs/dynamic-bonding-curve/src/instructions/partner/ix_create_config.rs:468-510`
  - `programs/dynamic-bonding-curve/src/constants.rs:38-60,68-108`

#### 불확실

- Production-recommended curve for Rally Show is not decided.
- "Pump.fun-aligned" threshold appears in devnet packets as a high-fidelity reference, not as a final launch parameter.
- Exact rent/account budget for a real config + pool depends on final accounts, token type, and migration target and must be recalculated on devnet.

## 3. Graduation / Migration Condition

### Existing Discussion

Status: **기존 논의 있음**

Evidence:

- `PRODUCTION_IMPLEMENTATION_PLAN_003E...:76-86` defines Rally migration statuses: `not_eligible`, `eligible`, `migrating`, `migrated`, `migration_failed`.
- `PRODUCTION_IMPLEMENTATION_PLAN_003E...:120-154` says owner must approve whether quotes remain available near threshold; `migrating` blocks quote/build/signature/submission; `migrated` uses approved DAMM route and must not reuse DBC quote.
- `PRODUCTION_IMPLEMENTATION_PLAN_003E...:166-183` says migration can change route but cannot silently move app obligations or claims.
- `rounds/2026-06-13-prior-decisions/prior-decisions.md:100-115` classifies DEX graduation condition and target DEX as `논의만됨`.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:18` keeps the final DEX/DBC graduation rule open.

### New Research

#### Meteora 강제

- Official docs define the trigger as `quote_reserve >= migration_quote_threshold`.
- Official migration docs say migration is automatic and permissionless; any caller can trigger migration after the threshold is hit.
- DBC trading is paused once the curve is complete and migration must happen before normal trading resumes.
- Migration target options are `MeteoraDamm` (DAMM v1) and `DammV2`.
- Source `swap` and SDK quote paths both reject swaps/quotes after curve completion.

#### 우리가 정할 수 있는 것

- `migration_quote_threshold`.
- Migration target: DAMM v1 (`MeteoraDamm`) or DAMM v2 (`DammV2`), subject to token-type and fee-setting constraints.
- Rally's UI/indexer policy for `eligible`, `migrating`, `migrated`, and `migration_failed`.
- Whether Rally runs its own watcher/keeper in addition to Meteora's migrator/permissionless path.

#### 근거

- Official DBC flow docs: migration occurs once `pool_state::quote_reserve >= pool_config::migration_quote_threshold`; threshold quote plus a portion of base mint form the DAMM liquidity pool.
- Official migration docs: threshold hit ends bonding curve phase; any caller can trigger migration; trading is paused once curve is complete.
- Public source:
  - `dynamic-bonding-curve-sdk/src/quote_exact_in.rs:8-24`
  - `programs/dynamic-bonding-curve/src/instructions/swap/ix_swap.rs:190-203`
  - `programs/dynamic-bonding-curve/src/instructions/migration/dynamic_amm_v2/migrate_damm_v2_initialize_pool.rs` threshold checks were found around the migration initialization path.
  - `programs/dynamic-bonding-curve/src/instructions/migration/meteora_damm/migrate_meteora_damm_initialize_pool.rs` threshold checks were found around the DAMM v1 migration initialization path.

#### 불확실

- Whether Rally should trust external keeper timing or operate its own migration trigger bot.
- Exact production indexer source for `quote_reserve`, threshold crossing, `finish_curve_timestamp`, and migrated pool address.
- Whether V1 should block quotes in `eligible` before protocol-enforced completion or only at `migrating`/completed.

## 4. Post-Graduation Liquidity / LP

### Existing Discussion

Status: **기존 논의 있음**

Evidence:

- `PRODUCTION_IMPLEMENTATION_PLAN_003E...:145-155` says migrated state uses an approved DAMM v1/v2 route and must not reuse DBC quote.
- `PRODUCTION_IMPLEMENTATION_PLAN_003E...:166-183` defines fee/claim invariants after migration.
- `PRODUCTION_IMPLEMENTATION_PLAN_003E...:198-205` says exports/activity must not imply holder ownership, revenue share, holder claim to migrated LP fees, platform custody, automatic delivery, or payout availability.
- `DV001_L_T11_DAMM_V2_POSITION_FEE_CLAIM_CLOSEOUT_2026-05-28.md:49-61` executed a devnet-only DAMM v2 position fee claim and explicitly excluded DBC fee claim, protocol fee claim, reward, payout, Donation claim, creator claim, treasury claim, custody, production app code, mainnet, and real-money behavior.
- `DV001_L...:174-180` validates only the reviewed devnet fixture claim shape and does not validate production fee claims, payouts, custody, or mainnet readiness.
- `rounds/2026-06-13-prior-decisions/prior-decisions.md:117-129` classifies LP policy as `논의만됨`.

### New Research

#### Meteora 강제

- DBC migration seeds the post-bonding DAMM pool from accumulated quote reserves and a portion of base mint.
- Post-migration LP is distributed among partner, creator, and protocol.
- Partner and creator allocations can include permanently locked liquidity and vesting schedules.
- Minimum liquidity lock requirement exists in official config docs: at least `10%` liquidity must remain locked at day 1 post-migration, achievable by permanent locked and/or vesting liquidity.
- DBC applies a protocol migration fee of `0.2%` separate from partner-configured migration fee.
- For DAMM v2, `migrated_collect_fee_mode`, dynamic fee, pool fee bps, and base fee mode configure post-migration behavior.

#### 우리가 정할 수 있는 것

- Partner/creator LP percentages, permanent lock percentages, vesting schedules, migration fee option, `creator_migration_fee_percentage`, DAMM v2 migrated fee settings, and fee collection mode.
- Whether Rally maps partner LP to platform, a program-controlled per-Show account, or no claim path.
- Whether creator LP/fee claim is direct creator, Project Treasury, Donation pending, or another audited account.

#### 근거

- Official migration docs: migration creates DAMM pool, seeds liquidity, distributes LP positions to partner/creator/protocol, and initializes vesting schedules.
- Official pool config docs: partner/creator liquidity percentages, permanent locked percentages, vesting schedules, migrated pool fee settings, and pool creation fee.
- Official fee docs: post-migration DAMM v2 fee modes include quote-token, output-token, and compounding.
- Public source:
  - `programs/dynamic-bonding-curve/src/state/config.rs:486-565`
  - `programs/dynamic-bonding-curve/src/constants.rs:38-60,106-108`
  - `programs/dynamic-bonding-curve/src/instructions/partner/ix_create_config.rs:419-459`
  - `programs/dynamic-bonding-curve/src/instructions/migration/ix_withdraw_migration_fee.rs:70-125`

#### 불확실

- Exact Rally production ownership/authority for post-migration partner LP/creator LP.
- Whether Rally should select DAMM v1 or DAMM v2 for V1.
- Whether LP positions are burned, locked, vested, or claimable for each Show type; source/docs expose permanent lock and vesting, but Rally policy remains open.
- Whether post-migration fees should be claimable or compounded; this depends on final `migrated_collect_fee_mode` and Rally legal/product policy.

## 5. Token Standard

### Existing Discussion

Status: **기존 논의 있음**

Evidence:

- `packages/solana/src/meteora-dbc-minimal-idl.ts:1-7` includes DBC instruction names for initializing with SPL token and Token-2022.
- `packages/solana/src/meteora-dbc-minimal-idl.ts:91-117` records the minimal DBC IDL source and explicitly says the artifact cannot encode, build, sign, submit, touch mainnet, move real SOL, copy the full IDL, or import SDK runtime.
- `rounds/2026-06-13-prior-decisions/prior-decisions.md:133-145` classifies Token-2022 vs SPL as `논의만됨`.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:22` keeps Token-2022 vs SPL and token authority policy open.

### New Research

#### Meteora 강제

- DBC config has `token_type`: `SplToken` or `Token2022`.
- DBC public source includes both `initialize_virtual_pool_with_spl_token` and `initialize_virtual_pool_with_token2022`.
- Source validation for `MigrationOption::MeteoraDamm` requires `TokenType::SplToken` and SPL quote mint owner.
- Token decimal validation in source is `6..=9`, while official docs say base token decimals `1-9`; this is a source/docs mismatch that must be resolved against the exact deployed version.
- Quote mint Token-2022 support is restricted: source rejects native Token-2022 and any Token-2022 quote mint extension other than metadata pointer/token metadata.

#### 우리가 정할 수 있는 것

- SPL vs Token-2022 for the base token, if choosing a compatible migration target.
- Token update authority option, subject to DBC flow and Rally authority policy.
- Fixed vs dynamic supply model.
- Metadata and authority posture after migration.

#### 근거

- Official pool config docs: `token_type` can be `SplToken` or `Token2022`; token update authority controls whether creator retains update authority post-migration.
- Official curve docs: dynamic supply mints on buy and revokes minting authority post-migration; fixed supply pre-mints and returns leftovers.
- Official config-key docs: base mint token type is SPL or Token2022; token decimal 6 or 9 appears in that page.
- Public source:
  - `programs/dynamic-bonding-curve/src/state/config.rs:431-434`
  - `programs/dynamic-bonding-curve/src/lib.rs:116-128`
  - `programs/dynamic-bonding-curve/src/instructions/partner/ix_create_config.rs:419-459,462-472`
  - `programs/dynamic-bonding-curve/src/utils/token.rs:120-139`

#### 불확실

- Token-2022 transfer-fee extension use through DBC was not proven. Source search found Token-2022 extension checks for quote mint only; transfer-fee extension was not found as a supported DBC path in the inspected source.
- Whether Token-2022 is compatible with Rally's desired migration target if DAMM v1 is chosen. Source says `MeteoraDamm` requires SPL token.
- Exact renounce/update-authority policy remains owner-approved/open and must be tested with the final adapter.

## 6. Cost / Accounts

### Existing Discussion

Status: **기존 논의 있음**

Evidence:

- `rounds/2026-06-13-prior-decisions/prior-decisions.md:66-81` classifies Show creation cost and first-buy minimum as `미정`.
- `PTP003_FIRST_BUY_BUILDER_PACKET_2026-06-02.md:60-94` defines `initial_buy_amount_raw` as a future request field and says `protocol_config_ref` must refer to an owner-approved adapter/config; it does not choose a production DBC config or approved initial amount.
- `DV001_O...:50-68` records old devnet fixture defaults and explicit runner budget inputs.
- `DV001_O...:162-174` says those values do not prove mainnet readiness or production fee/custody.

### New Research

#### Meteora 강제

- DBC `pool_creation_fee` is configurable in lamports; if non-zero, source validates it between `0.001 SOL` and `100 SOL`.
- Official config-key docs say pool creation fee is collected from creators during pool initialization and partner can claim it; protocol receives `10%` of collected pool creation fees.
- SDK quote path requires `in_amount > 0`.
- DBC min fixed base fee is `0.25%`, max `99%`.

#### 우리가 정할 수 있는 것

- Whether Rally charges a show creation fee at all via `pool_creation_fee`.
- First-buy minimum amount.
- Whether first buy is bundled with initialize pool to use first-swap min-fee option.
- Who pays config creation, pool creation, metadata, token accounts, rent, transaction fees, and optional pool creation fee.

#### 근거

- Official config-key docs: `poolCreationFee` is collected during initialize pool and partner can claim it; Meteora receives `10%`.
- Official pool config docs: `pool_creation_fee` is charged to create a virtual pool and distributable through `claimPartnerPoolCreationFee`.
- Official fee docs: fixed base fee range is `0.25%` to `99%`.
- Public source:
  - `programs/dynamic-bonding-curve/src/instructions/partner/ix_create_config.rs:494-500`
  - `programs/dynamic-bonding-curve/src/constants.rs:81-104`
  - `programs/dynamic-bonding-curve/src/state/config.rs:1000-1008`
  - `dynamic-bonding-curve-sdk/src/quote_exact_in.rs:18-24`

#### 불확실

- Rent/account creation cost is not a fixed doc value here; it must be recalculated from the exact final instruction set and cluster.
- First-buy "product minimum" is not encoded by DBC beyond `in_amount > 0`; Rally must choose a launch value.
- Whether pool creation fee should be zero or non-zero for V1 remains an owner/product/economic decision.

## Decision Inputs Still Needed

1. Choose DBC migration target: DAMM v1 or DAMM v2.
2. Choose token standard: SPL or Token-2022. If Token-2022 is desired, prove transfer-fee/no-transfer-fee behavior and migration compatibility first.
3. Choose curve: total supply, start price/market cap, curve segments, migration threshold, and first-buy minimum.
4. Choose fee settlement shape:
   - native DBC partner/creator split if exact and authority-safe; or
   - program-controlled per-Show fee router if exact split/Project/Donation routing needs extra control.
5. Choose post-migration LP/fee policy: lock, vest, claim, or compound; and decide which actor/account holds each authority.
6. Recalculate devnet/mainnet rent and funding only after final config/account set is known.

## Bottom Line

Meteora DBC is still a plausible protocol foundation for Rally Show. The strongest native fit is that DBC already has partner/creator fee-sharing and migration to DAMM. The main unresolved risk is not whether DBC has knobs; it is whether those knobs can express Rally's exact product/legal boundary: platform `1.0%`, creator/show `0.5%`, no holder fee rights, Project/Donation routing, no platform custody, and auditable same-trace settlement through migration.
