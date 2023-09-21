import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Contract } from '@ethersproject/contracts'
import { formatUnits, parseUnits } from '@ethersproject/units'
import {
  useConnection,
  useWallet as useSolanaWallet
} from '@solana/wallet-adapter-react'
import { useEthereumProvider } from '../contexts/EthereumProviderContext'
import {
  ChainName,
  CHAIN_IDS_TO_NAMES,
  CHAIN_NAMES_TO_IDS,
  COIN_LIST,
  isEVMChain
} from '../utils/constants'
import ERC20ABI from '../utils/ethereum/erc20ABI.json'
import {
  selectAmount,
  selectCurrencyOptions,
  selectDappOption,
  selectErrorHandler,
  selectNodeProviderQuery,
  selectOriginNetwork,
  selectServiceFee
} from '../store/selectors'
import { setApproving } from '../store/optionSlice'
import { getOrCreateAssociatedTokenAccount } from '../utils/solana/getOrCreateAssociatedTokenAccount'
import { PublicKey, Transaction } from '@solana/web3.js'
// import { SignerWalletAdapterProps } from '@solana/wallet-adapter-base'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { createApproveTransferInstruction } from '../utils/solana/createTransferInstruction'
import { fetchWrapper } from '../helpers/fetch-wrapper'

type ParsedAccountData = {
  /** Name of the program that owns this account */
  program: string
  /** Parsed account data */
  parsed: any
  /** Space used by account data */
  space: number
}

export default function useAllowance() {
  const dispatch = useDispatch()
  const [allowance, setAllowance] = useState<number>(0)
  const [decimals, setDecimals] = useState<number | null>(null)
  const { signerAddress, signer, chainId: evmChainId } = useEthereumProvider()
  const selectedNetwork = useSelector(selectOriginNetwork)
  const errorHandler = useSelector(selectErrorHandler)
  const dAppOption = useSelector(selectDappOption)
  const sourceChain = useMemo(() => {
    if (selectedNetwork === ChainName.SOLANA) return selectedNetwork
    if (CHAIN_NAMES_TO_IDS[selectedNetwork] !== evmChainId) {
      return CHAIN_IDS_TO_NAMES[evmChainId as number]
    }

    return selectedNetwork
  }, [selectedNetwork, evmChainId])
  const amount = useSelector(selectAmount)
  const serviceFee = useSelector(selectServiceFee)
  const nodeProviderQuery = useSelector(selectNodeProviderQuery)
  const { connection } = useConnection()
  const { publicKey, signTransaction } = useSolanaWallet()
  const selectedCoin = useSelector(selectCurrencyOptions)
  const tokenAddress = useMemo(() => {
    return selectedCoin.address[sourceChain]
  }, [selectedCoin, sourceChain])
  const [targetAddress, setTargetAddress] = useState<string>()
  const isApproved = useMemo(() => {
    return allowance >= amount + serviceFee
  }, [allowance, amount, serviceFee, dAppOption])

  const updatePoolAddress = async () => {
    try {
      // FIXME:
      const result: any = await fetchWrapper.get(
        `${nodeProviderQuery}/kima-finance/kima/kima/tss_pubkey`
      )
      if (result?.tssPubkey?.length < 1) {
        return
      }

      if (sourceChain === ChainName.SOLANA && !result.tssPubkey[0].eddsa) {
        console.log('solana pool address is missing')
      }
      setTargetAddress(
        sourceChain === ChainName.SOLANA
          ? result.tssPubkey[0].eddsa
          : result.tssPubkey[0].ecdsa
      )
    } catch (e) {
      console.log('rpc disconnected', e)
    }
  }

  useEffect(() => {
    if (!nodeProviderQuery) return
    updatePoolAddress()
  }, [nodeProviderQuery, sourceChain])

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
          console.log('solana token account: ', accountInfo)

          setDecimals(COIN_LIST['USDK'].decimals)
          const parsedAccountInfo = accountInfo?.value
            ?.data as ParsedAccountData

          setAllowance(
            parsedAccountInfo.parsed?.info?.delegate === targetAddress
              ? parsedAccountInfo.parsed?.info?.delegatedAmount?.uiAmount
              : 0
          )
          return
        }

        if (!tokenAddress || !targetAddress || !signer || !signerAddress) return

        const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer)
        const decimals = await erc20Contract.decimals()
        const userAllowance = await erc20Contract.allowance(
          signerAddress,
          targetAddress
        )

        setDecimals(+decimals)
        setAllowance(+formatUnits(userAllowance, decimals))
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [signerAddress, tokenAddress, targetAddress, sourceChain, publicKey])

  const approve = useCallback(async () => {
    if (isEVMChain(sourceChain)) {
      if (!decimals || !tokenAddress || !signer || !targetAddress) return

      try {
        const erc20Contract = new Contract(tokenAddress, ERC20ABI.abi, signer)

        dispatch(setApproving(true))
        const approve = await erc20Contract.approve(
          targetAddress,
          parseUnits((amount + serviceFee).toString(), decimals)
        )

        await approve.wait()
        dispatch(setApproving(false))
        setAllowance(amount + serviceFee)
      } catch (error) {
        errorHandler(error)
        dispatch(setApproving(false))
      }

      return
    }

    if (!signTransaction) return

    try {
      dispatch(setApproving(true))
      const mint = new PublicKey(tokenAddress)
      const toPublicKey = new PublicKey(targetAddress as string)
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey as PublicKey,
        mint,
        publicKey as PublicKey,
        signTransaction /* as SignerWalletAdapterProps['signTransaction']*/
      )

      const transaction = new Transaction().add(
        createApproveTransferInstruction(
          fromTokenAccount.address, // source
          toPublicKey, // dest
          publicKey as PublicKey,
          +(amount + serviceFee).toFixed(2) *
            Math.pow(10, COIN_LIST['USDK'].decimals), // amount * LAMPORTS_PER_SOL,
          [],
          TOKEN_PROGRAM_ID
        )
      )

      const blockHash = await connection.getLatestBlockhash()
      transaction.feePayer = publicKey as PublicKey
      transaction.recentBlockhash = await blockHash.blockhash
      const signed = await signTransaction(transaction)

      await connection.sendRawTransaction(signed.serialize())
      setAllowance(amount + serviceFee)
      dispatch(setApproving(false))
    } catch (e) {
      errorHandler(e)
      dispatch(setApproving(false))
    }
  }, [
    decimals,
    tokenAddress,
    signer,
    amount,
    targetAddress,
    signTransaction,
    serviceFee
  ])

  return useMemo(
    () => ({
      isApproved,
      approve
    }),
    [isApproved, approve]
  )
}
