import {test, expect } from '@playwright/test';
import type {Locator} from "@playwright/test";


test.describe('Shop tests', () => {

    let emailInput:Locator
    let fullNameInput:Locator
    let deliveryMethodParcelCheckbox:Locator
    let deliveryMethodHomeCheckbox:Locator
    let deliveryCost:Locator
    let totalSum:Locator
    let placeOrderButton:Locator
    let orderMessage:Locator

    test.beforeEach(async ({page}) => {
        await page.goto("https://shop.tl-academy.ee/checkout")

        emailInput = page.getByPlaceholder("Email address")
        fullNameInput = page.getByTestId("name-input");
        deliveryMethodParcelCheckbox = page.getByTestId("delivery-parcel-locker-option");
        deliveryMethodHomeCheckbox = page.getByTestId("delivery-home-option");
        deliveryCost = page.getByTestId("summary-delivery");
        totalSum = page.locator("#total")
        placeOrderButton = page.getByTestId("place-order-button");
        orderMessage = page.getByTestId("order-message");

    });

    test('TL-16-4 inactive order button', async () => {
        await expect(placeOrderButton).toBeDisabled();
    });

    test('TL-16-5 delivery checkbox', async () => {
        await emailInput.fill("test@test.test");
        await fullNameInput.fill("Test Test");
        await deliveryMethodHomeCheckbox.click();
        await deliveryMethodParcelCheckbox.check();
        await expect(deliveryMethodParcelCheckbox).toBeChecked();
        await placeOrderButton.click();
        await expect(orderMessage).toContainText("Order placed. Thank you!")
    });

    test('TL-16-6 home delivery', async () => {
        await emailInput.fill("test@test.test");
        await fullNameInput.fill("Test Test");
        await deliveryMethodHomeCheckbox.check();
        await expect(deliveryMethodHomeCheckbox).toBeChecked();
        await expect(deliveryMethodParcelCheckbox).not.toBeChecked();
        await expect(deliveryCost).toContainText('€5.99');
        await expect(totalSum).toBeVisible();
    });

    test('TL-16-7 invalid email address', async () => {
        await emailInput.fill("test@test");
        await fullNameInput.fill("Test Test");
        await emailInput.blur();
        await expect(placeOrderButton).toBeDisabled();
    })

    test('TL-16-8 total sum', async () => {
        await deliveryMethodHomeCheckbox.click();
        await expect(totalSum).toContainText("€84.99");
        await deliveryMethodParcelCheckbox.click();
        await expect(totalSum).toContainText("€82.99");
    })
});