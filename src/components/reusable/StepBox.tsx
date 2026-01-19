import {
  CheckIcon,
  Loader,
  Lock,
  USDKIcon,
  WarningIcon
} from '@kima-widget/assets/icons'
import useWidth from '@kima-widget/shared/lib/hooks/useWidth'
import {
  selectKimaExplorer,
  selectNetworkOption,
  selectNetworks,
  selectTheme
} from '@kima-widget/shared/store/selectors'
import {
  ChainName,
  NetworkOptions,
  TransactionData
} from '@kima-widget/shared/types'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ExternalLink from './ExternalLink'
import { getShortenedAddress } from '@kima-widget/shared/lib/misc'
import CopyButton from './CopyButton'
import ChainIcon from './ChainIcon'

interface Props {
  step: number
  errorStep: number
  loadingStep: number
  data?: TransactionData | null
  steps?: { title: string }[]
}

const DEFAULT_STEPS = [
  { title: 'Initialize' },
  { title: 'Source Transfer' },
  { title: 'Validation' },
  { title: 'Target Transfer' },
  { title: 'Finalize' }
]

const StepBox = ({ step, errorStep, loadingStep, data, steps }: Props) => {
  const theme = useSelector(selectTheme)
  const explorerUrl = useSelector(selectKimaExplorer)
  const networkOption = useSelector(selectNetworkOption)
  const networks = useSelector(selectNetworks)

  const { width: windowWidth } = useWidth()

  const stepInfo = steps ?? DEFAULT_STEPS

  const sourceChain = useMemo(() => {
    const sourceKey = data?.sourceChain === 'FIAT' ? 'CC' : data?.sourceChain
    return networks.find((network) => network.shortName === sourceKey)
  }, [data, networks])

  const targetChain = useMemo(
    () => networks.find((network) => network.shortName === data?.targetChain),
    [data, networks]
  )

  return (
    <div className='kima-stepbox'>
      <div className={`content-wrapper ${theme.colorMode}`}>
        {stepInfo.map((item, index) => (
          <div key={`${item.title}-${index}`} className='step-item'>
            <div
              className={`info-item
                  ${step >= index ? (index === loadingStep ? 'active' : index === errorStep ? 'error' : 'completed') : ''} 
                  ${step < index && 'locked'} ${theme.colorMode}`}
            >
              <div className='info-icon'>
                {step < index && <Lock width={24} height={24} />}

                {step >= index ? (
                  index === loadingStep ? (
                    <Loader width={24} height={24} className='loader' />
                  ) : index === errorStep ? (
                    <WarningIcon width={24} height={24} />
                  ) : (
                    <CheckIcon width={24} height={24} />
                  )
                ) : null}
              </div>
              <p>{item.title}</p>
            </div>

            {index === 0 && data?.kimaTxHash ? (
              <div className={`info-item ${theme.colorMode}`}>
                <div className='icon'>
                  <USDKIcon width={30} height={30} />
                </div>
                <p className='chain-name'>Kima TX Hash:</p>
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

            {/* Step 1: Source Transfer => show pull hash */}
            {index === 1 &&
            data?.tssPullHash &&
            sourceChain?.shortName !== 'CC' ? (
              <div
                className={`info-item ${theme.colorMode} source-chain ${step >= 3 ? 'paid' : ''}`}
              >
                <ChainIcon symbol={data.sourceChain as string} />
                <p className='chain-name'>
                  {windowWidth >= 770
                    ? sourceChain?.name
                    : sourceChain?.shortName}{' '}
                  TX Hash:
                </p>
                <p>
                  <ExternalLink
                    to={`${
                      sourceChain?.blockExplorers?.default.url
                    }/${data?.sourceChain === ChainName.TRON ? '#/transaction' : 'tx'}/${data?.tssPullHash}${
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

            {/* Step 3: Target Transfer => show refund/release hashes */}
            {index === 3 && data?.tssRefundHash ? (
              <div className={`info-item ${theme.colorMode} target-chain`}>
                <ChainIcon symbol={data.sourceChain as string} />
                <p className='chain-name'>
                  {windowWidth >= 770
                    ? sourceChain?.name
                    : sourceChain?.shortName}{' '}
                  TX Hash:
                </p>
                <p>
                  <ExternalLink
                    to={`${
                      sourceChain?.blockExplorers?.default.url
                    }/${data?.sourceChain === ChainName.TRON ? '#/transaction' : 'tx'}/${data?.tssRefundHash}${
                      data?.sourceChain === ChainName.SOLANA &&
                      networkOption === NetworkOptions.testnet
                        ? '?cluster=devnet'
                        : ''
                    }`}
                  >
                    {getShortenedAddress(data?.tssRefundHash || '')}
                  </ExternalLink>
                  <CopyButton text={data?.tssRefundHash || ''} />
                </p>
              </div>
            ) : null}

            {index === 3 && data?.tssReleaseHash ? (
              <div className={`info-item ${theme.colorMode} target-chain`}>
                <ChainIcon symbol={data.targetChain as string} />
                <p className='chain-name'>
                  {windowWidth >= 770
                    ? targetChain?.name
                    : targetChain?.shortName}{' '}
                  TX Hash:
                </p>
                <p>
                  <ExternalLink
                    to={`${
                      targetChain?.blockExplorers?.default.url
                    }/${data?.targetChain === ChainName.TRON ? '#/transaction' : 'tx'}/${data?.tssReleaseHash}${
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
