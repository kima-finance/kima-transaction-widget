import { BigintAmount } from '@interface'
import { formatUnits } from 'viem'

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
    // bigint values constructed from numbers can have rounding errors!
    // so need to convert to string and then to bigint
    value: BigInt(data.value.toString()),
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
