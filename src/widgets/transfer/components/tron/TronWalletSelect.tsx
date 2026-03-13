import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { AdapterState } from '@tronweb3/tronwallet-abstract-adapter'
import { setTronConnectModal } from '@kima-widget/shared/store/optionSlice'
import toast from 'react-hot-toast'
import { isUserRejected } from '@kima-widget/shared/lib/wallet'
import WalletOptionList, { WalletOption } from '../WalletOptionList'

const TronWalletSelect = () => {
  const dispatch = useDispatch()
  const {
    wallets,
    select,
    wallet: currentWallet,
    connect,
    connected
  } = useWallet()
  const options = useMemo<WalletOption[]>(() => {
    return wallets.map((wallet) => ({
      id: wallet.adapter.name,
      name: wallet.adapter.name,
      icon: wallet.adapter.icon,
      installUrl: wallet.adapter.url,
      installed:
        wallet.state === AdapterState.Connected ||
        wallet.state === AdapterState.Disconnect ||
        wallet.state === AdapterState.Loading
    }))
  }, [wallets])

  useEffect(() => {
    connected && dispatch(setTronConnectModal(false))
  }, [connected])

  const connectWallet = async (walletName: any) => {
    try {
      if (currentWallet?.adapter.name !== walletName) {
        select(walletName)
      }
      await connect()
      dispatch(setTronConnectModal(false))
    } catch (err) {
      if (isUserRejected(err)) {
        toast('Wallet connection was cancelled.')
      } else {
        toast.error('Failed to connect wallet.')
      }
    }
  }

  return <WalletOptionList options={options} onSelect={connectWallet} />
}

export default TronWalletSelect
