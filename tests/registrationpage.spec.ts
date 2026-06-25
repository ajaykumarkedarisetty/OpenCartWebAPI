import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.goToRegistrationPage();
});


test('Verify Registration Page is displayed successfully', { tag: ['@smoke'] }, async ({ registrationPage }) => {
    expect(await registrationPage.getRegistrationHeaderText()).toBe('Register Account');
});

test('Verify all the sections headers text in registration page', { tag: ['@sanity'] }, async ({ registrationPage }) => {
    let sectionHeaders = await registrationPage.getSectionHeaders();
    expect.soft(sectionHeaders).toEqual([
        'Your Personal Details',
        'Your Password',
        'Newsletter'
    ])
});

test('Verify all the fields in registration page', async ({ registrationPage }) => {
    for (const field of registrationPage.getRegistrationFormElements()) {
        await expect(field.locator, `${field.name} field should be visible`).toBeVisible();
    }
});

let testData = CsvHelper.readCsvWithExecute('src/data/registrationData.csv');
for (let row of testData) {
    test(`Verify user can register with open cart - ${row.firstName}`, async ({ page, registrationPage }) => {

        await registrationPage.completeRegistration(
            row.firstName,
            row.lastName,
            `automation_${Date.now()}@test.com`,
            row.telephone,
            row.password,
            row.newsletter,
        );
        expect(await registrationPage.getAccountCreatedHeaderText()).toBe('Your Account Has Been Created!')
    });
}