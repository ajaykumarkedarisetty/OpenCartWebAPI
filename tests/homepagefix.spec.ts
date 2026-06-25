import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(
        process.env.USERNAME!,
        process.env.PASSWORD!
    );
});

test('Verify the Home Page Title', { tag: ['@smoke'] }, async ({ homePage }) => {
    const pageTitle = await homePage.getHomePageTitle();
    expect(pageTitle).toBe('My Account');
});

test('Verify Logout Link In Home Page', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('Verify Home Page Headers', { tag: ['@sanity'] }, async ({ homePage }) => {
    let allHeaders = await homePage.getHomePageHeadersText();
    console.log(`Home Page Headers: ${allHeaders}`);

    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);

});