import { useWallet } from '@solana/wallet-adapter-react'
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  Cluster
} from '@solana/web3.js'
import { useSelector } from 'react-redux'
import { selectNetworkOption } from '../store/selectors'
import { useEffect, useMemo, useState } from 'react'

function useGetSolBalance() {
  const networkOption = useSelector(selectNetworkOption)
  const [solBalance, setSolBalance] = useState(0)
  const { publicKey } = useWallet()

  const cluster: Cluster = useMemo(
    () => (networkOption === 'testnet' ? 'devnet' : 'mainnet-beta'),
    [networkOption]
  )

  const connection = useMemo(
    () => new Connection(clusterApiUrl(cluster), 'confirmed'),
    [cluster]
  )

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balance =
            (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL
          console.log('SOL balance:', balance)
          setSolBalance(balance)
        } catch (error) {
          console.error('Error fetching SOL balance:', error)
        }
      }
    }

    // Fetch balance immediately, then set up interval
    fetchBalance()
    const intervalId = setInterval(fetchBalance, 10000) // 10 seconds

    // Clear interval on component unmount or dependency change
    return () => clearInterval(intervalId)
  }, [publicKey, connection])

  return solBalance
}

export default useGetSolBalance
