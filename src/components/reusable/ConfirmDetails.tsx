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
  const {
    totalFee,
    targetFee,
    sourceFee,
    kimaFee,
    allowanceAmount,
    submitAmount
  } = useSelector(selectServiceFee)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const targetAddress = useSelector(selectTargetAddress)
  const bankDetails = useSelector(selectBankDetails)
  const signature = useSelector(selectSignature)
  const networkOptions = useSelector(selectNetworks)

  const transactionOption = useSelector(selectTransactionOption)
  const { connectedAddress } = useIsWalletReady()
  const sourceChainOption = useMemo(
    () => networkOptions.filter((network) => network.id === sourceChain.id)[0],
    [networkOptions, sourceChain]
  )
  const targetChainOption = useMemo(
    () =>
      networkOptions.filter(
        (network) =>
          network.shortName ===
          (mode === ModeOptions.payment
            ? transactionOption?.targetChain
            : targetChain.shortName)
      )[0],
    [networkOptions, sourceChain]
  )
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const { width, updateWidth } = useWidth()

  const [feeCollapsed, setFeeCollapsed] = useState(true)

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
      sourceChain.shortName === ChainName.BTC ||
      targetChain.shortName === ChainName.BTC
    ) {
      return (feeDeduct ? +amount : +amount + totalFee).toFixed(8)
    }

    return formatterFloat.format(feeDeduct ? +amount : +amount + totalFee)
  }, [amount, totalFee, sourceChain, targetChain, feeDeduct])

  return (
    <div className={`confirm-details ${theme.colorMode}`}>
      <p>
        Step {isApproved ? '2' : '1'}&nbsp;of 2&nbsp;&nbsp;&nbsp;
        {isApproved
          ? 'Submit transaction'
          : sourceChain.shortName === ChainName.FIAT
            ? 'Bank Details'
            : 'Approval'}
      </p>
      {sourceChain.shortName === ChainName.FIAT ? (
        <div>
          <div className='detail-item'>
            <span className='label'>IBAN:</span>
            <span className={`kima-card-network-label ${theme.colorMode}`}>
              <ChainIcon symbol={sourceChainOption?.shortName} />
              {/* <div className='icon'>
                <sourceChainOption.icon />
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
            Source{sourceChain.shortName !== 'CC' && ' wallet'}:
          </span>
          <div className='network-details'>
            <div className='kima-card-network-container'>
              <span className={`kima-card-network-label ${theme.colorMode}`}>
                <ChainIcon symbol={sourceChainOption?.shortName} />
                {sourceChainOption.name}
              </span>
            </div>
            {sourceChain.shortName !== 'CC' && (
              <p className={theme.colorMode}>
                {width >= 916
                  ? dAppOption === DAppOptions.LPDrain
                    ? targetAddress
                    : connectedAddress
                  : dAppOption === DAppOptions.LPDrain
                    ? targetconnectedAddress
                    : sourceconnectedAddress}
              </p>
            )}
          </div>
        </div>
      )}
      <div className='detail-item amount'>
        <span className='amount-container'>
          <div className='amount-details'>
            <span>Amount to Transfer</span>
            <div className='coin-details'>
              <p>
                {feeDeduct ? submitAmount : allowanceAmount} {sourceCurrency}
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
                {formatterFloat.format(totalFee || 0)} {sourceCurrency}
              </span>
            </div>
          </div>
          <div className={`fee-breakdown ${feeCollapsed ? 'collapsed' : ''}`}>
            <div className='amount-details'>
              <span>Source Network Fee ({sourceChain.shortName})</span>
              <span className='service-fee'>
                {sourceFee || 0} {sourceCurrency}
              </span>
            </div>
            <div className='amount-details'>
              <span>Target Network Fee ({targetChain.shortName})</span>
              <span className='service-fee'>
                {targetFee || 0} {targetCurrency}
              </span>
            </div>
            <div className='amount-details'>
              <span>KIMA Service Fee</span>
              <span className='service-fee'>
                {kimaFee} {sourceCurrency}
              </span>
            </div>
          </div>
          <div className='amount-details'>
            <span>Target Amount</span>
            <div className='coin-details'>
              <p>
                {feeDeduct ? +submitAmount-totalFee : +submitAmount}{' '}
                {sourceCurrency}
              </p>
            </div>
          </div>
        </span>
      </div>
      {targetChain.shortName === ChainName.FIAT ? (
        <div>
          <div className='detail-item'>
            <span className='label'>IBAN:</span>
            <p>{bankDetails.iban}</p>
            <span className={`kima-card-network-label ${theme.colorMode}`}>
              <ChainIcon symbol={targetChainOption?.shortName} />
              {/* <div className='icon'>
                <targetChainOption.icon />
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
                <ChainIcon symbol={targetChainOption?.shortName} />
                {targetChainOption?.name}
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
      {mode === ModeOptions.bridge && totalFee > 0 ? (
        // <FeeDeductionSlider />
        <FeeDeductionRadioButtons isSigned={isSigned} />
      ) : null}

      {/* {mode === ModeOptions.bridge && totalFee > 0 && (
        <span className='transfer-notice'>
          {feeDeduct
            ? `You will transfer exactly $${amount} ${sourceCurrency} from ${sourceChain}, and the fee of $${totalFee} will be deducted on the target network (${targetChain}) receiving $${Number(amount) - totalFee} ${targetCurrency}.`
            : `You will send $${Number(amount) + totalFee} ${sourceCurrency} from ${sourceChain}, ensuring ${amount} ${targetCurrency} arrives in the target network (${targetChain}).`}
        </span>
      )} */}
    </div>
  )
}

export default ConfirmDetails
