import { test as baseTest, expect, Page } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";



// 1. Define the "Menu" of available Page Objects
type PageObjects = {
    registerPage: RegisterPage;

};

type AuthFixture = {
    authenticatedPage: Page;
};

export const test = baseTest.extend<PageObjects & AuthFixture>({
    
    // Initialize the RegisterPage
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

});

export { expect };