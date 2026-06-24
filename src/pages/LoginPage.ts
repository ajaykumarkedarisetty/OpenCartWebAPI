import { Locator, Page } from "playwright-core";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenLink: Locator;
    private readonly loginErrorText: Locator;


    // Constructor of the class: Initilize the locators
    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByLabel('E-Mail Address');
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenLink = page.getByText('Forgotten Password', { exact: true }).first();
        this.loginErrorText = page.locator('.alert.alert-danger.alert-dismissible');402
    }

    // Public Page Actions(Methods)/Behaviours


    async goToLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async getLoginPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async isForgotPasswordExist(): Promise<boolean> {
        return await this.forgottenLink.isVisible();
    }

    async doLogin(username: string, userkey: string){
        console.log(`user creds: ${username} : ${userkey}`);
        await this.emailInput.fill(username);
        await this.passwordInput.fill(userkey);
        await this.loginBtn.click();
    }

    async getLoginErrorText(): Promise<string> {
        return await this.loginErrorText.innerText();
    }

    async isLoginErrorTextForInvaidData(): Promise<boolean> {
        return await this.loginErrorText.isVisible();
    }
}