// Return shortened address for EVM, Solana wallet address
import { ethers } from 'ethers'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import {
  CHAIN_NAMES_TO_STRING,
  ExternalProvider,
  NetworkFee,
  SolProvider,
  TronProvider
} from '@interface'
import { Connection, PublicKey } from '@solana/web3.js'
import { TokenOptions } from '@store/optionSlice'
import { TronWeb } from 'tronweb'

export const getShortenedAddress = (address: string) => {
  const is0x = (addr: string) => addr?.startsWith('0x')
  return `${address?.substring(0, is0x(address) ? 6 : 5)}...${address?.substr(
    address.length - (is0x(address) ? 8 : 8)
  )}`
}

/* function for checking if pool in the target network has
enough tokens in the pool and enough gas for sending the transaction
*/
export const checkPoolBalance = ({
  pools,
  targetChain,
  targetCurrency,
  amount,
  targetNetworkFee
}: {
  pools: Array<any> | undefined
  targetChain: string
  targetCurrency: string
  amount: string
  targetNetworkFee: NetworkFee | undefined
}): { isPoolAvailable: boolean; error: string } => {
  const finalTargetCurrency =
    targetCurrency === 'KIMAUSD' ? 'USDK' : targetCurrency
  if (!pools) return { isPoolAvailable: false, error: 'Pools data unavailable' }

  if (!targetNetworkFee)
    return { isPoolAvailable: false, error: 'Undefined target network fee' }

  /* find the current selected pool to transfer from kima pool */
  const targetPool = pools.find(
    (pool) => pool.chainName === targetChain // get the current target network pool info
  )

  if (!targetPool)
    return {
      isPoolAvailable: false,
      error: `Pools for ${CHAIN_NAMES_TO_STRING[targetChain]} unavailable!`
    }

  // find the selected token in the target pool
  const { balance: poolTokens, nativeGasAmount: poolGasAvailable } = targetPool
  const targetToken = poolTokens.find(
    (token: any) => token.tokenSymbol === finalTargetCurrency
  )
  const { amount: targetTokenBalance } = targetToken

  // check if pool has enough balance
  if (parseFloat(amount) > parseFloat(targetTokenBalance))
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough ${targetCurrency}!`
    }

  // check if pool has enough gas for releasing tokens
  if (targetNetworkFee.amount >= poolGasAvailable)
    return {
      isPoolAvailable: false,
      error: `${CHAIN_NAMES_TO_STRING[targetChain]} pool has not enough gas!`
    }

  return { isPoolAvailable: true, error: '' }
}

// returns token address of the current selected coin and source chain
export const getTokenAddress = (
  tokenOptions: TokenOptions,
  selectedCoin: string,
  chain: string
) => {
  return tokenOptions[selectedCoin][chain] || ''
}

// get pool address of a given chain
export const getPoolAddress = (pools: Array<any>, chain: string) => {
  return pools.find((pool) => pool.chainName === chain).poolAddress
}

// get tx id from the tx status response
export const getTransactionId = (transactionEvents: any) => {
  for (const event of transactionEvents) {
    if (event.type === 'transaction_requested') {
      for (const attr of event.attributes) {
        if (attr.key === 'txId') {
          return attr.value
        }
      }
    }
  }
}

export const preciseSubtraction = (
  a: number | string,
  b: number | string,
  decimals: number = 18 // Default to 18 decimals for precision
): number => {
  // Parse inputs into BigNumbers using ethers' parseUnits
  const numA = ethers.utils.parseUnits(a.toString(), decimals)
  const numB = ethers.utils.parseUnits(b.toString(), decimals)

  // Perform the subtraction using BigNumber
  const result = numA.sub(numB)

  // Format the result back to a decimal string
  return parseFloat(ethers.utils.formatUnits(result, decimals))
}

export const isValidExternalProvider = (externalProvider: ExternalProvider) => {
  const { type, provider, signer } = externalProvider

  // evm provider type check
  if (type === 'evm') {
    if (
      !(provider instanceof Web3Provider) ||
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

const isSolProvider = (provider: SolProvider) => {
  // TODO: refactor to a class or check the right function signature
  return (
    provider &&
    provider.connection instanceof Connection &&
    typeof provider.signTransaction === 'function'
  )
}

const isTronProvider = (provider: TronProvider) => {
  // TODO: refactor to a class or check the right function signature
  return (
    provider &&
    provider.tronWeb instanceof TronWeb &&
    typeof provider.signTransaction === 'function'
  )
}

export function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

export const calcKimaFee = (amount: string) => {
  // parse amount to big int
  const parsedAmount = parseUnits(amount.toString(), 4)

  // 0.015% Kima service fee
  // fiat onramp transaction takes 3% fees as comission
  const kimaFee = (parsedAmount * BigInt(15)) / BigInt(10000)

  return formatUnits(kimaFee, 4)
}

export const calcCreditCardFee = (
  amount: string,
  targetNetworkFee: NetworkFee
) => {
  console.log('calcCreditCardFee: amount: ', amount)
  console.log('calcCreditCardFee: targetNetworkFee', targetNetworkFee)

  // parse amount to big int
  const parsedAmount = parseUnits(amount.toString(), 2)

  // 0.015% Kima service fee
  // fiat onramp transaction takes 3% fees as comission
  const kimaFee = (parsedAmount * BigInt(15)) / BigInt(10000)

  console.log('calcCreditCardFee: kimaFee', formatUnits(kimaFee, 2))

  const targetFee = parseUnits(targetNetworkFee.amount.toString(), 2)

  // Calculate the total base amount (sum of the amount and other fees)
  const baseFiatAmount = parsedAmount + kimaFee + targetFee
  console.log(
    'calcCreditCardFee: baseFiatAmount',
    formatUnits(baseFiatAmount, 2)
  )

  const creditCardFee = (baseFiatAmount * BigInt(3)) / BigInt(100)
  console.log(
    'calcCreditCardFee: creditCardFee',
    formatUnits(baseFiatAmount, 2)
  )

  return formatUnits(creditCardFee, 2)
}

export function parseUnits(value: string, decimals: number) {
  if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(value)) throw new Error(value)

  let [integer, fraction = '0'] = value.split('.')

  const negative = integer.startsWith('-')
  if (negative) integer = integer.slice(1)

  // trim trailing zeros.
  fraction = fraction.replace(/(0+)$/, '')

  // round off if the fraction is larger than the number of decimals.
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1)
      integer = `${BigInt(integer) + 1n}`
    fraction = ''
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals)
    ]

    const rounded = Math.round(Number(`${unit}.${right}`))
    if (rounded > 9)
      fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, '0')
    else fraction = `${left}${rounded}`

    if (fraction.length > decimals) {
      fraction = fraction.slice(1)
      integer = `${BigInt(integer) + 1n}`
    }

    fraction = fraction.slice(0, decimals)
  } else {
    fraction = fraction.padEnd(decimals, '0')
  }

  return BigInt(`${negative ? '-' : ''}${integer}${fraction}`)
}

export function formatUnits(value: bigint, decimals: number) {
  let display = value.toString()

  const negative = display.startsWith('-')
  if (negative) display = display.slice(1)

  display = display.padStart(decimals, '0')

  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ]
  fraction = fraction.replace(/(0+)$/, '')
  return `${negative ? '-' : ''}${integer || '0'}${
    fraction ? `.${fraction}` : ''
  }`
}
