import { Locator, Page } from "playwright-core";
import { BasePage } from "./BasePage";


export class ProductInfoPage extends BasePage {


    private map: Map<string, string | number>;

    // Locators on the product information page
    private readonly productHeader: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly productQty: Locator;
    private readonly addToCartButton: Locator;
    private readonly alertText: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.map = new Map<string, string | number>;

        this.productHeader = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator("ul.thumbnails li img");
        this.productMetaData = page.locator("div#content ul.list-unstyled:nth-of-type(1) li");
        this.productPricing = page.locator("div#content ul.list-unstyled:nth-of-type(2) li");
        this.productQty = page.getByRole('textbox', { name: 'Qty' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.alertText = page.locator("div.alert-success");
        this.shoppingCartLink = page.locator("div.alert-success").getByRole('link', { name: 'shopping cart' });

    }

    // Get the main product heading text
    async getProductHeaderText(): Promise<string> {
        return await this.productHeader.innerText();
    }

    // Get the number of product images displayed
    async getProductImageCount(): Promise<number> {
        await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();
    }

    // Get the product metadata lines (brand, model, etc.)
    private async getProductMetaDataText(): Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let metaStringArray = data.split(':');
            let metaKey = metaStringArray[0].trim();
            let metaVal = metaStringArray[1].trim();
            this.map.set(metaKey, metaVal);
        }
    }

    // Get the pricing/details lines shown on the page
    private async getProductPricingDataText(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice', productPrice);
        this.map.set('ExTaxPrice', exTaxPrice);
    }

    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.clear();
        this.map.set('ProductHeader', await this.getProductHeaderText());
        this.map.set('ProductImages', await this.getProductImageCount());
        await this.getProductMetaDataText();
        await this.getProductPricingDataText();
        return this.map;
    }

    // Check whether the product header is visible
    async isProductHeaderVisible(): Promise<boolean> {
        return await this.productHeader.isVisible();
    }

    // Set the product quantity
    async setProductQuantity(quantity: number): Promise<void> {
        await this.productQty.fill(quantity.toString());
    }

    // Update the product quantity by clearing and filling the input
    async updateProductQuantity(qty: string): Promise<void> {
        await this.productQty.clear();
        await this.productQty.fill(qty);
    }

    // Click the Add to Cart button
    async clickAddToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    // Click the shopping cart link from the success message
    async clickShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    // Check whether the Add to Cart button is enabled
    async getAlertText(): Promise<string> {
        await this.alertText.waitFor({state:'visible'});
        // Clean the alert text by removing the close button symbol and trimming whitespace
        const raw = await this.alertText.innerText();
        return raw.replace(/\s*×\s*$/u, '').trim();
    }
}