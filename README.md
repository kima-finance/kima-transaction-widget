# kima-transaction-widget

[![Build & Deploy](https://github.com/kima-finance/kima-transaction-widget/actions/workflows/dev_auto_publish_npm.yml/badge.svg)](https://github.com/kima-finance/kima-transaction-widget/actions/workflows/dev_auto_publish_npm.yml)
[![npm version](https://img.shields.io/npm/v/%40kimafinance/kima-transaction-widget)](https://www.npmjs.com/package/@kimafinance/kima-transaction-widget/)
[![Download NPM](https://img.shields.io/npm/dm/%40kimafinance/kima-transaction-widget.svg?style=flat)](https://www.npmjs.com/package/@kimafinance/kima-transaction-widget/)

## Install

```bash
npm install --save @kimafinance/kima-transaction-widget
yarn add @kimafinance/kima-transaction-widget
```

## Usage

### Payment Scenario

```tsx
import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  FontSizeOptions,
  ModeOptions,
  SupportNetworks,
  ColorModeOptions
} from 'kima-transaction-widget'

const App = () => {
  return (
    <KimaProvider
      kimaBackendUrl='http://localhost:3001' // or your deployed backend instance
      walletConnectProjectId='e579511a495b5c312b572b036e60555a'
      externalProvider={} // in case you want to provide an already connected wallet
    >
      <KimaTransactionWidget
        theme={{
          colorMode: ColorModeOptions.light
        }}
        mode={ModeOptions.payment}
        titleOption={{
          initialTitle: 'New Purchase'
        }}
        paymentTitleOption={{
          title:
            'You can now purchase our NFT on Polygon, using funds from other chains.'
        }}
        compliantOption={false}
        transactionOption={{
          targetChain: SupportNetworks.AVALANCHE,
          targetAddress: '0x67cc400c434F691Ed45e452dC8F2Baf0101a9B63',
          amount: 5,
          currency: 'USDK'
        }}
      />
    </KimaProvider>
  )
}

export default App
```

### Bridge Scenario

```tsx
import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  FontSizeOptions,
  ModeOptions,
  ColorModeOptions
} from 'kima-transaction-widget'

const App = () => {
  return (
    <KimaProvider
      kimaBackendUrl='http://localhost:3001' // or your deployed backend instance
      walletConnectProjectId='e579511a495b5c312b572b036e60555a'
      externalProvider={} // in case you want to provide an already connected wallet
    >
      <KimaTransactionWidget
        theme={{
          colorMode: ColorModeOptions.light,
          fontSize: FontSizeOptions.medium
        }}
        mode={ModeOptions.bridge}
        compliantOption={false}
        excludedSourceNetworks={[SupportNetworks.SOLANA]} // exclude networks that your dapp doesn't support
        excludedTargetNetworks={[SupportNetworks.SOLANA]}
      />
    </KimaProvider>
  )
}

export default App
```

### Status Scenario

```tsx
import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  FontSizeOptions,
  ModeOptions,
  ColorModeOptions
} from 'kima-transaction-widget'

const App = () => {
  return (
    <KimaProvider
      kimaBackendUrl='http://localhost:3001' // or your deployed backend instance
      walletConnectProjectId='e579511a495b5c312b572b036e60555a'
    >
      <KimaTransactionWidget
        theme={{
          colorMode: ColorModeOptions.light,
          fontSize: FontSizeOptions.medium
        }}
        mode={ModeOptions.status}
        txId={10}
      />
    </KimaProvider>
  )
}

export default App
```

## Props

### `theme`

Used to specify theme options of kima-transaction-widget.

- Required: `true`
- Type: `ThemeOptions`
- Example

```tsx
<KimaTransactionWidget
  theme={{
    colorMode: ColorModeOptions.light,
    backgroundColorLight: '#CCCCCC', // background color of widget when light mode
    backgroundColorDark: '#FFDDFF' // background color of widget when dark mode
  }}
/>
```

### `mode`

Used to specify the scenario of kima-transaction-widget. Available modes are payment, bridget and status.

- Required: `true`
- Type: `ModeOptions` Payment and bridge scenario for the purpose of widget, status mode is for tracking status of specific transaction of kima widget. To use status mode, `txId` prop should be determined

```tsx
export declare enum ModeOptions {
  payment = 'payment',
  bridge = 'bridge',
  status = 'status'
}
```

### `txId`

Used to specify transaction index to keep tracking of it's status and progress using kima-transaction-widget. Used for only status mode.

- Required: `false`
- Type: `boolean`
- Default: `-1`

### `titleOption`

Used to specify title of widget. Consists of titles for each step of widget.

- Required: `false`
- Type: `TitleOption`

```tsx
interface TitleOption {
  initialTitle?: string
  confirmTitle?: string
}
```

```tsx
<KimaTransactionWidget
  titleOption={{
    initialTitle: 'New Purchase', // First screen's title
    confirmTitle: 'Confirm Purchase' // Second screen (confirmation step) title
  }}
/>
```

### `compliantOption`

Used to specify usage of compliant check feature. Enable compliance check to prevent interacting with dangerous accounts.

- Required: `false`
- Type: `boolean`
- Default: `false`

### `helpURL`

Used to specify external url for help documentation

- Required: `false`
- Type: `string`

### `transactionOption`

Used to specify payment scenario option.

- Required: `false`
- Type: `TransactionOption`
- Example

```tsx
<KimaTransactionWidget
  transactionOption={{
    targetChain: SupportNetworks.AVALANCHE, // target chain to receive payment
    targetAddress: '0x8222ADB2A2092c3774105a5F558987265D920C09', // target address to receive payment
    amount: 5 // token amount to receive payment
    currency: 'USDK' // token to be used (default as USDK for testnet)
  }}
/>
```

### `paymentTitleOption`

Used to specify payment screen's title.

- Required: `false`
- Type: `PaymentTitleOption`
- Example

```tsx
<KimaTransactionWidget
  paymentTitleOption={{
    title:
      'You can now purchase our NFT on Polygon, using funds from other chains.',
    style: {
      fontSize: '1.2em',
      fontWeight: '500'
    }
  }}
/>
```

## Kima Provider

```tsx
<KimaProvider
  kimaBackendUrl='http://localhost:3001' // or your deployed backend instance
  externalProvider={new Web3Provider()}
  logLevel='debug' // optional, default is 'error'
  walletConnectProjectId='e579511a495b5c312b572b036e60555a'
>
  {/ * etc */}
</KimaProvider>
```

Used to provide the widget with wallet connection and chain switching functionality.

### `kimaBackendUrl`

Used to specify kima transaction backend url.

- Required: `true`
- Type: `string`

### `walletConnectProjectId`

Used to specify the WalletConnect project id. A default value is provided, but you can specify your own. To create a project, visit [Reown Cloud](https://cloud.reown.com/sign-in) and sign up for a free account (WalletConnect is now called Reown).

- Required: `false`
- Type: `string`

### `logLevel` (optional)

For debugging purposes, you can specify the log level. Available levels are  `trace`, `debug`, `info`, `warn`, `error` and `silent`. By default, the log level is set to `error`.

The log level can also be set using the `LOG_LEVEL` environment or the equivalent for your framework: `NEXT_PUBLIC_LOG_LEVEL`, `VITE_LOG_LEVEL`. The Widget property will take precedence over the environment variable as it is set last.

### `externalProvider`

Used to provide an already connected wallet instance from your app. Depending on the network your dapp is currently connected to is the instance that you will need to provide.

```ts
interface ExternalProvider {
  type: 'evm' | 'solana' | 'tron'
  provider: Web3Provider | SolProvider | TronProvider
  signer: JsonRpcSigner | PublicKey | string
}
```

- Required: `false`
- Type: `ExternalProvider`

### Event handlers

- `errorHandler: (e: any) => void`: Callback function to handle errors.
- `closeHandler: (e: any) => void`: Callback function to handle close event.
- `successHandler: (e: any) => void`: Callback function to handle success event after transaction submission to kima transaction backend.

- `switchChainHandler: (chainId: number) => void`: Callback function to handle chain switch event.

- `keplrHandler: (e: any) => void`: Callback function to handle Keplr wallet events.

## Note

[How to fix Polyfill node core module error](https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5)
