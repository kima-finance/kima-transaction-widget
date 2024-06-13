export const formatterInt = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

export const formatterFloat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
})

export function isEmptyObject(arg) {
  return typeof arg === 'object' && Object.keys(arg).length === 0
}

export const sleep = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay))
