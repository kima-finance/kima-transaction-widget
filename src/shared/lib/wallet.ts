export const isUserRejected = (err: any): boolean => {
  if (!err) return false
  if (err._kimaUserRejected) return true
  if (err.code === 4001) return true
  const msg = String(err?.message ?? err)
  return /UserRejected|denied|canceled|cancelled/i.test(msg)
}
