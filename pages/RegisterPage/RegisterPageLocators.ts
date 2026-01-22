export const RegisterPageLocators = {
  signupLink: 'a[href="https://aishorty.com/signup"]',
  firstName: '#firstName',
  lastName: '#lastName',
  username: '#username',
  email: '#email',
  password: '#password',
  confirmPassword: '#confirmPassword',

  createAccountBtnName: 'Create Account',
  signInLinkName: 'Sign in',

  googleSignInBtn: '[data-test="google-signin"]',
  appleSignInBtn: '[data-test="apple-signin"]',

  errors: {
    firstName: 'Please enter your first name',
    lastName: 'Please enter your last name',
    username: 'Please enter your username',
    email: 'Please enter your email',
    minLength: 'At least 5 characters required',
    number: 'At least one number required',
    uppercase: 'At least one uppercase letter required',
    specialChar: 'At least special character required',
    passwordMatch: 'Passwords must match',
  },

  success: {
    minLength: 'The minimum length is reached',
    number: 'At least one number',
    uppercase: 'At least one uppercase letter',
    specialChar: 'At least special character',
    passwordMatch: 'Passwords match',
  },
} as const;