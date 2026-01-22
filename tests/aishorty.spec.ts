import { test, expect } from '../fixtures/baseTest';

test.describe('User Registration', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goTo();
  });

  test('should successfully register with valid data', async ({ page, registerPage }) => {
    const userData = await registerPage.fillFormWithRandomData();
    await registerPage.clickCreateAccount();
    
    await expect(page).toHaveURL(/.*verification\//);
    await expect(page.getByText('Please verify your email')).toBeVisible();
  });

  test('should show error when first name is missing', async ({ registerPage }) => {
    await registerPage.fillFormWithoutFirstName();
    await registerPage.clickCreateAccount();
    await expect(registerPage.errorFirstName).toBeVisible();
  });

  test('should show error when last name is missing', async ({ registerPage }) => {
    await registerPage.fillFormWithoutLastName();
    await registerPage.clickCreateAccount();
    await expect(registerPage.errorLastName).toBeVisible();
  });

  test('should show error when username is missing', async ({ registerPage }) => {
    await registerPage.fillFormWithoutUsername();
    await registerPage.clickCreateAccount();
    await expect(registerPage.errorUsername).toBeVisible();
  });

  test('should show error when email is missing', async ({ registerPage }) => {
    await registerPage.fillFormWithoutEmail();
    await registerPage.clickCreateAccount();
    await expect(registerPage.errorEmail).toBeVisible();
  });

  test('should show error when password is too short', async ({ registerPage }) => {
    await registerPage.fillFormWithShortPassword();
    await expect(registerPage.errorMinLength).toBeVisible();
  });

  test('should show error when password has no number', async ({ registerPage }) => {
    await registerPage.fillFormWithPasswordNoNumber();
    await expect(registerPage.errorNumber).toBeVisible();
  });

  test('should show error when password has no uppercase letter', async ({ registerPage }) => {
    await registerPage.fillFormWithPasswordNoUppercase();
    await expect(registerPage.errorUppercase).toBeVisible();
  });

  test('should show error when password has no special character', async ({ registerPage }) => {
    await registerPage.fillFormWithPasswordNoSpecialChar();
    await expect(registerPage.errorSpecialChar).toBeVisible();
  });

  test('should show error when passwords do not match', async ({ registerPage }) => {
    await registerPage.fillFormWithMismatchedPasswords();
    await expect(registerPage.errorPasswordMatch).toBeVisible();
  });

  test('should navigate to sign in page when clicking sign in link', async ({ page, registerPage }) => {
    await registerPage.clickSignIn();
    await expect(page).toHaveURL(/.*sign-in|.*login|.*signin/);
  });
});