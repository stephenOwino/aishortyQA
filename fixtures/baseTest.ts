import { test as baseTest, expect, Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';

type PageObjects = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

type AuthFixture = {
  authenticatedPage: Page;
};

export const test = baseTest.extend<AuthFixture & PageObjects>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});

export { expect };
