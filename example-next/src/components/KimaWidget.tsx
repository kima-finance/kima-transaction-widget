'use client'

import dynamic from 'next/dynamic'
import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  ModeOptions,
  ColorModeOptions
} from '@kimafinance/kima-transaction-widget'

const Widget = () => {
  return (
    <KimaProvider
      projectId='e579511a495b5c312b572b036e60555a'
      kimaBackendUrl='http://localhost:4000'
      logLevel='DEBUG'
    >
      <div className='container'>
        <KimaTransactionWidget
          theme={{
            colorMode: ColorModeOptions.dark
          }}
          mode={ModeOptions.bridge}
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
          // transactionOption={{
          //   targetChain: SupportNetworks.ETHEREUM,
          //   targetAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
          //   amount: 3,
          //   currency: 'USDT'
          // }}
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
