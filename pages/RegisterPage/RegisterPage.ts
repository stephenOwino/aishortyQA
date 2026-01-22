import { faker } from "@faker-js/faker";
import { expect , Locator , Page } from "@playwright/test";

import { RegisterPageLocators as locators} from "./RegisterPageLocators";

export class RegisterPage  {
    readonly page: Page;
    readonly signupLink: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly username: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly createAccountBtnName: Locator;
    readonly errorFirstName: Locator;
    readonly errorLastName: Locator;
    readonly errorUsername: Locator;
    readonly errorEmail: Locator;
    readonly errorMinLength: Locator;
    readonly errorNumber: Locator;
    readonly errorUppercase: Locator;
    readonly errorSpecialChar: Locator;
    readonly  errorPasswordMatch: Locator;
    readonly signInLinkName: Locator;


    constructor(page : Page) {
        this.page = page;
        this.signupLink = page.locator(locators.signupLink);
        this.firstName = page.locator(locators.firstName);
        this.lastName = page.locator(locators.lastName);
        this.username = page.locator(locators.username);
        this.email = page.locator(locators.email);
        this.password = page.locator(locators.password);
        this.confirmPassword = page.locator(locators.confirmPassword);
        // this.createAccountBtnName = page.locator(locators.createAccountBtnName);
        this.createAccountBtnName = page.getByRole('button', { name: locators.createAccountBtnName });
        this.errorFirstName = page.locator(locators.errorFirstName);
        this.errorLastName = page.locator(locators.errorLastName);
        this.errorUsername = page.locator(locators.errorUsername);
        this.errorEmail = page.locator(locators.errorEmail);
        this.errorMinLength = page.locator(locators.errorMinLength);
        this.errorNumber = page.locator(locators.errorNumber);
        this.errorUppercase = page.locator(locators.errorUppercase);
        this.errorSpecialChar = page.locator(locators.errorSpecialChar);
        this.errorPasswordMatch = page.locator(locators.errorPasswordMatch);
        // this.signInLinkName = page.locator(locators.signInLinkName);
        this.signInLinkName = page.getByRole('link', { name: locators.signInLinkName });


    }

    async fillFormWithRandomData() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const username = faker.internet.username({ firstName, lastName });
        const email = faker.internet.email();
        // Ensuring password meets my "Special Char" and "Uppercase" requirements
        const password = 'Aa1!' + faker.internet.password({ length: 10 }); 

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.username.fill(username);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);

        // 3. Return data
        return { firstName, lastName, username, email, password };
    }
}


