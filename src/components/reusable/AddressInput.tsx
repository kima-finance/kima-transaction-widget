import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTargetAddress } from '../../store/optionSlice'
import {
  selectMode,
  selectSourceChain,
  selectTargetAddress,
  selectTargetChain
} from '../../store/selectors'
import useIsWalletReady from '../../hooks/useIsWalletReady'
import { ModeOptions } from '../../interface'
import log from '@utils/logger'
import { isEVMChain, lightDemoAccounts } from '@utils/constants'
import { isSolana, isTron } from 'src/helpers/functions'

const AddressInput = ({
  theme,
  placeholder,
  initialSelection
}: {
  theme: string
  placeholder: string
  initialSelection: { sourceSelection: boolean; targetSelection: boolean }
}) => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const targetChain = useSelector(selectTargetChain)
  const { connectedAddress: sourceAddress, isReady } = useIsWalletReady()
  const targetAddress = useSelector(selectTargetAddress)

  useEffect(() => {
    if (mode === ModeOptions.payment) return

    // ✅ In LIGHT mode, do nothing
    if (mode === ModeOptions.light && !initialSelection) {
      if (isEVMChain(targetChain.shortName))
        dispatch(setTargetAddress(lightDemoAccounts.EVM))
      if (isSolana(targetChain.shortName))
        dispatch(setTargetAddress(lightDemoAccounts.SOL))
      if (isTron(targetChain.shortName))
        dispatch(setTargetAddress(lightDemoAccounts.TRX))

      return
    }

    const bothEVM =
      isEVMChain(sourceChain.shortName) && isEVMChain(targetChain.shortName)

    if (bothEVM && isReady) {
      if (targetAddress !== '') return
      dispatch(setTargetAddress(sourceAddress ?? ''))
    } else {
      console.log('dispatching target address from address input')
      dispatch(setTargetAddress(''))
    }
  }, [
    sourceChain.shortName,
    targetChain.shortName,
    sourceAddress,
    targetAddress,
    isReady,
    mode,
    dispatch
  ])

  return (
    <input
      className={`kima-address-input ${theme}`}
      type='text'
      placeholder={placeholder}
      value={
        initialSelection.sourceSelection || initialSelection.targetSelection
          ? ''
          : targetAddress
      }
      onChange={(e) => dispatch(setTargetAddress(e.target.value))}
      spellCheck={false}
    />
  )
}

export default AddressInput
