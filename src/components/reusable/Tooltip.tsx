import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CheckIcon, CopyIcon, WarningIcon } from '../../assets/icons'
import { Loading180Ring } from '../../assets/loading'
import { TransactionData } from '../../interface'
import { selectTheme } from '../../store/selectors'
import {
  ChainName,
  CHAIN_NAMES_TO_EXPLORER,
  CHAIN_NAMES_TO_STRING,
  tooltipInfo
} from '../../utils/constants'
import { getShortenedAddress } from '../../utils/functions'
import ExternalLink from './ExternalLink'
import useWidth from '../../hooks/useWidth'

interface Props {
  step: number
  focus: number
  errorStep: number
  loadingStep: number
  data?: TransactionData
}

const Tooltip = ({ step, focus, errorStep, loadingStep, data }: Props) => {
  const {width: windowWidth} = useWidth()
  const theme = useSelector(selectTheme)
  const [copyClicked, setCopyClicked] = useState(false)

  useEffect(() => {
    if (!copyClicked) return

    setTimeout(() => {
      setCopyClicked(false)
    }, 2000)
  }, [copyClicked])

  return (
    <div className='kima-tooltip'>
      <div
        className={`${
          focus === 0 ? 'position-first' : focus === 4 ? 'position-last' : ''
        }`}
        style={{
          left: `${(focus - 1) * 25}%`,
          opacity: `${focus < 0 ? 0 : 1}`
        }}
      >
        <div className='content-wrapper'>
          {tooltipInfo[focus] &&
            tooltipInfo[focus].map((info: any) => (
              <div key={info} className='info-item'>
                {step >= focus &&
                  (focus === errorStep ? <WarningIcon /> : <CheckIcon />)}
                {focus === loadingStep ? (
                  <Loading180Ring
                    fill={theme.colorMode === 'dark' ? 'white' : '#5aa0db'}
                  />
                ) : null}
                <p>{info}</p>
              </div>
            ))}
          {focus === 0 ? (
            <div className='info-item'>
              <p>
                Kima TX ID:{' '}
                <ExternalLink to='https://explorer.kima.finance/transactions/718ABEE14755C1ACA617607F9353A55013EF855B0EA6E92EFD31A2F50A362524'>
                  718A...2524
                </ExternalLink>
                <div
                  className='copy-btn'
                  onClick={() => {
                    setCopyClicked(true)
                    navigator.clipboard.writeText(
                      '718ABEE14755C1ACA617607F9353A55013EF855B0EA6E92EFD31A2F50A362524'
                    )
                  }}
                >
                  {copyClicked ? <CheckIcon fill='#979797' /> : <CopyIcon />}
                </div>
              </p>
            </div>
          ) : null}
          {focus === 1 && data?.tssPullHash ? (
            <div className='info-item'>
              <p>
                {CHAIN_NAMES_TO_STRING[data?.sourceChain || ChainName.ETHEREUM]}{' '}
                TX ID:
                <ExternalLink
                  to={`https://${
                    CHAIN_NAMES_TO_EXPLORER[
                      data?.sourceChain || ChainName.ETHEREUM
                    ]
                  }/tx/${data?.tssPullHash}${
                    data?.sourceChain === ChainName.SOLANA
                      ? '?cluster=devnet'
                      : ''
                  }`}
                >
                  {getShortenedAddress(data?.tssPullHash || '')}
                </ExternalLink>
                <div
                  className='copy-btn'
                  onClick={() => {
                    setCopyClicked(true)
                    navigator.clipboard.writeText(data?.tssPullHash || '')
                  }}
                >
                  {copyClicked ? <CheckIcon fill='#979797' /> : <CopyIcon />}
                </div>
              </p>
            </div>
          ) : null}
          {focus === 3 && data?.tssReleaseHash ? (
            <div className='info-item'>
              <p>
                {CHAIN_NAMES_TO_STRING[data?.targetChain || ChainName.ETHEREUM]}{' '}
                TX ID:
                <ExternalLink
                  to={`https://${
                    CHAIN_NAMES_TO_EXPLORER[
                      data?.targetChain || ChainName.ETHEREUM
                    ]
                  }/tx/${data?.tssReleaseHash}${
                    data?.targetChain === ChainName.SOLANA
                      ? '?cluster=devnet'
                      : ''
                  }`}
                >
                  {getShortenedAddress(data?.tssReleaseHash || '')}
                </ExternalLink>
                <div
                  className='copy-btn'
                  onClick={() => {
                    setCopyClicked(true)
                    navigator.clipboard.writeText(data?.tssReleaseHash || '')
                  }}
                >
                  {copyClicked ? <CheckIcon fill='#979797' /> : <CopyIcon />}
                </div>
              </p>
            </div>
          ) : null}
          {windowWidth <= 768 && (
            <div
              className='arrow'
              style={{
                left:
                  focus === 0
                    ? '1em'
                    : focus === 4
                    ? 'calc(100% - 3em)'
                    : `calc(${focus * 25}% - 1em)`
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Tooltip
