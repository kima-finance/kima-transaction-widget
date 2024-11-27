import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setTargetAddress } from '../../store/optionSlice'
import {
  selectSourceChain,
  selectTargetAddress,
  selectTargetChain
} from '../../store/selectors'
import useIsWalletReady from '../../hooks/useIsWalletReady'

/**
 * Component for target address input
 * @component
 * @props
 * @returns
 */

const AddressInput = ({
  theme,
  placeholder
}: {
  theme: string
  placeholder: string
}) => {
  const dispatch = useDispatch()
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const { walletAddress: sourceAddress, isReady } = useIsWalletReady()
  const targetAddress = useSelector(selectTargetAddress)

  const isEvm = (chain: string): boolean => {
    return chain !== 'SOL' && chain !== 'TRX' && chain !== 'BTC'
  }

  const resetTargetAddress = () => {
    dispatch(setTargetAddress(''))
  }

  useEffect(() => {
    // case evm source && !evm target
    if (isEvm(sourceChain) && !isEvm(targetChain)) {
      resetTargetAddress()
      return
    }

    if (!isEvm(sourceChain) && isEvm(targetChain)) {
      resetTargetAddress()
      return
    }

    isReady && dispatch(setTargetAddress(sourceAddress || ''))
  }, [sourceChain, targetChain, sourceAddress, isReady, dispatch])

  return (
    <input
      className={`kima-address-input ${theme}`}
      type='text'
      placeholder={placeholder}
      value={targetAddress}
      onChange={(e) => dispatch(setTargetAddress(e.target.value))}
      spellCheck={false}
    />
  )
}

export default AddressInput
