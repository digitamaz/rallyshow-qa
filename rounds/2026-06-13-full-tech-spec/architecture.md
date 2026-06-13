# Rally Show Architecture and Data Flow

Round: `2026-06-13-full-tech-spec`
Scope: code-grounded architecture map. No secret values, wallet values, program IDs, or private endpoints are copied.

## High-Level Layers

1. Browser UI
   - Pages and panels under `apps/web/src/app/**`.
   - Phantom integration under `apps/web/src/app/PhantomWallet.tsx` and `apps/web/src/lib/wallet-client/*`.

2. Route/API layer
   - Next route handlers under `apps/web/src/app/api/**`.
   - Most routes are `nodejs` runtime and return `no-store` for private or money-path state.

3. Authority and session layer
   - Account session: `apps/web/src/lib/auth/session.ts`.
   - Wallet proof: `apps/web/src/lib/wallet-proof/server.ts`, `wallet-proof/core.ts`.
   - Route authority: `apps/web/src/lib/route-authority/server.ts`.

4. Domain policy layer
   - Core rules under `packages/core/src/*`.
   - Examples: `create.ts`, `trade.ts`, `project.ts`, `mission-lifecycle.ts`, `donation.ts`, `moderation.ts`, `transaction-pipeline.ts`, `launch-product-system.ts`.

5. Persistence layer
   - PostgreSQL schema: `packages/db/src/schema.ts`.
   - Repository implementations: `packages/db/src/repositories.ts`, plus focused repositories under `packages/db/src/*`.

6. Solana/adapter layer
   - Mock adapters and unsigned builders: `packages/solana/src/index.ts`, `unsigned-builders.ts`.
   - DBC fixture/runtime experiments: `packages/solana/src/meteora-*`.
   - Money-path prepare/submit/persist bridges: `apps/web/src/lib/money-path-*`.

7. On-chain program source
   - Project devnet program: `programs/project-show-devnet/src/lib.rs`.
   - Donation devnet program: `programs/donation-meme-devnet/src/lib.rs`.
   - Current checkout did not include `target` build artifacts/IDL/checksum files.

## User Action: Throw / Create Show

### Current flow

1. User edits Create form.
   - UI: `apps/web/src/app/create/CreateClient.tsx`.
   - Validation: `packages/core/src/create.ts:validateCreateDraft`.

2. Draft is saved/read.
   - API: `apps/web/src/app/api/create/drafts/route.ts`, `[draftId]/route.ts`, `[draftId]/preview/route.ts`.
   - DB: `packages/db/src/show-drafts.ts:DatabaseShowDraftRepository`.

3. User requests activation/first-buy.
   - API: `apps/web/src/app/api/create/drafts/[draftId]/activation-attempts/route.ts`.
   - Server: `apps/web/src/lib/activation-attempts/server.ts:createOrResumeActivationAttempt`.
   - Authority: `requireFreshLinkedWalletAuthority` with `creator_authority_check`.
   - DB: activation-attempt repository in `packages/db/src/repositories.ts`.

4. Build transaction route is called.
   - API: `apps/web/src/app/api/create/drafts/[draftId]/activation-attempts/[attemptId]/build-transaction/route.ts`.
   - Handler: `apps/web/src/lib/money-path-prepare/dbc-route-handler.ts:dbcPrepareRouteHandler`.
   - Snapshot: `dbc-route-snapshot-readers.ts:readFirstBuyActivationSnapshot`.
   - Builder: `runtime-builder-binding.ts:createMeteoraDbcPrepareUnsignedBuilder`.
   - Storage: `transaction-storage.ts:createPrepare`.

5. Current break point
   - The prepare route can build/store an unsigned message under gates, but the route handler declares no ability to move SOL, request signature, submit, confirm, or touch mainnet.
   - First-buy specific `signed-submission`, `submitted`, and `confirmed` routes currently return transaction-signature-required guard responses.
   - Generic `/api/money-path/signed-submission/submit` exists for signed payload submission, but same-trace Create activation public success evidence remains incomplete.

### On-chain touch point

Current Create does not directly touch chain from the route. It produces a prepared unsigned transaction/message artifact through the money-path prepare layer. Any submit/confirm requires external wallet signature plus the guarded provider submit-confirm path.

## User Action: Buy / Sell

### Current flow

1. User opens TradePanel.
   - UI: `apps/web/src/app/show/[showId]/TradePanel.tsx`.
   - Read model: show props, `MarketChart.tsx`, `packages/core/src/trade.ts`.

2. Quote is requested.
   - API: `apps/web/src/app/api/trade/quote/route.ts`.
   - Adapter: `packages/solana/src/index.ts:createMockTradeAdapter`.
   - DB quote persistence: `PgTradeRepository.createTradeQuote`.

3. Build transaction route is called.
   - API: `apps/web/src/app/api/trade/build-transaction/route.ts`.
   - Handler: `dbcPrepareRouteHandler`.
   - Snapshot: `dbc-route-snapshot-readers.ts:readTradeQuoteSnapshot`.
   - Builder: DBC pinned fixture or guarded DBC swap2 unsigned message builder.
   - DB: money-path prepare record.

4. Signed payload submit path.
   - API: `apps/web/src/app/api/money-path/signed-submission/submit/route.ts`.
   - Handler: `moneyPathSignedPayloadSubmitConfirmRouteHandler`.
   - Signed submission validation: `money-path-signed-submission/server.ts`.
   - Worker/provider: `money-path-submit-confirm-worker/provider-binding.ts`, `server.ts`.

5. Public success persistence.
   - API: `apps/web/src/app/api/ops/money-path/public-success/persist/route.ts`.
   - Logic: `money-path-public-success-persistence/server.ts:persistMoneyPathPublicSuccess`.
   - Requires confirmed chain observation before public success is persisted.

### Current break point

Quote math is mock. DBC build paths can produce fixture/runtime unsigned messages under gates, but live DBC pool execution same-trace persistence is still a blocker in the roadmap. Legacy `/api/trade/submitted` and `/api/trade/confirmed` are guard responses.

## User Action: Donation Claim

### Current flow

1. Donation routing is configured.
   - API: `apps/web/src/app/api/donation/setup/route.ts`.
   - DB: `PgDonationRepository.setupDonation`.
   - Core policy: `packages/core/src/donation.ts`.

2. Allocation can be accrued in a mock/local path.
   - API: `apps/web/src/app/api/donation/accrue-mock/route.ts`.
   - DB: `PgDonationRepository.accrueMockAllocation`.

3. Recipient verification/dispute/reject/disable is recorded.
   - Routes under `apps/web/src/app/api/donation/*`.
   - Core validation in `packages/core/src/donation.ts`.

4. Claim prepare route is called.
   - API: `apps/web/src/app/api/donation/claim/route.ts`.
   - Handler: `system-transfer-route-handler.ts`.
   - Snapshot: `system-transfer-route-snapshot-readers.ts:readDonationClaimSnapshot`.
   - Builder: `createSystemTransferPrepareUnsignedBuilderWithReadOnlyBlockhash`.
   - Storage: money-path prepare record.

### On-chain touch point

The claim path prepares a system-transfer unsigned message behind provider/blockhash/runtime gates. Remote signed submit/confirm/public success evidence is still incomplete.

## User Action: Mission Payout

### Current flow

1. Owner/steward creates and publishes mission.
   - API: `project/mission/save-draft`, `project/mission/publish`.
   - DB: `PgProjectRepository.saveMissionDraft`, `publishMission`.
   - Validation: `packages/core/src/project.ts:validateMissionPublish`.

2. Contributor claims and submits.
   - API: `mission/claim`, `mission/submit`.
   - DB: `PgMissionLifecycleRepository.claimMission`, `submitWork`.

3. Reviewer accepts/rejects/requests changes.
   - API: `mission/review/*`.
   - DB: `PgMissionLifecycleRepository.acceptSubmission`, etc.
   - Policy: `packages/core/src/mission-lifecycle.ts`.

4. Payout can be approved.
   - API: `mission/payout/approve`.
   - DB: `PgMissionLifecycleRepository.approvePayout`.

5. Payout execute has two paths in code.
   - DB mock path: `PgMissionLifecycleRepository.executePayout` writes DB ledger and mock transaction signature.
   - Guarded prepare route: `apps/web/src/app/api/mission/payout/execute/route.ts` uses system-transfer money-path prepare.

### Current break point

The mission lifecycle is implemented in DB, but real payout movement is not end-to-end launch-ready. The prepare route exists; submit/confirm/persist evidence for the payout route is still part of the devnet-real adapter work.

## User Action: Project Treasury Movement

### Current flow

1. Treasury summary is read from DB ledger.
   - `packages/db/src/repositories.ts:summarizeTreasury`.
   - UI: `ProjectWorkspacePanel.tsx`.

2. Treasury claim/pay/reallocate routes use system-transfer prepare.
   - API: `apps/web/src/app/api/project/treasury/*`.
   - Snapshot: `system-transfer-route-snapshot-readers.ts:readProjectTreasurySnapshot`.
   - Policy: `packages/core/src/treasury.ts:validateTreasuryAction`.

### Current break point

The route can prepare an unsigned system transfer under gates. End-to-end signed submit/confirm/public persistence is not proven for production.

## User Action: Report / Moderation

1. User submits report.
   - API: `apps/web/src/app/api/reports/show/route.ts`.
   - DB: `PgDiscoveryRepository.submitShowReport`.

2. Moderation queue and actions.
   - API: `apps/web/src/app/api/moderation/*`.
   - Policy: `packages/core/src/moderation.ts`.

3. Restriction effects.
   - Trade route checks `show.restrictionState.tradeBlocked`.
   - Core effects include trade/listing/discovery/public/payout/donation/creator/export blocks.

This is DB/policy actual, not a funds-moving path.

## Mock Break Map

| Flow | Mock or guard break |
| --- | --- |
| Create first-buy | DBC prepare uses fixture/runtime guarded builder; first-buy signed/submitted/confirmed specific routes are guard responses. |
| Buy/Sell quote | quote values come from `createMockTradeAdapter`. |
| Buy/Sell DBC execution | build path can prepare, but live DBC same-trace app persistence is not closed. |
| Mission payout | repository has explicit mock payout executor; system-transfer prepare route exists but full signed submit/confirm evidence is pending. |
| Donation claim | mock accrual exists; claim prepare route exists; remote claim flow evidence remains pending. |
| Treasury movement | system-transfer prepare exists; real execution/persistence not proven. |
| DEX migration/listing | only read models/requirements found; no executable graduation/listing path found. |
| Token mint/Token-2022 | mock create and DBC fixture paths exist; no production Token-2022 mint path found. |

## Data Ownership Boundaries

| Boundary | Code authority |
| --- | --- |
| Draft identity fields | `packages/db/src/show-drafts.ts:mergeDraftPatch` prevents mode/ticker identity changes after creation. |
| Route authority | `apps/web/src/lib/route-authority/server.ts` requires active account and fresh linked wallet proof for money-sensitive routes. |
| Money-path state digest | `dbc-route-snapshot-readers.ts` and `system-transfer-route-snapshot-readers.ts` derive serverStateDigest from current DB state. |
| Public success | `money-path-public-success-persistence/server.ts` requires confirmed chain observation before public success persistence. |
| Severe restriction | `packages/core/src/moderation.ts` and route checks prevent trade/payout/donation/etc. when severe effects apply. |
