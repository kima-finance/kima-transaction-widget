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
import 'kima-transaction-widget/dist/index.css'

const App = () => {
  return (
    <KimaProvider>
      <div
        style={{
          margin: '0 5vw'
        }}
      >
        <div className='container'>
          <KimaTransactionWidget
            theme={{
              colorMode: ColorModeOptions.light,
              fontSize: FontSizeOptions.medium
            }}
            mode={ModeOptions.payment}
            kimaBackendUrl='https://trasnaction_backend.kima.finance'
            kimaNodeProviderQuery='https://api_staging_testnet.kima.finance'
            titleOption={{
              initialTitle: 'New Purchase'
            }}
            paymentTitleOption={{
              title:
                'You can now purchase our NFT on Polygon, using funds from other chains.',
              style: {
                fontSize: '1.2em',
                fontWeight: '500',
                color: '#DDDDDD'
              }
            }}
            compliantOption={false}
            transactionOption={{
              targetChain: SupportNetworks.AVALANCHE,
              targetAddress: '0x67cc400c434F691Ed45e452dC8F2Baf0101a9B63',
              amount: 5
            }}
            errorHandler={(e: any) => {
              console.log('error:', e)
            }}
            successHandler={() => {
              console.log('success')
            }}
            closeHandler={() => {
              console.log('closed')
            }}
          />
        </div>
      </div>
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
import 'kima-transaction-widget/dist/index.css'

const App = () => {
  return (
    <KimaProvider>
      <div
        style={{
          margin: '0 5vw'
        }}
      >
        <div className='container'>
          <KimaTransactionWidget
            theme={{
              colorMode: ColorModeOptions.light,
              fontSize: FontSizeOptions.medium
            }}
            mode={ModeOptions.bridge}
            kimaBackendUrl='https://trasnaction_backend.kima.finance'
            kimaNodeProviderQuery='https://api_staging_testnet.kima.finance'
            compliantOption={false}
            errorHandler={(e: any) => {
              console.log('error:', e)
            }}
            successHandler={() => {
              console.log('success')
            }}
            closeHandler={() => {
              console.log('closed')
            }}
          />
        </div>
      </div>
    </KimaProvider>
  )
}

export default App
```

## Props

| Prop Name                          | Type               | Description                                      | Values              | Default Value |
| ---------------------------------- | ------------------ | ------------------------------------------------ | ------------------- | ------------- |
| theme `(required)`                 | ThemeOptions       | colorMode, fontSize, fontFamily, backgroundColor |                     |               |
| mode `(required)`                  | ModeOptions        | scenario of the widget                           | `payment`, `bridge` |               |
| transactionOption `(optional)`     | TransactionOption  | target chain, address and currency               |                     |               |
| titleOption `(optional)`           | TitleOption        | titles of widget for every steps                 |                     |               |
| kimaBackendUrl `(required)`        | string             | backend url of widget                            |                     |               |
| kimaNodeProviderQuery `(required)` | string             | REST API endpoint of KIMA blockchain             |                     |               |
| paymentTitleOption `(optional)`    | PaymentTitleOption | customize title of payment scenario              |                     |               |
| comliantOption `(optional)`        | boolean            | compliant address checking                       |                     | `true`        |
| closeHandler `(optional)`          | Function           | callback function to handle close event          |                     |               |
| successHandler `(optional)`        | Function           | callback function to handle success event        |                     |               |
| errorHandler `(optional)`          | Function           | callback function to handle errors               |                     |               |

## Note

[How to fix Polyfill node core module error](https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5)
