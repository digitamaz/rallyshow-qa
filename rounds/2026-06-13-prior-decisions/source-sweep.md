# Source Sweep Notes

Round: `2026-06-13-prior-decisions`

## Source Sets Inspected

| Source set | Sweep method | Result |
| --- | --- | --- |
| `docs/technical/` | `find docs/technical -type f`; targeted `rg` for fee, DBC/DAMM, Token-2022, first-buy, legal ops, RPC, MN001 | 636 files present; key evidence concentrated in protocol/fee packets, migration boundary, launch roadmap, provider/mainnet packets. |
| `docs/` overall | `find docs -type f`; targeted reads where hits were relevant | 946 files present. Product/legal evidence reused only when backed by current app code or technical packets. |
| App/package code | Targeted reads in `apps/web`, `packages/core`, `packages/solana`, `packages/config`, `packages/db` | Current UI copy, mock adapter, protocol read model, launch readiness, provider gates, and auth/region config verified. |
| QA rounds | `find rounds -maxdepth 2 -type f`; targeted reads of `2026-06-13-full-tech-spec` | 87 QA round files present; full-tech-spec open questions/gaps/system inventory used as latest QA baseline. |
| README/AGENTS | Targeted `rg` | No stronger final economic/token decision found than the files cited in `prior-decisions.md`. |

## Search Patterns Used

The targeted scan included these terms and nearby variants:

```text
Rally fee allocation
1.5%
platform allocation
creator/show allocation
first buy
Token-2022
Meteora
DBC
DAMM
restricted
GitHub
Google
MN001
mainnet RPC
legal_ops
meme_show_launchpad
MEME_SHOW_V1
RALLY_SOLANA_RPC
RALLY_SHOW_ADAPTER_MODE
ownership
revenue share
governance
```

The broad search produced thousands of hits, mostly historical PTP packets and tests. The final report cites only sources that were directly relevant to the requested A-E classification.

## Evidence Selection Rules

1. If a value appears in app UI but the protocol packet labels it as target/unvalidated, it is classified as `논의만됨`.
2. If a route or adapter is mock/fixture/guard-only, it is not counted as production implementation.
3. If a current product/legal copy is already in the app and repeated by a decision packet, it can be classified as `결정됨` for copy, even if legal/ops release approval remains separate.
4. If code has configuration support but owner/external values are still missing, it is classified as `논의만됨` or `미정` depending on whether a target direction exists.
5. Test-only fixture values are not treated as product decisions.

## Key Files Read Directly

| File | Why it mattered |
| --- | --- |
| `apps/web/src/app/terms/page.tsx` | Current fee rows, wallet boundary, token-rights copy, Donation Meme legal copy. |
| `docs/technical/TV_001_005_PROTOCOL_FEE_ROUTING_CUSTODY_DECISION_PACKET_2026-05-27.md` | Fee/custody decision packet and target split. |
| `docs/technical/PRODUCTION_IMPLEMENTATION_PLAN_003E_migration_lifecycle_boundary.md` | DBC-to-DAMM lifecycle, migration states, post-migration boundaries. |
| `docs/technical/OFFICIAL_LAUNCH_DEVELOPMENT_ROADMAP_2026-06-04.md` | Latest launch blockers, legal/ops status, mainnet predeploy status. |
| `packages/core/src/launch-product-system.ts` | V1 launch system keys and market lifecycle requirements. |
| `packages/core/src/protocol.ts` | Protocol read model, fee buckets, blocker flags, fixture/economics boundary. |
| `packages/core/src/trade.ts` | Market state, route kind, migration behavior, quote fee display contract. |
| `packages/core/src/mainnet-deployment-preflight.ts` | Mainnet deploy budget constants and authority roles. |
| `packages/core/src/mainnet-deploy-preflight-hardening.ts` | Authority/RPC hardening requirements and blockers. |
| `packages/solana/src/index.ts` | Mock create/trade/activation adapters. |
| `packages/solana/src/meteora-dbc-minimal-idl.ts` | DBC minimal instruction metadata and Token-2022/SPL reference, plus non-executable scope. |
| `packages/config/src/index.ts` | Adapter mode, provider env slot names, provider blockers, auth config read. |
| `apps/web/src/lib/auth/options.ts` | Optional Google/GitHub provider construction and token persistence stripping. |
| `apps/web/src/app/api/account/session/route.ts` | Account provider availability reporting. |
| `apps/web/src/lib/date-format.ts` | Restricted-country env support. |
| `packages/db/src/schema.ts` | Migration status enum. |
| `rounds/2026-06-13-full-tech-spec/open-questions.md` | Latest open decisions. |
| `rounds/2026-06-13-full-tech-spec/system-inventory.md` | Mock/devnet/mainnet implementation status. |
| `rounds/2026-06-13-full-tech-spec/gaps-and-roadmap.md` | Latest P0/P1/P2 blockers and owner inputs. |
| `rounds/2026-06-13-full-tech-spec/wbs.md` | Devnet-real adapter prerequisites and WBS baseline. |

## No-Value Disclosure Note

The report intentionally avoids copying any actual private URLs, tokens, wallet addresses, provider credentials, or local private paths. Where the source file contains such concepts as env slot names or public program roles, only names/categories are reported.
