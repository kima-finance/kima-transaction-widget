import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CrossIcon } from '../../assets/icons'
import { TransactionData } from '../../interface'
import { setHashPopup } from '../../store/optionSlice'
import { selectHashPopup, selectTheme } from '../../store/selectors'
import { ChainName, CHAIN_NAMES_TO_EXPLORER } from '../../utils/constants'
import { getShortenedAddress } from '../../utils/functions'
import { ExternalLink } from '../reusable'

interface Props {
  data?: TransactionData
}

const HashPopup = ({ data }: Props) => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const hashPopup = useSelector(selectHashPopup)

  return (
    <div
      className={`kima-modal hash-popup ${theme.colorMode} ${
        hashPopup ? 'open' : ''
      }`}
    >
      <div
        className='modal-overlay'
        onClick={() => {
          dispatch(setHashPopup(false))
        }}
      />
      <div className='modal-content-container'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3>Transaction Hashes</h3>
            </div>
            <div className='control-buttons'>
              <button
                className='icon-button'
                onClick={() => dispatch(setHashPopup(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <div className='hash-container'>
            <div className='hash-item'>
              <span>Kima tx:</span>
              <ExternalLink to='https://explorer.kima.finance/transactions/718ABEE14755C1ACA617607F9353A55013EF855B0EA6E92EFD31A2F50A362524'>
                718A...2524
              </ExternalLink>
            </div>
            <div className='hash-item'>
              <span>Source tx:</span>
              <ExternalLink
                to={`https://${
                  CHAIN_NAMES_TO_EXPLORER[
                    data?.sourceChain || ChainName.ETHEREUM
                  ]
                }/tx/${data?.tssPullHash}`}
              >
                {getShortenedAddress(data?.tssPullHash || '')}
              </ExternalLink>
            </div>
            <div className='hash-item'>
              <span>Target tx:</span>
              <ExternalLink
                to={`https://${
                  CHAIN_NAMES_TO_EXPLORER[
                    data?.targetChain || ChainName.ETHEREUM
                  ]
                }/tx/${data?.tssReleaseHash}`}
              >
                {getShortenedAddress(data?.tssReleaseHash || '')}
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HashPopup
