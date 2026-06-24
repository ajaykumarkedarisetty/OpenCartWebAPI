import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(
        process.env.USERNAME!,
        process.env.PASSWORD!
    );
});

test('Verify search Functionality', async ({ homePage, searchPage }) => {
    const pageTitle = await homePage.getHomePageTitle();
    expect(pageTitle).toBe('My Account');

    await homePage.doSearch('macbook');
    expect(await searchPage.isSearchHeadingVisible()).toBeTruthy();
    const count = await searchPage.getProductSearchResultsCount();
    expect(count).toBeGreaterThan(0);
});

const testDataCsv = CsvHelper.readCsv('src/data/searchData.csv');
for (const row of testDataCsv) {
    test(`Verify user is able to land on product page - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchPage, page }) => {
        await homePage.doSearch(row.searchkey);
        await searchPage.clickProductByName(row.productname);
        expect(await page.title()).toBe(row.productname);
    });
}
