import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display login page', async ({ page }) => {
    await page.goto('/login');

    // Check for welcome message
    await expect(page.getByText('ようこそ')).toBeVisible();
    await expect(page.getByText('アカウントにログインしてください')).toBeVisible();

    // Check for form elements
    await expect(page.getByLabel('メールアドレス')).toBeVisible();
    await expect(page.getByLabel('パスワード')).toBeVisible();
    await expect(page.getByRole('button', { name: /ログイン/ })).toBeVisible();
  });

  test('should login successfully', async ({ page }) => {
    await page.goto('/login');

    // Fill in login form
    await page.getByLabel('メールアドレス').fill('test@example.com');
    await page.getByLabel('パスワード').fill('password123');

    // Click login button
    await page.getByRole('button', { name: /ログイン/ }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('ダッシュボード')).toBeVisible();
  });

  test('should redirect to dashboard if already logged in', async ({ page }) => {
    // Simulate logged in state
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));

    await page.goto('/login');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});
