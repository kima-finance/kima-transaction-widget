import React, { useEffect, useMemo } from 'react'
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

const ConfirmDetails = ({ isApproved }: { isApproved: boolean }) => {
  const dispatch = useDispatch()
  const feeDeduct = useSelector(selectFeeDeduct)
  const mode = useSelector(selectMode)
  const dAppOption = useSelector(selectDappOption)
  const theme = useSelector(selectTheme)
  const amount = useSelector(selectAmount)
  const { totalFeeUsd, targetNetworkFee, sourceNetworkFee } =
    useSelector(selectServiceFee)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const targetAddress = useSelector(selectTargetAddress)
  const bankDetails = useSelector(selectBankDetails)
  const signature = useSelector(selectSignature)
  const networkOptions = useSelector(selectNetworks)

  const transactionOption = useSelector(selectTransactionOption)
  const { walletAddress } = useIsWalletReady()
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

  useEffect(() => {
    width === 0 && updateWidth(window.innerWidth)
  }, [])

  const sourceWalletAddress = useMemo(() => {
    return width >= 916
      ? walletAddress
      : getShortenedAddress(walletAddress || '')
  }, [width, walletAddress])

  const targetWalletAddress = useMemo(() => {
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
      return (feeDeduct ? +amount : +amount + totalFeeUsd).toFixed(8)
    }

    return formatterFloat.format(feeDeduct ? +amount : +amount + totalFeeUsd)
  }, [amount, totalFeeUsd, sourceChain, targetChain, feeDeduct])

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
                    : walletAddress
                  : dAppOption === DAppOptions.LPDrain
                    ? targetWalletAddress
                    : sourceWalletAddress}
              </p>
            )}
          </div>
        </div>
      )}
      <div className='detail-item amount'>
        <span className='label'>
          Transaction
          {width > 500 && <br />}
          Details:
        </span>
        <span className='amount-container'>
          <div className='amount-details'>
            <span>Source Transfer amount</span>
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
            <span>Source Network Fee ({sourceChain.shortName})</span>
            <span className='service-fee'>
              {formatterFloat.format(sourceNetworkFee?.amount || 0)}{' '}
              {sourceCurrency}
            </span>
          </div>
          <div className='amount-details'>
            <span>Target Network Fee ({targetChain.shortName})</span>
            <span className='service-fee'>
              {formatterFloat.format(targetNetworkFee?.amount || 0)}{' '}
              {sourceCurrency}
            </span>
          </div>
          {/* TODO: Implement when the new service fee comes in
          <div className='amount-details'>
            <span>Business Fee ({sourceChain})</span>
            <span className='service-fee'>
              {formatterFloat.format(totalFeeUsd)} {sourceCurrency}
            </span>
          </div> */}
          <div className='amount-details'>
            <span>Target Transfer Amount</span>
            <span className='service-fee'>
              {!feeDeduct
                ? formatterFloat.format(Number(amount))
                : formatterFloat.format(Number(amount) - totalFeeUsd)}{' '}
              {targetCurrency}
            </span>
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
                  ? walletAddress
                  : targetAddress
                : dAppOption === DAppOptions.LPDrain
                  ? sourceWalletAddress
                  : targetWalletAddress}
            </p>
          </div>
        </div>
      )}

      {/* checkbox shall only be displayed in transfer scenario */}
      {mode === ModeOptions.bridge && totalFeeUsd > 0 ? (
        // <FeeDeductionSlider />
        <FeeDeductionRadioButtons />
      ) : null}

      {/* {mode === ModeOptions.bridge && totalFeeUsd > 0 && (
        <span className='transfer-notice'>
          {feeDeduct
            ? `You will transfer exactly $${amount} ${sourceCurrency} from ${sourceChain}, and the fee of $${totalFeeUsd} will be deducted on the target network (${targetChain}) receiving $${Number(amount) - totalFeeUsd} ${targetCurrency}.`
            : `You will send $${Number(amount) + totalFeeUsd} ${sourceCurrency} from ${sourceChain}, ensuring ${amount} ${targetCurrency} arrives in the target network (${targetChain}).`}
        </span>
      )} */}
    </div>
  )
}

export default ConfirmDetails
