import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getSolBalance } from '../../utils/getSolBalance'
import { PublicKey } from '@solana/web3.js'
import { useSelector } from 'react-redux'
import { selectSourceChain } from '@widget/store/selectors'
import { useKimaContext } from '../../../../src/KimaProvider'

function useGetSolBalance() {
  const { externalProvider } = useKimaContext()
  const { publicKey: internalPublicKey } = useWallet()
  const { connection: internalConnection } = useConnection()
  const sourceNetwork = useSelector(selectSourceChain)

  // helper function to check if the key is a Solana PublicKey
  const isSolanaPublicKey = (key: unknown): key is PublicKey => {
    return key instanceof PublicKey
  }

  // set the proper public key
  const publicKey = isSolanaPublicKey(externalProvider?.signer)
    ? externalProvider.signer
    : internalPublicKey

  // set the proper connection
  const connection = externalProvider?.provider.connection || internalConnection

  // TODO: refactor usages so can return UseQueryResult
  const result = useQuery<number>({
    queryKey: ['getSolBalance', publicKey ? publicKey.toBase58() : null],
    queryFn: async () => getSolBalance(connection, publicKey as PublicKey),
    enabled: !!publicKey && !!connection && sourceNetwork.shortName === 'SOL',
    refetchInterval: 60000, // refetch every 60 sec
    staleTime: 10000,
    gcTime: 60000
  })
  const { data: balance } = result

  return { balance }
}

export default useGetSolBalance
