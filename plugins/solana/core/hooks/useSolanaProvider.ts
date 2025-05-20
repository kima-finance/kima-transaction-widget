import { useSelector } from 'react-redux'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { selectSourceChain } from '../../../../src/store/selectors'
import { useKimaContext } from '../../../../src/KimaProvider'
import { Connection, PublicKey } from '@solana/web3.js'

export const useSolanaProvider = () => {
  const sourceChain = useSelector(selectSourceChain)
  const { externalProvider } = useKimaContext()
  const { connection: internalConnection } = useConnection()
  const {
    publicKey: internalPublicKey,
    signTransaction: internalSignTransaction,
    signMessage: internalSignMessage
  } = useWallet()

  // Ensure only Solana-specific logic is executed when sourceChain is SOL
  const isSolanaProvider: boolean =
    sourceChain.shortName === 'SOL' &&
    externalProvider?.type === 'solana' &&
    externalProvider.provider &&
    externalProvider.signer instanceof PublicKey

  // Set the proper publicKey only for Solana
  const userPublicKey: PublicKey | null =
    isSolanaProvider &&
    externalProvider &&
    externalProvider.signer instanceof PublicKey
      ? externalProvider?.signer
      : sourceChain.shortName === 'SOL'
        ? internalPublicKey
        : null

  // Set the proper signTransaction object only for Solana
  const signTransaction =
    isSolanaProvider &&
    externalProvider &&
    'signTransaction' in externalProvider.provider
      ? externalProvider.provider.signTransaction
      : sourceChain.shortName === 'SOL'
        ? internalSignTransaction
        : undefined

  // Set the proper signMessage object only for Solana
  const signMessage =
    isSolanaProvider &&
    externalProvider &&
    'signMessage' in externalProvider.provider
      ? externalProvider.provider.signMessage
      : sourceChain.shortName === 'SOL'
        ? internalSignMessage
        : undefined

  // Set the proper connection object only for Solana
  const connection: Connection | undefined =
    isSolanaProvider && externalProvider
    && "connection" in externalProvider.provider
      ? externalProvider.provider.connection
      : sourceChain.shortName === 'SOL'
        ? internalConnection
        : undefined

  return {
    userPublicKey,
    signTransaction,
    signMessage,
    connection
  }
}
