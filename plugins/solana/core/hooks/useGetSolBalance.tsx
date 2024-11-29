import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getSolBalance } from '../../utils/getSolBalance'
import { PublicKey } from '@solana/web3.js'

function useGetSolBalance() {
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const {
    data: solBalance,
    isLoading,
    error
  } = useQuery<number>({
    queryKey: ['getSolBalance', publicKey?.toBase58()],
    queryFn: async () => getSolBalance(connection, publicKey as PublicKey),
    enabled: !!publicKey && !!connection,
    refetchInterval: 60000, // refetch every 60 sec
    staleTime: 10000,
    gcTime: 60000
  })

  return solBalance
}

export default useGetSolBalance
