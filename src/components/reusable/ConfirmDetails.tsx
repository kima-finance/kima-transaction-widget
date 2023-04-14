import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { formatterFloat } from '../../helpers/functions'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { DAppOptions, ModeOptions } from '../../interface'
import {
  selectAmount,
  selectCurrencyOptions,
  selectDappOption,
  selectFeeDeduct,
  selectMode,
  selectOriginNetwork,
  selectServiceFee,
  selectSourceAddress,
  selectTargetAddress,
  selectTargetNetwork,
  selectTheme,
  selectTransactionOption
} from '../../store/selectors'
import { networkOptions } from '../../utils/constants'
import { getShortenedAddress } from '../../utils/functions'

const ConfirmDetails = ({ isApproved }: { isApproved: boolean }) => {
  const feeDeduct = useSelector(selectFeeDeduct)
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const theme = useSelector(selectTheme)
  const amount = useSelector(selectAmount)
  const serviceFee = useSelector(selectServiceFee)
  const originNetwork = useSelector(selectOriginNetwork)
  const targetNetwork = useSelector(selectTargetNetwork)
  const targetAddress = useSelector(selectTargetAddress)
  const transactionOption = useSelector(selectTransactionOption)
  const sourceAddress = useSelector(selectSourceAddress)
  const { walletAddress } = useIsWalletReady()
  const originNetworkOption = useMemo(
    () => networkOptions.filter((network) => network.id === originNetwork)[0],
    [networkOptions, originNetwork]
  )
  const targetNetworkOption = useMemo(
    () =>
      networkOptions.filter(
        (network) =>
          network.id ===
          (mode === ModeOptions.payment
            ? transactionOption?.targetChain
            : targetNetwork)
      )[0],
    [networkOptions, originNetwork]
  )
  const selectedCoin = useSelector(selectCurrencyOptions)

  return (
    <div className={`confirm-details ${theme.colorMode}`}>
      <p>
        Step {isApproved ? '2' : '1'}&nbsp;of 2&nbsp;&nbsp;&nbsp;
        {isApproved ? 'Submit trasaction' : 'Approval'}
      </p>
      <div className='detail-item'>
        <span className='label'>Source wallet:</span>
        <p>
          {getShortenedAddress(
            (dAppOption === DAppOptions.LightDemo
              ? sourceAddress
              : walletAddress) || ''
          )}
        </p>
        <span className='kima-card-network-label'>
          <originNetworkOption.icon />
          {originNetworkOption.label}
        </span>
      </div>
      <div className='detail-item'>
        <span className='label'>Amount:</span>
        <p>
          {formatterFloat.format(
            feeDeduct || dAppOption === DAppOptions.LightDemo
              ? amount
              : amount + serviceFee
          )}{' '}
          {selectedCoin.symbol}
        </p>
      </div>
      <div className='detail-item'>
        <span className='label'>Target wallet:</span>
        <p>
          {getShortenedAddress(
            (mode === ModeOptions.payment
              ? transactionOption?.targetAddress
              : targetAddress) || ''
          )}
        </p>
        <span className='kima-card-network-label'>
          <targetNetworkOption.icon />
          {targetNetworkOption.label}
        </span>
      </div>
    </div>
  )
}

export default ConfirmDetails
