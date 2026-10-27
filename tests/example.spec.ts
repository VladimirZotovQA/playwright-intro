import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/')
})

test('has title', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Check GitHub icon', async ({ page }) => {

  const githubLink = page.getByRole('link', { name: 'GitHub repository' })
  await expect(githubLink).toBeVisible()
})

test('Check Discord icon', async ({ page }) => {

  const discordLink = page.getByRole('link', { name: 'Discord server' })
  await expect(discordLink).toBeVisible()
})

test('Check Light/Dark mode icon', async ({ page }) => {

  const lightDarkMode = page.getByRole('button', { name: 'Switch between dark and light mode' });
  await expect(lightDarkMode).toBeVisible()
})