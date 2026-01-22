import { expect, test } from '../fixtures/baseTest';

test.describe(`User Registration`, () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goTo();
  });

  test(`should display signup page heading`, async ({ page }) => {
    await expect(page.locator(`body`)).toContainText(`Let's get you set up`);
  });

  test(`should successfully register with valid data`, async ({ page, registerPage }) => {
    await registerPage.fillFormWithRandomData();
    await registerPage.clickCreateAccount();

    await expect(page).toHaveURL(/.*verification\//);
    await expect(page.getByText(`Please verify your email`)).toBeVisible();
  });

  test(`should show error when first name is missing`, async ({ registerPage }) => {
    await registerPage.fillFormWithoutFirstName();
    await registerPage.clickCreateAccount();
    await expect(registerPage.errorFirstName).toBeVisible();
  });

  test(`should show error when last name is missing`, async ({ registerPage }) => {
    await registerPage.fillFormWithoutLastName();
    await registerPage.clickCreateAccount();
    await expect(registerPage.errorLastName).toBeVisible();
  });

  test(`should show error when username is missing`, async ({ registerPage }) => {
    await registerPage.fillFormWithoutUsername();
    await registerPage.clickCreateAccount();
    await expect(registerPage.errorUsername).toBeVisible();
  });

  test(`should show error when email is missing`, async ({ registerPage }) => {
    await registerPage.fillFormWithoutEmail();
    await registerPage.clickCreateAccount();
    await expect(registerPage.errorEmail).toBeVisible();
  });

  test(`should show error when password is too short`, async ({ registerPage }) => {
    await registerPage.fillFormWithShortPassword();
    await expect(registerPage.errorMinLength).toBeVisible();
  });

  test(`should show error when password has no number`, async ({ registerPage }) => {
    await registerPage.fillFormWithPasswordNoNumber();
    await expect(registerPage.errorNumber).toBeVisible();
  });

  test(`should show error when password has no uppercase letter`, async ({ registerPage }) => {
    await registerPage.fillFormWithPasswordNoUppercase();
    await expect(registerPage.errorUppercase).toBeVisible();
  });

  test(`should show error when password has no special character`, async ({ registerPage }) => {
    await registerPage.fillFormWithPasswordNoSpecialChar();
    await expect(registerPage.errorSpecialChar).toBeVisible();
  });

  test(`should show error when passwords do not match`, async ({ registerPage }) => {
    await registerPage.fillFormWithMismatchedPasswords();
    await expect(registerPage.errorPasswordMatch).toBeVisible();
  });

  test(`should show success indicators for strong password`, async ({ registerPage }) => {
    await registerPage.fillFormWithStrongPassword();

    await expect(registerPage.successMinLength).toBeVisible();
    await expect(registerPage.successNumber).toBeVisible();
    await expect(registerPage.successUppercase).toBeVisible();
    await expect(registerPage.successSpecialChar).toBeVisible();
    await expect(registerPage.successPasswordMatch).toBeVisible();
  });

  test(`should show all validation errors on password field focus`, async ({
    page,
    registerPage,
  }) => {
    await registerPage.firstName.fill(`John`);
    await registerPage.lastName.fill(`Doe`);
    await registerPage.username.fill(`johndoe`);
    await registerPage.email.fill(`john@test.com`);
    await registerPage.password.click();

    await expect(page.getByRole(`list`)).toContainText(`At least 5 characters required`);
    await expect(page.getByRole(`list`)).toContainText(`At least one uppercase letter required`);
    await expect(page.getByRole(`list`)).toContainText(`At least one number required`);
    await expect(page.getByRole(`list`)).toContainText(`At least special character required`);
    await expect(page.getByRole(`list`)).toContainText(`Passwords must match`);
  });

  test(`should navigate to Google signin when clicking Google button`, async ({
    page,
    registerPage,
  }) => {
    await registerPage.clickGoogleSignIn();
    await expect(page.getByRole(`main`)).toContainText(`Sign in with Google`);
    await expect(page.locator(`section`)).toContainText(`Forgot email?`);
  });

  test(`should navigate to Apple signin when clicking Apple button`, async ({
    page,
    registerPage,
  }) => {
    await registerPage.clickAppleSignIn();
    await expect(page.locator(`#ac-localnav`)).toContainText(`Apple Account`);
    await expect(page.locator(`#contentheader`)).toContainText(
      `Use your Apple Account to sign in to Shorty.`
    );
  });

  test(`should navigate to sign in page when clicking sign in link`, async ({
    page,
    registerPage,
  }) => {
    await registerPage.clickSignIn();
    await expect(page).toHaveURL(/.*sign-in|.*login|.*signin/);
  });
});
