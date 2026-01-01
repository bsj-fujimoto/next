import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('login page visual snapshot', async ({ page }) => {
    // Clear localStorage
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Navigate to login page
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Take full page screenshot
    await expect(page).toHaveScreenshot('login-page.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dashboard page visual snapshot', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Wait for data to load
    await expect(page.getByText('ダッシュボード')).toBeVisible();
    await page.waitForTimeout(1000);

    // Take full page screenshot
    await expect(page).toHaveScreenshot('dashboard-page.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dashboard search results visual snapshot', async ({ page }) => {
    // Login and navigate to dashboard
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('ダッシュボード')).toBeVisible();

    // Perform search
    await page.getByPlaceholder(/検索/).fill('成功');
    await page.waitForTimeout(500);

    // Take screenshot of search results
    await expect(page).toHaveScreenshot('dashboard-search-results.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dashboard page 2 visual snapshot', async ({ page }) => {
    // Login and navigate to dashboard
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('ダッシュボード')).toBeVisible();

    // Navigate to page 2
    await page.getByRole('button', { name: '2' }).first().click();
    await page.waitForTimeout(500);

    // Take screenshot of page 2
    await expect(page).toHaveScreenshot('dashboard-page-2.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('stat cards layout', async ({ page }) => {
    // Login and navigate to dashboard
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Check stat cards grid layout
    const statCards = page.locator('.grid').first();
    await expect(statCards).toHaveScreenshot('stat-cards.png', {
      animations: 'disabled',
    });
  });

  test('activity table layout', async ({ page }) => {
    // Login and navigate to dashboard
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('ダッシュボード')).toBeVisible();

    // Screenshot of table
    const table = page.locator('table').first();
    await expect(table).toHaveScreenshot('activity-table.png', {
      animations: 'disabled',
    });
  });

  test('pagination controls layout', async ({ page }) => {
    // Login and navigate to dashboard
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('ダッシュボード')).toBeVisible();

    // Scroll to pagination
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Screenshot of pagination controls
    const pagination = page.locator('.border-t.border-white\\/20').last();
    await expect(pagination).toHaveScreenshot('pagination-controls.png', {
      animations: 'disabled',
    });
  });
});

test.describe('Responsive Design Tests', () => {
  test('mobile login page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('login-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('tablet dashboard', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('ダッシュボード')).toBeVisible();
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('dashboard-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('mobile dashboard', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('ダッシュボード')).toBeVisible();
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('dashboard-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
