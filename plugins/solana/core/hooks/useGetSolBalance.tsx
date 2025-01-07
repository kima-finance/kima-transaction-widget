import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getSolBalance } from '../../utils/getSolBalance'
import { PublicKey } from '@solana/web3.js'
import { useSelector } from 'react-redux'
import { selectExternalProvider, selectSourceChain } from '@store/selectors'

function useGetSolBalance() {
  const externalProvider = useSelector(selectExternalProvider)
  const { publicKey: internalPublicKey } = useWallet()
  const { connection: internalConnection } = useConnection()
  const sourceNetwork = useSelector(selectSourceChain)

  // set the proper public key
  const publicKey = externalProvider?.signer || internalPublicKey

  // set the proper connection
  const connection = externalProvider?.provider.connection || internalConnection

  // TODO: refactor usages so can return UseQueryResult
  const result = useQuery<number>({
    queryKey: ['getSolBalance', publicKey?.toBase58()],
    queryFn: async () => getSolBalance(connection, publicKey as PublicKey),
    enabled: !!publicKey && !!connection && sourceNetwork === 'SOL',
    refetchInterval: 60000, // refetch every 60 sec
    staleTime: 10000,
    gcTime: 60000
  })
  const { data: balance } = result

  return { balance }
}

export default useGetSolBalance
