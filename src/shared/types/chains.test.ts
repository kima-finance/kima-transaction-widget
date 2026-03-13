import { lightDemoAccounts, lightDemoNetworks } from './chains'

describe('light demo chain exposure', () => {
  it('does not expose BTC in light demo network options', () => {
    expect(lightDemoNetworks).not.toContain('BTC')
  })

  it('keeps the BTC demo account available for internal BTC-specific flows', () => {
    expect(lightDemoAccounts.BTC).toBeTruthy()
  })
})
