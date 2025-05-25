import nextJest from 'next/jest';

// jest.config.js

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/Components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/customeHooks/(.*)$': '<rootDir>/src/customeHooks/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
