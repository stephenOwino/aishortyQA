import { test, expect } from '../fixtures/baseTest'; // Import from your fixture!
import { faker } from '@faker-js/faker';

test('Registration flow using POM and Fixtures', async ({ page, authPage }) => {
  const userData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: 'Password123!',
  };

  await page.goto('https://aishorty.com/signup');

  // Use the fixture method
  await authPage.register(userData);

  // Assertion stays in the test
  await expect(page).toHaveURL(/.*success/);
});