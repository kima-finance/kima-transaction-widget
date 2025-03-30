import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sha256 from 'crypto-js/sha256.js'
import Base64 from 'crypto-js/enc-base64.js'
import { ChainName } from '../utils/constants'
import { selectAmount, selectSourceChain } from '../store/selectors'
import { setSignature } from '../store/optionSlice'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { useKimaContext } from '../KimaProvider'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import log from '@utils/logger'

export default function useSign({
  setSigning
}: {
  setSigning: (val: boolean) => void
}) {
  const dispatch = useDispatch()
  const [isSigned, setIsSigned] = useState<boolean>(false)

  const { externalProvider } = useKimaContext()
  const appkitAccountInfo = useAppKitAccount()
  const { address: appkitAddress } = appkitAccountInfo || {}

  const { walletProvider: appkitProvider } =
    useAppKitProvider<BrowserProvider>('eip155')

  const sourceNetwork = useSelector(selectSourceChain)
  const amount = useSelector(selectAmount)

  // Determine the correct signer address (external provider first, then AppKit)
  const walletAddress = externalProvider?.signer?.address || appkitAddress

  const sign = useCallback(async () => {
    if (sourceNetwork !== ChainName.FIAT || !walletAddress) return

    try {
      setSigning(true)

      // Determine correct signer
      const signer = (externalProvider?.signer ||
        (await appkitProvider.getSigner())) as JsonRpcSigner

      const message = `${amount} | ${walletAddress}`
      const signature = await signer.signMessage(message)
      const hash = Base64.stringify(sha256(signature))

      setIsSigned(true)
      dispatch(setSignature(hash))
    } catch (error) {
      log.error('Signing failed:', error)
    } finally {
      setSigning(false)
    }
  }, [
    walletAddress,
    amount,
    sourceNetwork,
    externalProvider,
    appkitProvider,
    dispatch,
    setSigning
  ])

  return useMemo(() => ({ isSigned, sign }), [isSigned, sign])
}
