import { expect, test } from '../fixtures/baseTest';

test.describe(`User Login`, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
  });

  test(`should display login page heading`, async ({ page }) => {
    await expect(page.locator(`body`)).toContainText(`Welcome Back!`);
  });

  test(`should successfully login with valid credentials`, async ({ loginPage, page }) => {
    const testEmail = process.env.TEST_USER_EMAIL!;
    const testPassword = process.env.TEST_USER_PASSWORD!;

    await loginPage.login({
      email: testEmail,
      password: testPassword,
    });

    await expect(page).toHaveURL(/.*verification\//);
    await expect(page.getByRole(`heading`, { name: `Please verify your email` })).toBeVisible();
    await expect(page.locator(`body`)).toContainText(
      `You're almost there! We've sent a verification email to`
    );
    await expect(page.locator(`body`)).toContainText(testEmail);
    await expect(page.locator(`body`)).toContainText(`check your spam folder`);
    await expect(page.locator(`body`)).toContainText(`Still can't find the email?`);
    await expect(page.getByRole(`button`, { name: `Resend Email` })).toBeVisible();
    await expect(page.getByText(`Back to login`)).toBeVisible();
  });

  test(`should show required error when email is empty on blur`, async ({ loginPage }) => {
    await loginPage.email.click();
    await loginPage.password.click();
    await expect(loginPage.errorEmailRequired).toBeVisible();
  });

  test(`should show error with invalid email format`, async ({ loginPage, page }) => {
    await loginPage.fillInvalidEmail();
    await loginPage.password.click();
    await expect(page.locator(`form`)).toContainText(`email must be a valid email`);
  });

  test(`should allow login attempt with invalid email and short password`, async ({
    loginPage,
    page,
  }) => {
    await loginPage.fillWithInvalidEmailAndPassword();
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator(`form`)).toContainText(`email must be a valid email`);
  });

  test(`should navigate to Google signin when clicking Google button`, async ({
    loginPage,
    page,
  }) => {
    await loginPage.clickGoogleSignIn();
    await expect(page.getByRole(`main`)).toContainText(`Sign in with Google`);
    await expect(page.locator(`section`)).toContainText(`Forgot email?`);
  });

  test(`should navigate to Apple signin when clicking Apple button`, async ({
    loginPage,
    page,
  }) => {
    await loginPage.clickAppleSignIn();
    await expect(page.locator(`#ac-localnav`)).toContainText(`Apple Account`);
    await expect(page.locator(`#contentheader`)).toContainText(
      `Use your Apple Account to sign in to Shorty.`
    );
  });

  test(`should have forgot password link`, async ({ page }) => {
    await expect(page.getByRole(`link`, { name: `Forgot your password?` })).toBeVisible();
  });

  test(`should navigate to forgot password page when clicking forgot password`, async ({
    loginPage,
    page,
  }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/.*forgot-password|.*reset-password/);
  });
});
