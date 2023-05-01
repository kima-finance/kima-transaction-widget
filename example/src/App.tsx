import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  FontSizeOptions,
  ModeOptions,
  SupportNetworks,
  // DAppOptions,
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
            useFIAT={true}
            kimaBackendUrl='http://localhost:3001'
            kimaNodeProviderQuery='https://api_staging_testnet.kima.finance'
            titleOption={{
              initialTitle: 'New Purchase'
            }}
            paymentTitleOption={{
              title:
                'You can now purchase our NFT on Polygon, using funds from other chains.',
              style: {
                fontSize: '1.2em',
                fontWeight: '500'
              }
            }}
            // dAppOption={DAppOptions.LightDemo}
            // lightModeOption={{
            //   kimaAccounts: [
            //     '0x1150bd27bA25fa13806C98324F201dfe815A4502',
            //     '0x97810930b49D820205Be8eFe370201D32d9255B5'
            //   ],
            //   chains: [
            //     SupportNetworks.ETHEREUM,
            //     SupportNetworks.AVALANCHE,
            //     SupportNetworks.POLYGON
            //   ]
            // }}
            helpURL='https://t.me/GoodDollarX'
            // compliantOption={false}
            transactionOption={{
              targetChain: SupportNetworks.AVALANCHE,
              targetAddress: '0x67cc400c434F691Ed45e452dC8F2Baf0101a9B63',
              amount: 5
            }}
            txId={124}
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
