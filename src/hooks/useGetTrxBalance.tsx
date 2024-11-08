import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectNetworkOption } from '../store/selectors'
import { NetworkOptions } from '../interface'
import { tronWebMainnet, tronWebTestnet } from '../tronweb'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

function useGetTronBalance() {
  const networkOption = useSelector(selectNetworkOption)
  const { wallet } = useWallet()
  const [tronBalance, setTronBalance] = useState(0)

  // defines the rpc endpoint
  const tronWeb = useMemo(
    () =>
      networkOption === NetworkOptions.testnet
        ? tronWebTestnet
        : tronWebMainnet,
    [networkOption]
  )

  useEffect(() => {
    let intervalId

    // Function to fetch the balance
    const fetchBalance = async () => {
      if (wallet?.adapter?.address) {
        try {
          const balanceInSun = await tronWeb.trx.getBalance(
            wallet.adapter.address
          )
          setTronBalance(balanceInSun / 1e6) // Convert Sun to TRX (1 TRX = 1,000,000 Sun)
          console.log('TRX balance:', balanceInSun / 1e6)
        } catch (error) {
          console.error('Failed to fetch TRX balance:', error)
        }
      }
    }

    // Fetch initial balance and set up interval
    if (wallet?.adapter.address) {
      fetchBalance()
      intervalId = setInterval(fetchBalance, 10000) // Fetch balance every 10 seconds
    }

    // Clear interval on unmount
    return () => clearInterval(intervalId)
  }, [wallet?.adapter.address, tronWeb])

  return tronBalance
}

export default useGetTronBalance
