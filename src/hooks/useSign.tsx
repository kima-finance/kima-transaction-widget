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
import { errorHandler } from '@utils/error'
import { USER_REJECTED_TX } from '@utils/knownErrors'

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
    if (sourceNetwork.shortName === ChainName.FIAT || !walletAddress) return

    const message = `${amount} | ${walletAddress}`
    try {
      setSigning(true)

      // Determine correct signer
      const signer = (externalProvider?.signer ||
        (await appkitProvider.getSigner())) as JsonRpcSigner

      const signature = await signer.signMessage(message)
      const hash = Base64.stringify(sha256(signature))

      setIsSigned(true)
      dispatch(setSignature(hash))
    } catch (error) {
      errorHandler.handleError({
        error,
        context: 'signing message',
        data: { message },
        knownErrors: [{ regex: USER_REJECTED_TX, capture: false }]
      })
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
