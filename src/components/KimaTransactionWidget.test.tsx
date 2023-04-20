import { render } from '@testing-library/react'
import { ethers } from 'ethers'
import React from 'react'

import {
  KimaTransactionWidget,
  KimaProvider,
  FontSizeOptions,
  ModeOptions,
  SupportNetworks,
  ColorModeOptions,
  DAppOptions
} from '../'
import { Web3Provider } from '@ethersproject/providers'

describe('KimaTransactionWidget test', function () {
  it('Bridge scenario', function () {
    const { container } = render(
      <KimaProvider>
        <KimaTransactionWidget
          theme={{
            colorMode: ColorModeOptions.light,
            fontSize: FontSizeOptions.medium
          }}
          mode={ModeOptions.bridge}
          dAppOption={DAppOptions.LightDemo}
          lightModeOption={{
            kimaAccounts: [
              '0x1150bd27bA25fa13806C98324F201dfe815A4502',
              '0x97810930b49D820205Be8eFe370201D32d9255B5'
            ],
            chains: [
              SupportNetworks.ETHEREUM,
              SupportNetworks.AVALANCHE,
              SupportNetworks.POLYGON
            ]
          }}
          kimaBackendUrl='http://localhost:3001'
          kimaNodeProviderQuery='https://api_staging_testnet.kima.finance'
        />
      </KimaProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('Payment scenario', function () {
    const { container } = render(
      <KimaProvider>
        <KimaTransactionWidget
          theme={{
            colorMode: ColorModeOptions.light,
            fontSize: FontSizeOptions.medium
          }}
          mode={ModeOptions.payment}
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
          kimaBackendUrl='http://localhost:3001'
          kimaNodeProviderQuery='https://api_staging_testnet.kima.finance'
        />
      </KimaProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('Status widget', function () {
    const { container } = render(
      <KimaProvider>
        <KimaTransactionWidget
          theme={{
            colorMode: ColorModeOptions.light,
            fontSize: FontSizeOptions.medium
          }}
          mode={ModeOptions.status}
          kimaBackendUrl='http://localhost:3001'
          kimaNodeProviderQuery='https://api_staging_testnet.kima.finance'
          txId={3}
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
      </KimaProvider>
    )

    expect(container).toMatchSnapshot()
  })

  it('Good Dollar integration', function () {
    var provider = new ethers.providers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/'
    )

    const { container } = render(
      <KimaProvider>
        <KimaTransactionWidget
          theme={{
            colorMode: ColorModeOptions.light,
            fontSize: FontSizeOptions.medium
          }}
          mode={ModeOptions.bridge}
          dAppOption={DAppOptions.G$}
          kimaBackendUrl='https://gooddollar-beta.kima.finance'
          kimaNodeProviderQuery='https://api_testnet.kima.finance'
          compliantOption={false}
          autoConnect={false}
          provider={provider as Web3Provider}
          helpURL='https://t.me/GoodDollarX'
          errorHandler={(e: any) => {
            console.log('error:', e)
          }}
          successHandler={() => {
            console.log('success')
          }}
          switchChainHandler={() => {
            console.log('switch handler')
          }}
        />
      </KimaProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
