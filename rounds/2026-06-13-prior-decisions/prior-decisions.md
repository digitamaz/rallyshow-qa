# Prior Decisions: Economy, Token, Launch Scope

Round: `2026-06-13-prior-decisions`  
Scope: evidence lookup only. No Rally Show app code was changed.  
Rule: do not infer. If a value exists only as a target, mock, guard, or open question, it is not treated as a final launch decision.

## Status Legend

| Status | Meaning |
| --- | --- |
| 결정됨 | Current repo/code/docs contain a concrete product or launch-scope decision. |
| 논의만됨 | Current repo/code/docs contain a target, preferred path, mock/read model, or planning packet, but final production value remains open. |
| 미정 | No code-backed or document-backed final value was found. |

## Executive Classification

| Item | Status | Current value / current repo position |
| --- | --- | --- |
| A1. Platform fee rate | 논의만됨 | UI/terms and technical packets use target Rally allocation `1.5%`, platform `1.0%`, creator/show `0.5%`; final fee schedule remains open. |
| A2. Fee recipients and split | 논의만됨 | Target split and bucket remapping exist, but no end-to-end live distribution executor or final DBC fee proof exists. |
| A3. Throw cost and first-buy minimum | 미정 | First-buy activation is required as a concept, but no final show creation fee or first-buy minimum amount was found. |
| B1. Bonding-curve parameters | 논의만됨 | DBC/DAMM preferred target and mock/read models exist; exact curve/start/graduation parameters are not production-final. |
| B2. DEX graduation condition and target DEX | 논의만됨 | Meteora DBC/DAMM is preferred; final graduation rule and production approval remain open. |
| B3. Post-graduation liquidity/LP policy | 논의만됨 | Boundary invariants exist; exact LP/fee claim behavior after migration remains unapproved. |
| C1. Token standard | 논의만됨 | Minimal DBC metadata references SPL and Token-2022 instructions; actual production token standard remains open. |
| C2. Authority policy | 논의만됨 | Mainnet authority requirements exist; final mint/freeze/metadata/upgrade authority policy remains owner-approved/open. |
| C3. Token legal meaning copy | 결정됨 | Current product copy says holders get no ownership/revenue/governance/treasury/fee claim/payout authority/passive rewards. Legal/ops approval is still separate. |
| D1. V1 minimum launch scope | 결정됨 | Launch product system defines required market lifecycle surfaces and seven blockers before official launch/mainnet. |
| D2. Meme Show V1 inclusion | 결정됨 | `meme_show_launchpad` is a launch product system key and has V1 market lifecycle requirements. Positioning emphasis remains open. |
| E1. Region restriction | 논의만됨 | Env/config support and owner direction exist; exact restricted regions/geographies remain open. |
| E2. Login method | 논의만됨 | External wallet is required for money paths; GitHub/Google login is implemented as optional config-gated identity/drafting. Launch policy remains open. |
| E3. Legal/support entity | 미정 | Legal/ops release inputs remain a blocker; required support/abuse/moderation/incident/provider values are missing. |
| E4. Devnet RPC provider | 논의만됨 | Provider env slots and dry-run gates exist; private devnet RPC provider selection remains owner input. |

## A. Economy Model

### A1. Platform Fee Rate

Status: **논의만됨**

Evidence:
- `apps/web/src/app/terms/page.tsx:50-57` defines current public fee rows: Rally fee allocation target `1.5%`, platform allocation `1.0%`, creator/show allocation `0.5%`, external fees separate, no extra Project Show fee, and quote/fee display must update before signing.
- `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md:162-169` records the same values as "Product target".
- `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md:142-155` says DBC is not approved until exact target fee routing, authority, migration, and post-migration claim behavior are validated.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:18-20` keeps the final DEX/DBC graduation rule, final platform fee schedule/allocation targets, and creator allocation formula open.

Current value:
- Target only: Rally `1.5%`, platform `1.0%`, creator/show `0.5%`, external fees separate.
- Not final production economics.

### A2. Fee Distribution Targets and Ratios

Status: **논의만됨**

Evidence:
- `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md:117-126` defines the default non-platform custody shape: Project Treasury, MissionRewardEscrow, PendingPayout, DonationPendingAllocation, CreatorClaimable/direct claim, and Platform allocation.
- `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md:179-191` gives preferred routing order and says if native DBC split cannot express the exact `1.0% / 0.5%`, Rally should not force that native split.
- `packages/core/src/protocol.ts:18-27` defines fee bucket kinds including creator/show allocation, donation pending allocation, mission reserve, pending payout, project treasury allocation, and platform allocation.
- `packages/core/src/protocol.ts:258-313` remaps creator/show allocation to donation pending allocation for Donation Meme and project treasury allocation for Project Show, and maps platform allocation to platform revenue.
- `rounds/2026-06-13-full-tech-spec/system-inventory.md:84-85` classifies fee display as mock/read model and actual fee distribution execution as missing.

Current value:
- Target split exists.
- Production route, executor, epoch cadence, exact claim formula, and DBC settlement/indexer proof remain open.

### A3. Show Creation Cost and First-Buy Minimum

Status: **미정**

Evidence:
- `apps/web/src/app/terms/page.tsx:38-46` says first buy activates the market.
- `apps/web/src/app/create/CreateClient.tsx:497-520` review UI says draft save does not create public Show/token/market and the token market activates only after wallet-signed first buy.
- `apps/web/src/app/create/CreateClient.tsx:528-534` lists required pre-activation disclosures but no final amount.
- `apps/web/src/app/api/create/drafts/[draftId]/activation-attempts/route.ts:33-58` activation attempt creation accepts draft version, proof session, and wallet address; no amount field is present.
- `packages/core/src/first-buy-activation.ts:69-74` first-buy prep input has attempt/draft/expected fee route/protocol intent; no final first-buy minimum is encoded there.
- `packages/core/src/first-buy-activation.ts:76-105` explicitly marks first-buy activation prep as mock/devnet, cannot sign, cannot submit, not production-ready.

Current value:
- First-buy activation concept: decided as flow boundary.
- Throw cost / show creation fee: no final value found.
- First-buy minimum: no final value found. Trade quick amounts or test fixtures are not treated as first-buy minimums.

## B. Bonding Curve / DEX

### B1. Bonding-Curve Parameters

Status: **논의만됨**

Evidence:
- `rounds/2026-06-13-full-tech-spec/system-inventory.md:68-85` classifies bonding curve display as UI-only, quote math as mock, and DEX listing/migration as missing end-to-end.
- `packages/core/src/protocol.ts:70-103` has protocol read model fields including migration threshold and route kind, but `productEconomicsValidated` is always false and real SOL/mainnet are false.
- `packages/core/src/protocol.ts:4` contains a Pump.fun reference migration quote lamports constant, but this is a reference fixture, not a product economic decision.
- `packages/solana/src/index.ts:301-320` mock create adapter returns mock token/pool/signature and market state.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:43-47` explicitly says it is not safe to assume mock quote output equals live bonding curve economics.

Current value:
- DBC-style bonding curve is the intended route/read model.
- Exact start price, curve shape, graduation supply/market cap, and live economics are not final.

### B2. DEX Graduation Condition and Target DEX

Status: **논의만됨**

Evidence:
- `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md:100-115` recommends Meteora DBC/DAMM as preferred validation target, but does not production-approve it.
- `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003E_migration_lifecycle_boundary.md:11-16` repeats that Meteora DBC/DAMM is preferred but not production-approved until exact validation.
- `packages/db/src/schema.ts:105-111` defines migration states: not eligible, eligible, migrating, migrated, migration failed.
- `packages/core/src/trade.ts:262-270` maps migrated status to DAMM v2 route and other statuses to DBC bonding curve.
- `packages/core/src/launch-product-system.ts:28-36` includes DEX listing or migrated pool observation and post-migration pool swap/read as V1 market lifecycle requirements.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:18` keeps the final DEX/DBC graduation rule open.

Current value:
- Preferred target: Meteora DBC -> DAMM.
- Final on-chain graduation/listing rule: not decided.
- Production approval: not granted.

### B3. Post-Graduation Liquidity / LP Policy

Status: **논의만됨**

Evidence:
- `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003E_migration_lifecycle_boundary.md:145-155` says migrated state uses an approved DAMM v1/v2 route and must not reuse DBC quote.
- `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003E_migration_lifecycle_boundary.md:166-183` says migration can change trade routing but cannot silently move app-level obligations or claims.
- `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003E_migration_lifecycle_boundary.md:198-205` says exports/activity must not imply holder ownership, holder revenue share, holder claim to migrated LP fees, platform custody, automatic recipient delivery, or payout availability.
- `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md:152-155` lists post-migration asset composition and claim-boundary preservation as validation questions.

Current value:
- Boundary invariants are documented.
- Exact LP handling, post-migration fee claim behavior, and DEX-side claim authority policy remain open.

## C. Token Policy

### C1. Token Standard: Token-2022 vs SPL

Status: **논의만됨**

Evidence:
- `packages/solana/src/meteora-dbc-minimal-idl.ts:1-7` includes DBC instruction names for initializing with SPL token and Token-2022.
- `packages/solana/src/meteora-dbc-minimal-idl.ts:105-117` says the minimal IDL artifact cannot encode, build, sign, submit, touch mainnet, move real SOL, copy full IDL, or import SDK runtime.
- `rounds/2026-06-13-full-tech-spec/system-inventory.md:91-98` classifies token mint/metadata as mock/missing live and Token-2022 authority policy as missing.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:22` keeps Token-2022 vs SPL and authority policy open.

Current value:
- No final production token standard found.

### C2. Authority Policy

Status: **논의만됨**

Evidence:
- `packages/core/src/mainnet-deployment-preflight.ts:44-73` defines wallet roles for deployer fee payer, program upgrade authority, program ID keypairs, and post-deploy smoke wallets.
- `packages/core/src/mainnet-deploy-preflight-hardening.ts:20-27` requires owner-controlled deployer fee payer, owner-approved upgrade authority, deploy-only program ID keypairs, no runtime authority material, external signer smoke wallets, and no platform/operator custody.
- `packages/core/src/mainnet-deploy-preflight-hardening.ts:47-61` includes blockers for missing release artifacts, mainnet program IDs, deployment authority wallet, owner-approved upgrade authority policy, RPC slots, funding, MN001 approval, and final owner go.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:22-23` keeps token mint/metadata authority policy and program upgrade authority holder/multisig policy open.

Current value:
- Authority requirements and safety boundary exist.
- Final authority holder, multisig/immutability choice, mint/freeze/metadata authority policy, and renounce policy are not final.

### C3. Token Legal Meaning Copy

Status: **결정됨**

Evidence:
- `apps/web/src/app/terms/page.tsx:27-35` current product copy says holding/trading a Show token does not create ownership, revenue share, governance, treasury claim, fee claim, payout authority, or passive rewards.
- `apps/web/src/app/terms/page.tsx:38-46` says first buy activates the market and locks mode/ticker/token identity after activation.
- `apps/web/src/app/terms/page.tsx:94-99` says Donation Meme routes the `0.5%` creator/show allocation to a designated recipient, with no endorsement/tax promise and claim requiring verification/external wallet.
- `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md:12-19` records owner-confirmed no platform custody and no holder ownership/revenue/governance/fee claim/passive rewards.

Current value:
- Current app/legal copy is decided in code.
- Separate legal/ops release approval is still not complete; this item only covers the current token-meaning copy.

## D. Launch Scope

### D1. V1 Launch Minimum Conditions

Status: **결정됨**

Evidence:
- `packages/core/src/launch-product-system.ts:9-15` defines launch product system keys: Meme Show launchpad, Project Show open build, Donation Meme, profile/reputation/exports, ops/staging/mainnet.
- `packages/core/src/launch-product-system.ts:28-36` defines Meme Show V1 market lifecycle requirements: bonding config/pool creation, first-buy activation, buy/sell fills, DEX listing/migrated observation, post-migration read/swap, fee claim surfaces where authority is available, and public success after confirmed chain observation.
- `packages/core/src/launch-product-system.ts:55-67` defines blockers including DBC live-pool execution, Donation claim remote flow, legal/ops inputs, mainnet execution approval, mainnet program deploy preflight, Phantom browser signing smoke, and remote staging public route E2E.
- `rounds/2026-06-13-full-tech-spec/gaps-and-roadmap.md:8-16` confirms the latest blocker count remains seven.
- `rounds/2026-06-13-full-tech-spec/gaps-and-roadmap.md:20-31` lists P0 requirements before real mainnet/public money movement.

Current value:
- V1 minimum is code-backed as a launch readiness system, not a finished state.
- The product is not launch-ready until blockers close.

### D2. Meme Show V1 Inclusion

Status: **결정됨**

Evidence:
- `packages/core/src/launch-product-system.ts:9-15` includes `meme_show_launchpad` in launch product system keys.
- `packages/core/src/launch-product-system.ts:28-36` defines Meme Show V1 market lifecycle requirements.
- `apps/web/src/app/terms/page.tsx:94-96` defines Donation Meme as a Meme Show option, not a third primary product type.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:11` keeps the product positioning question open: whether Meme Show remains visible in V1 or Project Show is primary while Meme remains a compatible route/type.

Current value:
- Code-level V1 inclusion: yes.
- Product emphasis/visibility: still an open product-positioning decision.

## E. Operations

### E1. Region Restriction

Status: **논의만됨**

Evidence:
- `apps/web/src/lib/date-format.ts:17-31` computes browser date/time preference and restricted country state.
- `apps/web/src/lib/date-format.ts:78-84` reads `NEXT_PUBLIC_RESTRICTED_COUNTRY_CODES`.
- `docs/technical/OFFICIAL_LAUNCH_DEVELOPMENT_ROADMAP_2026-06-04.md:3605-3608` records redacted owner direction for anonymous/non-local scope, foreign-only distribution, restricted-jurisdiction policy, disclaimer-level posture, and legal-review unavailable risk; several release inputs remain open.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:13` asks which regions/geographies are explicitly restricted at launch.

Current value:
- Restriction mechanism exists.
- Exact countries/regions are not final.

### E2. Login Method

Status: **논의만됨**

Evidence:
- `apps/web/src/app/terms/page.tsx:16-23` says third-party account login is only for identity/drafting, while trading, first-buy activation, claims, treasury, and payouts require external wallet signature.
- `apps/web/src/lib/auth/options.ts:16-37` configures Google/GitHub social providers only when client ID and secret are present.
- `apps/web/src/lib/auth/options.ts:39-58` strips OAuth token persistence.
- `apps/web/src/app/api/account/session/route.ts:37-43` exposes GitHub/Google provider availability based on configured credentials.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:14` asks whether GitHub/Google login providers are intended for launch or wallet proof remains primary with OAuth optional.

Current value:
- Wallet signature is required for money paths.
- GitHub/Google login exists as optional identity/drafting infrastructure.
- Launch login policy is still open.

### E3. Legal / Support Entity

Status: **미정**

Evidence:
- `docs/technical/OFFICIAL_LAUNCH_DEVELOPMENT_ROADMAP_2026-06-04.md:3570-3573` records legal/ops release inputs as blocked and lists missing production domain/app URL, OAuth apps/callbacks, Terms/Privacy/Risk links, support/abuse contact, moderation/takedown owner, incident escalation contact, monitoring alert destination, rollback/incident roles, and provider ops readiness.
- `docs/technical/OFFICIAL_LAUNCH_DEVELOPMENT_ROADMAP_2026-06-04.md:3605-3608` records owner direction as redacted status only and still open requirements.
- `rounds/2026-06-13-full-tech-spec/gaps-and-roadmap.md:24-30` marks legal/ops release inputs as P0 before real mainnet/public money movement.
- `rounds/2026-06-13-full-tech-spec/open-questions.md:12` asks what legal/ops links and support/moderation/abuse contacts are owner-approved.

Current value:
- No final legal/support entity or public contact set found.

### E4. Devnet RPC Provider

Status: **논의만됨**

Evidence:
- `packages/config/src/index.ts:5-21` defines production provider secret slot names for RPC provider, cluster, endpoint, API key, failover/rate-limit/healthcheck, plus optional websocket/sender/indexer fields.
- `packages/config/src/index.ts:25-37` defines provider blockers, including public RPC, missing secrets, invalid provider/cluster, browser-exposed secret, and mainnet without MN001.
- `packages/config/src/index.ts:1517-1522` keeps adapter mode restricted to mock in current Milestone 0/1 config.
- `rounds/2026-06-13-full-tech-spec/gaps-and-roadmap.md:67-75` lists private devnet RPC provider selection as owner input needed.
- `rounds/2026-06-13-full-tech-spec/wbs.md:20-25` blocks devnet-real adapter code changes until private devnet RPC provider selection and DBC/Meteora runtime builder approval.

Current value:
- Provider slot model and validation gates exist.
- Selected private devnet RPC provider is not final.

## Notes For Claude Review

1. Existing app copy and config values are not automatically final launch economics.
2. Terms copy currently exposes a fee target; protocol docs still require exact DBC validation before production approval.
3. No secret values, wallet addresses, token values, or private contact values are included in this report.
4. The strongest "decided" items are current token-meaning copy, launch-product-system scope, and Meme Show code inclusion. Most economics and DEX/token execution details remain target/planning/open.
