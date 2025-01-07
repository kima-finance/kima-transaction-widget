import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  useConnection,
  useWallet as useSolanaWallet
} from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { formatUnits } from '@ethersproject/units'

import {
  selectErrorHandler,
  selectSourceChain,
  selectTokenOptions,
  selectSourceCurrency,
  selectExternalProvider
} from '@store/selectors'
import { isEmptyObject } from '../../helpers/functions'
import { getOrCreateAssociatedTokenAccount } from '../../utils/solana/getOrCreateAssociatedTokenAccount'

export default function useBalance() {
  const [balance, setBalance] = useState<number>(0)
  const externalProvider = useSelector(selectExternalProvider)
  const {
    publicKey: internalPublicKey,
    signTransaction: internalSignTransaction
  } = useSolanaWallet()
  const { connection: internalConnection } = useConnection()

  // set the proper query values
  const publicKey = externalProvider?.signer || internalPublicKey
  const signTransaction =
    externalProvider?.provider.signTransaction || internalSignTransaction
  const connection = externalProvider?.provider.connection || internalConnection

  const errorHandler = useSelector(selectErrorHandler)
  const sourceChain = useSelector(selectSourceChain)
  const sourceCurrency = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)

  const tokenAddress = useMemo(() => {
    if (isEmptyObject(tokenOptions)) return ''
    const coinOptions = tokenOptions[sourceCurrency]
    if (coinOptions && typeof coinOptions === 'object') {
      return coinOptions[sourceChain]
    }
    return ''
  }, [sourceCurrency, sourceChain, tokenOptions])

  useEffect(() => {
    setBalance(0)
  }, [sourceChain])

  useEffect(() => {
    ;(async () => {
      if (
        !tokenAddress ||
        sourceChain !== 'SOL' ||
        !publicKey ||
        !connection
      )
        return
      try {
        console.log("solana use balance effect...")
        const mint = new PublicKey(tokenAddress)
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          publicKey,
          mint,
          publicKey,
          signTransaction
        )

        const accountInfo = await connection.getParsedAccountInfo(
          fromTokenAccount.address
        )
        const parsedInfo = (accountInfo?.value?.data as any)?.parsed?.info
          ?.tokenAmount
        if (parsedInfo) {
          setBalance(+formatUnits(parsedInfo.amount, parsedInfo.decimals))
        }
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [tokenAddress, sourceChain, publicKey, connection, signTransaction])

  return useMemo(() => ({ balance }), [balance])
}
