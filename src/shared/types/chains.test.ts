import { lightDemoNetworks } from './chains'

describe('light demo chain exposure', () => {
  it('does not expose BTC in light demo network options', () => {
    expect(lightDemoNetworks).not.toContain('BTC')
  })
})
