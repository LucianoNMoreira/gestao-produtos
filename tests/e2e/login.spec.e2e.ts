import { test, expect } from '@playwright/test';

test('faz login e navega para dashboard', async ({ page }) => {
  
  await page.goto('http://localhost:3000/login');

  await expect(page.locator('text=Olá,')).not.toBeVisible();

  await page.getByTestId('login').fill('admin')
  await page.getByTestId('senha').fill('admin')
  await page.getByTestId('submit').click()

  await page.waitForTimeout(2000);

  await expect(page.locator('text=Olá,')).toBeVisible();
})
