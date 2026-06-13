# Open Questions

Round: `2026-06-13-full-tech-spec`
Purpose: decisions Codex should not invent.

## Owner / Product Decisions

1. Which private devnet RPC provider should be used for devnet-real adapter work?
2. Is Codex approved to replace or wrap the pinned DBC fixture builder with the Meteora/DBC runtime builder path?
3. What exact launch promise should be used for Project Show tokens: attention/participation signal only, with no ownership/revenue/governance?
4. Should Meme Show remain visible in V1, or should Project Show be primary while Meme stays as compatible route/type?
5. What legal/ops links and support/moderation/abuse contacts are owner-approved for release?
6. Which regions/geographies are explicitly restricted at launch?
7. Are GitHub and Google login providers intended for launch, or should wallet proof remain primary with OAuth optional?

## Protocol / Market Decisions

1. Final DEX/DBC graduation rule: what on-chain condition marks a Show as migrated/listed?
2. Final platform fee schedule and allocation targets.
3. Creator allocation epoch cadence and claimable amount formula.
4. Whether project treasury movements should be direct system transfers, program-mediated vault transfers, or staged behind the devnet project program.
5. Token standard and authority policy for actual mint/metadata: Token-2022 vs SPL token, update authority, freeze authority, metadata authority.
6. Program upgrade authority holder and multisig/operational policy.

## Mainnet / Operations Decisions

1. MN001 approval definition: who signs off, what evidence is required, and where it is recorded.
2. Mainnet RPC provider and failover policy.
3. Mainnet deployer funding amount after immediate artifact/rent recalculation.
4. Whether IDL publication is required before public launch.
5. Buffer recovery runbook and authority key custody policy.
6. Incident pause controls: who can pause routes, how owner/operator confirms recovery.

## Testing Decisions

1. Which wallets/roles are available for the devnet multi-wallet eight-journey suite?
2. Whether owner will provide Phantom browser interaction for signing smoke if automation remains blocked.
3. What constitutes acceptable same-trace evidence for Claude review: raw DB rows, sanitized trace JSON, screenshots, or all of these.
4. Should fake/review-safe images remain in fixtures for UI QA, or should all non-real images be labeled visibly?

## Not Safe To Assume

1. That mock quote output equals live bonding curve economics.
2. That local/devnet program source means mainnet deploy readiness.
3. That a route returning an unsigned message means the app can move funds.
4. That public UI persistence can be marked before confirmed chain observation.
5. That legal/ops release can be inferred from existing competitor behavior.

