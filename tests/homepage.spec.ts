import { expect, test } from "playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginpage: LoginPage;
let homepage: HomePage;


test.beforeEach(async ({ page }) => {
    loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();
    await loginpage.doLogin(
        'ajaykumarkedarisetty@gmail.com',
        'Venicetata@2026'
    );
    homepage = new HomePage(page);
});

test('Verify the Home Page Title', { tag: ['@smoke'] }, async ({ }) => {
    const pageTitle = await homepage.getHomePageTitle();
    expect(pageTitle).toBe('My Account');
});

test('Verify Logout Link In Home Page', { tag: ['@sanity'] }, async ({ }) => {
    expect(await homepage.isLogoutLinkExist()).toBeTruthy();
});

test('Verify Home Page Headers', async({})=>{
    let allHeaders = await homepage.getHomePageHeadersText();
    console.log(`Home Page Headers: ${allHeaders}`);

    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);

});