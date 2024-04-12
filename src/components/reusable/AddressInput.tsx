import React, { ChangeEvent, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  setTargetAddress,
  setTargetAddressHandle
} from '../../store/optionSlice'
import {
  selectIsFioAllowed,
  selectIsTestnet,
  selectSelectedToken,
  selectTargetAddressHandle,
  selectTargetChain
} from '../../store/selectors'
import { getAddressByFio, isValidFioHandle } from '../../utils/fio/get-address'
import { debounce } from '../../helpers/debounce'
import { useSelector } from 'react-redux'

/**
 * Component for target address input
 * @component
 * @props
 * @returns
 */
const AddressInput = () => {
  const dispatch = useDispatch()

  const targetNetwork = useSelector(selectTargetChain)
  const selectedCoin = useSelector(selectSelectedToken)
  const isTestnet = useSelector(selectIsTestnet)
  const isFioAllowed = useSelector(selectIsFioAllowed)

  const targetAddressHandle = useSelector(selectTargetAddressHandle)

  const updateTargetAddress = useCallback(
    async (newAddress: string) => {
      const isFio = isValidFioHandle(newAddress)
      if (isFio) {
        getAddressByFio(
          newAddress,
          targetNetwork,
          selectedCoin,
          isTestnet
        ).then((fioAddress: string) => {
          dispatch(setTargetAddress(fioAddress || newAddress))
        })
      } else {
        dispatch(setTargetAddress(newAddress))
      }
    },
    [dispatch, targetNetwork, selectedCoin, isTestnet]
  )

  const debouncedUpdateTarget = useCallback(
    debounce(updateTargetAddress, 200),
    [updateTargetAddress]
  )

  useEffect(() => {
    if (isFioAllowed) {
      // if network/coin/handle changes - we update the target address too
      debouncedUpdateTarget(targetAddressHandle)
    }
  }, [debouncedUpdateTarget, targetAddressHandle])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value
    dispatch(setTargetAddressHandle(newAddress))
    if (!isFioAllowed) {
      // if no fio allowed, handle and address are always equal
      dispatch(setTargetAddress(newAddress))
    }
  }

  return (
    <input
      className='kima-address-input'
      type='text'
      value={targetAddressHandle}
      onChange={onChange}
    />
  )
}

export default AddressInput
