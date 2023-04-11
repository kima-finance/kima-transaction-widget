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
            kimaBackendUrl='http://localhost:3001'
            kimaNodeProviderQuery='https://api_testnet.kima.finance'
            titleOption={{
              initialTitle: 'New Purchase'
            }}
            useFIAT={true}
            paymentTitleOption={{
              title:
                'You can now purchase our NFT on Polygon, using funds from other chains.',
              style: {
                fontSize: '1.2em',
                fontWeight: '500'
              }
            }}
            transactionOption={{
              targetChain: SupportNetworks.AVALANCHE,
              targetAddress: '0x67cc400c434F691Ed45e452dC8F2Baf0101a9B63',
              amount: 5
            }}
            // txId={124}
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
