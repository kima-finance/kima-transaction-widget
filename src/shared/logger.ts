import log, { LogLevelDesc } from 'loglevel'

const safeEnv =
  (typeof process !== 'undefined' && process.env) ||
  ((import.meta as any).env ?? {}) ||
  {}

export const DEFAULT_LOG_LEVEL = (safeEnv.LOG_LEVEL ||
  safeEnv.NEXT_PUBLIC_LOG_LEVEL ||
  safeEnv.VITE_LOG_LEVEL ||
  'error') as LogLevelDesc

if (log.getLevel() !== (DEFAULT_LOG_LEVEL as any)) {
  console.info('Setting log level from ENV to:', DEFAULT_LOG_LEVEL)
  log.setLevel(DEFAULT_LOG_LEVEL)
}

export default log
