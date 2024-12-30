import { useWallet } from '@solana/wallet-adapter-react'

function useDisconnectWallet() {
  const { disconnect } = useWallet()

  return { disconnectWallet: disconnect }
}

export default useDisconnectWallet