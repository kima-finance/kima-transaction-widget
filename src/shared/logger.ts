import log, { LogLevelDesc } from 'loglevel'

// default log level from env (works in next/vite/node)
export const DEFAULT_LOG_LEVEL = (process?.env.LOG_LEVEL ||
  process?.env.NEXT_PUBLIC_LOG_LEVEL ||
  process?.env.VITE_LOG_LEVEL ||
  'error') as LogLevelDesc

// one-time init
if (log.getLevel() !== (DEFAULT_LOG_LEVEL as any)) {
  // eslint-disable-next-line no-console
  console.info('Setting log level from ENV to:', DEFAULT_LOG_LEVEL)
  log.setLevel(DEFAULT_LOG_LEVEL)
}

export default log
