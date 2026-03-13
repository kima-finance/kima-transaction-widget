import React from 'react'
import { render, screen } from '@testing-library/react'
import { ChainCompatibility, PluginDescriptor } from '@kima-widget/shared/types'
import {
  createPluginRuntime,
  PluginRuntimeProvider,
  usePluginRuntime
} from './runtime'

const createPlugin = (id: string, compatibility: ChainCompatibility): PluginDescriptor => ({
  id,
  compatibility,
  isCompatible: (chain) => chain.compatibility === compatibility,
  Provider: ({ children }) => <div data-testid={`provider-${id}`}>{children}</div>
})

describe('plugin runtime', () => {
  it('resolves plugins by chain compatibility', () => {
    const runtime = createPluginRuntime([
      createPlugin('EVM', ChainCompatibility.EVM),
      createPlugin('BTC', ChainCompatibility.BTC)
    ])

    expect(
      runtime.resolvePlugin({
        shortName: 'ETH',
        compatibility: ChainCompatibility.EVM
      } as any)?.id
    ).toBe('EVM')
    expect(
      runtime.resolvePlugin({
        shortName: 'BTC',
        compatibility: ChainCompatibility.BTC
      } as any)?.id
    ).toBe('BTC')
  })

  it('wraps children with provider-scoped plugin providers', () => {
    const plugins = [
      createPlugin('OUTER', ChainCompatibility.EVM),
      createPlugin('INNER', ChainCompatibility.BTC)
    ]

    const RuntimeProbe = () => {
      const runtime = usePluginRuntime()
      return <div data-testid='runtime-count'>{runtime.plugins.length}</div>
    }

    render(
      <PluginRuntimeProvider
        plugins={plugins}
        providerProps={{ networkOption: undefined }}
      >
        <RuntimeProbe />
        <div data-testid='child'>child</div>
      </PluginRuntimeProvider>
    )

    expect(screen.getByTestId('runtime-count')).toHaveTextContent('2')
    expect(screen.getByTestId('provider-OUTER')).toBeInTheDocument()
    expect(screen.getByTestId('provider-INNER')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
