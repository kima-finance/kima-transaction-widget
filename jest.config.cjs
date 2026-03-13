module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/test/setupEnv.js'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@kima-widget/shared/logger$': '<rootDir>/test/loggerMock.js',
    '^@kima-widget/(.*)$': '<rootDir>/src/$1',
    '^@solana/web3\\.js$': '<rootDir>/test/solanaWeb3Mock.js',
    '\\.(css|scss)$': '<rootDir>/test/styleMock.js'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        diagnostics: false
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/example-next/', '/example-vite/'],
  coveragePathIgnorePatterns: [
    'src/utils',
    'src/styles/hooks',
    'src/assets',
    'src/contexts',
    'src/helpers'
  ]
}
