import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setTargetAddress } from '../../store/optionSlice'
import {
  selectMode,
  selectSourceChain,
  selectTargetAddress,
  selectTargetChain
} from '../../store/selectors'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { ModeOptions } from '../../interface'
import { ChainCompatibility, ChainData } from '@plugins/pluginTypes'
import log from '@utils/logger'

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
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const { walletAddress: sourceAddress, isReady } = useIsWalletReady()
  const targetAddress = useSelector(selectTargetAddress)

  const isCompatible = (
    sourceChain: ChainData,
    targetChain: ChainData
  ): boolean => {
    return sourceChain.compatibility === targetChain.compatibility
  }

  useEffect(() => {
    // in a payment scenario, the target address should be provided
    // by the dApp and never changed
    if (mode === ModeOptions.payment) return

    // when both source and target addresses are compatible
    if (isCompatible(sourceChain, targetChain)) {
      // previous manual input
      if (targetAddress !== '') return

      dispatch(setTargetAddress(isReady && sourceAddress ? sourceAddress : ''))
      return
    }

    log.debug(
      'AddressInput:: source or target chain non EVM. resetting target address'
    )

    // when the source or target chain is not EVM, the address
    // formats may not be compatible, so reset the target address
    dispatch(setTargetAddress(''))
  }, [sourceChain, targetChain, sourceAddress, isReady, mode, dispatch])

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
