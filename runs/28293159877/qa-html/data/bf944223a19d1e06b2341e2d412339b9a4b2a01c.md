# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepagefix.spec.ts >> @regression home page headers exist test
- Location: tests/homepagefix.spec.ts:21:1

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | 
  5  | export class LoginPage extends BasePage {
  6  | 
  7  |     //private Locators: 
  8  |     private readonly emailId: Locator;
  9  |     private readonly password: Locator;
  10 |     private readonly loginBtn: Locator;
  11 |     private readonly forgottenPasswordLink: Locator;
  12 |     private readonly logo: Locator;
  13 |     private readonly loginErrorMessage: Locator;
  14 | 
  15 |     //const... of the class: init the locators
  16 |     constructor(page: Page) {
  17 |         super(page);
  18 |         this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
  19 |         this.password = page.getByRole('textbox', { name: 'Password' });
  20 |         this.loginBtn = page.getByRole('button', { name: 'Login' });
  21 |         this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
  22 |         this.logo = page.getByAltText('naveenopencart');
  23 |         this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
  24 |     };
  25 | 
  26 |     //public page actions(methods)/behaviour
  27 |     async goToLoginPage(): Promise<void> {
> 28 |         await this.page.goto('opencart/index.php?route=account/login');
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  29 |     }
  30 | 
  31 |     async getLoginPageTitle(): Promise<string> {
  32 |         return await this.page.title();
  33 |     }
  34 | 
  35 |     async isForgotPwdLinkExist(): Promise<boolean> {
  36 |         return await this.forgottenPasswordLink.isVisible();
  37 |     }
  38 | 
  39 |     async doLogin(username: string, password: string): Promise<void> {
  40 |         console.log(`user creds: ${username} - ${password}`);
  41 |         await this.emailId.fill(username);
  42 |         await this.password.fill(password);
  43 |         await this.loginBtn.click();
  44 |     }
  45 | 
  46 |     async isInvalidLoginErrorDisplayed(): Promise<boolean> {
  47 |         return await this.loginErrorMessage.isVisible();
  48 |     }
  49 | 
  50 | 
  51 | }
  52 | 
  53 | 
  54 | 
  55 | 
```