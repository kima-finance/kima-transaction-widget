# Release Log

## 1.5.7

### Overview

- Fix: wrong decimals number used in amountOut for swap transaction

## v1.5.6

### Overview

- New: Support for USD1 (only as a target token) on Ethereum and Solana

### Added

- New chain token icon for USD1.

## v1.5.5

### Overview

- New: Bank transfers (FIAT rails) fully supported and unified with Credit Card handling.
- New: On-chain Swap flow (end-to-end) via new submit endpoint.
- Stricter FIAT contract: FIAT flows now require a transactionIdSeed (UUIDv4) and a derived transactionIdSignature.
- Naming change: fee/options naming aligned to camelCase (payment_method → paymentMethod).
- Stability fixes across Solana RPC usage and payload validation.
- Internals: large feature-based refactor (no route renames, but code layout changed).

### Added

- Swap UI & flow wired to backend/API.
- Optional Solana RPC override: pass a custom RPC to stabilize public RPC behavior.

```typescript
<KimaProvider
  projectId="YOUR_WC_ID"
  kimaBackendUrl="https://your-backend"
  solRPC="https://your-solana-rpc.example" // NEW (optional)
>
  <App/>
</KimaProvider>
```

### Changed

- Internals migrated to feature-based structure; public props preserved.
- Build artifacts cleanup (dist/ no longer tracked).

### Breaking

- None in public props (aside from 1.4 removals—see v1.4.x below).
- Expects backend on 1.5.x contract (FIAT options, swap submit).

### Upgrade checklist

- npm i @kimafinance/kima-transaction-widget@^1.5.5
- (If needed) provide solRPC.
- No additional envs/props required.

## 1.4.x

### Overview

- Credit cards introduced as an origin network (on-ramp).
- Mandatory message signing of transaction details (light-mode approvals).
- Fee estimator required before submit; returns a feeId to forward to /submit.

### Added

- Frontend required for Credit Card flows (KYC + 3rd-party widgets).

### Changed

- Removed props: excludedSourceNetworks, excludedTargetNetworks.
- Network filtering moved server-side via backend KIMA_CHAIN_FILTER.

### Breaking

- Must integrate the widget for CC flows; pure-backend CC handling isn’t supported.

### Upgrade checklist

- npm i @kimafinance/kima-transaction-widget@^1.4.0
- Remove deprecated exclude props (use backend filtering).
