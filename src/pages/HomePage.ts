import { Locator, Page } from "playwright-core";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    // Locators used on the home page
    private readonly logoutLink: Locator;
    private readonly pageHeaders: Locator;
    private readonly searchInput: Locator;
    private readonly searchIcon: Locator;

    constructor(page: Page) {
        super(page);

        // Initialize page locators once for reuse
        this.logoutLink = page.getByRole("link", { name: "Logout" });
        this.pageHeaders = page.getByRole("heading", { level: 2 });
        this.searchInput = page.getByRole("textbox", { name: "Search" });
        this.searchIcon = page.locator("div#search button");
    }

    // Return the current page title
    async getHomePageTitle(): Promise<string> {
        return await this.page.title();
    }

    // Check whether the Logout link is visible
    async isLogoutLinkExist(): Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    // Get all heading texts visible on the home page
    async getHomePageHeadersText(): Promise<string[]> {
        return await this.pageHeaders.allInnerTexts();
    }

    // Enter a keyword in the search box
    async enterSearchText(searchText: string): Promise<void> {
        await this.searchInput.fill(searchText);
    }

    // Click the search icon/button
    async clickSearch(): Promise<void> {
        await this.searchIcon.click();
    }

    async doSearch(searchText: string) {
        await this.enterSearchText(searchText);
        await this.searchIcon.waitFor({ state: "visible" });
        await this.clickSearch();
    }
}