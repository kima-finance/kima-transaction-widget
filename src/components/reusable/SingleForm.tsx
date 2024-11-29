import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCompliantOption,
  selectMode,
  selectSourceChain,
  selectTargetCompliant,
  selectTargetChain,
  selectTheme,
  selectTransactionOption,
  selectServiceFee,
  selectFeeDeduct,
  selectAmount,
  selectTargetCurrency,
  selectNetworkOption
} from '../../store/selectors'
import { BankInput, CustomCheckbox, WalletButton } from './'
import { setAmount, setFeeDeduct } from '../../store/optionSlice'
import { ModeOptions, NetworkOptions } from '../../interface'
import AddressInput from './AddressInput'
import { COIN_LIST, ChainName } from '../../utils/constants'
import { formatterFloat } from '../../helpers/functions'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import SourceNetworkSelector from '@components/primary/SourceNetworkSelector'
import SourceTokenSelector from '@components/primary/SourceTokenSelector'
import TargetNetworkSelector from '@components/primary/TargetNetworkSelector'
import TargetTokenSelector from '@components/primary/TargetTokenSelector'
import { selectBackendUrl } from '@store/selectors'
import useGetFees from '../../hooks/useGetFees'
import { setServiceFee } from '@store/optionSlice'

const SingleForm = ({}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const networkOpion = useSelector(selectNetworkOption)
  const feeDeduct = useSelector(selectFeeDeduct)
  const { totalFeeUsd } = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const transactionOption = useSelector(selectTransactionOption)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const { isReady } = useIsWalletReady()
  const [amountValue, setAmountValue] = useState('')
  const amount = useSelector(selectAmount)
  const targetCurrency = useSelector(selectTargetCurrency)
  const backendUrl = useSelector(selectBackendUrl)

  const {
    data: fees,
    isLoading,
    error
  } = useGetFees(parseFloat(amount), sourceNetwork, targetNetwork, backendUrl)

  useEffect(() => {
    if (fees) {
      dispatch(setServiceFee(fees))
    }
  }, [fees, dispatch])

  const TargetIcon =
    COIN_LIST[targetCurrency || 'USDK']?.icon || COIN_LIST['USDK'].icon

  const errorMessage = useMemo(
    () =>
      compliantOption &&
      targetCompliant !== null &&
      !targetCompliant?.isCompliant
        ? `Target address has ${targetCompliant.results?.[0].result.risk_score} risk`
        : '',
    [compliantOption, targetCompliant]
  )

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    if (amountValue && amount != '') return
    setAmountValue(amount)
  }, [amount])

  return (
    <div className='single-form'>
      <div className='form-item'>
        <span className='label'>Source Network:</span>
        <div className='items'>
          <SourceNetworkSelector />
          {networkOpion === NetworkOptions.mainnet ? (
            <SourceTokenSelector />
          ) : (
            <div className={`amount-label-container items ${theme.colorMode}`}>
              <div className={`coin-wrapper ${theme.colorMode}`}>
                <div className='icon-wrapper'>{<TargetIcon />}</div>
                {targetCurrency}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`dynamic-area ${
          sourceNetwork === ChainName.FIAT ? 'reverse' : '1'
        }`}
      >
        <div
          className={`form-item wallet-button-item ${isReady && 'connected'}`}
        >
          <span className='label'>Connect wallet:</span>
          <WalletButton />
        </div>

        <div className='form-item'>
          <span className='label'>Target Network:</span>
          <div className='items'>
            <TargetNetworkSelector />
            {networkOpion === NetworkOptions.mainnet ? (
              <TargetTokenSelector />
            ) : (
              <div
                className={`amount-label-container items ${theme.colorMode}`}
              >
                <div className={`coin-wrapper ${theme.colorMode}`}>
                  <div className='icon-wrapper'>{<TargetIcon />}</div>
                  {targetCurrency}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mode === ModeOptions.bridge && sourceNetwork !== ChainName.FIAT ? (
        targetNetwork === ChainName.FIAT ? (
          <BankInput />
        ) : (
          <div className={`form-item ${theme.colorMode}`}>
            <span className='label'>Target Address:</span>
            <AddressInput
              theme={theme.colorMode as string}
              placeholder='Target address'
            />
          </div>
        )
      ) : null}

      {mode === ModeOptions.bridge ? (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Amount:</span>
          <div className={`amount-label-container items ${theme.colorMode}`}>
            <input
              className={`${theme.colorMode}`}
              type='number'
              placeholder='Amount'
              value={amountValue || ''}
              onChange={(e) => {
                let _amount = +e.target.value
                const decimal =
                  sourceNetwork === ChainName.BTC ||
                  targetNetwork === ChainName.BTC
                    ? 8
                    : 2
                setAmountValue(e.target.value)
                dispatch(setAmount(_amount.toFixed(decimal)))
              }}
            />
          </div>
        </div>
      ) : (
        <div className={`form-item ${theme.colorMode}`}>
          <span className='label'>Amount:</span>
          <div className={`amount-label-container items ${theme.colorMode}`}>
            <input
              className={`${theme.colorMode}`}
              type='number'
              placeholder='Amount'
              value={transactionOption?.amount || amountValue || ''}
              onChange={(e) => {
                let _amount = +e.target.value
                const decimal =
                  sourceNetwork === ChainName.BTC ||
                  targetNetwork === ChainName.BTC
                    ? 8
                    : 2
                setAmountValue(e.target.value)
                dispatch(setAmount(_amount.toFixed(decimal)))
              }}
              disabled={transactionOption?.amount !== undefined}
            />
            <div className={`coin-wrapper ${theme.colorMode}`}>
              <div className='icon-wrapper'>{<TargetIcon />}</div>
              {targetCurrency}
            </div>
          </div>
        </div>
      )}

      {totalFeeUsd > 0 ? (
        <CustomCheckbox
          text={
            sourceNetwork === ChainName.BTC
              ? `Deduct ${formatterFloat.format(totalFeeUsd)} BTC fee`
              : `Deduct $${formatterFloat.format(totalFeeUsd)} fee`
          }
          checked={feeDeduct}
          setCheck={(value: boolean) => dispatch(setFeeDeduct(value))}
        />
      ) : null}
    </div>
  )
}

export default SingleForm
