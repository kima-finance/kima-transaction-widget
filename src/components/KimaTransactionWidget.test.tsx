import { act, render } from '@testing-library/react'
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
  it('Bridge scenario', async function () {
    const { container } = await act(async () =>
      render(
        <KimaProvider>
          <KimaTransactionWidget
            theme={{
              colorMode: ColorModeOptions.light,
              fontSize: FontSizeOptions.medium
            }}
            mode={ModeOptions.bridge}
            kimaBackendUrl='https://backend_demo_staging.kima.finance'
            kimaNodeProviderQuery='https://api_staging_testnet.kima.finance'
          />
        </KimaProvider>
      )
    )

    expect(container).toMatchSnapshot()
  })

  it('Payment scenario', async function () {
    const { container } = await act(async () =>
      render(
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
            transactionOption={{
              targetChain: SupportNetworks.AVALANCHE,
              targetAddress: '0x67cc400c434F691Ed45e452dC8F2Baf0101a9B63',
              amount: 5
            }}
            kimaBackendUrl='https://backend_demo_staging.kima.finance'
            kimaNodeProviderQuery='https://api_staging_testnet.kima.finance'
          />
        </KimaProvider>
      )
    )

    expect(container).toMatchSnapshot()
  })

  it('Status widget', async function () {
    const { container } = await act(async () =>
      render(
        <KimaProvider>
          <KimaTransactionWidget
            theme={{
              colorMode: ColorModeOptions.light,
              fontSize: FontSizeOptions.medium
            }}
            mode={ModeOptions.status}
            kimaBackendUrl='https://backend_demo_staging.kima.finance'
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
    )

    expect(container).toMatchSnapshot()
  })
})
