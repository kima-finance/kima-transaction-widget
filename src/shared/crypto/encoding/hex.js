/* eslint-disable eqeqeq */
import { utils as ethersUtils } from 'ethers'
import { byteArray2hexStr } from './bytes'
import { hexStr2byteArray } from './code'
import { encode58, decode58 } from './base58'

const ADDRESS_PREFIX = '41'

function isHex(string) {
  return (
    typeof string === 'string' &&
    !isNaN(parseInt(string, 16)) &&
    /^(0x|)[a-fA-F0-9]+$/.test(string)
  )
}

function SHA256(msgBytes) {
  const msgHex = byteArray2hexStr(msgBytes)
  const hashHex = ethersUtils.sha256('0x' + msgHex).replace(/^0x/, '')
  return hexStr2byteArray(hashHex)
}

function getBase58CheckAddress(addressBytes) {
  const hash0 = SHA256(addressBytes)
  const hash1 = SHA256(hash0)

  let checkSum = hash1.slice(0, 4)
  checkSum = addressBytes.concat(checkSum)

  return encode58(checkSum)
}

function decodeBase58Address(base58Sting) {
  if (typeof base58Sting != 'string') return false

  if (base58Sting.length <= 4) return false

  let address = decode58(base58Sting)

  if (base58Sting.length <= 4) return false

  const len = address.length
  const offset = len - 4
  const checkSum = address.slice(offset)

  address = address.slice(0, offset)

  const hash0 = SHA256(address)
  const hash1 = SHA256(hash0)
  const checkSum1 = hash1.slice(0, 4)

  if (
    checkSum[0] == checkSum1[0] &&
    checkSum[1] == checkSum1[1] &&
    checkSum[2] == checkSum1[2] &&
    checkSum[3] == checkSum1[3]
  ) {
    return address
  }

  throw new Error('Invalid address provided')
}

export function isHexChar(c) {
  if (
    (c >= 'A' && c <= 'F') ||
    (c >= 'a' && c <= 'f') ||
    (c >= '0' && c <= '9')
  ) {
    return 1
  }

  return 0
}

export function hexChar2byte(c) {
  let d

  if (c >= 'A' && c <= 'F') d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10
  else if (c >= 'a' && c <= 'f') d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10
  else if (c >= '0' && c <= '9') d = c.charCodeAt(0) - '0'.charCodeAt(0)

  if (typeof d === 'number') return d
  else throw new Error('The passed hex char is not a valid hex char')
}

export function hexStr2byteArray(str, strict = false) {
  if (typeof str !== 'string')
    throw new Error('The passed string is not a string')

  let len = str.length

  if (strict) {
    if (len % 2) {
      str = `0${str}`
      len++
    }
  }
  const byteArray = []
  let d = 0
  let j = 0
  let k = 0

  for (let i = 0; i < len; i++) {
    const c = str.charAt(i)

    if (isHexChar(c)) {
      d <<= 4
      d += hexChar2byte(c)
      j++

      if (0 === j % 2) {
        byteArray[k++] = d
        d = 0
      }
    } else throw new Error('The passed hex char is not a valid hex string')
  }

  return byteArray
}
