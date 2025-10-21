import useWidth from '@kima-widget/shared/lib/hooks/useWidth'
import {
  selectDappOption,
  selectFeeDeduct,
  selectMode,
  selectNetworks,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectTargetAddress,
  selectTargetChain,
  selectTargetCurrency,
  selectTheme,
  selectTransactionOption
} from '@kima-widget/shared/store/selectors'
import { ChainName, DAppOptions, ModeOptions } from '@kima-widget/shared/types'
import useIsWalletReady from '@kima-widget/widgets/transfer/hooks/useIsWalletReady'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import ChainIcon from './ChainIcon'
import {
  formatBigInt,
  bigIntChangeDecimals
} from '@kima-widget/shared/lib/bigint'
import { MiniArrowIcon } from '@kima-widget/assets/icons'
import FeeDeductionRadioButtons from './FeeDeductionRadioButtons'
import { isSamePeggedToken } from '@kima-widget/shared/lib/misc'
import log from '@kima-widget/shared/logger'

type BigAmt = { value: bigint; decimals: number }

const scaleUp = (value: bigint, diff: number) =>
  diff <= 0 ? value : value * 10n ** BigInt(diff)

const sumBigAmts = (amts: BigAmt[]): BigAmt => {
  const present = amts.filter(Boolean) as BigAmt[]
  if (present.length === 0) return { value: 0n, decimals: 0 }
  const maxDec = present.reduce((m, a) => Math.max(m, a.decimals), 0)
  const total = present.reduce(
    (acc, a) => acc + scaleUp(a.value, maxDec - a.decimals),
    0n
  )
  return { value: total, decimals: maxDec }
}

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

  const {
    transactionValues,
    sourceFee,
    targetFee,
    kimaFee,
    totalFee,
    swapFee,
    swapInfo
  } = useSelector(selectServiceFee)

  const originNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const targetAddress = useSelector(selectTargetAddress)
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
    [
      networkOptions,
      originNetwork,
      mode,
      transactionOption,
      targetNetwork.shortName
    ]
  )

  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const { width, updateWidth } = useWidth()

  // Swap detection by peggedTo
  const isSwap = useMemo(
    () =>
      !isSamePeggedToken(
        originNetwork,
        sourceCurrency,
        targetNetwork,
        targetCurrency
      ),
    [originNetwork, sourceCurrency, targetNetwork, targetCurrency]
  )

  // Treat "amount" as the base submit value returned by backend
  // (backend returns the same 'amount' on both feeFromOrigin/feeFromTarget for transfers)
  const baseSubmit = useMemo(
    () => transactionValues.feeFromOrigin.submitAmount,
    [transactionValues.feeFromOrigin.submitAmount]
  )

  // Convert totalFee into base submit decimals once
  const totalFeeInSubmitDec = useMemo(
    () =>
      bigIntChangeDecimals({
        ...totalFee,
        newDecimals: baseSubmit.decimals
      }),
    [totalFee, baseSubmit.decimals]
  )

  // Amount to Transfer (payer debit on source)
  const amountToTransferBig = useMemo(() => {
    const val = feeDeduct
      ? baseSubmit.value // deduct at origin → amount
      : baseSubmit.value + totalFeeInSubmitDec.value // deduct at target → amount + fees
    return { value: val, decimals: baseSubmit.decimals }
  }, [feeDeduct, baseSubmit, totalFeeInSubmitDec])

  // Target Transfer Amount (what receiver gets)
  const targetTransferBig = useMemo(() => {
    if (isSwap) {
      if (swapInfo?.amountOutBigInt) return swapInfo.amountOutBigInt
      return transactionValues.feeFromOrigin.submitAmount
    }
    const minus = baseSubmit.value - totalFeeInSubmitDec.value
    const val = feeDeduct
      ? minus > 0n
        ? minus
        : 0n // deduct at origin → amount - fees
      : baseSubmit.value // deduct at target → amount
    return { value: val, decimals: baseSubmit.decimals }
  }, [
    isSwap,
    swapInfo?.amountOutBigInt,
    transactionValues.feeFromOrigin.submitAmount,
    baseSubmit.value,
    baseSubmit.decimals,
    totalFeeInSubmitDec.value,
    feeDeduct
  ])

  const combinedSwapFees = useMemo(
    () =>
      sumBigAmts([sourceFee, targetFee, swapFee ?? { value: 0n, decimals: 0 }]),
    [sourceFee, targetFee, swapFee]
  )

  useEffect(() => {
    width === 0 && updateWidth(window.innerWidth)
  }, [width, updateWidth])

  useEffect(() => {
    log.debug('[ConfirmDetails] render', {
      isSwap,
      sourceCurrency,
      targetCurrency,
      totalFee,
      hasSwapInfo: !!swapInfo
    })
  }, [isSwap, sourceCurrency, targetCurrency, totalFee, swapInfo])

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

      <div className='detail-item'>
        <span className='label'>
          Source{!['BANK', 'CC'].includes(originNetwork.shortName) && ' wallet'}
          :
        </span>
        <div className='network-details'>
          <div className='kima-card-network-container'>
            <span className={`kima-card-network-label ${theme.colorMode}`}>
              <ChainIcon symbol={originNetwork?.shortName} />
              {originNetwork.name}
            </span>
          </div>
          {!['CC', 'BANK'].includes(originNetwork.shortName) && (
            <p className={theme.colorMode}>
              {dAppOption === DAppOptions.LPDrain
                ? targetAddress
                : connectedAddress}
            </p>
          )}
        </div>
      </div>

      <div className='detail-item amount'>
        <span className='amount-container'>
          <div className='amount-details'>
            <span>Amount to Transfer</span>
            <div className='coin-details'>
              <p>
                {formatBigInt(amountToTransferBig)} {sourceCurrency}
              </p>
            </div>
          </div>

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

          <div className={`fee-breakdown ${feeCollapsed ? 'collapsed' : ''}`}>
            {isSwap ? (
              <>
                <div className='amount-details'>
                  <span>Swap Fees</span>
                  <span className='service-fee'>
                    {formatBigInt(combinedSwapFees)} {sourceCurrency}
                  </span>
                </div>
                <div className='amount-details'>
                  <span>Kima Processing Fees</span>
                  <span className='service-fee'>
                    {formatBigInt(kimaFee)} {sourceCurrency}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className='amount-details'>
                  <span>
                    {['BANK', 'CC'].includes(originNetwork.shortName)
                      ? `${originNetwork.name} Processing Fee`
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
              </>
            )}
          </div>

          <div className='amount-details'>
            <span>Target Transfer Amount</span>
            <span className='service-fee'>
              {formatBigInt(targetTransferBig)} {targetCurrency}
            </span>
          </div>
        </span>
      </div>

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
                ? 'Ff6z...demoSol'
                : targetNetwork.shortName === 'TRX'
                  ? 'TQx...demoTrx'
                  : '0xDEMO...EVM'
              : dAppOption === DAppOptions.LPDrain
                ? connectedAddress
                : targetAddress}
          </p>
        </div>
      </div>

      {!isSwap &&
        mode === ModeOptions.bridge &&
        BigInt(totalFee.value) > 0n && (
          <FeeDeductionRadioButtons disabled={feeOptionDisabled} />
        )}
    </div>
  )
}

export default ConfirmDetails
