import { BigintAmount } from '@interface'
import { formatUnits } from 'viem'

import { ChainName } from "@utils/constants"

export const formatterInt = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

export const formatterFloat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 6,
  useGrouping: false
})

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
    return {
      value: valBigInt / BigInt(10 ** (decimals - newDecimals)),
      decimals: newDecimals
    }
  }

  return {
    value: valBigInt * BigInt(10 ** (newDecimals - decimals)),
    decimals: newDecimals
  }
}

export const formatBigInt = (inputs: BigintAmount<bigint | string>): string => {
  return formatterFloat.format(bigIntToNumber(inputs))
}

export const toBigintAmount = (
  data: BigintAmount<string>
): BigintAmount<bigint> => {
  return {
    value: BigInt(data.value),
    decimals: data.decimals
  }
}

export function isEmptyObject(arg: unknown) {
  return !!arg && typeof arg === 'object' && Object.keys(arg).length === 0
}

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay))

export const formatUSD = (amount: number | string): string => {
  // Ensure the input is a number
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  // Check if the conversion was successful
  if (isNaN(numericAmount)) {
    throw new Error(
      'Invalid input: amount must be a number or a numeric string'
    )
  }

  // Format the number as US dollars
  return numericAmount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

const isEVM = (shortName: string) =>
  [
    ChainName.ETHEREUM,
    ChainName.POLYGON,
    ChainName.AVALANCHE,
    ChainName.BSC,
    ChainName.OPTIMISM,
    ChainName.ARBITRUM,
    ChainName.POLYGON_ZKEVM,
    ChainName.BASE,
    ChainName.BERA
  ].includes(shortName as ChainName)

export const isSolana = (shortName: string) => shortName === ChainName.SOLANA
export const isTron = (shortName: string) => shortName === ChainName.TRON


export const isAddressCompatible = (address: string, shortName: string): boolean => {
  if (isEVM(shortName)) {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  if (isSolana(shortName)) {
    return /^[1-9A-HJ-NP-Za-km-z]{32,45}$/.test(address)
  }

  if (isTron(shortName)) {
    return /^T[a-zA-Z0-9]{33}$/.test(address)
  }

  return false
}
