import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CsvHelper } from "../utils/CsvHelper";
import { RegistrationPage } from "../pages/RegistrationPage";
import { SearchPage } from "../pages/SearchPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";

// Define types for page fixtures:
type pageFixtures = {
    loginPage: LoginPage;
    homePage: HomePage,
    registrationPage: RegistrationPage,
    searchPage: SearchPage,
    productInfoPage : ProductInfoPage;
    testData: Record<string, string>[];
};

// extend playwright base test:
export let test = baseTest.extend<pageFixtures>({

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    registrationPage: async ({ page }, use) => {
        let registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    searchPage: async ({ page }, use) => {
        let searchPage = new SearchPage(page);
        await use(searchPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    testData: async ({ }, use) => {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }

});

export { expect } from '@playwright/test';