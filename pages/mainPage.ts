import { Page, Locator } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchOutput: Locator;
    readonly buyButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('[data-testid="search-input"]');
        this.buyButton = page.locator('[data-testid="esim-button"]').filter({ hasText: 'BUY NOW' }).first();
    }

    searchOutputLocator(country: string): Locator {
        return this.page.locator(`[data-testid="${country}-name"]`);
    }

    async load() {
        await this.page.goto('/');
    }

    async search(country: string) {
        this.searchInput.click;
        await this.searchInput.fill(country);
    }

    async selectSearchOutput(country: string) {
        await this.searchOutputLocator(country).click();
    }

    async buySearchedSim() {
        await this.buyButton.click();
    }
}
