export const getUnisat = () => (globalThis as any)?.unisat

export const isUnisatAvailable = () => !!getUnisat()
