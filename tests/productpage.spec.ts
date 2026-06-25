import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(
        process.env.USERNAME!,
        process.env.PASSWORD!
    );
});

test('Verify product images count', { tag: ['@smoke'] }, async ({ homePage, searchPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchPage.clickProductByName('MacBook Pro');
    let imageCount = await productInfoPage.getProductImageCount();
    console.log('Total Images Count: ', imageCount);
    expect(imageCount).toBeGreaterThan(1);
});

test('Verify product Information/Data', async ({ homePage, searchPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchPage.clickProductByName('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details: ', actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');
});

const testDataCsv = CsvHelper.readCsv('src/data/productInfoData.csv');
for (const row of testDataCsv) {
    test(`Verify product Information/Data - ${row.searchkey} - ${row.productname}`, async ({ homePage, searchPage, page, productInfoPage }) => {
        await homePage.doSearch(row.searchkey);
        await searchPage.clickProductByName(row.productname);
        expect(await page.title()).toBe(row.productname);
        let actualProductInfoMap = await productInfoPage.getProductInfo();
        console.log('Actual Product Details: ', actualProductInfoMap);
        expect.soft(actualProductInfoMap.get('ProductHeader')).toBe(row.productname);
        expect.soft(actualProductInfoMap.get('Brand')).toBe(row.brand);
        expect.soft(actualProductInfoMap.get('Product Code')).toBe(row.productcode);
        expect.soft(actualProductInfoMap.get('Reward Points')).toBe(row.rewardpoints);
        expect.soft(actualProductInfoMap.get('ProductPrice')).toBe(row.productprice);
        expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe(row.taxprice);
    });
}



test('Verify product added to cart', { tag: ['@sanity'] }, async ({ homePage, searchPage, productInfoPage, page }) => {
    await homePage.doSearch('macbook');
    await searchPage.clickProductByName('MacBook Pro');
    await productInfoPage.updateProductQuantity('2');
    await productInfoPage.clickAddToCart();
    expect(await productInfoPage.getAlertText()).toBe('Success: You have added MacBook Pro to your shopping cart!');
    await productInfoPage.clickShoppingCart();
    expect(await page.title()).toBe('Shopping Cart');
});