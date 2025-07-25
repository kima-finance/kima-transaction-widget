import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { DAppOptions, ModeOptions } from '../../interface'
import {
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
  selectNetworks,
  selectSourceAddress
} from '@widget/store/selectors'
import { ChainName, lightDemoAccounts } from '../../utils/constants'
import useWidth from '../../hooks/useWidth'
import ChainIcon from './ChainIcon'
import FeeDeductionRadioButtons from './FeeDeductionRadioButtons'
import { MiniArrowIcon } from '@widget/assets/icons'
import { formatBigInt } from '../../helpers/functions'

const ConfirmDetails = ({
  isApproved,
  feeOptionDisabled
}: {
  isApproved: boolean
  feeOptionDisabled: boolean
}) => {
  const feeDeduct = useSelector(selectFeeDeduct)
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const theme = useSelector(selectTheme)
  const { transactionValues, sourceFee, targetFee, kimaFee, totalFee } =
    useSelector(selectServiceFee)
  const txValues = feeDeduct
    ? transactionValues.feeFromTarget
    : transactionValues.feeFromOrigin
  const originNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const sourceAddress = useSelector(selectSourceAddress)
  const targetAddress = useSelector(selectTargetAddress)
  const bankDetails = useSelector(selectBankDetails)
  const signature = useSelector(selectSignature)
  const networkOptions = useSelector(selectNetworks)

  const [feeCollapsed, setFeeCollapsed] = useState(true)

  const transactionOption = useSelector(selectTransactionOption)
  const { connectedAddress } = useIsWalletReady()

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
              <ChainIcon symbol={originNetwork?.shortName} />
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
          <span className='label'>
            Source {originNetwork.shortName !== 'CC' && 'wallet'}:
          </span>
          <div className='network-details'>
            <div className='kima-card-network-container'>
              <span className={`kima-card-network-label ${theme.colorMode}`}>
                <ChainIcon symbol={originNetwork?.shortName} />
                {originNetwork.name}
              </span>
            </div>
            {originNetwork.shortName !== 'CC' && (
              <p className={theme.colorMode}>
                {dAppOption === DAppOptions.LPDrain
                  ? targetAddress
                  : connectedAddress}
              </p>
            )}
          </div>
        </div>
      )}
      <div className='detail-item amount'>
        <span className='amount-container'>
          {dAppOption === DAppOptions.None && (
            <div className='amount-details'>
              <span>Amount to Transfer </span>
              <div className='coin-details'>
                <p>
                  {formatBigInt(txValues.allowanceAmount)} {sourceCurrency}
                </p>
              </div>
            </div>
          )}
          {dAppOption === DAppOptions.None && (
            <div className='amount-details'>
              <span>Total Fees</span>
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
                  {formatBigInt(totalFee)} {sourceCurrency}
                </span>
              </div>
            </div>
          )}
          <div className={`fee-breakdown ${feeCollapsed ? 'collapsed' : ''}`}>
            <div className='amount-details'>
              <span>
                {originNetwork.shortName === 'CC'
                  ? 'Credit Card Processing Fee'
                  : `Source Network Fee (${originNetwork.shortName})`}
              </span>
              <span className='service-fee'>
                {formatBigInt(sourceFee)} {sourceCurrency}
              </span>
            </div>
            <div className='amount-details'>
              <span>Target Network Fee ({targetNetwork.shortName})</span>
              <span className='service-fee'>
                {formatBigInt(targetFee)} {targetCurrency}
              </span>
            </div>
            <div className='amount-details'>
              <span>KIMA Service Fee</span>
              <span className='service-fee'>
                {formatBigInt(kimaFee)} {sourceCurrency}
              </span>
            </div>
          </div>
          <div className='amount-details'>
            <span>Target Transfer Amount</span>
            <span className='service-fee'>
              {formatBigInt(txValues.submitAmount)} {targetCurrency}
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
              {mode === ModeOptions.light
                ? targetNetwork.shortName === 'SOL'
                  ? lightDemoAccounts.SOL
                  : targetNetwork.shortName === 'TRX'
                    ? lightDemoAccounts.TRX
                    : lightDemoAccounts.EVM
                : dAppOption === DAppOptions.LPDrain
                  ? connectedAddress
                  : targetAddress}
            </p>
          </div>
        </div>
      )}

      {/* checkbox shall only be displayed in transfer scenario */}
      {mode === ModeOptions.bridge && BigInt(totalFee.value) > BigInt(0) ? (
        // <FeeDeductionSlider />
        <FeeDeductionRadioButtons disabled={feeOptionDisabled} />
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
