import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import { createPublicClient, createWalletClient, custom, http, isAddress, parseAbi } from 'viem'
import useGetPools from '@kima-widget/hooks/useGetPools'
import { useEvmAddress } from '@kima-widget/features/connect-wallet/evm/useEvmAddress'
import {
  selectBackendUrl,
  selectFeeDeduct,
  selectMode,
  selectNetworkOption,
  selectServiceFee,
  selectSourceChain,
  selectSourceCurrency,
  selectTokenOptions
} from '@kima-widget/shared/store/selectors'
import { getTokenAddress, getPoolAddress } from '@kima-widget/shared/lib/addresses'
import { getFeeSideValues } from '@kima-widget/shared/lib/fees'
import { setPermit2Signature } from '@kima-widget/shared/store/optionSlice'
import type { Permit2Payload } from '@kima-widget/shared/types'
import log from '@kima-widget/shared/logger'

const safeEnv = (typeof process !== 'undefined' && process.env) || {}

const DEFAULT_TTL_SECONDS = 3600
const rawPermitTtl =
  safeEnv.KIMA_PERMIT2_TTL_SECONDS ||
  safeEnv.NEXT_PUBLIC_KIMA_PERMIT2_TTL_SECONDS ||
  safeEnv.VITE_KIMA_PERMIT2_TTL_SECONDS
const parsedPermitTtl = Number.parseInt(String(rawPermitTtl ?? ''), 10)
const PERMIT2_TTL_SECONDS =
  Number.isInteger(parsedPermitTtl) && parsedPermitTtl > 0
    ? parsedPermitTtl
    : DEFAULT_TTL_SECONDS

const permitAbi = parseAbi([
  'function name() view returns (string)',
  'function nonces(address owner) view returns (uint256)'
])

const toPermit2Payload = (signature: string, deadline: number): Permit2Payload => {
  const noPrefix = signature.startsWith('0x') ? signature.slice(2) : signature
  if (noPrefix.length !== 130) {
    throw new Error('Invalid permit signature length')
  }

  const r = `0x${noPrefix.slice(0, 64)}`
  const s = `0x${noPrefix.slice(64, 128)}`
  const rv = Number.parseInt(noPrefix.slice(128, 130), 16)
  const v = rv >= 27 ? rv : rv + 27
  if (v !== 27 && v !== 28) {
    throw new Error('Invalid permit signature recovery id')
  }

  return { r, s, v, deadline }
}

export const useEvmSignPermit2 = () => {
  const dispatch = useDispatch()
  const mode = useSelector(selectMode)
  const sourceChain = useSelector(selectSourceChain)
  const selectedCoin = useSelector(selectSourceCurrency)
  const tokenOptions = useSelector(selectTokenOptions)
  const { transactionValues } = useSelector(selectServiceFee)
  const feeDeduct = useSelector(selectFeeDeduct)
  const txValues = getFeeSideValues(feeDeduct, transactionValues)
  const allowanceNeeded = BigInt(txValues.allowanceAmount.value)

  const { pools } = useGetPools(
    useSelector(selectBackendUrl),
    useSelector(selectNetworkOption)
  )

  const tokenAddress = useMemo(
    () => getTokenAddress(tokenOptions, selectedCoin, sourceChain.shortName),
    [tokenOptions, selectedCoin, sourceChain.shortName]
  )
  const poolAddress = useMemo(
    () => getPoolAddress(pools, sourceChain.shortName),
    [pools, sourceChain.shortName]
  )

  const userAddress = useEvmAddress(mode)
  const { address: appkitAddress } = useAppKitAccount() || {}
  const { walletProvider: appkitProvider } = useAppKitProvider<any>('eip155')

  const signPermit2 = useCallback(async () => {
    try {
      if (!tokenAddress || !poolAddress || allowanceNeeded <= 0n) {
        throw new Error('Permit signing data is incomplete')
      }

      if (!isAddress(tokenAddress) || !isAddress(poolAddress)) {
        throw new Error('Invalid token or spender address')
      }

      const eip1193 =
        (appkitProvider as any)?.provider ?? (globalThis as any).ethereum
      if (!eip1193?.request) {
        throw new Error('No EIP-1193 provider available')
      }

      const preferredAccount = (userAddress && userAddress !== ''
        ? userAddress
        : appkitAddress) as `0x${string}` | undefined

      const walletClient = createWalletClient({
        account: preferredAccount,
        chain: sourceChain as any,
        transport: custom(eip1193)
      })

      const fallbackAccount = (await walletClient.getAddresses())?.[0]
      const account = (preferredAccount || fallbackAccount) as
        | `0x${string}`
        | undefined

      if (!account || !isAddress(account)) {
        throw new Error('No connected EVM account')
      }

      const rpc = sourceChain?.rpcUrls?.default?.http?.[0]
      const publicClient = createPublicClient({
        chain: sourceChain as any,
        transport: http(rpc)
      })

      const [tokenNameRaw, nonce] = await Promise.all([
        publicClient.readContract({
          address: tokenAddress,
          abi: permitAbi,
          functionName: 'name'
        }),
        publicClient.readContract({
          address: tokenAddress,
          abi: permitAbi,
          functionName: 'nonces',
          args: [account]
        })
      ])

      const tokenName = String(tokenNameRaw || '').trim()
      if (!tokenName) {
        throw new Error('Unable to read token name for permit signing')
      }

      const deadline = Math.floor(Date.now() / 1000) + PERMIT2_TTL_SECONDS

      const domain = {
        name: tokenName,
        version: '1',
        chainId: Number(sourceChain.id),
        verifyingContract: tokenAddress as `0x${string}`
      } as const

      const types = {
        Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' }
        ]
      } as const

      const message = {
        owner: account,
        spender: poolAddress as `0x${string}`,
        value: allowanceNeeded,
        nonce: nonce as bigint,
        deadline: BigInt(deadline)
      } as const

      let signature: string
      try {
        signature = await walletClient.signTypedData({
          account,
          domain,
          types,
          primaryType: 'Permit',
          message
        })
      } catch (signErr) {
        log.warn('[useEvmSignPermit2] signTypedData failed, retrying fallback', signErr)
        const typedDataPayload = {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' }
            ],
            ...types
          },
          primaryType: 'Permit',
          domain,
          message: {
            ...message,
            value: message.value.toString(),
            nonce: message.nonce.toString(),
            deadline: message.deadline.toString()
          }
        }

        try {
          signature = (await eip1193.request({
            method: 'eth_signTypedData_v4',
            params: [account, JSON.stringify(typedDataPayload)]
          })) as string
        } catch (fallbackErr) {
          log.warn('[useEvmSignPermit2] eth_signTypedData_v4 failed', fallbackErr)
          signature = (await eip1193.request({
            method: 'eth_signTypedData',
            params: [account, typedDataPayload]
          })) as string
        }
      }

      const permitPayload = toPermit2Payload(signature, deadline)
      dispatch(setPermit2Signature(permitPayload))
      return permitPayload
    } catch (err: any) {
      if (err?.code === 4001 || /UserRejected/i.test(String(err?.message))) {
        err._kimaUserRejected = true
      }
      log.error('[useEvmSignPermit2] failed', err)
      throw err
    }
  }, [
    tokenAddress,
    poolAddress,
    allowanceNeeded,
    appkitProvider,
    userAddress,
    appkitAddress,
    sourceChain,
    dispatch
  ])

  return { signPermit2 }
}

export default useEvmSignPermit2
