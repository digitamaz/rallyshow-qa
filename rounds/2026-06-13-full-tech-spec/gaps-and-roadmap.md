# Gaps and Roadmap

Round: `2026-06-13-full-tech-spec`
Basis: code inspection plus latest roadmap status in `docs/technical/OFFICIAL_LAUNCH_DEVELOPMENT_ROADMAP_2026-06-04.md`.

## Current Launch Blockers From Roadmap Snapshot

Latest roadmap sections inspected show blocker count unchanged at seven:

1. `dbc_live_pool_execution_missing`
2. `donation_claim_remote_flow_missing`
3. `legal_ops_release_inputs_missing`
4. `mainnet_execution_approval_missing`
5. `mainnet_program_deploy_preflight_missing`
6. `phantom_browser_signing_smoke_missing`
7. `remote_staging_public_route_e2e_missing`

Current next pointer in the roadmap is owner pre-funding/final approval input after PTP293, but devnet-real adapter work is explicitly blocked by owner/provider decisions in the recent QA track.

## P0: Must Resolve Before Real Mainnet / Public Money Movement

| P0 item | Code-grounded reason | Prerequisite |
| --- | --- | --- |
| Replace mock trade quote with devnet-real DBC quote/build path | `apps/web/src/app/api/trade/quote/route.ts` uses `createMockTradeAdapter`; DBC prepare exists but live DBC same-trace evidence is still a blocker. | Owner approves DBC/Meteora runtime builder path; private devnet RPC provider selected. |
| Prove quote -> wallet signature -> submit -> confirm -> public success same-trace | Pieces exist in `money-path-prepare`, `money-path-signed-submission`, `money-path-submit-confirm-worker`, and `money-path-public-success-persistence`, but launch blocker remains. | Devnet provider env, wallet signing smoke, trace logging, public success evidence. |
| Donation claim remote flow | `donation/claim` prepare route exists; roadmap says remote prepare/sign/submit/confirm/public success is still missing. | Devnet provider, recipient wallet proof, same-trace evidence, idempotency/recovery proof. |
| Mainnet deploy preflight | Core evaluators exist; current checkout lacks frozen `.so`/IDL/checksum artifacts and final program ID/authority/funding approval gates. | Artifact freeze/checksum, authority policy, RPC readiness, owner funding and final go. |
| Legal/ops release inputs | Launch product system keeps `legal_ops_release_inputs_missing`. | Owner supplies/approves support, abuse, moderation, incident, monitoring, rollback, provider ownership, domain/OAuth/legal links. |
| Phantom browser signing smoke | Browser-signing evidence remains a blocker in latest roadmap. | Browser channel with Phantom or owner-observable signing packet. |
| Remote staging public route E2E | Public smoke previously passed, but roadmap blocker remains until remote public route E2E evidence is bound. | Staging DB/provider/env readiness and verified route evidence. |
| Protect against fixture data production confusion | `market-indexing.ts` excludes fixture sources; UI and QA fixtures still need clear labels when used for review. | Production fixture flags/labels and review-safe data discipline. |

## P1: Required For First Public Week Or Before Broader Traffic

| P1 item | Code-grounded reason | Prerequisite |
| --- | --- | --- |
| Full devnet multi-wallet scenario run | Mission/steward/donation/trade flows support multiple roles in DB, but integrated live scenario evidence is not complete. | Devnet provider and test wallets controlled by owner/operator. |
| DEX migration/read model proof | Migration status/read model exists but no executable migration path was found. | DBC graduation/listing rules, indexer, migration observation. |
| Fee distribution and creator allocation trace | Creator allocation reader/claim prep exists, but fee settlement from live trades is not end-to-end. | DBC fee/indexer model, claimable epoch generation, route proof. |
| Project treasury movement trace | System-transfer prepare exists for treasury actions; signed submit/confirm proof not complete. | Devnet provider and test treasury scenarios. |
| Moderation operational playbook | DB/report/restriction logic exists; operational policy inputs and staffing remain owner/legal/ops decisions. | Owner defines policy/process and public wording. |
| Search/profile/dashboard data freshness labels | Read models exist; market index source can be fixture/local/future production. | Production indexer status and freshness display rules. |
| Error-state E2E | Routes have rejection reasons; not all user-facing dead ends have been browser-swept after devnet adapter. | Browser E2E after devnet-real path. |

## P2: Post-Launch Hardening

| P2 item | Reason |
| --- | --- |
| Mainnet-fork/replay harness | Not found as an integrated test harness in current snapshot. |
| Advanced indexer reconciliation | Market index read model anticipates future production indexer; production indexer implementation remains future work. |
| Expanded exports/agent surfaces | Export routes exist but should remain no-store/noindex and restricted until launch policy is finalized. |
| Full DEX migration UX | UI/read model can show states, but graduation/listing execution is missing. |
| Additional auth providers | GitHub/Google config gates exist; provider availability depends on configured credentials. |

## Dead-End Risks

| User journey | Dead-end risk |
| --- | --- |
| Create first-buy | User can reach activation attempt and build route, then specific first-buy signed/submitted/confirmed routes are guarded. |
| Trade buy/sell | User can quote with mock values, but live submit/confirm depends on gated provider and DBC runtime evidence. |
| Donation claim | DB setup/verify/mock allocation can proceed, but live claim delivery is not fully proven. |
| Mission payout | DB lifecycle can mark/review/approve; real payout movement remains guarded/pending. |
| Treasury movement | Prepare route exists; real signed submit/confirm is not proven. |
| DEX migration | No executable migration/listing flow found. |
| Mainnet deploy | Source and preflight gates exist; artifacts/funding/approval/RPC/authority gates block execution. |

## Current “Owner Input Needed” Items

1. Private devnet RPC provider selection for devnet-real adapter work.
2. Approval to use/replace DBC/Meteora runtime builder path.
3. Legal/ops release input decisions.
4. MN001/mainnet execution approval once staging/devnet proof and artifact preflight are complete.
5. Mainnet SOL funding only after recalculated artifact/rent budget and final deploy packet.
6. Program authority ownership policy and buffer recovery policy.
7. Public product/terms copy for “token is attention/participation signal, not ownership/revenue/governance.”

