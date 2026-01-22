import { faker } from "@faker-js/faker";
import { Locator, Page } from "@playwright/test";
import { RegisterPageLocators as locators } from "./RegisterPageLocators";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export class RegisterPage {
  readonly page: Page;

  readonly signupLink: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly username: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;

  readonly createAccountBtn: Locator;
  readonly signInLink: Locator;

  readonly errorFirstName: Locator;
  readonly errorLastName: Locator;
  readonly errorUsername: Locator;
  readonly errorEmail: Locator;
  readonly errorMinLength: Locator;
  readonly errorNumber: Locator;
  readonly errorUppercase: Locator;
  readonly errorSpecialChar: Locator;
  readonly errorPasswordMatch: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signupLink = page.locator(locators.signupLink);
    this.firstName = page.locator(locators.firstName);
    this.lastName = page.locator(locators.lastName);
    this.username = page.locator(locators.username);
    this.email = page.locator(locators.email);
    this.password = page.locator(locators.password);
    this.confirmPassword = page.locator(locators.confirmPassword);

    this.createAccountBtn = page.getByRole('button', { name: locators.createAccountBtnName });
    this.signInLink = page.getByRole('link', { name: locators.signInLinkName });

    this.errorFirstName = page.getByText(locators.errors.firstName);
    this.errorLastName = page.getByText(locators.errors.lastName);
    this.errorUsername = page.getByText(locators.errors.username);
    this.errorEmail = page.getByText(locators.errors.email);
    this.errorMinLength = page.getByText(locators.errors.minLength);
    this.errorNumber = page.getByText(locators.errors.number);
    this.errorUppercase = page.getByText(locators.errors.uppercase);
    this.errorSpecialChar = page.getByText(locators.errors.specialChar);
    this.errorPasswordMatch = page.getByText(locators.errors.passwordMatch);
  }

  async goTo(): Promise<void> {
    await this.page.goto('/signup');
  }

  async fillFormWithRandomData(): Promise<RegistrationData> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({ firstName, lastName });
    const email = faker.internet.email();
    const password = 'Test@123' + faker.string.alphanumeric(6);

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.username.fill(username);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);

    return { firstName, lastName, username, email, password };
  }

  async register(data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }): Promise<void> {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.username.fill(data.username);
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.confirmPassword.fill(data.confirmPassword || data.password);
    await this.createAccountBtn.click();
  }

  async fillFormWithoutFirstName(): Promise<void> {
    await this.lastName.fill(faker.person.lastName());
    await this.username.fill(faker.internet.username());
    await this.email.fill(faker.internet.email());
    const password = 'Test@123' + faker.string.alphanumeric(6);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
  }

  async fillFormWithoutLastName(): Promise<void> {
    await this.firstName.fill(faker.person.firstName());
    await this.username.fill(faker.internet.username());
    await this.email.fill(faker.internet.email());
    const password = 'Test@123' + faker.string.alphanumeric(6);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
  }

  async fillFormWithoutUsername(): Promise<void> {
    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.email.fill(faker.internet.email());
    const password = 'Test@123' + faker.string.alphanumeric(6);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
  }

  async fillFormWithoutEmail(): Promise<void> {
    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.username.fill(faker.internet.username());
    const password = 'Test@123' + faker.string.alphanumeric(6);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
  }

  async fillFormWithShortPassword(): Promise<void> {
    const shortPassword = 'Aa1!';

    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.username.fill(faker.internet.username());
    await this.email.fill(faker.internet.email());
    await this.password.fill(shortPassword);
    await this.page.waitForTimeout(500);
  }

  async fillFormWithPasswordNoNumber(): Promise<void> {
    const passwordNoNumber = 'Test@Test!';

    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.username.fill(faker.internet.username());
    await this.email.fill(faker.internet.email());
    await this.password.fill(passwordNoNumber);

    await this.page.waitForTimeout(500);
  }

  async fillFormWithPasswordNoUppercase(): Promise<void> {
    const passwordNoUppercase = 'test@123456';

    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.username.fill(faker.internet.username());
    await this.email.fill(faker.internet.email());
    await this.password.fill(passwordNoUppercase);

    await this.page.waitForTimeout(500);
  }

  async fillFormWithPasswordNoSpecialChar(): Promise<void> {
    const passwordNoSpecial = 'Test123456';

    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.username.fill(faker.internet.username());
    await this.email.fill(faker.internet.email());
    await this.password.fill(passwordNoSpecial);

    await this.page.waitForTimeout(500);
  }

  async fillFormWithMismatchedPasswords(): Promise<void> {
    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.username.fill(faker.internet.username());
    await this.email.fill(faker.internet.email());

    const password1 = 'Test@123' + faker.string.alphanumeric(6);
    const password2 = 'Different@456' + faker.string.alphanumeric(6);

    await this.password.fill(password1);
    await this.confirmPassword.fill(password2);

    await this.page.waitForTimeout(500);
  }

  async fillFormWithWeakPassword(): Promise<void> {
    const weakPassword = 'test';

    await this.firstName.fill(faker.person.firstName());
    await this.lastName.fill(faker.person.lastName());
    await this.username.fill(faker.internet.username());
    await this.email.fill(faker.internet.email());
    await this.password.fill(weakPassword);

    await this.page.waitForTimeout(500);
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountBtn.click();
  }

  async clickSignIn(): Promise<void> {
    await this.signInLink.click();
  }
}