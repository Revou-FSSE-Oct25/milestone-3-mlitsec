/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverageFrom: [
    "src/context/cart-reducer.ts",
    "src/lib/utils.ts",
    "src/lib/fakestore.ts",
    "src/app/api/auth/login/route.ts",
    "src/app/api/admin/products/route.ts",
    "src/app/api/admin/products/[id]/route.ts",
  ],
};
