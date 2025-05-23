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
  selectServiceFee,
  selectFeeDeduct,
  selectAmount,
  selectSourceAddress,
  selectTargetAddress,
  selectSourceCurrency,
  selectTargetCurrency,
  selectBackendUrl
} from '../../store/selectors'
import { BankInput, CoinDropdown, WalletButton } from './'
import { setAmount, setServiceFee } from '../../store/optionSlice'
import { ModeOptions } from '../../interface'
import AddressInput from './AddressInput'
import { ChainName } from '../../utils/constants'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import NetworkSelector from '@components/primary/NetworkSelector'
import { parseUnits } from 'viem'
// import { formatBigInt } from 'src/helpers/functions'
import { ChainCompatibility } from '@plugins/pluginTypes'
import { bigIntToNumber, formatBigInt } from 'src/helpers/functions'
import { useKimaContext } from 'src/KimaProvider'
import { useGetEnvOptions } from '../../hooks/useGetEnvOptions'
import useGetFees from '../../hooks/useGetFees'
import useBalance from '../../hooks/useBalance'
import { truncateToDecimals } from '@utils/functions'

const SingleForm = ({
  isLoadingFees,
  initialSelection,
  setInitialSelection
}: {
  isLoadingFees: boolean
  initialSelection: {
    sourceSelection: boolean
    targetSelection: boolean
  }
  setInitialSelection: React.Dispatch<
    React.SetStateAction<{
      sourceSelection: boolean
      targetSelection: boolean
    }>
  >
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const feeDeduct = useSelector(selectFeeDeduct)
  const { totalFee } = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const sourceAddress = useSelector(selectSourceAddress)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const targetAddress = useSelector(selectTargetAddress)
  const { isReady } = useIsWalletReady()
  const [amountValue, setAmountValue] = useState('')
  const amount = useSelector(selectAmount)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const targetCurrency = useSelector(selectTargetCurrency)
  const backendUrl = useSelector(selectBackendUrl)
  const { balance, decimals } = useBalance()

  const {
    data: fees,
    isLoading,
    error
  } = useGetFees({
    amount: parseFloat(amount),
    sourceNetwork: sourceNetwork.shortName,
    sourceAddress,
    sourceSymbol: sourceCurrency,
    targetNetwork: targetNetwork.shortName,
    targetAddress,
    targetSymbol: targetCurrency,
    backendUrl
  })

  useEffect(() => {
    if (fees) {
      dispatch(setServiceFee(fees))
    }
  }, [fees, dispatch])
  const { kimaBackendUrl } = useKimaContext()
  const { data: envOptions } = useGetEnvOptions({ kimaBackendUrl })

  const errorMessage = useMemo(
    () =>
      compliantOption &&
      targetCompliant !== null &&
      !targetCompliant?.isCompliant
        ? `Target address has ${targetCompliant.results?.[0].result.risk_score} risk`
        : '',
    [compliantOption, targetCompliant]
  )

  const maxValue = useMemo(() => {
    if (mode === ModeOptions.light)
      return BigInt(
        envOptions?.transferLimitMaxUSDT
          ? parseFloat(envOptions?.transferLimitMaxUSDT)
          : 1000
      )

    if (!balance) return BigInt(0)
    if (totalFee.value === BigInt(0)) return balance

    const intAmount = parseUnits(amount, totalFee.decimals)
    return balance - intAmount
  }, [balance, totalFee, feeDeduct])

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    if (amountValue && amount !== '') return
    setAmountValue(amount)
  }, [amount])

  const onAmountChange = (value: string) => {
    // Allow numbers and a single dot for decimals
    let maskedValue = value
      .replace(/[^0-9.]/g, '') // Remove non-numeric and non-dot characters
      .replace(/(\..*?)\..*/g, '$1') // Allow only one dot
      .replace(new RegExp(`(\\.\\d{${decimals}})\\d+`), '$1') // Limit decimal places

    if (envOptions?.transferLimitMaxUSDT) {
      // enforce max transfer limit
      const txLimit = parseFloat(envOptions.transferLimitMaxUSDT)
      const numericValue = parseFloat(maskedValue)
      if (numericValue > txLimit) {
        maskedValue = txLimit.toString()
      }
    }

    setAmountValue(maskedValue)
    dispatch(setAmount(maskedValue))
  }

  const onMaxClick = () => {
    if (initialSelection.sourceSelection) return
    // the max amount the user can transfer is either
    // their balance (minus fees) or the transfer limit
    const txLimit = envOptions?.transferLimitMaxUSDT
      ? parseFloat(envOptions.transferLimitMaxUSDT)
      : Number.MAX_VALUE

    const rawMax = bigIntToNumber({
      value: maxValue,
      decimals: decimals as number
    })
    const cappedValue = Math.min(rawMax, txLimit)

    const truncated = truncateToDecimals(cappedValue, 2).toString()
    setAmountValue(truncated)
    dispatch(setAmount(truncated))
  }

  const isConnected = useMemo(() => {
    return isReady && !initialSelection.sourceSelection
  }, [isReady, initialSelection])

  return (
    <div className='single-form'>
      <div className='form-item'>
        <span className='label'>Source Network:</span>
        <div className='items'>
          <NetworkSelector
            type='origin'
            {...{
              initialSelection: initialSelection.sourceSelection,
              setInitialSelection
            }}
          />
          <CoinDropdown />
        </div>
      </div>

      <div
        className={`dynamic-area ${
          sourceNetwork.shortName === ChainName.FIAT ? 'reverse' : '1'
        }`}
      >
        {sourceNetwork.compatibility !== ChainCompatibility.CC && (
          <div
            className={`form-item wallet-button-item ${isConnected && 'connected'}`}
          >
            <span className='label'>Wallet:</span>
            <WalletButton initialSelection={initialSelection.sourceSelection} />
          </div>
        )}

        {mode !== ModeOptions.payment && (
          <div className='form-item'>
            <span className='label'>Target Network:</span>
            <div className='items'>
              <NetworkSelector
                type='target'
                {...{
                  initialSelection: initialSelection.targetSelection,
                  setInitialSelection
                }}
              />
              <CoinDropdown isSourceChain={false} />
            </div>
          </div>
        )}
      </div>

      {mode === ModeOptions.bridge &&
      sourceNetwork.shortName !== ChainName.FIAT ? (
        targetNetwork.shortName === ChainName.FIAT ? (
          <BankInput />
        ) : (
          <div className={`form-item ${theme.colorMode}`}>
            <span className='label'>Target Address:</span>
            <AddressInput
              theme={theme.colorMode as string}
              placeholder='Target address'
              initialSelection={initialSelection}
            />
          </div>
        )
      ) : null}

      {mode === ModeOptions.light && (
        <div
          className={`form-item wallet-button-item ${!initialSelection.targetSelection && 'connected'}`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span className='label'>Target Wallet:</span>
          <WalletButton
            initialSelection={initialSelection.targetSelection}
            placeholder={true}
          />
        </div>
      )}

      <div className={`form-item ${theme.colorMode}`}>
        <span className='label'>Amount:</span>
        <div className={`amount-label-container items ${theme.colorMode}`}>
          <input
            className={`${theme.colorMode}`}
            type='text'
            placeholder='Enter amount'
            value={amountValue || ''}
            onChange={(e) => onAmountChange(e.target.value)}
          />
          <div className='max-disclaimer'>
            {sourceNetwork.shortName !== 'CC' && (
              <span className='max-button' onClick={onMaxClick}>
                Max
              </span>
            )}
            {+totalFee !== -1 && (
              <p className='fee-amount'>
                Est fees:{' '}
                <span className={`${isLoadingFees ? 'loading' : ''}`}>
                  {' '}
                  {isLoadingFees ? '' : `$ ${formatBigInt(totalFee)} USD`}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleForm
