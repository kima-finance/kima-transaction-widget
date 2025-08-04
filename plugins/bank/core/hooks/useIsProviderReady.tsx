import { useDispatch, useSelector } from 'react-redux'
import { selectSourceChain } from '@widget/store/selectors'
import {
  setSourceAddress,
  setSourceCurrency,
  setTargetAddress
} from '@widget/store/optionSlice'
import { useEffect, useState } from 'react'
import { ChainCompatibility } from '../../../pluginTypes'
import log from '@widget/utils/logger'

const useIsProviderReady = () => {
  const [isReady, setIsReady] = useState<boolean>(false)

  const dispatch = useDispatch()
  const sourceChain = useSelector(selectSourceChain)

  // resets source address, origin symbol and target
  // every time fiat is selected
  useEffect(() => {
    if (sourceChain.compatibility === ChainCompatibility.BANK) {
      log.debug('BANK:useIsProviderReady: dispatching changes from bank...')

      dispatch(setSourceAddress(''))
      dispatch(setSourceCurrency('EUR'))

      setIsReady(true)
    }
  }, [sourceChain])

  return { isReady, statusMessage: '', walletAddres: '' }
}

export default useIsProviderReady
