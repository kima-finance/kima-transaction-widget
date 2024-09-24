import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  FontSizeOptions,
  ModeOptions,
  ColorModeOptions,
  NetworkOptions,
  SupportNetworks,
  DAppOptions
  // DAppOptions
} from 'kima-transaction-widget'
import 'kima-transaction-widget/dist/index.css'

const App = () => {
  return (
    <KimaProvider
      walletConnectProjectId='e579511a495b5c312b572b036e60555a'
      networkOption={NetworkOptions.testnet}
    >
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
            // mode={ModeOptions.status}
            // txId={2}
            mode={ModeOptions.payment}
            networkOption={NetworkOptions.testnet}
            dAppOption={DAppOptions.LPAdd}
            kimaBackendUrl='http://localhost:3001'
            kimaNodeProviderQuery='https://api-testnet.kima.finance'
            kimaExplorer='https://explorer-testnet.kima.finance'
            feeURL='https://fee.kima.finance'
            kimaGraphqlProviderQuery='https://graphql-testnet.kima.finance/v1/graphql'
            // autoSwitchChain={false}
            // useFIAT={true}
            // titleOption={{
            //   initialTitle: 'New Purchase'
            // }}
            // paymentTitleOption={{
            //   title:
            //     'You can now purchase our NFT on Polygon, using funds from other chains.',
            //   style: {
            //     fontSize: '1.2em',
            //     fontWeight: '500'
            //   }
            // }}
            transactionOption={{
              targetChain: SupportNetworks.POLYGON,
              targetAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
              amount: 5,
              currency: 'USDK'
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
