import { test as baseTest } from "@playwright/test";
import { APIHealper } from "../api/APIHelper";


type apiFixtures = {
    apiHelper: APIHealper;
    apiBaseUrl: string;
}


export const test = baseTest.extend<apiFixtures>({
    apiBaseUrl: ['', { option: true }],

    apiHelper: async ({ request, apiBaseUrl }, use) => {
        if (!apiBaseUrl) {
            throw new Error('API base URL is not set. Provide it via test.use({ apiBaseUrl: ... }) in the spec file.');
        }

        const apiHelper = new APIHealper(request, apiBaseUrl);
        await use(apiHelper);
    },
});

export { expect } from '@playwright/test';