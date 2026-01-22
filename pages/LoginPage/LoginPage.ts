import { faker } from '@faker-js/faker';
import { Locator, Page } from '@playwright/test';

import { LoginPageLocators as locators } from './LoginPageLocators';

export interface LoginData {
  email: string;
  password: string;
}

export class LoginPage {
  readonly appleSignInBtn: Locator;

  readonly email: Locator;
  readonly errorEmailInvalid: Locator;

  readonly errorEmailRequired: Locator;
  readonly errorPasswordRequired: Locator;
  readonly forgotPasswordLink: Locator;
  readonly googleSignInBtn: Locator;

  readonly loginBtn: Locator;
  readonly page: Page;
  readonly password: Locator;

  constructor(page: Page) {
    this.page = page;

    this.email = page.getByRole(`textbox`, { name: `Email` });
    this.password = page.getByRole(`textbox`, { name: `Password` });

    this.loginBtn = page.getByRole(`button`, { name: locators.loginBtnName });
    this.forgotPasswordLink = page.getByRole(`link`, { name: locators.forgotPasswordLinkName });
    this.googleSignInBtn = page.locator(locators.googleSignInBtn);
    this.appleSignInBtn = page.locator(locators.appleSignInBtn);

    this.errorEmailRequired = page.locator(`form`).getByText(locators.errors.emailRequired).first();
    this.errorPasswordRequired = page
      .locator(`form`)
      .getByText(locators.errors.passwordRequired)
      .last();
    this.errorEmailInvalid = page.locator(`form`).getByText(locators.errors.emailInvalid);
  }

  async clickAppleSignIn(): Promise<void> {
    await this.appleSignInBtn.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async clickGoogleSignIn(): Promise<void> {
    await this.googleSignInBtn.click();
  }

  async clickLogin(): Promise<void> {
    await this.loginBtn.click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.email.fill(email);
  }

  async fillInvalidEmail(): Promise<void> {
    const invalidEmail = faker.string.alphanumeric(8);
    await this.email.click();
    await this.email.fill(invalidEmail);
  }

  async fillPassword(password: string): Promise<void> {
    await this.password.fill(password);
  }

  async fillWithInvalidEmailAndPassword(): Promise<void> {
    const invalidEmail = faker.string.alphanumeric(8);
    const shortPassword = faker.string.alpha(6);

    await this.email.click();
    await this.email.fill(invalidEmail);
    await this.password.click();
    await this.password.fill(shortPassword);
  }

  async goTo(): Promise<void> {
    await this.page.goto(`/login`);
  }

  async login(data: LoginData): Promise<void> {
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.loginBtn.click();
  }

  async loginWithRandomData(): Promise<LoginData> {
    const email = faker.internet.email();
    const password = `Test@123` + faker.string.alphanumeric(6);

    await this.email.fill(email);
    await this.password.fill(password);

    return { email, password };
  }
}
