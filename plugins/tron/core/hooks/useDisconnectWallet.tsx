import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'

function useDisconnectWallet() {
  const { disconnect } = useWallet()

  return { disconnectWallet: disconnect }
}

export default useDisconnectWallet