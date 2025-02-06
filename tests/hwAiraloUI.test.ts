import { expect, test } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { MainPopup } from '../pages/mainSimPopup';

test("Japan sim package verification", async ({ page }) => {

    const mainPage = new MainPage(page);

    const searchCountry = "Japan";

    await mainPage.load();
    await mainPage.search(searchCountry);
    await mainPage.selectSearchOutput(searchCountry);
    await mainPage.buySearchedSim();


    const simMainPopup = new MainPopup(page);

    expect((await simMainPopup.getTitleText()).trim()).toBe('Moshi Moshi');
    expect((await simMainPopup.getCoverageText()).trim()).toBe('Japan');
    expect((await simMainPopup.getDataText()).trim()).toBe('1 GB');
    expect((await simMainPopup.getValidityText()).trim()).toBe('7 Days');
    expect((await simMainPopup.getPriceText()).trim()).toBe('$4.50 USD');
}
)