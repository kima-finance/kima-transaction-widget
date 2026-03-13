import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletReadyState } from '@solana/wallet-adapter-base'
import { selectSourceChain } from '@kima-widget/shared/store/selectors'
import { setSolanaConnectModal } from '@kima-widget/shared/store/optionSlice'
import log from '@kima-widget/shared/logger'
import toast from 'react-hot-toast'
import { isUserRejected } from '@kima-widget/shared/lib/wallet'
import WalletOptionList, { WalletOption } from '../WalletOptionList'

const SolanaWalletSelect = () => {
  const sourceChain = useSelector(selectSourceChain)
  const dispatch = useDispatch()

  const { wallet, wallets, select, connect, connected } = useWallet()
  const options = useMemo<WalletOption[]>(() => {
    return wallets.map((candidate) => ({
      id: candidate.adapter.name,
      name: candidate.adapter.name,
      icon: candidate.adapter.icon,
      installUrl: candidate.adapter.url,
      installed:
        candidate.readyState === WalletReadyState.Installed ||
        candidate.readyState === WalletReadyState.Loadable
    }))
  }, [wallets])

  const handleWalletClick = useCallback(
    (walletName: any) => {
      select(walletName)
    },
    [select]
  )

  useEffect(() => {

    if (!wallet) return // Ensure a wallet is selected before attempting connection

    // Prevent auto-connection unless Solana is explicitly selected
    if (sourceChain.shortName !== 'SOL') {
      return
    }

    if (!connected) {
      log.debug(
        'SolanaWalletSelect: Wallet exists but not connected, connecting wallet:',
        wallet
      )
      connect()
        .then(() => {
          dispatch(setSolanaConnectModal(false))
        })
        .catch((err) => {
          if (isUserRejected(err)) {
            toast('Wallet connection was cancelled.')
          } else {
            toast.error('Failed to connect wallet.')
          }
          log.error('Solana connect error:', err)
        })
    }

  }, [wallet, sourceChain])
  return <WalletOptionList options={options} onSelect={handleWalletClick} />
}

export default SolanaWalletSelect
