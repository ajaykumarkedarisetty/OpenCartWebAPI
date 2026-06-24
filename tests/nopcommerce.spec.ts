import { expect, test } from '@playwright/test';


test('Verify login to nopCommerce', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');
    let title = await page.title();
    console.log(`Page Title: ${title}`);
    let computerTab = page.getByRole('button', { name: 'Computers' });
    await computerTab.waitFor({ state: 'visible' });
    expect(await computerTab.isVisible()).toBeTruthy();
    await page.pause();
});
