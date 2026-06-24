import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginpage: LoginPage;
let homepage : HomePage;

test.beforeEach(async ({ page }) => { 
    loginpage = new LoginPage(page); 
    await loginpage.goToLoginPage(); 
    homepage = new HomePage(page);

});

test('Verify Account Login page is displayed successfully', async () => {
    expect(await loginpage.getLoginPageTitle()).toBe('Account Login');
});

test('Verify error message is displayed for invalid login credentials', async () => {
    await loginpage.doLogin('test', '12345');

    const loginError = await loginpage.getLoginErrorText();

    expect.soft(loginError.trim()).toBe(
        'Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.'
    );
});

test('Verify user can login successfully with valid credentials', async () => {
    await loginpage.doLogin(
        'ajaykumarkedarisetty@gmail.com',
        'Venicetata@2026'
    );
    expect(await homepage.isLogoutLinkExist()).toBeTruthy();
});