export function fromHex(address) {
  if (!isHex(address)) return address;

  return getBase58CheckAddress(
    hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX))
  );
}

export function toHex(address) {
  if (isHex(address))
    return address.toLowerCase().replace(/^0x/, ADDRESS_PREFIX);

  return byteArray2hexStr(decodeBase58Address(address)).toLowerCase();
}