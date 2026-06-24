import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHealper';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});

test('Verify Account Login page is displayed successfully', async ({ loginPage }) => {
    expect(await loginPage.getLoginPageTitle()).toBe('Account Login');
});

test('Verify error message is displayed for invalid login credentials', async ({ loginPage }) => {
    await loginPage.doLogin('test', '12345');

    const loginError = await loginPage.getLoginErrorText();

    expect.soft(loginError.trim()).toBeTruthy();
});

test('Verify user can login successfully with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(
        process.env.USERNAME!,
        process.env.PASSWORD!
    );
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});


test('Verify user can login with invalid credentials with csv with fixtures', async ({ loginPage, testData }) => {

    for (let row of testData) {
        await loginPage.doLogin(
            row.username,
            row.password,
        );
        const loginError = await loginPage.getLoginErrorText();
        expect.soft(loginError.trim()).toBeTruthy();
    }
});

let testData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData) {
    test(`Verify user can login with invalid credentials with csv without fixtures - ${row.username} - ${row.password}`, async ({ loginPage }) => {

        await loginPage.doLogin(
            row.username,
            row.password,
        );
        const loginError = await loginPage.getLoginErrorText();
        expect.soft(loginError.trim()).toBeTruthy();
    });
}

let testDataXlsx = ExcelHelper.readExcel('src/data/loginData.xlsx', 'login');
for (let row of testDataXlsx) {
    test(`Verify user can login with invalid credentials with Excel - ${row.username} - ${row.password}`, async ({ loginPage }) => {

        await loginPage.doLogin(
            row.username,
            row.password,
        );
        expect(await loginPage.isLoginErrorTextForInvaidData()).toBeTruthy();
    });
}

let testDataJson = JsonHelper.readJson('src/data/loginData.json');
for (let row of testDataJson) {
    test(`Verify user can login with invalid credentials with Json - ${row.username} - ${row.password}`, async ({ loginPage }) => {

        await loginPage.doLogin(
            row.username,
            row.password,
        );
        expect(await loginPage.isLoginErrorTextForInvaidData()).toBeTruthy();
    });
}