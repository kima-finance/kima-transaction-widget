import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Contract } from '@ethersproject/contracts'
import { formatUnits } from '@ethersproject/units'
import {
  useConnection,
  useWallet as useSolanaWallet
} from '@solana/wallet-adapter-react'
import { useEthereumProvider } from '../contexts/EthereumProviderContext'
import {
  ChainName,
  CHAIN_IDS_TO_NAMES,
  CHAIN_NAMES_TO_IDS,
  isEVMChain
} from '../utils/constants'
import ERC20ABI from '../utils/ethereum/erc20ABI.json'
import {
  selectCurrencyOptions,
  selectErrorHandler,
  selectSourceChain
} from '../store/selectors'
import { getOrCreateAssociatedTokenAccount } from '../utils/solana/getOrCreateAssociatedTokenAccount'
import { PublicKey } from '@solana/web3.js'
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { tronWeb } from '../tronweb'

type ParsedAccountData = {
  /** Name of the program that owns this account */
  program: string
  /** Parsed account data */
  parsed: any
  /** Space used by account data */
  space: number
}

export default function useBalance() {
  const [balance, setBalance] = useState<number>(0)
  const { signerAddress, signer, chainId: evmChainId } = useEthereumProvider()
  const selectedNetwork = useSelector(selectSourceChain)
  const errorHandler = useSelector(selectErrorHandler)
  const sourceChain = useMemo(() => {
    if (
      selectedNetwork === ChainName.SOLANA ||
      selectedNetwork === ChainName.TRON
    )
      return selectedNetwork
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId as number]
    }

    return selectedNetwork
  }, [selectedNetwork, evmChainId])
  const { publicKey: solanaAddress, signTransaction } = useSolanaWallet()
  const { address: tronAddress } = useTronWallet()
  const { connection } = useConnection()
  const selectedCoin = useSelector(selectCurrencyOptions)
  const tokenAddress = useMemo(() => {
    return selectedCoin.address[sourceChain]
  }, [selectedCoin, sourceChain])

  useEffect(() => {
    ;(async () => {
      try {
        if (!isEVMChain(sourceChain)) {
          if (solanaAddress && tokenAddress && connection) {
            const mint = new PublicKey(tokenAddress)
            const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
              connection,
              solanaAddress as PublicKey,
              mint,
              solanaAddress as PublicKey,
              signTransaction /* as SignerWalletAdapterProps['signTransaction']*/
            )

            const accountInfo = await connection.getParsedAccountInfo(
              fromTokenAccount.address
            )

            const parsedAccountInfo = accountInfo?.value
              ?.data as ParsedAccountData

            setBalance(
              +formatUnits(
                parsedAccountInfo.parsed?.info?.tokenAmount?.amount,
                parsedAccountInfo.parsed?.info?.tokenAmount?.decimals
              )
            )
            return
          }

          if (tronAddress && tokenAddress) {
            let trc20Contract = await tronWeb.contract(
              ERC20ABI.abi,
              tokenAddress
            )

            const decimals = await trc20Contract.decimals().call()
            const userBalance = await trc20Contract
              .balanceOf(tronAddress)
              .call()
            console.log(userBalance)
            setBalance(+formatUnits(userBalance.balance, decimals))
            return
          }
        }
        if (!tokenAddress || !signer || !signerAddress) return

        const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer)
        const decimals = await erc20Contract.decimals()
        const userBalance = await erc20Contract.balanceOf(signerAddress)

        setBalance(+formatUnits(userBalance, decimals))
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [signerAddress, tokenAddress, sourceChain, solanaAddress, tronAddress])

  return useMemo(
    () => ({
      balance
    }),
    [balance]
  )
}
