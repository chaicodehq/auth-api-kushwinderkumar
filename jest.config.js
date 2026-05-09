export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/tests/**/*.spec.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  verbose: true,
  testTimeout: 300000,  // 5 min — allows mongodb-memory-server to download on first run
};
