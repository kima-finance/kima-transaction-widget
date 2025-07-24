import { useDispatch, useSelector } from 'react-redux'
import { selectSourceChain } from '@widget/store/selectors'
import { setSourceAddress } from '@widget/store/optionSlice'
import { useEffect, useState } from 'react'
import log from '@widget/utils/logger'

const useIsProviderReady = () => {
  const [isReady, setIsReady] = useState<boolean>(false)

  const dispatch = useDispatch()
  const sourceChain = useSelector(selectSourceChain)

  // resets source address, origin symbol and target
  // every time fiat is selected
  useEffect(() => {
    if (!sourceChain || sourceChain.shortName !== 'CC') return

    log.debug('CC:useIsProviderReady: dispatching changes from fiat...')

    dispatch(setSourceAddress(''))
    // do not set currency here as this will override the currency set in the widget
    // when going to the next step
    // default values are handled elsewhere

    setIsReady(true)
  }, [sourceChain])

  return { isReady, statusMessage: '', walletAddres: '' }
}

export default useIsProviderReady
