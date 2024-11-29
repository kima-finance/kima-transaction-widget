import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { getSolBalance } from '../../utils/getSolBalance'
import { PublicKey } from '@solana/web3.js'
import { useSelector } from 'react-redux'
import { selectSourceChain } from '@store/selectors'

function useGetSolBalance() {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const sourceNetwork = useSelector(selectSourceChain)

  const {
    data: solBalance,
    isLoading,
    error
  } = useQuery<number>({
    queryKey: ['getSolBalance', publicKey?.toBase58()],
    queryFn: async () => getSolBalance(connection, publicKey as PublicKey),
    enabled: !!publicKey && !!connection && sourceNetwork === 'SOL',
    refetchInterval: 60000, // refetch every 60 sec
    staleTime: 10000,
    gcTime: 60000
  })

  return solBalance
}

export default useGetSolBalance
