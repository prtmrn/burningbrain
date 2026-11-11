import { defineConfig } from 'vitest/config';

export default defineConfig({
  // tsconfig est en "jsx": "preserve" (Next) ; les tests compilent en automatique
  esbuild: { jsx: 'automatic' },
  test: {
    setupFiles: ['tests/setup.ts'],
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    environmentMatchGlobs: [
      ['tests/**/*.test.tsx', 'jsdom'],
      ['tests/**/*.test.ts', 'node'],
    ],
  },
});
