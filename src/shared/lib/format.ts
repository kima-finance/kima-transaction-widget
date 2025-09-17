export const formatterInt = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

export const formatterFloat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 6,
  useGrouping: false
})

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
