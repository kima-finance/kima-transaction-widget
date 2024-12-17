// Return shortened address for EVM, Solana wallet address

export const getShortenedAddress = (address: string) => {
  const is0x = (addr: string) => addr?.startsWith('0x')
  return `${address?.substring(0, is0x(address) ? 6 : 4)}...${address?.substr(
    address.length - (is0x(address) ? 8 : 5)
  )}`
}

export function preciseSubtraction(
  a: number | string,
  b: number | string
): number {
  // Ensure both inputs are numbers
  const numA = typeof a === 'string' ? parseFloat(a) : a
  const numB = typeof b === 'string' ? parseFloat(b) : b

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error(
      'Both inputs must be valid numbers or strings that can be parsed into numbers.'
    )
  }

  // Extract decimal places for precision
  const aDecimals = (numA.toString().split('.')[1] || '').length // Get decimals of numA
  const bDecimals = (numB.toString().split('.')[1] || '').length // Get decimals of numB
  const maxDecimals = Math.max(aDecimals, bDecimals) // Use the larger number of decimals

  // Normalize and subtract
  const result =
    (numA * Math.pow(10, maxDecimals) - numB * Math.pow(10, maxDecimals)) /
    Math.pow(10, maxDecimals)

  return parseFloat(result.toFixed(maxDecimals))
}
