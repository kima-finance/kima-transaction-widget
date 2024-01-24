import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sha256 from 'crypto-js/sha256.js'
import Base64 from 'crypto-js/enc-base64.js'
import { useEthereumProvider } from '../contexts/EthereumProviderContext'
import { ChainName } from '../utils/constants'
import {
  selectAmount,
  selectErrorHandler,
  selectSourceChain
} from '../store/selectors'
import { setSignature } from '../store/optionSlice'

export default function useSign({ setSigning }: { setSigning: any }) {
  const dispatch = useDispatch()
  const [isSigned, setIsSigned] = useState<boolean>(false)
  const { signerAddress, signer } = useEthereumProvider()
  const sourceNetwork = useSelector(selectSourceChain)
  const errorHandler = useSelector(selectErrorHandler)
  const amount = useSelector(selectAmount)

  const sign = useCallback(async () => {
    if (sourceNetwork !== ChainName.FIAT) {
      errorHandler('Failed to sign')
      return
    }
    try {
      setSigning(true)
      const message = `${amount} | ${signerAddress}`
      const signature = await signer?.signMessage(message)
      const hash = Base64.stringify(sha256(signature || ''))
      setIsSigned(true)
      dispatch(setSignature(hash))
      setSigning(false)
    } catch (error) {
      errorHandler(error)
      setSigning(false)
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
