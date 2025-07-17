'use client'

import dynamic from 'next/dynamic'
import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  ModeOptions,
  ColorModeOptions,
  SupportNetworks,
  DAppOptions
} from '@kimafinance/kima-transaction-widget'
import '@kimafinance/kima-transaction-widget/index.css'

const Widget = () => {
  return (
    <KimaProvider
      walletConnectProjectId='e579511a495b5c312b572b036e60555a'
      kimaBackendUrl='http://localhost:3001'
      keplrHandler={(e: any) => {
        console.log(e)
      }}
      closeHandler={() => {
        console.log('close')
      }}
    >
      <div className='container'>
        <KimaTransactionWidget
          theme={{
            colorMode: ColorModeOptions.dark
          }}
          mode={ModeOptions.status}
          dAppOption={DAppOptions.LPDrain}
          txId={'105'}
          // titleOption={{
          //   initialTitle: 'New Purchase'
          // }}
          paymentTitleOption={{
            title:
              'You can now purchase our NFT on Polygon, using funds from other chains.',
            style: {
              fontSize: '1.2em',
              fontWeight: '500'
            }
          }}
          transactionOption={{
            targetChain: SupportNetworks.POLYGON,
            targetAddress: '0x9a721c664f9d69e4da24f91386086fbd81da23c1',
            amount: 3,
            currency: 'USDK'
          }}
        />
      </div>
    </KimaProvider>
  )
}

// create a wrapper component that passes props to Widget
const KimaWidgetWrapper = () => {
  return <Widget />
}

// import the wrapper component, which correctly handles the props
const KimaWidget = dynamic(() => Promise.resolve(KimaWidgetWrapper), {
  ssr: false
})

export default KimaWidget
