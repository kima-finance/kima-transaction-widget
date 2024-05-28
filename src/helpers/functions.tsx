export const formatterInt = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

export const formatterFloat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 9
})

export function isEmptyObject(arg) {
  return typeof arg === 'object' && Object.keys(arg).length === 0
}
