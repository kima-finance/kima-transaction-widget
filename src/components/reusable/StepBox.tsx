import React, { useMemo } from 'react'
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
import { ChainName } from '../../utils/constants'
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
  const networks = useSelector(selectNetworks)

  const sourceChain = useMemo(
    () => networks.find((network) => network.shortName === data?.originChain),
    [data, networks]
  )

  console.log("sourceChain: ", sourceChain)

  const targetChain = useMemo(
    () => networks.find((network) => network.shortName === data?.targetChain),
    [data, networks]
  )

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
              {step < index && <Lock stroke='#353539'/>}

              {step >= index ? (
                index === loadingStep ? (
                  <Loader stroke='white' className='loader' />
                ) : index === errorStep ? (
                  <WarningIcon fill='white'/>
                ) : (
                  <CheckIcon fill='white' />
                )
              ) : null}
              <p className='label'>{item.title}</p>
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
            {index === 1 && data?.pullHash ? (
              <div
                className={`info-item ${theme.colorMode} source-chain ${step >= 3 ? 'paid' : ''}`}
              >
                <ChainIcon symbol={data.originChain as string} />
                <p className='chain-name'>{sourceChain?.name} TX ID:</p>
                <p>
                  <ExternalLink
                    to={`${
                      sourceChain?.blockExplorers?.default.url
                    }/${data?.originChain === ChainName.TRON ? 'transaction' : 'tx'}/${data?.pullHash}${
                      data?.originChain === ChainName.SOLANA &&
                      networkOption === NetworkOptions.testnet
                        ? '?cluster=devnet'
                        : ''
                    }`}
                  >
                    {getShortenedAddress(data?.pullHash || '')}
                  </ExternalLink>
                  <CopyButton text={data?.pullHash || ''} />
                </p>
              </div>
            ) : null}
            {index === 3 && data?.releaseHash ? (
              <div className={`info-item ${theme.colorMode} target-chain`}>
                <ChainIcon symbol={data.targetChain as string} />
                <p className='chain-name'>{targetChain?.name} TX ID:</p>
                <p>
                  <ExternalLink
                    to={`${
                      targetChain?.blockExplorers?.default.url
                    }/${data?.targetChain === ChainName.TRON ? 'transaction' : 'tx'}/${data?.releaseHash}${
                      data?.targetChain === ChainName.SOLANA &&
                      networkOption === NetworkOptions.testnet
                        ? '?cluster=devnet'
                        : ''
                    }`}
                  >
                    {getShortenedAddress(data?.releaseHash || '')}
                  </ExternalLink>
                  <CopyButton text={data?.releaseHash || ''} />
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
