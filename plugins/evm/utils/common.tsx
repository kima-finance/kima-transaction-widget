/**
 * Converts a decimal chainId to its hexadecimal representation.
 *
 * @param {number} chainId - The decimal chainId to convert.
 * @returns {string} The hexadecimal representation prefixed with "0x".
 */
export function decimalToHex(chainId:number): string {
  return `0x${chainId.toString(16)}`
}
