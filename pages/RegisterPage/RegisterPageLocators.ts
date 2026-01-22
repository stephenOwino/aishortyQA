export const RegisterPageLocators = {
  appleSignInBtn: `[data-test="apple-signin"]`,
  confirmPassword: `#confirmPassword`,
  createAccountBtnName: `Create Account`,
  email: `#email`,
  errors: {
    email: `Please enter your email`,
    firstName: `Please enter your first name`,
    lastName: `Please enter your last name`,
    minLength: `At least 5 characters required`,
    number: `At least one number required`,
    passwordMatch: `Passwords must match`,
    specialChar: `At least special character required`,
    uppercase: `At least one uppercase letter required`,
    username: `Please enter your username`,
  },
  firstName: `#firstName`,
  googleSignInBtn: `[data-test="google-signin"]`,

  lastName: `#lastName`,
  password: `#password`,

  signInLinkName: `Sign in`,
  signupLink: `a[href="https://aishorty.com/signup"]`,

  success: {
    minLength: `The minimum length is reached`,
    number: `At least one number`,
    passwordMatch: `Passwords match`,
    specialChar: `At least special character`,
    uppercase: `At least one uppercase letter`,
  },

  username: `#username`,
} as const;
