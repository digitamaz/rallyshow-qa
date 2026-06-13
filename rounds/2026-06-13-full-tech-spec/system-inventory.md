# Rally Show System Inventory

Round: `2026-06-13-full-tech-spec`
Scope: code-grounded technical and functional inventory only.
Rule: values that can identify secrets, wallets, program IDs, accounts, local private paths, or endpoints are intentionally not copied. Code locations are relative to the app repo root.

## Status Legend

| Status | Meaning |
| --- | --- |
| actual | Implemented as app/server/DB logic and usable within its configured environment. |
| devnet-source | On-chain program or devnet integration source exists, but this document did not find frozen build artifacts in the checkout. |
| guarded-devnet | Devnet execution path exists behind env/provider/runtime gates and requires external wallet/provider inputs before it moves funds. |
| mock | Explicit mock adapter, fixture transaction, local-only evidence, or mock ledger path. |
| UI-only | User-facing surface exists but no matching live execution path was found. |
| guard-only | Safety/evaluation/launch gate exists and deliberately blocks execution. |
| missing | Required system is not implemented or not wired end-to-end. |

## Runtime Stack

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Web app runtime | `apps/web/package.json`; `apps/web/src/app/layout.tsx` | actual | Next.js 16, React 19 |
| Styling and design system | `apps/web/src/app/globals.css`; page CSS under `apps/web/src/app/**`; `apps/web/src/app/TopNav.tsx` | actual | CSS variables, next/font, no component library dependency found |
| Database layer | `packages/db/src/client.ts:createDatabase`; `packages/db/src/schema.ts`; `packages/db/src/repositories.ts` | actual | PostgreSQL through drizzle-orm and pg |
| App configuration | `packages/config/src/index.ts:readConfig`; provider validators in same file | actual | Environment variables, no secret values copied |
| Auth/session | `apps/web/src/lib/auth/session.ts`; `apps/web/src/app/api/auth/[...all]/route.ts`; `apps/web/src/app/api/account/session/route.ts` | actual | better-auth, optional GitHub/Google provider credentials |
| Solana utilities | `packages/solana/src/index.ts`; `packages/solana/src/unsigned-builders.ts`; DBC files in `packages/solana/src/meteora-*` | mock / guarded-devnet | `@solana/kit`, Solana system program helpers, Meteora DBC fixture data |
| Anchor programs | `programs/project-show-devnet/src/lib.rs`; `programs/donation-meme-devnet/src/lib.rs`; `Anchor.toml` | devnet-source | Anchor 0.31.1, Solana devnet |

## Route and Page Surface

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Discovery page | `apps/web/src/app/page.tsx`; `apps/web/src/app/discovery/UnifiedDiscoveryPage.tsx`; `DiscoveryCard.tsx` | actual | DB discovery repository |
| Search page | `apps/web/src/app/search/page.tsx`; `apps/web/src/app/api/discovery/search/route.ts` | actual | DB discovery repository |
| Create page | `apps/web/src/app/create/page.tsx`; `apps/web/src/app/create/CreateClient.tsx` | actual UI + guarded activation | DB draft/activation repos, wallet proof, money-path prepare |
| Show Detail page | `apps/web/src/app/show/[showId]/page.tsx`; `TradePanel.tsx`; `DonationPanel.tsx`; `ProjectPublicPanel.tsx`; `ProjectWorkspacePanel.tsx` | actual UI + guarded money paths | DB repos, wallet proof, money-path prepare |
| Dashboard | `apps/web/src/app/dashboard/page.tsx`; `apps/web/src/app/dashboard/AccountWalletStatusPanel.tsx` | actual | account session, DB profile/project/trade reads |
| Profile | `apps/web/src/app/profile/[walletAddress]/page.tsx`; `apps/web/src/app/ProfilePanel.tsx` | actual | DB profile repository |
| Terms | `apps/web/src/app/terms/page.tsx` | actual | static page |
| 404 and errors | `apps/web/src/app/not-found.tsx`; `error.tsx`; `global-error.tsx`; `ErrorStage.tsx` | actual | Next.js error boundaries |
| Top navigation/search overlay | `apps/web/src/app/TopNav.tsx`; `SearchOverlay.tsx`; `ThemeToggleButton.tsx` | actual | browser localStorage for theme |

## Data Model and Repositories

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Show records | `packages/db/src/schema.ts:shows`; `packages/db/src/repositories.ts:PgDiscoveryRepository` | actual | PostgreSQL |
| Draft records | `packages/db/src/schema.ts:showDrafts`; `packages/db/src/show-drafts.ts:DatabaseShowDraftRepository` | actual | PostgreSQL |
| Activation attempts | `packages/db/src/schema.ts:showActivationAttempts`; `packages/db/src/repositories.ts` activation-attempt repository; `apps/web/src/lib/activation-attempts/server.ts` | actual DB lifecycle + guarded transaction | PostgreSQL, wallet proof, DBC prepare route |
| Trade quotes | `packages/db/src/schema.ts:tradeQuotes`; `packages/db/src/repositories.ts:PgTradeRepository`; `apps/web/src/app/api/trade/quote/route.ts` | actual DB storage + mock quote math | PostgreSQL, mock trade adapter |
| Money-path prepare records | `packages/db/src/schema.ts:moneyPathPrepares`; `packages/db/src/transaction-storage.ts:DatabaseMoneyPathTransactionStorageRepository` | actual | PostgreSQL |
| Donation routing | `packages/db/src/schema.ts:donationRoutingRecords`; `packages/db/src/repositories.ts:PgDonationRepository` | actual DB lifecycle + guarded claim | PostgreSQL, wallet proof, system-transfer prepare route |
| Project setup/stewards/missions | `packages/db/src/schema.ts:projectSetupRecords`, `projectStewards`, `missions`; `packages/db/src/repositories.ts:PgProjectRepository`, `PgMissionLifecycleRepository` | actual DB lifecycle | PostgreSQL |
| Treasury ledger | `packages/db/src/schema.ts:projectTreasuryLedgerEntries`; `packages/db/src/repositories.ts:summarizeTreasury` | actual DB ledger + mock/guarded transfers | PostgreSQL, system-transfer prepare route |
| Reports and moderation | `packages/db/src/schema.ts:showReports`, risk labels, moderation tables; `packages/db/src/repositories.ts:PgDiscoveryRepository`, moderation routes | actual DB workflow | PostgreSQL |
| Account wallet links | `packages/db/src/account-wallet-links.ts:DatabaseAccountWalletLinkRepository` | actual | PostgreSQL, wallet proof |
| Wallet proof sessions | `packages/db/src/wallet-proof.ts`; `apps/web/src/lib/wallet-proof/server.ts`; `wallet-proof/core.ts` | actual | Solana wallet signature, server session cookie |
| Profile identity/links | `packages/db/src/schema.ts:profileIdentityRecords`; `apps/web/src/lib/profile-repository.ts`; profile API routes | actual | PostgreSQL |
| Relationships/trust links | `packages/db/src/schema.ts:showRelationshipRecords`; `apps/web/src/lib/relationship-repository.ts`; relationship API routes | actual | PostgreSQL |
| Creator allocation read model | `packages/db/src/creator-allocation.ts:PgCreatorAllocationRepository`; `packages/core/src/creator-allocation.ts` | partial | PostgreSQL; claim prepare route exists, launch reader bridge still has blockers in roadmap |

## Market, Bonding Curve, Trade, DEX

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Bonding curve display | `apps/web/src/app/show/[showId]/MarketChart.tsx`; `apps/web/src/app/show/[showId]/show.css` | UI-only | static/synthetic chart state from show page props |
| Market state/readiness labels | `packages/core/src/trade.ts:deriveMarketState`; `evaluateMarketReadiness`; `migrationProgressLine`; `resolveMigrationLifecycleState` | actual policy/read model | local core logic |
| Quote request API | `apps/web/src/app/api/trade/quote/route.ts:POST` | actual DB quote with mock math | `packages/solana/src/index.ts:createMockTradeAdapter` |
| Buy/sell quote math | `packages/solana/src/index.ts:createMockTradeAdapter` | mock | deterministic mock adapter |
| Quote persistence | `packages/db/src/repositories.ts:PgTradeRepository.createTradeQuote`; `getQuote` | actual | PostgreSQL |
| Trade build transaction route | `apps/web/src/app/api/trade/build-transaction/route.ts:POST`; `apps/web/src/lib/money-path-prepare/dbc-route-handler.ts` | guarded-devnet | DBC prepare route env gates, wallet proof, quote snapshot |
| DBC prepare snapshot | `apps/web/src/lib/money-path-prepare/dbc-route-snapshot-readers.ts:readTradeQuoteSnapshot` | actual read-only gate | DB quote, wallet proof session |
| DBC fixture unsigned builder | `packages/solana/src/unsigned-builders.ts:buildMeteoraDbcFixtureUnsignedTransaction`; `apps/web/src/lib/money-path-prepare/runtime-builder-binding.ts:createMeteoraDbcPrepareUnsignedBuilder` | mock / fixture | pinned DBC message fixtures |
| DBC swap2 unsigned builder experiment | `packages/solana/src/meteora-dbc-swap2-unsigned-message.ts`; `runtime-builder-binding.ts:createMeteoraDbcBuyTradeRuntimePrepareUnsignedBuilder` | guard-only | shadow evidence required; submit blocked |
| Signed trade submission bridge | `apps/web/src/app/api/money-path/signed-submission/submit/route.ts`; `apps/web/src/lib/money-path-signed-submission/submit-confirm-route-handler.ts` | guarded-devnet | private RPC env, signed transaction payload, wallet proof |
| Submit-confirm worker | `apps/web/src/lib/money-path-submit-confirm-worker/server.ts`; `provider-binding.ts` | guarded-devnet | private devnet RPC, kill switch/env flags |
| Trade submitted/confirmed legacy routes | `apps/web/src/app/api/trade/submitted/route.ts`; `confirmed/route.ts` | guard-only | returns transaction-signature-required response |
| Public success persistence | `apps/web/src/lib/money-path-public-success-persistence/server.ts:persistMoneyPathPublicSuccess`; ops route | actual DB persistence after confirmed observation | money-path prepare storage |
| Same-trace quote-to-public-success | money-path prepare + signed submission + worker + persistence chain | partial | current quote/build/submit/persist pieces exist, DBC live-pool same-trace app evidence remains a launch blocker |
| DEX listing/migration graduation | `packages/core/src/trade.ts:resolveMigrationLifecycleState`; `packages/core/src/launch-product-system.ts:MEME_SHOW_V1_MARKET_LIFECYCLE_REQUIREMENTS` | missing end-to-end | DEX/Meteora migration execution not wired to UI/read model |
| Migration indexing | `packages/core/src/market-indexing.ts:normalizeMarketIndexReadModel`; DB migration status enum | partial read model | future production indexer |
| Fee display | `packages/core/src/trade.ts:buildQuoteFeeDisplayContract`; mock quote fields in `createMockTradeAdapter` | mock/read model | mock trade adapter |
| Actual fee distribution execution | no end-to-end distribution executor found; creator allocation modules are read/claim prep | missing | fee wallet policy and DBC settlement/indexer needed |

## Token Creation and Activation

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Create draft validation | `packages/core/src/create.ts:validateCreateDraft`; `normalizeCreateDraft`; `apps/web/src/app/api/create/validate/route.ts` | actual | local core logic |
| Draft save/list/read/delete | `packages/db/src/show-drafts.ts:DatabaseShowDraftRepository`; create draft API routes | actual | PostgreSQL, account session |
| Activation attempt create/resume | `apps/web/src/lib/activation-attempts/server.ts:createOrResumeActivationAttempt`; DB activation-attempt repository | actual DB lifecycle | wallet proof, DB |
| First-buy build transaction | `apps/web/src/app/api/create/drafts/[draftId]/activation-attempts/[attemptId]/build-transaction/route.ts`; DBC prepare route | guarded-devnet | DBC fixture/runtime gate, wallet proof |
| First-buy signed-submission route | `apps/web/src/app/api/create/drafts/[draftId]/activation-attempts/[attemptId]/signed-submission/route.ts` | guard-only | transaction-signature-required response |
| First-buy submitted/confirmed routes | `submitted/route.ts`; `confirmed/route.ts`; `failed/route.ts`; `reject-signature/route.ts` | partial guard/recovery | DB activation attempt repository |
| Token mint and metadata | `packages/solana/src/index.ts:ValidatedCreateAdapter`; `createMockValidatedCreateAdapter`; DBC fixture builder | mock / missing live | no production Token-2022 mint path found |
| Token-2022 authority policy | launch/mainnet preflight modules; no live mint authority executor found | missing | Solana token program, authority policy owner approval |

## Project Show and Open Build System

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Project setup checklist | `packages/core/src/project.ts:computeProjectReadiness`; `validateProjectStatusChange`; project setup API route | actual | PostgreSQL |
| Steward add/remove | `apps/web/src/app/api/project/stewards/add/route.ts`; `remove/route.ts`; `PgProjectRepository.addSteward/removeSteward` | actual DB lifecycle | PostgreSQL |
| Steward invitation flow | `apps/web/src/app/api/project/invitations/create/route.ts`; `respond/route.ts`; project repository | actual/needs launch evidence | PostgreSQL |
| Work proposal flow | `apps/web/src/app/api/project/work-proposals/submit/route.ts`; `review/route.ts` | actual/needs launch evidence | PostgreSQL |
| Mission draft/save/publish | `apps/web/src/app/api/project/mission/save-draft/route.ts`; `publish/route.ts`; `PgProjectRepository.saveMissionDraft/publishMission` | actual DB lifecycle | PostgreSQL, core validation |
| Mission reward reserve route | `apps/web/src/app/api/project/mission/reserve-reward/route.ts` | guard-only | transaction-signature-required response |
| Mission claim | `apps/web/src/app/api/mission/claim/route.ts`; `PgMissionLifecycleRepository.claimMission` | actual DB lifecycle | PostgreSQL |
| Mission submit | `apps/web/src/app/api/mission/submit/route.ts`; `PgMissionLifecycleRepository.submitWork` | actual DB lifecycle | PostgreSQL |
| Mission review accept/reject/request changes | `apps/web/src/app/api/mission/review/*`; `PgMissionLifecycleRepository.acceptSubmission/rejectSubmission/requestChanges` | actual DB lifecycle | PostgreSQL |
| Payout approval | `apps/web/src/app/api/mission/payout/approve/route.ts`; `PgMissionLifecycleRepository.approvePayout` | actual DB lifecycle | PostgreSQL |
| Payout execution DB mock | `packages/db/src/repositories.ts:PgMissionLifecycleRepository.executePayout` | mock | writes DB ledger and mock transaction signature |
| Payout execute prepare route | `apps/web/src/app/api/mission/payout/execute/route.ts`; `system-transfer-route-handler.ts` | guarded-devnet | private RPC blockhash, wallet proof, system transfer builder |
| Contribution history | `packages/db/src/schema.ts` project contribution history table; repository helpers | actual DB lifecycle / launch evidence required | PostgreSQL |
| Contributor reputation summary | `packages/db/src/schema.ts:contributorReputationSummaries`; repository helpers | actual DB lifecycle | PostgreSQL |
| Treasury dashboard/ledger | `ProjectWorkspacePanel.tsx`; `packages/db/src/repositories.ts:summarizeTreasury` | actual DB ledger | PostgreSQL |
| Treasury claim/pay/reallocate prepare routes | `apps/web/src/app/api/project/treasury/*`; system-transfer snapshot reader | guarded-devnet | private RPC blockhash, wallet proof |
| Project devnet on-chain program | `programs/project-show-devnet/src/lib.rs` | devnet-source | Anchor/Solana; build artifact not found in checkout |

## Donation Meme System

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Donation setup | `apps/web/src/app/api/donation/setup/route.ts`; `PgDonationRepository.setupDonation` | actual DB lifecycle | PostgreSQL |
| Recipient verification/reject/disable/dispute | donation API routes under `apps/web/src/app/api/donation/*`; `packages/core/src/donation.ts` validators | actual DB lifecycle | PostgreSQL |
| Mock allocation accrual | `apps/web/src/app/api/donation/accrue-mock/route.ts`; `PgDonationRepository.accrueMockAllocation` | mock | PostgreSQL |
| Donation allocation read model | `packages/core/src/donation.ts:deriveDonationAllocationReadModel` | actual policy/read model | local core logic |
| Donation claim readiness | `packages/core/src/donation.ts:validateDonationClaim`; `deriveDonationRecipientClaimPrep` | actual policy/read model | local core logic |
| Donation claim prepare route | `apps/web/src/app/api/donation/claim/route.ts`; `system-transfer-route-handler.ts`; `system-transfer-route-snapshot-readers.ts:readDonationClaimSnapshot` | guarded-devnet | private RPC blockhash, wallet proof, DB route state |
| Donation claim remote full flow | launch roadmap and readiness modules | partial / blocker | same-trace remote staging evidence missing |
| Donation devnet on-chain program | `programs/donation-meme-devnet/src/lib.rs` | devnet-source | Anchor/Solana; build artifact not found in checkout |

## Wallet, Account, Authority

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Account session read | `apps/web/src/app/api/account/session/route.ts`; `apps/web/src/lib/auth/session.ts` | actual | better-auth |
| Optional OAuth providers | `apps/web/src/app/api/account/session/route.ts:readAccountProviderAvailability` | actual config gate | GitHub/Google credentials if provided |
| Phantom browser client | `apps/web/src/app/PhantomWallet.tsx`; `apps/web/src/lib/wallet-client/phantom-injected.ts`; `state.ts` | actual UI/client integration | Phantom injected provider |
| Wallet proof challenge | `apps/web/src/app/api/wallet/proof/challenge/route.ts`; `wallet-proof/server.ts:createWalletProofChallenge` | actual | account session, DB proof repository |
| Wallet proof verification | `apps/web/src/app/api/wallet/proof/verify/route.ts`; `wallet-proof/core.ts:verifySolanaWalletSignature` | actual | Ed25519 verification, Solana wallet |
| Wallet proof scopes | `apps/web/src/lib/wallet-proof/core.ts:WALLET_PROOF_SCOPES` | actual | proof session cookie |
| Wallet link/unlink | account wallet routes; `packages/db/src/account-wallet-links.ts` | actual | account session, wallet proof |
| Route authority gates | `apps/web/src/lib/route-authority/server.ts` | actual | account session, wallet proof, DB link status |
| Browser signing smoke | `packages/core/src/phantom-browser-signing-smoke-launch-bridge.ts` | guard/evidence | browser wallet channel; launch blocker remains |

## Money-Path Adapter Layer

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Money path registry | `apps/web/src/lib/money-path-prepare/route-registry.ts:MONEY_PATH_PREPARE_ROUTE_REGISTRY` | actual registry | core production path definitions |
| Prepare route adapter | `apps/web/src/lib/money-path-prepare/route-adapter.ts`; `server.ts` prepare-money-path function | actual | wallet proof, DB prepare repository |
| DBC prepare route handler | `apps/web/src/lib/money-path-prepare/dbc-route-handler.ts` | guarded-devnet | DBC gate flags, DBC builder gate flags |
| System transfer prepare route handler | `apps/web/src/lib/money-path-prepare/system-transfer-route-handler.ts` | guarded-devnet | private RPC blockhash gate, system transfer builder |
| Blockhash provider binding | `apps/web/src/lib/money-path-prepare/blockhash-provider-binding.ts` | guarded-devnet | private RPC endpoint/API key, devnet/mainnet gating |
| Signed submission validation | `apps/web/src/lib/money-path-signed-submission/server.ts` | actual validation | DB prepare record, wallet proof |
| Signed payload submit bridge | `apps/web/src/lib/money-path-signed-submission/submit-confirm-bridge.ts` | guarded-devnet | provider binding, signed transaction payload |
| Submit-confirm provider binding | `apps/web/src/lib/money-path-submit-confirm-worker/provider-binding.ts` | guarded-devnet | private devnet RPC, runtime kill switches |
| Submit-confirm worker | `apps/web/src/lib/money-path-submit-confirm-worker/server.ts` | actual worker logic + guarded provider | money-path storage, provider |
| Provider no-send dry run | `apps/web/src/app/api/ops/provider-no-send-dry-run/route.ts` | actual ops route | ops token, provider env |
| Production pipeline readiness | `packages/core/src/transaction-pipeline.ts:deriveProductionTransactionPipelineReadiness` | guard-only | owner/legal/mainnet/provider approvals |

## Marquee, Event Feed, Indexing, Export

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Marquee UI | `apps/web/src/app/TopNav.tsx` and CSS | UI-only / local event projection | DB events when wired through page props |
| Event ledger tables | `packages/db/src/schema.ts:showEventLedgerEntries`; trade/mission/donation events in repos | actual DB lifecycle | PostgreSQL |
| Market index read model | `packages/core/src/market-indexing.ts:normalizeMarketIndexReadModel` | partial | future production indexer |
| Public market activity | `packages/db/src/repositories.ts:PgTradeRepository.getPublicMarketActivity` | actual read model | PostgreSQL |
| Agent/export surfaces | export API routes; `apps/web/src/lib/agent-export.ts`; `packages/core/src/export.ts` | actual read routes with guard policies | DB repositories |
| Sitemap/indexing policy | `packages/core/src/production-path.ts` public indexing helpers | guard-only | launch acceptance gates |

## Moderation, Safety, Legal/Ops

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| User report submission | `apps/web/src/app/api/reports/show/route.ts`; `PgDiscoveryRepository.submitShowReport` | actual | PostgreSQL |
| Moderation queue | `apps/web/src/app/api/moderation/queue/route.ts`; discovery repository | actual | PostgreSQL |
| Risk label apply/remove | moderation risk-label routes; `packages/core/src/moderation.ts` | actual DB workflow | PostgreSQL |
| Severe restriction effects | `packages/core/src/moderation.ts:ModerationRestrictionEffects`; show routes check `restrictionState` | actual policy | local core logic |
| Creator appeals | moderation appeals routes; `packages/core/src/moderation.ts` | actual DB workflow | PostgreSQL |
| Legal/fund safety boundary | `packages/core/src/moderation.ts:deriveModerationOpsPolicyReadiness`; terms page | guard-only / actual static text | legal owner inputs required |
| Ops launch status | `apps/web/src/app/api/ops/launch-status/route.ts`; launch status core modules | actual token-gated route | ops token env |
| Launch env preflight | `apps/web/src/app/api/ops/launch-env-preflight/route.ts`; config validators | actual ops route | env only; no secret values returned |

## Launch, Mainnet, Evidence System

| Feature | Implementation location | Status | External dependencies |
| --- | --- | --- | --- |
| Launch product map | `packages/core/src/launch-product-system.ts` | actual guard/readiness | roadmap evidence |
| Production path contracts | `packages/core/src/production-path.ts` | guard-only | provider/legal/mainnet approvals |
| Mainnet deploy hardening | `packages/core/src/mainnet-deploy-preflight-hardening.ts` | guard-only | artifacts, program IDs, authority policy, RPC, owner funding |
| Owner funding gates | `packages/core/src/owner-funding-approval-input-gate.ts`; roadmap PTP260+ docs | guard-only | explicit owner approval and funding |
| Roadmap status | `docs/technical/OFFICIAL_LAUNCH_DEVELOPMENT_ROADMAP_2026-06-04.md` | actual documentation | owner inputs, staging evidence |
| Remote staging public route E2E | roadmap PTP226-227/285 | partial; blocker remains in latest snapshot | staging deploy/env access |
| Claude/Codex QA handoff | QA repo rounds and `scripts/import-round.mjs` in QA repo | actual process | GitHub access, sensitive scan |

## Explicitly Required But Not End-to-End Complete

| Required system | Current implementation | Current gap |
| --- | --- | --- |
| Real bonding curve pricing and state mutation | mock quote adapter and DBC prepare fixture/runtime experiments | no app-owned same-trace live DBC buy/sell persistence found |
| DEX listing/graduation | migration status enum/read model and launch requirements | no executable migration/listing path found |
| Production fee distribution | quote fee display/read models and creator allocation claim prep | no end-to-end fee settlement/indexer/claim execution |
| Token-2022 mint/meta/authority | mock create adapter and DBC fixture builder | no production mint authority path found |
| Mission payout real movement | DB lifecycle plus system-transfer prepare route | no full remote signed submit/confirm/persist evidence for payout |
| Donation claim real movement | DB lifecycle plus system-transfer prepare route | remote donation claim flow still launch blocker |
| Mainnet deploy | source and guard packets | artifacts/checksums/authority/RPC/funding/MN001/final approval missing |
