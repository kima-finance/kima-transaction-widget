import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sha256 from 'crypto-js/sha256.js'
import Base64 from 'crypto-js/enc-base64.js'
import { ChainName } from '../utils/constants'
import {
  selectAmount,
  selectErrorHandler,
  selectSourceChain
} from '../store/selectors'
import { setSignature } from '../store/optionSlice'
import { ethers } from 'ethers'
import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'

export default function useSign({ setSigning }: { setSigning: any }) {
  const dispatch = useDispatch()
  const [isSigned, setIsSigned] = useState<boolean>(false)
  const appkitAccountInfo = useAppKitAccount()
  const { address: signerAddress } = appkitAccountInfo || {
    address: null,
    chainId: null,
    isConnected: null
  }

  const { walletProvider } = useAppKitProvider('eip155')
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
      const provider = new ethers.providers.Web3Provider(
        walletProvider as ExternalProvider | JsonRpcFetchFunc
      )
      const signer = provider?.getSigner()
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
  }, [walletProvider, amount, sourceNetwork, signerAddress])

  return useMemo(
    () => ({
      isSigned,
      sign
    }),
    [isSigned, sign]
  )
}
