import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEthereumProvider } from '../contexts/EthereumProviderContext'
import { ChainName } from '../utils/constants'
import {
  selectAmount,
  selectErrorHandler,
  selectOriginNetwork
} from '../store/selectors'
import { setSignature, setSigning } from '../store/optionSlice'

export default function useSign() {
  const dispatch = useDispatch()
  const [isSigned, setIsSigned] = useState<boolean>(false)
  const { signerAddress, signer } = useEthereumProvider()
  const sourceNetwork = useSelector(selectOriginNetwork)
  const errorHandler = useSelector(selectErrorHandler)
  const amount = useSelector(selectAmount)

  const sign = useCallback(async () => {
    if (sourceNetwork !== ChainName.FIAT) {
      errorHandler('Failed to sign')
      return
    }
    try {
      dispatch(setSigning(true))
      const message = `${amount} | ${signerAddress}`
      const signature = await signer?.signMessage(message)
      console.log(message, signature)
      setIsSigned(true)
      dispatch(setSignature(signature || ''))
      dispatch(setSigning(false))
    } catch (error) {
      errorHandler(error)
      dispatch(setSigning(false))
    }
  }, [signer, amount])

  return useMemo(
    () => ({
      isSigned,
      sign
    }),
    [isSigned, sign]
  )
}
