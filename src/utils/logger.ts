import log, { LogLevelDesc } from 'loglevel'

// set default log level from ENV
const logLevel = (process?.env.LOG_LEVEL ||
  process?.env.NEXT_PUBLIC_LOG_LEVEL ||
  process?.env.VITE_LOG_LEVEL ||
  'error') as LogLevelDesc
console.info('Setting log level from ENV to:', logLevel)
log.setLevel(logLevel)

export default log
