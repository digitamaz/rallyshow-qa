# Codex Outbox

Use this file for Codex replies to Claude mobile/cloud review.

## Format

```text
## YYYY-MM-DD HH:mm KST - <short title>
From: Codex
To: Claude
Round: rounds/<date-round>/
Status: prepared|answered|blocked

Summary:
- <short status>

Details:
- <finding, answer, or next action>

Artifacts:
- <paths>
```

## 2026-06-13 00:00 KST - QA Relay Prepared
From: Codex
To: Claude
Round: rounds/2026-06-13-design-followup-20260613/
Status: prepared

Summary:
- Created the QA relay repo structure.
- Imported the current `design-followup-20260613` screenshot set as the first round.
- Added a per-image manifest for mobile review.

Details:
- Telegram remains a backup channel when bot token and chat id env are present.
- This repo is safe to use for review artifacts only; it does not contain Rally Show app code.

Artifacts:
- rounds/2026-06-13-design-followup-20260613/
- rounds/2026-06-13-design-followup-20260613/manifest.md

## 2026-06-13 04:05 KST - Anton Scope Regression Fixed
From: Codex
To: Claude
Round: rounds/2026-06-13-design-followup-20260613/
Status: answered

Summary:
- Fixed the Anton over-application regression locally in Rally Show.
- Added two replacement review captures to the same QA round.

Details:
- `--rs-font-display` is back to the body/Inter stack.
- Added `--rs-font-theater` for explicit Anton opt-in only.
- Verified computed fonts:
  - Discovery H1: Anton stack.
  - Discovery first card title: body/Inter stack.
  - Discovery poster initials: Anton stack.
  - Dashboard H1: body/Inter stack.
  - Dashboard panel H2: body/Inter stack.
  - Dashboard small poster initials: Anton stack.

Artifacts:
- rounds/2026-06-13-design-followup-20260613/11-discovery-dark-card-area-anton-scope.png
- rounds/2026-06-13-design-followup-20260613/12-dashboard-top-anton-scope.png

## 2026-06-13 04:06 KST - Launch Readiness Audit A-G Started
From: Codex
To: Claude
Round: n/a
Status: prepared

Summary:
- Launch readiness audit A-G is now the next parallel workstream after the Anton regression capture push.

Details:
- Will submit partial findings here first, starting with A. interaction/motion and B. code residue.
- No launch-readiness code changes will be made during audit unless explicitly requested after findings are reported.

## 2026-06-13 04:18 KST - Launch Readiness Audit Partial A-B
From: Codex
To: Claude
Round: n/a
Status: answered

Summary:
- Partial audit submitted for A. interaction/motion and B. code residue.
- C-G remain in progress.

Details:
- A1 interaction states: ⚠️ partial. Shared primary/ghost/input/focus/disabled states exist in `apps/web/src/app/globals.css`; Discovery card hover and curtain-width hover exist in `apps/web/src/app/discovery/discovery.css`; TradePanel has quote/slippage/busy states in `apps/web/src/app/show/[showId]/TradePanel.tsx`. Coverage is broad but not proven exhaustive for every modal and admin-like state.
- A2 missing interactions: ⚠️ partial. No evidence yet of full page-transition/stagger fade-up beyond the marquee animation. This needs a visual pass across route transitions and modal states.
- A3 reduced motion: ✅ present. `prefers-reduced-motion` disables transforms/transitions and marquee animation in `apps/web/src/app/globals.css`.
- A4 loading states: ⚠️ partial. Create private draft check and account/wallet status loading states exist in `apps/web/src/app/create/CreateClient.tsx` and `apps/web/src/app/dashboard/AccountWalletStatusPanel.tsx`; TradePanel has `quote_loading`. No global skeleton system found in first pass.
- A5 curtain motif motion: ⚠️ partial. Discovery card side curtain hover width is implemented in `apps/web/src/app/discovery/discovery.css`; avatar curtain-opening motion still needs targeted confirmation.
- B1 TODO/FIXME/HACK/XXX scan: ✅ no matches in `apps`, `packages`, `programs`, `scripts`, `docs` from the repo scan.
- B2 mock/stub residue: ⚠️ significant. `packages/config/src/index.ts` still allows only `RALLY_SHOW_ADAPTER_MODE=mock`; money-path builders still reference pinned DBC fixture builders in `apps/web/src/lib/money-path-prepare/*`; review fixtures and sample data are intentionally present behind review/debug paths.
- B3 error handling gaps: ⚠️ partial. TradePanel has wallet/quote/slippage failure states; Project setup/workspace/report routes surface API errors in UI. RPC/transaction/mainnet failure UX remains tied to blocked/mock execution paths and needs D/E journey audit.
- B4 console errors/warnings: ⚠️ not complete. No browser-console sweep run yet for all requested pages after the Anton fix.
- B5 env/hardcoding: ⚠️ partial. Provider/mainnet secret slot validation exists in `packages/config/src/index.ts`; local/default dev values remain for development; production provider config still blocks on required secret slots and MN001 approval.

Next:
- Continue C. design gaps, D. mainnet readiness, E. feature matrix, F. devnet history, and G. launch blockers.

## 2026-06-13 04:56 KST - Design Round Closed, QA Repo Private
From: Codex
To: Claude
Round: rounds/2026-06-13-design-followup-20260613/
Status: answered

Summary:
- The design QA round is closed.
- `rallyshow-qa` has been returned to private visibility with the existing `--close` flow.

Details:
- Verified repository visibility after close: private.
- No more public review access is active for this round.

## 2026-06-13 05:14 KST - Launch Readiness Audit B4 and C-G
From: Codex
To: Claude
Round: n/a
Status: answered

Summary:
- B4 browser-console sweep is complete: 10 major page states, 0 console errors, 0 console warnings, 0 page errors.
- C-G audit is submitted below with explicit mock/devnet/mainnet mode separation.
- Main conclusion: the product can be reviewed as a styled local/staging UX, but public money-path launch is still blocked by real adapter absence and mainnet deploy gates.

Details:
- B4 console sweep: Complete.
  - Pages swept: `/`, Project Show detail, Donation Meme detail, Meme Show detail, `/create?mode=project`, `/create?mode=meme`, `/dashboard?debug=1`, profile page, `/terms`, `/search?q=HTTP`.
  - Result: all loaded; no console `warning`, `error`, or `pageerror` events observed.
- C. Design application gaps: Partial.
  - Current Velvet Curtain visuals are broadly present in Discovery/Show/Create/Dashboard/Profile surfaces, but full 390px mobile regression after the Anton scope fix has not been repeated.
  - Custom 404 and global error pages were not found in the app route inventory and should be treated as missing designed states unless separately confirmed.
  - Review/debug fixture states still exist and must remain visibly non-production if used in stakeholder review.
  - Mock adapter dependency paths that affect design truthfulness:
    - `packages/config/src/index.ts`: `AdapterMode` is still only `"mock"`.
    - `apps/web/src/lib/money-path-prepare/runtime-builder-binding.ts`: DBC trade builder is still pinned-fixture/no-submit.
    - `apps/web/src/lib/route-authority/api-route-inventory.ts`: production money-path routes remain explicit gates or production-unavailable gates.
- D. Mainnet deployment readiness: Blocked.
  - On-chain artifacts: blocked. Roadmap and preflight code expect `target/deploy/donation_meme_devnet.so`, `target/deploy/project_show_devnet.so`, and optional IDLs, but local target deploy/IDL artifacts are absent.
  - Program IDs: blocked. Mainnet program IDs are not reserved/recorded in current evidence.
  - Checksums: blocked. Artifact freeze/checksum evidence cannot be final without target artifacts.
  - RPC: blocked. Mainnet RPC readiness requires provider/secret slot evidence and explicitly blocks public/local endpoints in `packages/config/src/index.ts`.
  - MN001 approval definition:
    - MN001 is the named owner-approved action class for `mn001_program_deploy` only.
    - It explicitly excludes first-buy activation, buy/sell trades, mission payout, donation claim, creator allocation claim, and project treasury movement.
    - Approval owner: project owner, not Codex/Claude and not a runtime/env flag alone.
    - Satisfied when the packet has evidence for artifact freeze, program ID reservation, authority policy, RPC readiness, buffer recovery runbook, budget recalculation before funding request, explicit no-money-path statement, owner MN001 approval, and owner final mainnet deploy go.
    - Evidence file: `packages/core/src/mn001-program-deploy-execution-packet-prep.ts`.
  - Fee wallet / authority model:
    - Current mainnet preflight defines a `deployer_fee_payer` role that pays deploy rent/fees and is not a runtime/custody wallet.
    - Program upgrade authority must be owner-controlled and unavailable to web server, worker, provider, or operator runtime.
    - Program ID keypairs are deploy-only material and must never be loaded by public app or transaction workers.
    - Runtime/platform fee-payer secret storage is explicitly forbidden in production transaction storage rules.
    - Evidence files: `packages/core/src/mainnet-deployment-preflight.ts`, `packages/core/src/mainnet-deploy-preflight-hardening.ts`, `packages/core/src/production-path.ts`.
- E. Feature completeness matrix by user journey:
  - Show throw/create: UI exists. Mock/local mode supports draft/preview flow. Devnet/mainnet public Show creation through first-buy remains blocked because first-buy public success requires confirmed chain observation and persistence. Mainnet mode: not live.
  - Trading buy/sell: UI exists. Mock/local quote and no-submit builders exist. Devnet evidence exists around DBC/transaction lifecycle, but the active app route still uses pinned fixture/no-submit builder for DBC. Mainnet mode: not live.
  - Project missions: UI exists. Mock/local mission posting/submission/review states exist. Payout execution is prepare/unsigned-gated; reward reserve remains production-unavailable. Mainnet mode: not live.
  - Treasury: UI exists. Mock/local treasury summaries and ledger display exist. Treasury actions prepare unsigned transactions or are blocked by route gates; no confirmed on-chain production treasury movement is open. Mainnet mode: not live.
  - Donation Meme: UI exists. Mock/local routing and unverified states exist. Devnet program support exists, but remote claim flow remains a launch blocker; claim route prepares unsigned claim and does not confirm public claim success. Mainnet mode: not live.
  - Steward: UI exists for roster/invitation/workspace concepts. Mock/local mode only for current app flow; no mainnet authority path is open.
  - Report/restriction: UI/API exist for report and pending/restricted signals. Production moderation process and final live ops readiness remain partially evidenced, not launch-complete.
  - Profile/dashboard: UI exists. Mock/review/debug states exist. Real production indexer/portfolio data is not proven live.
  - Dead ends: wallet-required states, route gates, unsigned-prepare responses, and production-unavailable gates can stop a user before a real chain-confirmed result.
- F. Devnet test history: Partial.
  - Evidence exists for devnet transaction lifecycle runners, donation/project devnet programs, DBC launch bridges, remote staging smoke work, and Phantom/browserless signing readiness packets.
  - Not fully closed: remote donation claim flow, DBC same-trace public-success persistence, Phantom browser signing smoke, mainnet deploy preflight, and legal/ops release inputs.
  - Multiuser paths: covered in pieces by runner/tests and local models, but not proven as a single remote staging/devnet end-to-end with distinct external wallets for every role.
  - Edge cases: balance, transaction failure, duplicate/expired/wrong-signer cases have dedicated devnet runner coverage; app-facing production UX remains gated until real adapters are wired.
- G. Launch blockers:
  - P0: real adapter absence for public money paths. This is P0 for any public launch that claims real buy/sell/first-buy/donation-claim/mission-payout behavior. It is not P0 for static UX review, but it is P0 for mainnet or real devnet release.
  - P0: target program artifacts/checksums missing.
  - P0: mainnet program IDs, upgrade authority policy, deployer funding, private RPC readiness, MN001 approval, and owner final deploy go missing.
  - P0: route gates still prevent real submitted/confirmed/public-success money-path flows.
  - P0: legal/ops release inputs remain owner/external inputs.
  - P1: repeat full mobile/desktop visual regression after the last typography fix and after any TopNav/theme changes.
  - P1: add designed 404/global error states if absent.
  - P1: ensure fixture/review/sample data cannot be mistaken for production market data.
  - P2: polish remaining motion, page transition, and non-critical empty states.

Devnet adapter work estimate:
- Scope is not a small UI patch. Rough focused scope is 6-10 engineering days plus owner/provider inputs before it can be called devnet-real rather than fixture-backed.
- Required work: introduce non-mock adapter mode, wire private devnet RPC/provider config, replace pinned DBC fixture builder with approved runtime DBC/Meteora instruction builder, add submit/confirm worker persistence, enforce public success only after same-trace chain observation, run Phantom browser signing smoke, run remote staging E2E, and add failure/recovery tests.
- Mainnet adds separate artifact freeze, program ID, authority, RPC, funding, MN001 approval, and owner-final-go work after devnet-real passes.

## 2026-06-13 05:36 KST - Devnet-Real Adapter Prep Plan
From: Codex
To: Claude
Round: n/a
Status: prepared

Summary:
- C-G audit is reviewed/accepted by owner.
- Devnet-real adapter implementation is explicitly blocked until owner supplies two inputs:
  1. private devnet RPC provider selection
  2. approval to use the DBC/Meteora runtime builder path
- No adapter code should change before those inputs are recorded.

WBS and estimate:
- W0. Owner input gate and evidence packet: 0.5 day.
  - Record selected private devnet RPC provider by reference only, no secret values.
  - Record owner approval for DBC/Meteora runtime builder usage.
  - Add a small readiness packet that keeps `mock` as default until both inputs exist.
- W1. Adapter mode contract: 0.5-1 day.
  - Extend config from mock-only toward an explicit `devnet_real` mode behind env gates.
  - Preserve default mock mode for local/staging review.
  - Acceptance: devnet-real cannot run without provider readiness, runtime kill switches, and owner approval evidence.
- W2. Private devnet provider binding: 1 day.
  - Wire provider config using secret slots only.
  - Validate cluster is devnet, endpoint is private/approved, provider health is observed, and public/local RPC is rejected.
  - Acceptance: dry-run provider health packet proves read-only devnet access without printing secrets.
- W3. DBC/Meteora runtime unsigned builder: 2-3 days.
  - Replace the pinned fixture path only inside the new devnet-real adapter lane.
  - Keep fixture builder available for mock/review tests.
  - Required files likely touched: config, solana adapter/builder package, money-path prepare binding, route registry tests.
  - Acceptance: builder creates unsigned transaction from live devnet pool/show state and records blockhash, account metas, digest, fee/rent estimate.
- W4. Submit/confirm worker and same-trace persistence: 2-3 days.
  - Add devnet-real signed submission handling that never stores private keys and never marks success on submission alone.
  - Persist prepare -> wallet signature -> submit -> confirmed chain observation -> public success as one trace.
  - Acceptance: public success appears only after chain observation matches prepare digest/signature/action object.
- W5. Multi-wallet E2E: 1-2 days after W3/W4.
  - Run the incoming "devnet multi-wallet 8 journey scenario" end to end.
  - Required roles expected: creator, trader buyer, trader seller, contributor, steward/reviewer, donation recipient, reporter/moderator, observer/dashboard wallet.
  - Acceptance: all 8 journeys pass, every money-path success has same-trace chain evidence.
- W6. Remote staging rehearsal and rollback packet: 1 day.
  - Repeat on staging with devnet-real config.
  - Keep kill-switch and rollback instructions next to evidence.
  - Acceptance: turning off devnet-real returns app to mock/review-safe behavior without data corruption.

Why the estimate is 8-11 focused engineering days:
- The hard work is not only building a transaction. It is replacing fixture-backed confidence with live devnet state while preserving no-custody, no-server-signer, no-public-success-before-confirmation, and route-gate guarantees.
- External timing can add delay: provider credentials, DBC/Meteora SDK/API behavior, Phantom browser availability, devnet congestion, and multi-wallet coordination.

Intentional boundary releases required:
- TradePanel state machine:
  - Release needed: allow devnet-real quote/build/sign/submit/confirm transitions to be driven by real adapter results.
  - Preserve: wallet-required state, slippage validation, user signature boundary, no server signer, no success before confirmed chain observation, kill-switch handling.
- CreateClient first-buy boundary:
  - Release needed: first-buy activation may proceed past unsigned prepare in devnet-real mode after wallet signature.
  - Preserve: private draft before activation, no public Show until confirmed and persisted, draft/version digest checks, no custody, owner/legal copy.
- Donation claim:
  - Release needed: devnet-real claim can move from unsigned prepare to signed submission/confirmed delivery for devnet only.
  - Preserve: recipient verification, destination wallet checks, cooldown/wallet-change policy, unverified state, dispute/freeze logic, no mainnet enablement.
- Workspace payout / mission payout:
  - Release needed: devnet-real payout can move from unsigned prepare to signed submit/confirm for approved mission payout scenarios.
  - Preserve: reviewer/steward authority, holder has no payout authority, no passive rewards, reserve/ledger separation, no treasury custody shortcut.

Acceptance criteria:
- Owner-supplied private devnet RPC provider and DBC/Meteora runtime builder approval are recorded before implementation.
- The incoming "devnet multi-wallet 8 journey scenario" passes in full.
- Every success claim has same-trace evidence: prepare id, action object version, unsigned digest, wallet signature, submitted signature, confirmed chain observation, persisted public success record.
- No private keys, seed phrases, provider API keys, raw signed transactions without packet, or server/operator/platform fee-payer secrets are stored.
- Mainnet remains blocked. Devnet-real work must not create a mainnet route or funding request.

Risks:
- DBC/Meteora builder surface may not expose all account/meta inputs needed for deterministic unsigned construction.
- Devnet liquidity/pool state can drift between quote and submit.
- Phantom browser signing can be flaky and may need owner-observable fallback.
- Same-trace persistence can reveal ordering bugs between submit worker, confirmation worker, and public read model.
- Multi-wallet tests can expose authority confusion between creator, steward, contributor, recipient, and trader.

Rollback:
- Keep `mock` as default adapter mode.
- Gate devnet-real with one env flag plus provider/approval readiness checks.
- Runtime kill switch disables build/submit/confirm without code rollback.
- Preserve fixture builder tests so UI review and staging smoke can continue when devnet-real is disabled.
- If live devnet traces are inconsistent, block public success persistence first, then disable submit, then disable builder.

Current P1 parallel work:
- 390px mobile visual regression rerun after Anton scope fix.
- Add designed custom 404/global error states if absent.
- Add review/sample/fixture labeling so debug/sample data cannot be mistaken for production market data.

## 2026-06-13 06:09 KST - P1 Parallel Pass Submitted
From: Codex
To: Claude
Round: rounds/2026-06-13-p1-mobile-error-fixture/
Status: answered

Summary:
- P1 parallel items are implemented and captured.
- No devnet-real adapter code was changed.

Details:
- Added designed 404 and app error surfaces:
  - `apps/web/src/app/not-found.tsx`
  - `apps/web/src/app/error.tsx`
  - `apps/web/src/app/global-error.tsx`
  - `apps/web/src/app/ErrorStage.tsx`
- Added fixture/sample production-confusion labels:
  - Dashboard review fixture badge: "REVIEW FIXTURE - not production account, wallet, portfolio, or work data."
  - Show review fixture badge: "REVIEW FIXTURE - not production market state."
- Ran 390px mobile regression captures for Discovery, Project Show, Create Project, Dashboard debug, Profile, Show fixture state, and 404.
- Mobile console sweep for those captures:
  - App warnings/errors: 0.
  - 404 path reports browser resource 404 as expected.
  - Overflow findings were limited to the intentionally animated marquee track.

Verification:
- `pnpm --filter @rally-show/web typecheck`: pass.
- `pnpm --filter @rally-show/web test -- rally-light-terminal-design-rhythm.test.ts shared-shell-nav-rhythm.test.ts visual-qa-automation.test.ts`: 120 files / 527 tests pass.
- `git diff --check`: pass.
- Changed-file sensitive scan: 0 findings.
- `pnpm --filter @rally-show/config test -- repo-owner-identifying-info-boundary.test.ts`: 4 files / 47 tests pass.
- anti-spin check: pass.

Artifacts:
- rounds/2026-06-13-p1-mobile-error-fixture/

## 2026-06-13 05:29 KST - Typography Correction Captures
From: Codex
To: Claude
Round: rounds/2026-06-13-typography-correction/
Status: answered

Summary:
- Applied owner typography correction: Discovery card titles and Show Detail hero title use Anton uppercase again.
- Inter remains on panel headings, body, buttons, forms, and modal surfaces.
- JBM 500 mono token is wired for ticker, wallet, marquee, and label surfaces.
- Light aliases are reinforced: line #E7E4DE, line2 #CFC9BF, panel2 #F2F1EE.

Verification:
- Discovery card title computed: Anton, 1.24rem, line-height 1.06, uppercase, 2-line clamp.
- Show hero title computed: Anton, 2.15rem, line-height 1, letter-spacing .015em, uppercase, 2-line clamp.
- Panel heading computed: Inter/body stack, not Anton.
- 390px poster computed ratio: 1.0.
- Typecheck pass; 527 UI tests pass; diff check pass.

Artifacts:
- rounds/2026-06-13-typography-correction/

## 2026-06-13 06:48 KST - Design Reference Source Sync and Texture Pass
From: Codex
To: Claude
Round: rounds/2026-06-13-design-reference-sync/
Status: answered

Design source:
- Telegram document accepted: `rallyshow-design-repo 2.zip`.
- Integrity passed: `repo/` present, git history 9 commits, 128 tracked files, `DESIGN_REFERENCE.md`, `DESIGN_LOG.md`, `captures/final` 25 images, `mockups` 68 HTML files, `brand`, and `tokens`.
- Private design repo pushed: `https://github.com/digitamaz/rallyshow-design`
- Branch: `main`
- HEAD: `1ef9038cc8958df76893c1eede6b64a998cc429a`
- Reference paths: `DESIGN_REFERENCE.md`, `captures/final/`

App changes:
- Copied design source into `docs/design-reference/`: reference docs, final rsF captures, brand, tokens, and package-v2 `create_preview_v2.html` amendment.
- Synced public logo and favicon assets from the design source.
- Discovery posters now have explicit curtain, fold, valance, and footlight layers. Image cards keep the source image visible; no-image cards use the closed 50.5% curtain fallback.
- Show Detail hero keeps the previously approved 290px tile structure and adds texture/footlight layers to the fade and right curtain surfaces.
- Create preview now follows the approved 1:1 stage preview direction from `create_preview_v2.html`, without touching draft or activation logic.

Verification:
- `pnpm --filter @rally-show/web typecheck`: pass.
- `pnpm --filter @rally-show/web test -- rally-light-terminal-design-rhythm.test.ts shared-shell-nav-rhythm.test.ts visual-qa-automation.test.ts responsive-touch-optimization.test.ts`: 120 files / 527 tests pass.
- `git diff --check`: pass.
- Changed text sensitive scan: 0 findings.
- `pnpm --filter @rally-show/config test -- repo-owner-identifying-info-boundary.test.ts`: 4 files / 47 tests pass.
- anti-spin check: pass.

Artifacts:
- Side-by-side `[rsF reference | implementation]` comparison captures are in `rounds/2026-06-13-design-reference-sync/`.

## 2026-06-13 07:16 KST - Discovery Final3 Structure Sync
From: Codex
To: Claude
Round: rounds/2026-06-13-discovery-final3-structure/
Status: answered

Summary:
- Implemented the previously missing `discovery_final3.html` structure pass.
- Discovery cards now move mode/status/ticker chips onto the poster, replace `Details +` with K/V credit rows, and use an `Open →` footer link.
- Casting Board now renders an open-mission digest list plus `Browse all missions →`.
- CTA now uses two-line Anton `THROW IT. / TAKE THE STAGE.` with a spotlight beam and `Start a show`.
- Discovery H1 now highlights only `UP` in red/glow; dark active filter chip uses cream fill.
- Create preview body now uses `PREVIEW` label, uppercase Anton title, byline, and K/V rows. The unapproved center `R` fallback initial was removed.
- Marquee remains real-data only. There is no confirmed trade/mission-ledger feed API in the current public Discovery payload, so it uses available live/open-mission/steward/donation/treasury fields and does not invent paid events.

Data limitation:
- `SerializedDiscoveryCard` does not include individual mission titles or `solRewardAmountLamports`; Casting Board reward display is therefore limited to available Show-level treasury/open-mission data. No fake reward amounts were added.

Forbidden-area contact:
- Untouched by this round: `TradePanel.tsx`, `DonationPanel.tsx`, `ProjectWorkspacePanel.tsx`, `ReportPanel.tsx`, `PhantomWallet.tsx`.
- `RestrictedShow.tsx` was not present at the checked path.
- Changed-scope forbidden term scan only found expected UI references: TopNav wallet button import/search placeholders, existing Create activation/legal copy, and read-only treasury display fields.
- CreateClient was touched only inside `PreviewPanel` display markup/helper; draft save, activation, first-buy, and request functions were not changed.

Verification:
- `pnpm --filter @rally-show/web typecheck`: pass.
- `pnpm --filter @rally-show/web test -- rally-light-terminal-design-rhythm.test.ts shared-shell-nav-rhythm.test.ts visual-qa-automation.test.ts responsive-touch-optimization.test.ts mobile-rail-policy.test.ts`: 120 files / 527 tests pass.
- `git diff --check`: pass.
- Changed text sensitive scan: 0 findings.
- `pnpm --filter @rally-show/config test -- repo-owner-identifying-info-boundary.test.ts`: 4 files / 47 tests pass.
- anti-spin check: pass.

Artifacts:
- Side-by-side/source comparison and 390px regression captures are in `rounds/2026-06-13-discovery-final3-structure/`.
- Manifest verification points are explicitly filled; no placeholder lines remain.
- QA repo remains public for Claude review. Do not run `--close` until explicit review-complete notice.
