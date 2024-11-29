import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { selectNetworkOption } from '@store/selectors'
import { NetworkOptions } from '@interface'
import { tronWebMainnet, tronWebTestnet } from '../../tronweb'
import { useWallet, Wallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { getTrxBalance } from '../../utils/getTrxBalance'

function useGetTronBalance() {
  const networkOption = useSelector(selectNetworkOption)
  const { wallet } = useWallet()

  // Memoize the TronWeb instance
  const tronWeb = useMemo(
    () =>
      networkOption === NetworkOptions.testnet
        ? tronWebTestnet
        : tronWebMainnet,
    [networkOption]
  )

  const {
    data: tronBalance = 0, // Default balance to 0 if undefined
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['tronBalance', wallet?.adapter?.address, networkOption], // Query key
    queryFn: async () => getTrxBalance(wallet as Wallet, tronWeb),
    enabled: !!wallet?.adapter?.address, // Fetch only if wallet address is available
    refetchInterval: 60000, // Refetch every 10 seconds
    staleTime: 10000, // Mark data as stale after 10 seconds
    gcTime: 60000
  })

  return tronBalance
}

export default useGetTronBalance
