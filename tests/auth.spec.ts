import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should successfully sign up a new user', async ({ page }) => {
    // 1. Navigate to signup page
    // 2. Fill in registration form
    // 3. Submit form
    // 4. Verify successful registration
    
  });

  test('should successfully log in', async ({ page }) => {
    // 1. Navigate to login page
    // 2. Enter valid credentials
    // 3. Submit login form
    // 4. Verify successful login
    await page.goto('https://grocerygo-one.vercel.app/signup');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('rns22@njit.edu');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Password' }).fill('Rshah22@22');
    await page.getByRole('textbox', { name: 'Password' }).press('Tab');
    await page.getByRole('button', { name: 'Log in' }).press('Enter');
  });

  test('should successfully log out', async ({ page }) => {
    // 1. Start with logged in user
    // 2. Click logout button
    // 3. Verify redirect to login page
    await page.goto('https://grocerygo-one.vercel.app/signup');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('rns22@njit.edu');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Password' }).fill('Rshah22@22');
    await page.getByRole('textbox', { name: 'Password' }).press('Tab');
    await page.getByRole('button', { name: 'Log in' }).press('Enter');
  });
});