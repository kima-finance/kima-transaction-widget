import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatterFloat } from '../../helpers/functions'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { DAppOptions, ModeOptions } from '../../interface'
import {
  selectAmount,
  selectBankDetails,
  selectFeeDeduct,
  selectMode,
  selectSourceChain,
  selectServiceFee,
  selectSignature,
  selectTargetAddress,
  selectTargetChain,
  selectTheme,
  selectTransactionOption,
  selectDappOption,
  selectSourceCurrency,
  selectTargetCurrency,
  selectNetworks
} from '@store/selectors'
import { ChainName } from '../../utils/constants'
import { getShortenedAddress } from '../../utils/functions'
import useWidth from '../../hooks/useWidth'
import ChainIcon from './ChainIcon'
import { useDispatch } from 'react-redux'
import FeeDeductionRadioButtons from './FeeDeductionRadioButtons'
import { MiniArrowIcon } from '@assets/icons'

const ConfirmDetails = ({
  isApproved,
  isSigned
}: {
  isApproved: boolean
  isSigned: boolean
}) => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const theme = useSelector(selectTheme)
  const amount = useSelector(selectAmount)
  const { totalFeeUsd, targetNetworkFee, sourceNetworkFee } =
    useSelector(selectServiceFee)
  const originNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const targetAddress = useSelector(selectTargetAddress)
  const bankDetails = useSelector(selectBankDetails)
  const signature = useSelector(selectSignature)
  const networkOptions = useSelector(selectNetworks)

  const transactionOption = useSelector(selectTransactionOption)
  const { connectedAddress } = useIsWalletReady()
  const originNetworkOption = useMemo(
    () =>
      networkOptions.filter((network) => network.id === originNetwork.id)[0],
    [networkOptions, originNetwork]
  )
  const targetNetworkOption = useMemo(
    () =>
      networkOptions.filter(
        (network) =>
          network.shortName ===
          (mode === ModeOptions.payment
            ? transactionOption?.targetChain
            : targetNetwork.shortName)
      )[0],
    [networkOptions, originNetwork]
  )
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const { width, updateWidth } = useWidth()

  useEffect(() => {
    width === 0 && updateWidth(window.innerWidth)
  }, [])

  const sourceconnectedAddress = useMemo(() => {
    return width >= 916
      ? connectedAddress
      : getShortenedAddress(connectedAddress || '')
  }, [width, connectedAddress])

  const targetconnectedAddress = useMemo(() => {
    return getShortenedAddress(
      (mode === ModeOptions.payment
        ? transactionOption?.targetAddress
        : targetAddress) || ''
    )
  }, [mode, transactionOption, targetAddress])

  const amountToShow = useMemo(() => {
    if (
      originNetwork.shortName === ChainName.BTC ||
      targetNetwork.shortName === ChainName.BTC
    ) {
      return (feeDeduct ? +amount : +amount + totalFeeUsd).toFixed(8)
    }

    return formatterFloat.format(feeDeduct ? +amount : +amount + totalFeeUsd)
  }, [amount, totalFeeUsd, originNetwork, targetNetwork, feeDeduct])

  const [feeCollapsed, setFeeCollapsed] = useState<boolean>(true)

  return (
    <div className={`confirm-details ${theme.colorMode}`}>
      <p>
        Step {isApproved ? '2' : '1'}&nbsp;of 2&nbsp;&nbsp;&nbsp;
        {isApproved
          ? 'Submit transaction'
          : originNetwork.shortName === ChainName.FIAT
            ? 'Bank Details'
            : 'Approval'}
      </p>
      {originNetwork.shortName === ChainName.FIAT ? (
        <div>
          <div className='detail-item'>
            <span className='label'>IBAN:</span>
            <span className={`kima-card-network-label ${theme.colorMode}`}>
              <ChainIcon symbol={originNetworkOption?.shortName} />
              {/* <div className='icon'>
                <originNetworkOption.icon />
              </div> */}
              FIAT
            </span>
            <p>ES6621000418401234567891</p>
          </div>
          <div className='detail-item'>
            <span className='label'>Recipient:</span>
            <p>Kima Sandbox</p>
          </div>
          <div className='detail-item'>
            <span className='label'>BIC:</span>
            <p>CAIXESBBXXX</p>
          </div>
          <div className='detail-item'>
            <span className='label'>Description:</span>
            <p className='signature'>{signature}</p>
          </div>
        </div>
      ) : (
        <div className='detail-item'>
          <span className='label'>Source wallet:</span>
          <div className='network-details'>
            <div className='kima-card-network-container'>
              <span className={`kima-card-network-label ${theme.colorMode}`}>
                <ChainIcon symbol={originNetworkOption?.shortName} />
                {originNetworkOption.name}
              </span>
            </div>
            <p className={theme.colorMode}>
              {width >= 916
                ? dAppOption === DAppOptions.LPDrain
                  ? targetAddress
                  : connectedAddress
                : dAppOption === DAppOptions.LPDrain
                  ? targetconnectedAddress
                  : sourceconnectedAddress}
            </p>
          </div>
        </div>
      )}
      <div className='detail-item amount'>
        <span className='amount-container'>
          <div className='amount-details'>
            <span>Amount to transfer</span>
            <div className='coin-details'>
              <p>
                {feeDeduct
                  ? formatterFloat.format(Number(amount))
                  : formatterFloat.format(Number(amount) + totalFeeUsd)}{' '}
                {sourceCurrency}
              </p>
            </div>
          </div>
          <div className='amount-details'>
            <span>Total Network Fees</span>
            <div
              className='fee-collapse'
              onClick={() => setFeeCollapsed(!feeCollapsed)}
            >
              <MiniArrowIcon
                width={15}
                height={8}
                style={{
                  transform: `rotate(${feeCollapsed ? '0deg' : '180deg'})`,
                  transition: 'transform 0.3s ease'
                }}
              />
              <span className='service-fee'>
                {formatterFloat.format(totalFeeUsd || 0)} {sourceCurrency}
              </span>
            </div>
          </div>
          <div className={`fee-breakdown ${feeCollapsed ? 'collapsed' : ''}`}>
            <div className='amount-details'>
              <span>Source Network Fee ({originNetwork.shortName})</span>
              <span className='service-fee'>
                {formatterFloat.format(sourceNetworkFee?.amount || 0)}{' '}
                {sourceCurrency}
              </span>
            </div>
            <div className='amount-details'>
              <span>Target Network Fee ({targetNetwork.shortName})</span>
              <span className='service-fee'>
                {formatterFloat.format(targetNetworkFee?.amount || 0)}{' '}
                {sourceCurrency}
              </span>
            </div>
          </div>
          {/* TODO: Implement when the new service fee comes in
          <div className='amount-details'>
            <span>Business Fee ({originNetwork})</span>
            <span className='service-fee'>
              {formatterFloat.format(totalFeeUsd)} {sourceCurrency}
            </span>
          </div> */}
          <div className='amount-details'>
            <span>Amount to Receive</span>
            <span className='final-amount'>
              {!feeDeduct
                ? formatterFloat.format(Number(amount))
                : formatterFloat.format(Number(amount) - totalFeeUsd)}{' '}
              {targetCurrency}
            </span>
          </div>
        </span>
      </div>
      {targetNetwork.shortName === ChainName.FIAT ? (
        <div>
          <div className='detail-item'>
            <span className='label'>IBAN:</span>
            <p>{bankDetails.iban}</p>
            <span className={`kima-card-network-label ${theme.colorMode}`}>
              <ChainIcon symbol={targetNetworkOption?.shortName} />
              {/* <div className='icon'>
                <targetNetworkOption.icon />
              </div> */}
              FIAT
            </span>
          </div>
          <div className='detail-item'>
            <span className='label'>Recipient:</span>
            <p>{bankDetails.recipient}</p>
          </div>
        </div>
      ) : (
        <div className='detail-item'>
          <span className='label'>Target wallet:</span>
          <div className='network-details'>
            <div className='kima-card-network-container'>
              <span className={`kima-card-network-label ${theme.colorMode}`}>
                <ChainIcon symbol={targetNetworkOption?.shortName} />
                {targetNetworkOption?.name}
              </span>
            </div>
            <p className={theme.colorMode}>
              {width >= 916
                ? dAppOption === DAppOptions.LPDrain
                  ? connectedAddress
                  : targetAddress
                : dAppOption === DAppOptions.LPDrain
                  ? sourceconnectedAddress
                  : targetconnectedAddress}
            </p>
          </div>
        </div>
      )}

      {/* checkbox shall only be displayed in transfer scenario */}
      {mode === ModeOptions.bridge && totalFeeUsd > 0 ? (
        // <FeeDeductionSlider />
        <FeeDeductionRadioButtons isSigned={isSigned} />
      ) : null}

      {/* {mode === ModeOptions.bridge && totalFeeUsd > 0 && (
        <span className='transfer-notice'>
          {feeDeduct
            ? `You will transfer exactly $${amount} ${sourceCurrency} from ${originNetwork}, and the fee of $${totalFeeUsd} will be deducted on the target network (${targetNetwork}) receiving $${Number(amount) - totalFeeUsd} ${targetCurrency}.`
            : `You will send $${Number(amount) + totalFeeUsd} ${sourceCurrency} from ${originNetwork}, ensuring ${amount} ${targetCurrency} arrives in the target network (${targetNetwork}).`}
        </span>
      )} */}
    </div>
  )
}

export default ConfirmDetails
