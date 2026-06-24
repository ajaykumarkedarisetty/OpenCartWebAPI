import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
    // Locators on the search result page
    private readonly searchHeading: Locator;
    private readonly productResults: Locator;
    private readonly productNameLink: Locator;

    constructor(page: Page) {
        super(page);

        // Initialize locators once for reuse
        this.searchHeading = page.locator("div#content h1");
        this.productResults = page.locator("div.product-layout");
        this.productNameLink = page.getByRole("link");
    }

    // Check whether the search page heading is visible
    async isSearchHeadingVisible(): Promise<boolean> {
        return await this.searchHeading.isVisible();
    }

    // Return the number of displayed product results
    async getProductSearchResultsCount(): Promise<number> {
        return await this.productResults.count();
    }

    // Click the product link matching the given product name
    async clickProductByName(productName: string): Promise<void> {
        await this.productNameLink
            .filter({ hasText: productName })
            .first()
            .click();
    }
}