import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRightIcon, CrossIcon } from '../../assets/icons'
import { setPendingTxPopup } from '../../store/optionSlice'
import { selectPendingTxPopup, selectTheme } from '../../store/selectors'
import { ChainName, getNetworkOption } from '../../utils/constants'
import { getShortenedAddress } from '../../utils/functions'

const PendingTxPopup = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const pendingTxPopup = useSelector(selectPendingTxPopup)

  const txData = [
    {
      sourceChain: ChainName.BTC,
      sourceAddress: '2MuhGmBFTJJagYGPUwmehjgdem5wJmowtSa',
      targetChain: ChainName.ETHEREUM,
      targetAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
      amount: '0.00015',
      label: 'WBTC',
      status: 'Pending'
    },
    {
      sourceChain: ChainName.ETHEREUM,
      sourceAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
      targetChain: ChainName.BTC,
      targetAddress: '2MuhGmBFTJJagYGPUwmehjgdem5wJmowtSa',
      amount: '0.00015',
      label: 'WBTC',
      status: 'Pending'
    },
    {
      sourceChain: ChainName.BSC,
      sourceAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
      targetChain: ChainName.POLYGON,
      targetAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
      amount: '100.5',
      label: 'USDK',
      status: 'Completed'
    },
    {
      sourceChain: ChainName.OPTIMISM,
      sourceAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
      targetChain: ChainName.POLYGON_ZKEVM,
      targetAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
      amount: '250',
      label: 'USDK',
      status: 'Completed'
    },
    {
      sourceChain: ChainName.SOLANA,
      sourceAddress: '2MuhGmBFTJJagYGPUwmehjgdem5wJmowtSa',
      targetChain: ChainName.TRON,
      targetAddress: '0x10c033E050e10510a951a56e4A14B4CD3de6CA67',
      amount: '1000',
      label: 'USDK',
      status: 'Completed'
    }
  ]

  return (
    <div
      className={`kima-modal pending-tx-popup ${theme.colorMode} ${
        pendingTxPopup ? 'open' : ''
      }`}
    >
      <div
        className='modal-overlay'
        onClick={() => {
          dispatch(setPendingTxPopup(false))
        }}
      />
      <div className='modal-content-container'>
        <div className='kima-card-header'>
          <div className='topbar'>
            <div className='title'>
              <h3>Transaction List</h3>
            </div>
            <div className='control-buttons'>
              <button
                className='icon-button'
                onClick={() => dispatch(setPendingTxPopup(false))}
              >
                <CrossIcon
                  fill={theme.colorMode === 'light' ? 'black' : 'white'}
                />
              </button>
            </div>
          </div>
        </div>
        <div className='modal-content'>
          <div className='scroll-area custom-scrollbar'>
            <div className='tx-container'>
              {txData.map((tx) => {
                const sourceInfo = getNetworkOption(tx.sourceChain)
                const targetInfo = getNetworkOption(tx.targetChain)

                return (
                  <div className='tx-item'>
                    <div className='label'>
                      <div className='icon-wrapper'>
                        {sourceInfo && <sourceInfo.icon />}
                        {sourceInfo?.label}
                      </div>
                      {getShortenedAddress(tx.sourceAddress)}
                    </div>
                    <ArrowRightIcon
                      fill={theme.colorMode === 'light' ? 'black' : 'white'}
                    />
                    <div className='label'>
                      <div className='icon-wrapper'>
                        {targetInfo && <targetInfo.icon />}
                        {targetInfo?.label}
                      </div>
                      {getShortenedAddress(tx.targetAddress)}
                    </div>
                    <div className='amount-label'>
                      {`${tx.amount} ${tx.label}`}
                    </div>
                    <span className='status-label'>{tx.status}</span>
                    <div className='action-button'>View</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingTxPopup
