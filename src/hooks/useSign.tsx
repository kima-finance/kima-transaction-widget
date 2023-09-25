import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
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
      const hash = Base64.stringify(sha256(signature || ''))
      setIsSigned(true)
      dispatch(setSignature(hash))
      dispatch(setSigning(false))
    } catch (error) {
      errorHandler(error)
      dispatch(setSigning(false))
    }
  }, [signer, amount, sourceNetwork, signerAddress])

  return useMemo(
    () => ({
      isSigned,
      sign
    }),
    [isSigned, sign]
  )
}
