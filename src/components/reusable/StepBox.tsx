import React from 'react'
import { useSelector } from 'react-redux'
import {
  CheckIcon,
  Loader,
  Lock,
  USDKIcon,
  WarningIcon
} from '../../assets/icons'
import { NetworkOptions, TransactionData } from '../../interface'
import {
  selectKimaExplorer,
  selectNetworkOption,
  selectNetworks,
  selectTheme
} from '../../store/selectors'
import {
  ChainName,
  CHAIN_NAMES_TO_EXPLORER_MAINNET,
  CHAIN_NAMES_TO_EXPLORER_TESTNET,
  CHAIN_NAMES_TO_STRING,
} from '../../utils/constants'
import { getShortenedAddress } from '../../utils/functions'
import CopyButton from './CopyButton'
import ExternalLink from './ExternalLink'
import ChainIcon from './ChainIcon'

interface Props {
  step: number
  errorStep: number
  loadingStep: number
  data?: TransactionData | null
}

const stepInfo = [
  {
    title: 'Initialize'
  },
  {
    title: 'Source Transfer'
  },
  {
    title: 'Validation'
  },
  {
    title: 'Target Transfer'
  },
  {
    title: 'Finalize'
  }
]

const StepBox = ({ step, errorStep, loadingStep, data }: Props) => {
  const theme = useSelector(selectTheme)
  const explorerUrl = useSelector(selectKimaExplorer)
  const networkOption = useSelector(selectNetworkOption)
  const networkOptions = useSelector(selectNetworks)

  const originNetworkOption = networkOptions.find(
    (network) => network.id === data?.sourceChain
  )
  const targetnNetworkOption = networkOptions.find(
    (network) => network.id === data?.targetChain
  )

  const CHAIN_NAMES_TO_EXPLORER =
    networkOption === NetworkOptions.mainnet
      ? CHAIN_NAMES_TO_EXPLORER_MAINNET
      : CHAIN_NAMES_TO_EXPLORER_TESTNET

  return (
    <div className='kima-stepbox'>
      <div className={`content-wrapper ${theme.colorMode}`}>
        {stepInfo.map((item, index) => (
          <div key={item.title} className='step-item'>
            <div
              className={`info-item
                  ${step >= index ? (index === loadingStep ? 'active' : index === errorStep ? 'error' : 'completed') : ''} 
                  ${step < index && 'locked'} ${theme.colorMode}`}
            >
              {step < index && <Lock />}

              {step >= index ? (
                index === loadingStep ? (
                  <Loader className='loader' />
                ) : index === errorStep ? (
                  <WarningIcon />
                ) : (
                  <CheckIcon />
                )
              ) : null}
              <p>{item.title}</p>
            </div>
            {index === 0 && data?.kimaTxHash ? (
              <div className={`info-item ${theme.colorMode}`}>
                <div className='icon'>
                  <USDKIcon width={30} height={30} />
                </div>
                <p className='chain-name'>Kima TX ID:</p>
                <p>
                  <ExternalLink
                    to={`${explorerUrl}/transactions/?tx=${data?.kimaTxHash}`}
                  >
                    {getShortenedAddress(data?.kimaTxHash || '')}
                  </ExternalLink>
                  <CopyButton text={data?.kimaTxHash} />
                </p>
              </div>
            ) : null}
            {index === 1 && data?.tssPullHash ? (
              <div
                className={`info-item ${theme.colorMode} source-chain ${step >= 3 ? 'paid' : ''}`}
              >
                <ChainIcon symbol={originNetworkOption?.id as string} />
                <p className='chain-name'>
                  {
                    CHAIN_NAMES_TO_STRING[
                      data?.sourceChain || ChainName.ETHEREUM
                    ]
                  }{' '}
                  TX ID:
                </p>
                <p>
                  <ExternalLink
                    to={`https://${
                      CHAIN_NAMES_TO_EXPLORER[
                        data?.sourceChain || ChainName.ETHEREUM
                      ]
                    }/${data?.sourceChain === ChainName.TRON ? 'transaction' : 'tx'}/${data?.tssPullHash}${
                      data?.sourceChain === ChainName.SOLANA &&
                      networkOption === NetworkOptions.testnet
                        ? '?cluster=devnet'
                        : ''
                    }`}
                  >
                    {getShortenedAddress(data?.tssPullHash || '')}
                  </ExternalLink>
                  <CopyButton text={data?.tssPullHash || ''} />
                </p>
              </div>
            ) : null}
            {index === 3 && data?.tssReleaseHash ? (
              <div className={`info-item ${theme.colorMode} target-chain`}>
                <ChainIcon symbol={targetnNetworkOption?.id as string} />
                <p className='chain-name'>
                  {
                    CHAIN_NAMES_TO_STRING[
                      data?.targetChain || ChainName.ETHEREUM
                    ]
                  }{' '}
                  TX ID:
                </p>
                <p>
                  <ExternalLink
                    to={`https://${
                      CHAIN_NAMES_TO_EXPLORER[
                        data?.targetChain || ChainName.ETHEREUM
                      ]
                    }/${data?.targetChain === ChainName.TRON ? 'transaction' : 'tx'}/${data?.tssReleaseHash}${
                      data?.targetChain === ChainName.SOLANA &&
                      networkOption === NetworkOptions.testnet
                        ? '?cluster=devnet'
                        : ''
                    }`}
                  >
                    {getShortenedAddress(data?.tssReleaseHash || '')}
                  </ExternalLink>
                  <CopyButton text={data?.tssReleaseHash || ''} />
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepBox
