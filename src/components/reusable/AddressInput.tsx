import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEVMChain, isSolana, isTron } from '@kima-widget/shared/lib/addresses'
import { setTargetAddress } from '@kima-widget/shared/store/optionSlice'
import {
  selectMode,
  selectSourceChain,
  selectTargetAddress,
  selectTargetChain
} from '@kima-widget/shared/store/selectors'
import { lightDemoAccounts, ModeOptions } from '@kima-widget/shared/types'
import useIsWalletReady from '@kima-widget/widgets/transfer/hooks/useIsWalletReady'

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
  const { connectedAddress: sourceAddress, isReady } = useIsWalletReady()
  const targetAddress = useSelector(selectTargetAddress)

  // Guard so auto-fill happens at most once per target-network change
  const didAutofill = useRef<string | null>(null) // tracks last targetChain.shortName we autofilled for

  // Reset the autofill guard whenever target network changes
  useEffect(() => {
    didAutofill.current = null
  }, [targetChain.shortName])

  // LIGHT mode: set demo target address once when target network is chosen & input empty
  useEffect(() => {
    if (mode !== ModeOptions.light) return
    if (targetAddress) return

    let demo = ''
    if (isEVMChain(targetChain.shortName)) demo = lightDemoAccounts.EVM
    else if (isSolana(targetChain.shortName)) demo = lightDemoAccounts.SOL
    else if (isTron(targetChain.shortName)) demo = lightDemoAccounts.TRX

    if (demo) dispatch(setTargetAddress(demo))
  }, [mode, targetChain.shortName, targetAddress, dispatch])

  // ADVANCED: first time both sides are EVM & wallet ready & target is empty → mirror source into target
  useEffect(() => {
    if (mode === ModeOptions.light) return

    const bothEvm =
      isEVMChain(sourceChain.shortName) && isEVMChain(targetChain.shortName)

    if (
      bothEvm &&
      isReady &&
      sourceAddress &&
      !targetAddress &&
      didAutofill.current !== targetChain.shortName
    ) {
      dispatch(setTargetAddress(sourceAddress))
      didAutofill.current = targetChain.shortName
    }
  }, [
    mode,
    isReady,
    sourceAddress,
    targetAddress,
    sourceChain.shortName,
    targetChain.shortName,
    dispatch
  ])

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
