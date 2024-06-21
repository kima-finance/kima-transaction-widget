import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  FontSizeOptions,
  ModeOptions,
  ColorModeOptions
  // DAppOptions,
  // SupportNetworks
} from 'kima-transaction-widget'
import 'kima-transaction-widget/dist/index.css'

const App = () => {
  return (
    <KimaProvider walletConnectProjectId='e579511a495b5c312b572b036e60555a'>
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
            // dAppOption={DAppOptions.LPAdd}
            kimaBackendUrl='http://localhost:3001'
            kimaNodeProviderQuery='https://api-staging.kima.finance'
            // autoSwitchChain={false}
            // defaultToken={'USDK'}
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
            // transactionOption={{
            //   targetChain: SupportNetworks.SOLANA,
            //   targetAddress: 'TQfYistjV6aMKSC1jxUfkvnsRnjG2KEoFv',
            //   amount: 5
            // }}
            // txId={-1}
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
