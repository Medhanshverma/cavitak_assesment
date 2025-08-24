import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

// Clean up previous test results before running new tests
const resultsDir = './playwright-report';
if (fs.existsSync(resultsDir)) {
  fs.rmSync(resultsDir, { recursive: true, force: true });
}

export default defineConfig({
  testDir: './tests',
  timeout: 15000,
  retries: 0,
  reporter: [['html', { open: 'never' }]],
  use: {
    video: 'on',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    baseURL: 'https://cavitak-assesment.vercel.app/',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
