# Devnet-Real Adapter WBS

Round: `2026-06-13-full-tech-spec`
Purpose: planning baseline only. No app code changed in this round.

## Current Artifact Status

| Artifact | Current status |
| --- | --- |
| Anchor program source | Present: `programs/project-show-devnet/src/lib.rs`, `programs/donation-meme-devnet/src/lib.rs`. |
| Anchor devnet program entries | Present in `Anchor.toml`; exact IDs intentionally not copied into QA docs. |
| `.so` build artifacts | Not found in current checkout under `target` with the inspected command. |
| IDL JSON artifacts | Not found in current checkout under `target` with the inspected command. |
| Checksums/freeze manifest | Not found as current frozen artifact set in checkout. |
| DBC minimal IDL/fixtures | Present in `packages/solana/src/meteora-dbc-minimal-idl.ts` and related DBC files. |
| System transfer unsigned builder | Present: `packages/solana/src/unsigned-builders.ts:buildSystemTransferUnsignedTransaction`. |
| DBC fixture unsigned builder | Present: `packages/solana/src/unsigned-builders.ts:buildMeteoraDbcFixtureUnsignedTransaction`. |
| DBC swap2 no-submit builder | Present: `packages/solana/src/meteora-dbc-swap2-unsigned-message.ts`; guarded in `runtime-builder-binding.ts`. |

## Blocked Before Code Changes

Recent QA direction says devnet-real adapter code changes are blocked until owner provides:

1. Private devnet RPC provider selection.
2. Approval to proceed with DBC/Meteora runtime builder use/replacement.

## W0-W8 Work Breakdown

| Phase | Work | Estimate | Acceptance |
| --- | --- | --- | --- |
| W0: Provider and gate confirmation | Confirm private devnet RPC provider, non-public endpoint policy, healthcheck token, worker kill-switch env plan. | 0.5-1 day after owner decision | `provider-no-send-dry-run` can pass without exposing secrets; config validators remain no-secret. |
| W1: Artifact baseline | Build Anchor programs in clean workspace, generate IDLs, compute checksums, record artifact provenance without pushing secrets. | 1 day | `.so`/IDL/checksum manifest exists; sensitive scan passes. |
| W2: DBC runtime builder contract | Replace or wrap pinned fixture builder for first-buy/buy/sell with approved runtime builder, preserving route contract and state digest checks. | 2-4 days | prepare route creates unsigned message from live devnet inputs; no submit from prepare route. |
| W3: Signed payload intake | Keep external wallet signature boundary; verify message digest, signer set, proof session, server digest, idempotency. | 1-2 days | invalid signature/payload/digest cases fail deterministically. |
| W4: Submit-confirm worker | Bind private devnet RPC provider, submit signed payload, poll confirmation, record submission/confirmation rows. | 2 days | confirmed/failed/pending/unknown outcomes recorded in `moneyPathPrepares` and ledger. |
| W5: Public success persistence | Persist public success only after confirmed chain observation; attach same-trace prepare ID and signature. | 1 day | public UI/read model updates only after confirmed record. |
| W6: Project system-transfer paths | Apply W3-W5 to mission payout, donation claim, creator allocation claim, and treasury movement using system-transfer builder. | 3-5 days | each path has prepare/sign/submit/confirm/persist trace on devnet. |
| W7: Multi-wallet scenario suite | Run eight devnet journeys with separate creator/trader/contributor/steward/recipient roles. | 2-4 days | all scenarios pass with same-trace evidence and recovery/idempotency cases. |
| W8: Launch bridge and rollback | Update roadmap evidence, blocked/recovery packets, rollback docs, and QA round with traces. | 1-2 days | Claude can verify raw traces; no app code considered complete without QA proof. |

## Intentional Boundary Touches Required Later

| Boundary | Why it must be touched | Preserve |
| --- | --- | --- |
| TradePanel state machine | To drive real quote/build/sign/submit statuses instead of mock-only states. | User never sees false success before confirmed/persisted chain record. |
| CreateClient first-buy boundary | To bind activation attempt to real unsigned message and later confirmed activation. | Draft identity lock, wallet proof, and no direct custody. |
| Donation claim | To replace mock/local allocation closure with signed system-transfer evidence. | Recipient verification, dispute/freeze logic, no retroactive reroute. |
| Workspace payout | To execute mission payout via external wallet signature and chain confirmation. | Review/dispute/steward approval gates and treasury ledger integrity. |
| Money-path submit-confirm worker | To submit to provider and record chain status. | Provider secrets never returned or browser-exposed; mainnet remains blocked. |

## Devnet Multi-Wallet Acceptance Target

The next executable adapter phase should pass these journeys:

1. Creator creates Project Show with first-buy activation.
2. External trader buys and sells.
3. Project steward is added and exercises allowed authority.
4. Contributor claims a mission and submits work.
5. Reviewer accepts work and creates pending payout.
6. Payout is signed, submitted, confirmed, and publicly persisted.
7. Donation recipient verifies, claim is signed/submitted/confirmed/persisted.
8. Failure/recovery: wallet rejection, expired prepare, stale server digest, provider pending/unknown, retry idempotency.

## Rollback and Safety Plan

1. Keep runtime kill switches required by `packages/config/src/index.ts`.
2. Keep prepare routes unable to submit or request signatures directly.
3. Keep signed transaction payload storage disabled unless explicitly approved.
4. Keep public success persistence blocked until confirmed chain observation.
5. Keep mainnet blocked by MN001/mainnet approval and provider config validators.
6. If devnet adapter fails, revert route env flags to closed state and preserve DB prepare rows for recovery diagnostics.

