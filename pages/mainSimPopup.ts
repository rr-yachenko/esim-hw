import { Page, Locator, expect } from '@playwright/test';

export class MainPopup {
    readonly popup: Locator;
    readonly title: Locator;
    readonly coverage: Locator;
    readonly data: Locator;
    readonly validity: Locator;
    readonly price: Locator;

    constructor(page: Page) {
        this.popup = page.locator('[data-testid="sim-detail-header"]');
        this.title = this.popup.locator('[data-testid="sim-detail-operator-title"]');
        this.coverage = this.popup.locator('[data-testid="COVERAGE-value"]');
        this.data = this.popup.locator('[data-testid="DATA-value"]');
        this.validity = this.popup.locator('[data-testid="VALIDITY-value"]');
        this.price = this.popup.locator('[data-testid="PRICE-value"]');
    }

    async getTitleText() {
        return this.title.textContent();
    }

    async getCoverageText() {
        return this.coverage.textContent();
    }

    async getDataText() {
        return this.data.textContent();
    }

    async getValidityText() {
        return this.validity.textContent();
    }

    async getPriceText() {
        return this.price.textContent();
    }
}