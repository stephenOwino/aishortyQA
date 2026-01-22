export const LoginPageLocators = {
  appleSignInBtn: `[data-test="apple-signin"]`,
  email: `input[name="email"]`,

  errors: {
    emailInvalid: `email must be a valid email`,
    emailRequired: `Required`,
    passwordRequired: `Required`,
  },
  forgotPasswordLinkName: `Forgot your password?`,

  googleSignInBtn: `[data-test="google-signin"]`,
  loginBtnName: `Login`,

  password: `input[name="password"]`,
} as const;
