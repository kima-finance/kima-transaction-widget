class PublicKey {
  constructor(value = 'mock-public-key') {
    this.value = value
  }

  toBase58() {
    return this.value
  }
}

module.exports = {
  clusterApiUrl: (cluster) => `https://solana.${cluster}.test`,
  PublicKey
}
