import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useSelector } from 'react-redux'
import { selectBackendUrl } from '../store/selectors'
import { useEffect, useState } from 'react'
import { fetchWrapper } from '../helpers/fetch-wrapper'

function useGetSolBalance() {
  const [solBalance, setSolBalance] = useState(0)
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const kimaBackendUrl = useSelector(selectBackendUrl)

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        // if (networkOption === NetworkOptions.testnet) {
        //   try {
        //     const solBalance =
        //       (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL
        //     console.log('SOL balance:', solBalance)
        //     setSolBalance(solBalance)
        //   } catch (error) {
        //     console.error('Error fetching SOL balance:', error)
        //   }
        // } else {
        try {
          const solBalanceInfo: any = await fetchWrapper.get(
            `${kimaBackendUrl}/sol/${publicKey?.toBase58()}`
          )

          const { solBalance } = solBalanceInfo
          setSolBalance(solBalance)
        } catch (error) {
          console.error('Error fetching SOL balance from backend: ', error)
        }
        // }
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
