import { getAllPlugins } from '@pluginRegistry'
import useGetCurrentPlugin from './useGetCurrentPlugin'
import { PluginUseAllowanceResult } from '@plugins/pluginTypes'

// assumption: all plugins are registed
const allPlugins = getAllPlugins()
const emptyAllowance: PluginUseAllowanceResult = {
  isApproved: false,
  approve: () => Promise.resolve(),
  allowance: 0
} satisfies PluginUseAllowanceResult

export default function useAllowance({
  setApproving,
  setCancellingApprove
}: {
  setApproving: any
  setCancellingApprove: any
}): PluginUseAllowanceResult {
  const { currentPlugin } = useGetCurrentPlugin()
  const currentPluginID = currentPlugin?.data?.id

  // hooks must have the same order and not be conditional
  // unfortunately, this means using all of them all the time
  // TODO: refactor to remove nested hooks, plugins should implement
  // regular functions which can then be wrapped in a single hook
  const pluginEntries = Object.entries(allPlugins)

  const allAllowances = pluginEntries.map(([pluginID, plugin]) => {
    const { approve, ...allowanceOutput } = plugin.useAllowance()

    // TODO: move the isApproving state into the plugin hook and poll only when approving, OR
    // TODO: refactor into useMutation hook
    const wrappedApprove = async (isCancel = false) => {
      if (isCancel) {
        setCancellingApprove(true)
      } else {
        setApproving(true)
      }
      try {
        await approve(isCancel)
      } finally {
        setCancellingApprove(false)
        setApproving(false)
      }
    }
    return {
      ...allowanceOutput,
      approve: wrappedApprove,
      pluginID
    }
  })

  const allowance = allAllowances.find(
    ({ pluginID }) => pluginID === currentPluginID
  )

  return allowance ?? emptyAllowance
}
