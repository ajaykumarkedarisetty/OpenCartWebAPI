# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/intercept.spec.ts >> @smoke intercept and log requests
- Location: tests/api/intercept.spec.ts:10:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=common/home", waiting until "load"

```

# Test source

```ts
  1   | 
  2   | import { test, expect } from '@playwright/test';
  3   | 
  4   | 
  5   | //web app --> intercept the network calls and log them...
  6   | //** = wildcard -- matched all the URLs...
  7   | 
  8   | 
  9   | //intercept the network calls...
  10  | test('@smoke intercept and log requests', async ({ page }) => {
  11  | 
  12  |     await page.route('**/*', async (route) => {
  13  |         console.log(route.request().method(), route.request().url());
  14  |         await route.continue(); //url1 -- capture and continue./..url2 -- capture -- contiue
  15  |     });
  16  | 
  17  |     //login steps web
> 18  |     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
      |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  19  | });
  20  | 
  21  | 
  22  | //intercept with mocking:
  23  | //mocking: fake data/response
  24  | 
  25  | test('@@regression mock search data api', async ({ page }) => {
  26  |     let fakeProducts = [
  27  |         { name: 'Fake MacBook Pro', price: "$599" },
  28  |         { name: 'Fake iphone 20', price: "$999" }
  29  |     ];
  30  | 
  31  |     await page.route('**/index.php?route=product/search&search=macbook', (route) => {
  32  |         route.fulfill({
  33  |             status: 200,
  34  |             contentType: 'application/json',
  35  |             body: JSON.stringify(fakeProducts),
  36  |         });
  37  |     });
  38  | 
  39  |     await page.goto('https://abc.com/index.php?route=product/search&search=macbook');
  40  |     await page.pause();
  41  | 
  42  |     let fakeJson = await page.evaluate(async () => {
  43  |         let fakeRes = await fetch('https://abc.com/index.php?route=product/search&search=macbook')
  44  |         return await fakeRes.json();
  45  |     });
  46  | 
  47  |     console.log('fake json response:', fakeJson);
  48  | });
  49  | 
  50  | 
  51  | 
  52  | 
  53  | 
  54  | test.skip('mock search page with fake HTML', async ({ page }) => {
  55  | 
  56  |     await page.route('**/index.php?route=product/search&search=macbook', (route) => {
  57  |         route.fulfill({
  58  |             status: 200,
  59  |             contentType: 'text/html',
  60  |             body: `
  61  |                 <html>
  62  |                 <body>
  63  |                     <h1>Search Results</h1>
  64  |                     <div class="product-layout">
  65  |                         <h4><a href="#">Fake MacBook Pro</a></h4>
  66  |                         <p class="price">$599</p>
  67  |                     </div>
  68  |                     <div class="product-layout">
  69  |                         <h4><a href="#">Fake iPhone 20</a></h4>
  70  |                         <p class="price">$999</p>
  71  |                     </div>
  72  |                 </body>
  73  |                 </html>
  74  |             `,
  75  |         });
  76  |     });
  77  | 
  78  |     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
  79  | 
  80  |     // now assert on the fake HTML
  81  |     const heading = await page.textContent('h1');
  82  |     expect(heading).toBe('Search Results');
  83  | 
  84  |     const products = await page.locator('.product-layout h4').allTextContents();
  85  |     expect(products).toEqual(["Fake MacBook Pro", "Fake iPhone 20"]);
  86  | 
  87  |     const prices = await page.locator('.price').allTextContents();
  88  |     expect(prices).toEqual(["$599", "$999"]);
  89  | 
  90  | 
  91  |     await page.pause();
  92  | 
  93  | });
  94  | 
  95  | 
  96  | 
  97  | 
  98  | 
  99  | 
  100 | 
  101 | 
  102 | 
  103 | 
  104 | 
```