import dotenvx from "@dotenvx/dotenvx";
import { defineConfig, devices } from "@playwright/test";

dotenvx.config({
  path: `${__dirname}/.env.dev`, 
});

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

export default defineConfig({
  testDir: './src/tests', 
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporting */
  reporter: [
    ['html', { open: process.env.CI ? 'never' : 'on-failure' }],
  ],

  use: {
    baseURL: process.env.DEMOQA,
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'on-first-retry',
  },

  /* Multi-Platform Projects */
  projects: [
    // Desktop Viewports
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Viewports 
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14'] },
    },
  ],
});
