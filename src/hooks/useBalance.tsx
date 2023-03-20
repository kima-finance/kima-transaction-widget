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
  selectOriginNetwork
} from '../store/selectors'
import { getOrCreateAssociatedTokenAccount } from '../utils/solana/getOrCreateAssociatedTokenAccount'
import { PublicKey } from '@solana/web3.js'

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
  const selectedNetwork = useSelector(selectOriginNetwork)
  const errorHandler = useSelector(selectErrorHandler)
  const sourceChain = useMemo(() => {
    if (selectedNetwork === ChainName.SOLANA) return selectedNetwork
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId as number]
    }

    return selectedNetwork
  }, [selectedNetwork, evmChainId])
  const { publicKey, signTransaction } = useSolanaWallet()
  const { connection } = useConnection()
  const selectedCoin = useSelector(selectCurrencyOptions)
  const tokenAddress = useMemo(() => {
    return selectedCoin.address[sourceChain]
  }, [selectedCoin, sourceChain])

  useEffect(() => {
    ;(async () => {
      try {
        if (
          !isEVMChain(sourceChain) &&
          publicKey &&
          tokenAddress &&
          connection
        ) {
          const mint = new PublicKey(tokenAddress)
          const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            publicKey as PublicKey,
            mint,
            publicKey as PublicKey,
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
        if (!tokenAddress || !signer || !signerAddress) return

        const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer)
        const decimals = await erc20Contract.decimals()
        const userBalance = await erc20Contract.balanceOf(signerAddress)

        setBalance(+formatUnits(userBalance, decimals))
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [signerAddress, tokenAddress, sourceChain, publicKey])

  return useMemo(
    () => ({
      balance
    }),
    [balance]
  )
}
