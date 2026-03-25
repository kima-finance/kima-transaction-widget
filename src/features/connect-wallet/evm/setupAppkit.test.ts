const mockCreateAppKit = jest.fn()
const mockEthersAdapter = jest.fn()

jest.mock('@reown/appkit/react', () => ({
  createAppKit: (...args: unknown[]) => mockCreateAppKit(...args)
}))

jest.mock('@reown/appkit-adapter-ethers', () => ({
  EthersAdapter: function MockEthersAdapter(...args: unknown[]) {
    return mockEthersAdapter(...args) ?? { kind: 'mock-ethers-adapter' }
  }
}))

jest.mock('@reown/appkit/networks', () => {
  const network = { id: 1, name: 'mock-network' }

  return {
    mainnet: network,
    bsc: network,
    polygon: network,
    base: network,
    arbitrum: network,
    optimism: network,
    avalanche: network,
    confluxESpace: network,
    sepolia: network,
    bscTestnet: network,
    baseSepolia: network,
    polygonAmoy: network,
    arbitrumSepolia: network,
    optimismSepolia: network,
    avalancheFuji: network,
    berachainBepolia: network,
    confluxESpaceTestnet: network
  }
})

describe('setupAppKit', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    mockCreateAppKit.mockReturnValue({ open: jest.fn() })
    mockEthersAdapter.mockReturnValue({ kind: 'mock-ethers-adapter' })
  })

  it('keeps injected discovery and EIP-6963 enabled for wallet detection', async () => {
    const { NetworkOptions } = await import('@kima-widget/shared/types')
    const { setupAppKit } = await import('./setupAppkit')

    setupAppKit('project-id', NetworkOptions.mainnet)

    expect(mockCreateAppKit).toHaveBeenCalledTimes(1)
    expect(mockCreateAppKit).toHaveBeenCalledWith(
      expect.objectContaining({
        enableInjected: true,
        enableEIP6963: true,
        projectId: 'project-id'
      })
    )
  })
})
