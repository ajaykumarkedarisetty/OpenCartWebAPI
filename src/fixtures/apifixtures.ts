import { test as baseTest } from "@playwright/test";
import { APIHealper } from "../api/APIHelper";



type apiFixtures = {
    apiHelper: APIHealper;
}


export let test = baseTest.extend<apiFixtures>({


    apiHelper: async ({ request }, use) => {
        let apiHelper = new APIHealper(
            request,
            process.env.API_BASE_URL!
        );
        await use(apiHelper);
    },

});

export { expect } from '@playwright/test';