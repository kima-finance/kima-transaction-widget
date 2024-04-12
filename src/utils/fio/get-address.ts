import { fetchWrapper } from './fetch-wrapper'
import { FIOSDK } from '@fioprotocol/fiosdk'
import { ChainName } from '../../utils/constants'

const fioLinks = {
  testnet: 'https://test.fio.eosusa.io/v1/chain',
  mainnet: 'https://fio.blockpane.com/v1/chain',

  testnet2: 'https://testnet.fioprotocol.io/v1/',
  mainnet2: 'https://fio.eosphere.io/v1/'
}

interface FioAddress {
  address: string
  chainCode: string
  tokenCode: string
}

const customChainCodes = {
  [ChainName.SOLANA]: 'solana'
}

const getFioLink = (isTestnet: boolean) =>
  isTestnet ? fioLinks.testnet : fioLinks.mainnet

export const getPubAddress = async (
  fioHandle: string,
  chainCode: string,
  tokenCode: string,
  isTestnet: boolean
) => {
  const providerLink = getFioLink(isTestnet)
  const body = {
    fio_address: fioHandle,
    chain_code: chainCode,
    token_code: tokenCode
  }
  try {
    const data: any = await fetchWrapper.post(
      `${providerLink}/get_pub_address`,
      JSON.stringify(body)
    )
    return data.public_address
  } catch (e) {
    console.error('Failed to get pub address by fio', e)
    return ''
  }
}

export const getPubAddresses = async (
  fioHandle: string,
  isTestnet: boolean
) => {
  const providerLink = getFioLink(isTestnet)
  const body = {
    fio_address: fioHandle
  }
  try {
    const data: any = await fetchWrapper.post(
      `${providerLink}/get_pub_addresses`,
      JSON.stringify(body)
    )
    return data.public_addresses.map((item) => ({
      chainCode: item.chain_code?.toLowerCase(),
      tokenCode: item.token_code?.toLowerCase(),
      address: item.public_address
    })) as FioAddress[]
  } catch (e) {
    console.error('Failed to get pub addresses by fio', e)
    return []
  }
}

export const getAddressByFio = async (
  fioHandle: string,
  chainCode: string,
  tokenCode: string,
  isTestnet: boolean
) => {
  const addresses = await getPubAddresses(fioHandle, isTestnet)
  console.log(
    'FioLogs => getPubAddresses',
    { fioHandle, chainCode, tokenCode },
    addresses
  )
  if (addresses.length) {
    const byChain = addresses.filter((adr) => {
      return (
        chainCode?.trim()?.toLowerCase() === adr.chainCode ||
        customChainCodes[chainCode] === adr.chainCode
      )
    })
    if (byChain.length > 0) {
      const byToken = byChain.find(
        (adr) => adr.tokenCode === tokenCode?.trim()?.toLowerCase()
      )
      return byToken ? byToken.address : byChain[0].address
    }
  }
  return ''
}

export const isValidFioHandle = (fioHandle: string) => {
  if (typeof fioHandle === 'string' && fioHandle.includes('@')) {
    try {
      return FIOSDK.isFioAddressValid(fioHandle)
    } catch (_) {
      return false
    }
  }
  return false
}
