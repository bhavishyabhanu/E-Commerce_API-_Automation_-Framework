import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://dummyjson.com',
  },

  reporter: 'html',

  timeout: 30000,
});