import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  reporter: [
    ['list'], 
    ['html', { open: 'never' }] 
  ],
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer:true,
    timeout: 3000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
  },
});
