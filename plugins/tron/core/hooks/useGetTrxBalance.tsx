import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { selectNetworkOption, selectSourceChain } from '@widget/store/selectors'
import { NetworkOptions } from '@widget/interface'
import { tronWebMainnet, tronWebTestnet } from '../../tronweb'
import { useWallet, Wallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { getTrxBalance } from '../../utils/getTrxBalance'

function useGetTronBalance() {
  const networkOption = useSelector(selectNetworkOption)
  const { wallet } = useWallet()
  const sourceNetwork = useSelector(selectSourceChain)

  // Memoize the TronWeb instance
  const tronWeb = useMemo(
    () =>
      networkOption === NetworkOptions.testnet
        ? tronWebTestnet
        : tronWebMainnet,
    [networkOption]
  )

  // TODO refactor usages so can return UseQueryResult
  const result = useQuery({
    queryKey: ['tronBalance', wallet?.adapter?.address, networkOption], // Query key
    queryFn: async () => getTrxBalance(wallet as Wallet, tronWeb),
    enabled: !!wallet?.adapter?.address && sourceNetwork.shortName === 'TRX', // Fetch only if wallet address is available
    refetchInterval: 60000, // Refetch every 10 seconds
    staleTime: 10000, // Mark data as stale after 10 seconds
    gcTime: 60000
  })
  const { data: balance } = result

  return { balance }
}

export default useGetTronBalance
