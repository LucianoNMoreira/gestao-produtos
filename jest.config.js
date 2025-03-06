module.exports = {
  testEnvironment: 'jest-fixed-jsdom', // https://mswjs.io/docs/faq/#requestresponsetextencoder-is-not-defined-jest
  transform: {
    '^.+\\.(jsx?|tsx)$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.spec.*'
  ]
}
