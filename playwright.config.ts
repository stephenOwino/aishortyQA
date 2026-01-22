import dotenvx from '@dotenvx/dotenvx';
import { defineConfig, devices } from '@playwright/test';

dotenvx.config({
  path: `${__dirname}/.env`,
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
  expect: {
    timeout: 50000,
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  projects: [
    {
      name: `chromium`,
      use: { ...devices[`Desktop Chrome`] },
    },
    {
      name: `firefox`,
      use: { ...devices[`Desktop Firefox`] },
    },
    {
      name: `webkit`,
      use: { ...devices[`Desktop Safari`] },
    },
    {
      name: `Mobile Chrome`,
      use: { ...devices[`Pixel 7`] },
    },
    {
      name: `Mobile Safari`,
      use: { ...devices[`iPhone 14`] },
    },
  ],
  reporter: [[`html`, { open: process.env.CI ? `never` : `on-failure` }]],
  retries: process.env.CI ? 2 : 1,

  testDir: `./tests`,

  timeout: 60000,

  use: {
    actionTimeout: 15000,
    baseURL: process.env.DEMOQA,
    ignoreHTTPSErrors: true,
    navigationTimeout: 30000,
    screenshot: `only-on-failure`,
    trace: `retain-on-failure`,
    video: `on-first-retry`,
  },

  workers: process.env.CI ? 1 : undefined,
});
