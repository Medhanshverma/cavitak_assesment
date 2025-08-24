import { test, expect } from '@playwright/test';

const BASE_URL = 'https://cavitak-assesment.vercel.app/';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('should display main header', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /Cavitak Horizon/i })).toBeVisible();
});

test('should display subtitle', async ({ page }) => {
  await expect(page.getByText(/Discover weather conditions around the world/i)).toBeVisible();
});

test('should display search bar', async ({ page }) => {
  await expect(page.locator('.search-input')).toBeVisible();
});

test('should display Get Weather button', async ({ page }) => {
  await expect(page.locator('.get-weather-btn')).toBeVisible();
});

test('should display footer', async ({ page }) => {
  await expect(page.getByText(/Made with ❤️ for Cavitak/i)).toBeVisible();
});

test('should search for Indore and show Indore in weather card', async ({ page }) => {
  const input = page.locator('.search-input');
  await input.fill('Indore');
  await input.press('Enter');
  const dropdownOption = page.locator('.city-suggestion').first();
  await dropdownOption.waitFor({ state: 'visible', timeout: 5000 });
  await dropdownOption.click();
  await page.locator('.get-weather-btn').click();
  await expect(page.locator('.weather-card-heading')).toBeVisible();
  await expect(page.locator('.weather-card-heading')).toHaveText(/Indore/i);
});

test('should show city dropdown after entering 3 random letters', async ({ page }) => {
  const input = page.locator('.search-input');
  await input.fill('abc');
  await expect(page.locator('.city-suggestion').first()).toBeVisible();
  const count = await page.locator('.city-suggestion').count();
  expect(count).toBeGreaterThan(0);
});