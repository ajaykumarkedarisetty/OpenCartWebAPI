import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";


export class RegistrationPage extends BasePage {

    // Headers
    private readonly registrationHeader: Locator;
    private readonly sectionHeaders: Locator;
    private readonly personalDetailsHeader: Locator;
    private readonly accountCreatedHeader: Locator;

    // Form Fields
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;

    // Radio Buttons
    private readonly newsletterYesRadio: Locator;
    private readonly newsletterNoRadio: Locator;

    // Checkboxes
    private readonly privacyPolicyCheckbox: Locator;

    // Buttons
    private readonly continueButton: Locator;
    private readonly accountCreatedContinueButton: Locator;

    constructor(page: Page) {
        super(page);

        // Headers
        this.registrationHeader = page.getByRole('heading', { name: 'Register Account', level: 1, exact: true });
        this.sectionHeaders = page.locator('legend');
        this.personalDetailsHeader = page.locator('legend').filter({ hasText: 'Your Personal Details' });
        this.accountCreatedHeader = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1, exact: true });

        // Form Fields
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
        this.passwordInput = page.locator('#input-password');
        this.confirmPasswordInput = page.locator('#input-confirm');

        // Radio Buttons
        this.newsletterYesRadio = page.locator("input[name='newsletter'][value='1']");
        this.newsletterNoRadio = page.locator("input[name='newsletter'][value='0']");

        // Checkboxes
        this.privacyPolicyCheckbox = page.locator("input[name='agree']");

        // Buttons
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.accountCreatedContinueButton = page.locator("a[href*='route=account/account']");

        
    }

    async goToRegistrationPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/register');
    }

    // =========================
    // Getters
    // =========================

    async getRegistrationHeaderText(): Promise<string> {
        return await this.registrationHeader.innerText();
    }

    async getSectionHeaders(): Promise<string[]> {
        return await this.sectionHeaders.allInnerTexts();
    }

    async getAccountCreatedHeaderText(): Promise<string> {
        await this.accountCreatedHeader.waitFor({ state: "visible" });
        return await this.accountCreatedHeader.innerText();
    }

    // =========================
    // Validations
    // =========================

    getRegistrationFormElements(): { name: string; locator: Locator }[] {
        return [
            { name: 'First Name', locator: this.firstNameInput },
            { name: 'Last Name', locator: this.lastNameInput },
            { name: 'E-Mail', locator: this.emailInput },
            { name: 'Telephone', locator: this.telephoneInput },
            { name: 'Password', locator: this.passwordInput },
            { name: 'Password Confirm', locator: this.confirmPasswordInput },
            { name: 'Newsletter Yes Radio', locator: this.newsletterYesRadio },
            { name: 'Newsletter No Radio', locator: this.newsletterNoRadio },
            { name: 'Privacy Policy Checkbox', locator: this.privacyPolicyCheckbox },
            { name: 'Continue Button', locator: this.continueButton }
        ];
    }

    async isPersonalDetailsSectionDisplayed(): Promise<boolean> {
        return await this.personalDetailsHeader.isVisible();
    }

    // =========================
    // Actions
    // =========================

    async fillPersonalDetailsForm(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telephoneInput.fill(telephone);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
    }

    async selectNewsletterOption(option: string): Promise<void> {
        const optiontext = option.trim().toLowerCase();
        if (optiontext === 'yes') {
            await this.newsletterYesRadio.check();
        } else if (optiontext === 'no') {
            await this.newsletterNoRadio.check();
        } else {
            throw new Error(
                `Invalid newsletter option: '${optiontext}'. Expected 'Yes' or 'No'.`
            );
        }
    }

    async acceptPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyCheckbox.check();
    }

    async completeRegistration(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        newsletter: string
    ): Promise<void> {
        await this.fillPersonalDetailsForm(
            firstName,
            lastName,
            email,
            telephone,
            password
        );

        await this.selectNewsletterOption(newsletter);
        await this.acceptPrivacyPolicy();
        await this.continueButton.click();
    }

    async clickContinuePostAccountCreation(): Promise<void> {
        await this.accountCreatedContinueButton.click();
    }
}