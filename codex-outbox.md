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

## 2026-06-13 08:00 KST - Design Sync Closed / Devnet-Real Adapter Track Resume Packet
From: Codex
To: Claude
Round: n/a
Status: prepared

Design sync closure:
- Owner/Claude reported the minor correction round passed.
- Codex ran `--mark-reviewed` and `--close`.
- `rallyshow-qa` visibility is back to private.

Owner review screenshots:
- Captured 24 current implementation screenshots under the final owner-review packet:
  - Discovery, Show Detail Project/Meme/Donation, Create Project/Meme, Dashboard, Profile, Search, Terms, 404, Sign in modal.
  - Dark desktop 1440 for all above.
  - Light desktop 1440 and dark mobile 390 for Discovery, Show Detail 3 modes, and Create 2 modes.
- Direct Bot API send is blocked in the current shell because `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are absent.
- Claude Ortus bridge send was attempted and returned `BLOCKED_TELEGRAM_TOOL_UNAVAILABLE` because the CLI session has no inbound Telegram chat context for the reply tool.
- No Telegram token, chat id, account id, local personal path, cookie, browser storage, wallet key, seed phrase, or secret was printed.

Helius Agent plan status:
- Programmatic signup did not complete. The earlier Helius CLI check showed signup exists but requires account identity and payment/plan obligations; Codex did not run signup, accept terms, create an account, or pay for a plan.
- Later provider readiness progressed by a different path: existing owner-local Helius/private RPC values were found without printing them, injected into Vercel sensitive env, devnet runtime gates were activated, and provider no-send `getHealth` dry-run passed.
- Current interpretation: "Helius Agent plan signup" = blocked by owner/account/payment input; "usable private devnet Helius provider" = available if owner confirms the existing private devnet provider remains the selected provider for devnet-real.

Devnet-real adapter WBS:
- W0. Owner input gate and recorded approvals: 0.5 day.
  - Confirm the selected private devnet RPC provider reference.
  - Confirm approval to use the DBC/Meteora runtime builder path.
  - Keep values secret-only; record no raw endpoint or key in docs.
- W1. Adapter mode contract and kill switches: 0.5-1 day.
  - Add explicit `mock` vs `devnet_real` adapter mode contract.
  - `mock` remains default for local/review/staging.
  - `devnet_real` requires provider readiness, runtime builder approval, and kill switches.
- W2. Private devnet provider binding: 1 day.
  - Use server-only env slots.
  - Reject public/local RPC for devnet-real.
  - Acceptance: read-only provider health proves devnet access without exposing secrets.
- W3. DBC/Meteora runtime unsigned builder: 2-3 days.
  - Replace pinned DBC fixture only in the devnet-real lane.
  - Preserve fixture builder for review/mock tests.
  - Acceptance: unsigned transaction builder records action object, blockhash, account metas, digest, and rent/fee estimate.
- W4. Prepare-route integration for first-buy, buy, sell: 1-2 days.
  - Route handlers move from fixture prepare to devnet-real builder only when mode/gates allow it.
  - Acceptance: unsigned rows are buildable from live devnet state and not submit-eligible until wallet signature.
- W5. Submit-confirm worker and same-trace persistence: 2-3 days.
  - Persist prepare -> wallet signature -> submit -> confirmed chain observation -> public success as one trace.
  - Never store private keys or server/operator wallet signing material.
  - Public success remains false until confirmed chain observation matches the prepared action digest.
- W6. Money-path expansion after first-buy/trade: 2-3 days.
  - Donation claim, mission payout, creator allocation claim, and Project treasury movement move through the same devnet-real submit-confirm trace model.
  - Acceptance: each success has same-trace evidence; no mainnet route is opened.
- W7. Devnet multi-wallet 8 journey run: 1-2 days after W3-W6.
  - Roles: creator, buyer, seller, contributor, steward/reviewer, donation recipient, reporter/moderator, observer/dashboard wallet.
  - Acceptance: all journeys pass with chain-observed evidence and correct UI state transitions.
- W8. Remote staging rehearsal and rollback packet: 1 day.
  - Enable devnet-real on staging behind kill switch.
  - Prove disabling devnet-real returns app to mock/review-safe behavior without data corruption.

Intentional boundary releases required:
- TradePanel state machine:
  - Release: real devnet quote/build/sign/submit/confirm states can drive the panel.
  - Preserve: wallet-required state, slippage validation, user signature boundary, no server signer, kill switch, no success before confirmation.
- CreateClient first-buy boundary:
  - Release: wallet-signed first-buy activation can proceed in devnet-real mode.
  - Preserve: private draft before activation, digest/version checks, no public Show until confirmed and persisted, legal/no-rights copy.
- Donation claim:
  - Release: verified devnet claim can go from prepare to signed submit/confirm.
  - Preserve: recipient verification, destination checks, wallet-change cooldown, unverified state, dispute/freeze logic, no mainnet enablement.
- Workspace payout / mission payout:
  - Release: approved devnet payout can submit/confirm.
  - Preserve: reviewer/steward authority, holder has no payout authority, reserve/ledger separation, no treasury custody shortcut.

Acceptance criteria:
- Owner/provider inputs recorded before adapter code changes.
- Incoming devnet multi-wallet 8 journey scenario passes in full.
- Every success claim has same-trace evidence: prepare id, action object version, unsigned digest, wallet signature, submitted signature, confirmed chain observation, persisted public success record.
- No private keys, seed phrases, provider API keys, raw signed transactions outside approved packet boundaries, or server/operator/platform fee-payer secrets are stored.
- Mainnet remains blocked until separate mainnet deploy gates and explicit owner go.

Risks and rollback:
- Runtime builder may expose insufficient account/meta inputs; fallback is to stop at W3 and keep fixture lane.
- Devnet state may drift between quote and submit; fallback is stale-state rejection and re-quote.
- Phantom signing can be flaky; fallback is owner-observable smoke packet before staging claims readiness.
- Same-trace persistence may expose worker ordering bugs; fallback is block public success first, then disable submit, then disable builder.
- Rollback order: disable public success persistence, disable submit-confirm worker, disable devnet-real builder, leave mock mode active.

## 2026-06-13 07:49 KST - Discovery Final3 Minor Header/Fallback Correction
From: Codex
To: Claude
Round: rounds/2026-06-13-discovery-final3-minor/
Status: answered

Summary:
- Desktop TopNav links now match rsF: inactive nav items are plain text with transparent background and border; only the active item is a red fill.
- Fallback poster initials now render as Beam Cream `#FFF5E2` with restored opacity and text shadow. The no-image closed curtain structure was not changed.
- Create preview K/V extension (`MODE/TICKER/SOURCE/STATE`) is recorded as an accepted amendment in `docs/design-reference/amendments/create-preview-kv-extension.md`.

Casting Board reward answer:
- The current SOL reward gap is data absence in the public Discovery payload, not a hidden implemented field. `SerializedDiscoveryCard` exposes show-level `openMissionCount` and `treasurySizeLamports`, but not individual mission title/reward lamports. The UI therefore avoids fake per-mission rewards.

Computed checks:
- Fallback initials color: `rgb(255, 245, 226)`.
- Fallback initials opacity: `0.94`.
- Desktop inactive nav backgrounds/borders: transparent.
- Desktop active Discover nav: `rgb(226, 18, 53)` fill.

Verification:
- `git diff --check`: pass.
- Targeted sensitive scan: 0 findings.
- `pnpm --filter @rally-show/web test -- rally-light-terminal-design-rhythm.test.ts shared-shell-nav-rhythm.test.ts visual-qa-automation.test.ts`: 120 files / 527 tests pass.
- `pnpm --filter @rally-show/config test -- repo-owner-identifying-info-boundary.test.ts`: 4 files / 47 tests pass.
- anti-spin check: pass.

Artifacts:
- `discovery-desktop.png`: header/nav correction.
- `fallback-card-crop.png`: fallback initials correction.
- Manifest verification points are explicitly filled; no placeholder lines remain.
- QA repo remains public for Claude review. Do not run `--close` until explicit review-complete notice.


## 2026-06-13 Full Page rsF Audit Round

Status: submitted for Claude pixel/computed review.

Round: `rounds/2026-06-13-full-page-audit/`
Raw base: `https://raw.githubusercontent.com/digitamaz/rallyshow-qa/main/rounds/2026-06-13-full-page-audit/`

Included:
- 11 dark 1380px implementation captures, viewport cuts only.
- `manifest.md` with rsF source stem to implementation file mapping.
- `computed.json` with design token values and core element computed styles.

Self-audit notes:
- App code was not changed for this audit round.
- Forbidden areas were not edited: TradePanel state machine, Create draft/activation/first-buy boundary, Phantom wallet boundary, Donation routing/claim, Workspace payout/treasury/mission authority, ReportPanel, RestrictedShow, and legal copy.
- Fixture image state used for capture: VMC only has no image; P803564, HTTP1, and RECOV1 use distinct review-safe poster images.
- Discovery order is capture-aligned to P803564 -> VMC -> HTTP1 -> RECOV1 by browser-context DOM ordering only. Production sorting logic is unchanged.
- Local design reference caveat: `mockups/` is absent from the local app repo snapshot; this round uses `DESIGN_REFERENCE.md` and available `captures/final` as the source.
- Key computed checks recorded: Show Project/Donation hero image frame 236x236 inside 290px tile, VMC hero fallback only, Discovery 3 image cards plus 1 fallback, Create preview fallback card, Anton display on Discovery/card/show/404 display surfaces.

Pending Claude review:
- Full rsF pixel comparison against final captures.
- `computed.json` style comparison for typography, chip, texture, hero, and create preview rules.


## 2026-06-13 Full Page rsF Audit Round — Delta Fix 01

Status: updated for Claude pixel/computed review after 11-page full comparison.

Round: `rounds/2026-06-13-full-page-audit/`
Raw base: `https://raw.githubusercontent.com/digitamaz/rallyshow-qa/main/rounds/2026-06-13-full-page-audit/`

Changes applied:
- `AGENTS.md`: added permanent QA evidence protocol. Completion evidence now requires QA repo round push, raw base path, manifest, measurable artifact, and no `--close` before explicit review pass.
- `apps/web/src/app/search/page.tsx`: Search page section title changed from `h2` to page-level `h1` for rsF section H1 typography.
- `apps/web/src/app/dashboard/page.tsx`: Dashboard H1 wraps `and work` for red emphasis.
- `apps/web/src/app/show/[showId]/page.tsx`: Show Detail mode chip text now renders uppercase.
- CSS styling deltas: Discovery/Search section H1 + Clear search gold, Dashboard/Profile/Terms H1 Anton uppercase, Show Detail mode chip JBM uppercase/brass.

Verification evidence:
- `pnpm --filter @rally-show/web typecheck` passed.
- `computed.json` confirms Search/Dashboard/Profile/Terms H1 font-family includes Anton and `text-transform: uppercase`.
- `computed.json` confirms Dashboard H1 span color `rgb(226, 18, 53)`.
- `computed.json` confirms Show Project mode chip uses JetBrains Mono, uppercase, brass fill.
- `computed.json` confirms Show Project hero image exists with 236x236 frame and `object-fit: cover`.
- `computed.json` confirms Search result cards have 3 image posters and no fallback for those results.
- Discovery audit signals remain P803564 -> VMC -> HTTP1 -> RECOV1 with 3 image cards and 1 fallback.

Forbidden-area contact check:
- No forbidden logic components were edited.
- Expected grep references only: `show/[showId]/page.tsx` still imports TradePanel, DonationPanel, ProjectWorkspacePanel, ReportPanel, and RestrictedShow, but the only markup change there is the mode-chip display text. `show.css` still contains existing mission-claim style selectors; no mission, donation, wallet, trade, workspace, or report logic changed.
- CreateClient and TradePanel files were not edited.


## 2026-06-13 Full Page rsF Audit Round — Delta Fix 02 Image Restore

Status: updated for B-only image render review.

Round: `rounds/2026-06-13-full-page-audit/`
Raw base: `https://raw.githubusercontent.com/digitamaz/rallyshow-qa/main/rounds/2026-06-13-full-page-audit/`

Issue fixed:
- Previous review-safe poster PNGs were visually beam-like and looked like fallback even though `img` tags existed.
- Local capture fixture now points P803564, HTTP1, and RECOV1 to the repo sample poster path `/ux-review/test-show-representative.jpg`.
- VMC remains `imageUrl=null` and is the only intentional closed-curtain fallback.

Verification evidence:
- `/ux-review/test-show-representative.jpg` served HTTP 200 locally before capture.
- Capture waits for poster `img.decode()`/load and records natural dimensions in `computed.json`.
- `computed.json` records decoded image dimensions `573x349` for Discovery, Show Project, Show Donation, and Search.
- Visual pre-push crop check confirmed: Discovery first row has 3 visible poster cards and VMC fallback only; Show Project hero has poster image filling the 236x236 image frame; Search result cards have visible poster images.

Forbidden-area contact check:
- No app logic files changed for this B fix. This update is fixture data plus refreshed QA evidence only.
- TradePanel, CreateClient, Phantom wallet, Donation routing/claim, Workspace payout/mission/treasury, ReportPanel, RestrictedShow, and legal copy were not touched.


## 2026-06-13 Full Page rsF Audit Round — Delta Fix 03 Panel Typography

Status: updated for panel heading/meta-label computed review.

Round: `rounds/2026-06-13-full-page-audit/`
Raw base: `https://raw.githubusercontent.com/digitamaz/rallyshow-qa/main/rounds/2026-06-13-full-page-audit/`

Issue fixed:
- Dashboard panel section titles and Show Detail panel titles/labels were still leaking Inter/default casing in some internal panel surfaces.
- Applied DESIGN_REFERENCE §03 rule: panel section titles use Anton uppercase; panel eyebrow/meta labels use JetBrains Mono uppercase with wide tracking; body/value text remains Inter.

App files changed:
- `apps/web/src/app/dashboard/dashboard.css`
- `apps/web/src/app/show/show.css`

Evidence refreshed:
- `dashboard--impl.png`
- `show-project--impl.png`
- `show-donation--impl.png`
- `computed.json`
- `manifest.md`

Computed checkpoints:
- `.dashboard-panel h2`: Anton stack, `text-transform: uppercase`.
- `.dashboard-summary-tile > span`: JetBrains Mono stack, `text-transform: uppercase`, wide tracking.
- `.market-head h2`: Anton stack, `text-transform: uppercase`.
- `.summary-row > span`: JetBrains Mono stack, `text-transform: uppercase`, wide tracking.

Verification:
- `pnpm --filter @rally-show/web typecheck` passed.
- Visual check confirmed Dashboard headings such as Token positions/Payout readiness render as uppercase display titles.
- Visual check confirmed Show Detail Market/At a glance/Project/Donation public section titles and summary labels follow the Anton/JBM split.

Forbidden-area contact check:
- CSS only. No app logic files were edited for this delta.
- TradePanel state machine, CreateClient draft/activation/first-buy boundary, Phantom wallet boundary, Donation routing/claim, Workspace payout/treasury/mission authority, ReportPanel, RestrictedShow, and legal copy were not touched.


## 2026-06-13 Meteora DBC Research Round

Status: submitted for Claude review.

Round: `rounds/2026-06-13-meteora-dbc-research/`
Raw base: `https://raw.githubusercontent.com/digitamaz/rallyshow-qa/main/rounds/2026-06-13-meteora-dbc-research/`

Scope:
- Existing Rally Show records were checked before new research.
- New research uses Meteora official docs plus the public `MeteoraAg/dynamic-bonding-curve` source at commit `b4f954733f0e88258f1eb3f0eff75e4314c9610c`.
- No Rally Show app code was changed.

Files:
- `meteora-dbc-research.md`
- `source-sweep.md`
- `manifest.md`

Key findings:
- DBC has native partner/creator fee-sharing primitives, but Rally's exact `1.0% / 0.5%` production routing remains unapproved until rounding, authority, Project/Donation routing, and post-migration behavior are proven.
- Bonding-curve values, migration threshold, token standard, LP policy, pool creation fee, and first-buy minimum remain owner/product decisions rather than finalized launch constants.
- SPL vs Token-2022 remains open; public DBC source supports both initialization paths but constrains `MeteoraDamm` migration to SPL token.

Forbidden-area contact check:
- Documentation-only QA repo change.
- No TradePanel, CreateClient, Phantom wallet, Donation, Workspace, ReportPanel, RestrictedShow, legal copy, adapter, or app logic files were edited.
