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
  selectSourceCurrency,
  selectTargetCurrency,
  selectBackendUrl,
  selectSourceAddress,
  selectTargetAddress,
  selectNetworkOption
} from '../../store/selectors'
import { BankInput, CoinDropdown, WalletButton } from './'
import { setAmount } from '../../store/optionSlice'
import { ModeOptions, NetworkOptions } from '../../interface'
import AddressInput from './AddressInput'
import { ChainName } from '../../utils/constants'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import NetworkSelector from '@components/primary/NetworkSelector'
import { parseUnits } from 'viem'
// import { formatBigInt } from 'src/helpers/functions'
import { ChainCompatibility } from '@plugins/pluginTypes'
import { formatBigInt } from 'src/helpers/functions'

const SingleForm = ({
  balance,
  decimals,
  isLoadingFees
}: {
  balance: bigint | undefined
  decimals: number | undefined
  isLoadingFees: boolean
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const theme = useSelector(selectTheme)
  const feeDeduct = useSelector(selectFeeDeduct)
  const networkOption = useSelector(selectNetworkOption)
  const { totalFee } = useSelector(selectServiceFee)
  const compliantOption = useSelector(selectCompliantOption)
  const targetCompliant = useSelector(selectTargetCompliant)
  const sourceNetwork = useSelector(selectSourceChain)
  const targetNetwork = useSelector(selectTargetChain)
  const { isReady } = useIsWalletReady()
  const [amountValue, setAmountValue] = useState('')
  const amount = useSelector(selectAmount)

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
    if (!balance) return 0
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

  return (
    <div className='single-form'>
      <div className='form-item'>
        <span className='label'>Source Network:</span>
        <div className='items'>
          <NetworkSelector type='origin' />
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
            className={`form-item wallet-button-item ${isReady && 'connected'}`}
          >
            <span className='label'>Wallet:</span>
            <WalletButton />
          </div>
        )}

        {mode === ModeOptions.bridge && (
          <div className='form-item'>
            <span className='label'>Target Network:</span>
            <div className='items'>
              <NetworkSelector type='target' />
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
            />
          </div>
        )
      ) : null}

      <div className={`form-item ${theme.colorMode}`}>
        <span className='label'>Amount:</span>
        <div className={`amount-label-container items ${theme.colorMode}`}>
          <input
            className={`${theme.colorMode}`}
            type='text'
            placeholder='Enter amount'
            value={amountValue || ''}
            onChange={(e) => {
              const value = e.target.value

              // Allow numbers and a single dot for decimals
              let maskedValue = value
                .replace(/[^0-9.]/g, '') // Remove non-numeric and non-dot characters
                .replace(/(\..*?)\..*/g, '$1') // Allow only one dot
                .replace(new RegExp(`(\\.\\d{${decimals}})\\d+`), '$1') // Limit decimal places

              const isTestnet = networkOption === NetworkOptions.testnet
              // Cap value at 100 if environment is TESTNET
              const numericValue = parseFloat(maskedValue)
              if (isTestnet && numericValue > 100) {
                maskedValue = '100'
              }

              setAmountValue(maskedValue)
              dispatch(setAmount(maskedValue))
            }}
          />
          <div className='max-disclaimer'>
            <span
              className='max-button'
              onClick={() => {
                const isTestnet = networkOption === NetworkOptions.testnet
                const cappedValue = isTestnet
                  ? Math.min(Number(maxValue), 100).toString()
                  : maxValue.toString()

                setAmountValue(cappedValue)
                dispatch(setAmount(cappedValue))
              }}
            >
              Max
            </span>
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
