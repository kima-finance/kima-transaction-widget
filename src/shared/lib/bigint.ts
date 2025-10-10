import { formatUnits, parseUnits } from 'viem'
import {
  BigintAmount,
  ExternalProvider,
  isSolProvider,
  isTronProvider,
  SolProvider,
  TronProvider
} from '../types'
import { formatterFloat } from './format'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import { PublicKey } from '@solana/web3.js'

export const bigIntToNumber = (
  inputs: BigintAmount<bigint | string>
): number => {
  const { value, decimals } = inputs || {}
  if (!value || !decimals) return 0

  const valBigInt = BigInt(value)
  const valNumberStr = formatUnits(valBigInt, decimals)
  return Number(valNumberStr)
}

export const bigIntChangeDecimals = (inputs: {
  value: string | bigint
  decimals: number
  newDecimals: number
}): BigintAmount<bigint> => {
  const { value, decimals, newDecimals } = inputs || {}
  const valBigInt = BigInt(value)

  if (decimals === newDecimals) return { value: valBigInt, decimals }

  if (decimals > newDecimals) {
    const diff = decimals - newDecimals
    return { value: valBigInt / 10n ** BigInt(diff), decimals: newDecimals }
  }

  const diff = newDecimals - decimals
  return { value: valBigInt * 10n ** BigInt(diff), decimals: newDecimals }
}

export const formatBigInt = (inputs: BigintAmount<bigint | string>): string => {
  return formatterFloat.format(bigIntToNumber(inputs))
}

export const toBigintAmount = (
  data: BigintAmount<string>
): BigintAmount<bigint> => {
  return {
    // bigint values constructed from numbers can have rounding errors!
    // so need to convert to string and then to bigint
    value: BigInt(data.value.toString()),
    decimals: data.decimals
  }
}

/* Subtract two numbers precisely with a given number of decimals */
export const preciseSubtraction = (
  a: number | string,
  b: number | string,
  decimals: number = 18
): number => {
  const numA = parseUnits(a.toString(), decimals)
  const numB = parseUnits(b.toString(), decimals)
  const result = numA - numB // ethers v6 uses `BigInt`, so we use `-` instead of `.sub()`
  return parseFloat(formatUnits(result, decimals))
}

export const isValidExternalProvider = (externalProvider: ExternalProvider) => {
  const { type, provider, signer } = externalProvider

  // evm provider type check
  if (type === 'evm') {
    if (
      !(provider instanceof BrowserProvider) ||
      !(signer instanceof JsonRpcSigner)
    )
      return false
  }

  if (type === 'solana') {
    if (
      !isSolProvider(provider as SolProvider) ||
      !(signer instanceof PublicKey)
    )
      return false
  }

  if (type === 'tron') {
    if (!isTronProvider(provider as TronProvider) || typeof signer !== 'string')
      return false
  }

  return true
}
