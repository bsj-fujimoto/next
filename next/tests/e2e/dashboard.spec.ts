import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await expect(page.getByText('ダッシュボード')).toBeVisible();
  });

  test('should display dashboard with stat cards', async ({ page }) => {
    // Check for stat cards
    await expect(page.getByText('総ユーザー数')).toBeVisible();
    await expect(page.getByText('1,234').first()).toBeVisible();
    await expect(page.getByText('アクティブ')).toBeVisible();
    await expect(page.getByText('856')).toBeVisible();
    await expect(page.getByText('保留中').first()).toBeVisible();
    await expect(page.getByText('123', { exact: true })).toBeVisible();
    await expect(page.getByText('今月の売上')).toBeVisible();
    await expect(page.getByText('¥1,234,567')).toBeVisible();
  });

  test('should display activity table with 1000 items', async ({ page }) => {
    // Check for activity table header
    await expect(page.getByText('最近のアクティビティ')).toBeVisible();

    // Check pagination info shows total of 1000
    await expect(page.getByText(/全 1000 件中/).first()).toBeVisible();

    // Check table headers
    await expect(page.getByRole('columnheader', { name: /ユーザー/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /アクション/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /日時/ })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /ステータス/ })).toBeVisible();
  });

  test('should search activities', async ({ page }) => {
    // Get initial count
    const initialText = await page.getByText(/全 \d+ 件中/).first().textContent();
    const initialCount = parseInt(initialText?.match(/全 (\d+) 件中/)?.[1] || '0');

    // Search for "成功"
    await page.getByPlaceholder(/検索/).fill('成功');

    // Wait for search results
    await page.waitForTimeout(500);

    // Check that results are filtered
    const searchText = await page.getByText(/全 \d+ 件中/).first().textContent();
    const searchCount = parseInt(searchText?.match(/全 (\d+) 件中/)?.[1] || '0');

    expect(searchCount).toBeLessThan(initialCount);
    expect(searchCount).toBeGreaterThan(0);
  });

  test('should sort by column', async ({ page }) => {
    // Click on ユーザー header to sort
    await page.getByRole('columnheader', { name: /ユーザー/ }).click();

    // Wait for sort to apply
    await page.waitForTimeout(500);

    // Get first two user names
    const rows = page.locator('tbody tr');
    const firstUser = await rows.first().locator('td').first().textContent();
    const secondUser = await rows.nth(1).locator('td').first().textContent();

    // Should be sorted alphabetically
    expect(firstUser! <= secondUser!).toBeTruthy();

    // Click again to reverse sort
    await page.getByRole('columnheader', { name: /ユーザー/ }).click();
    await page.waitForTimeout(500);

    const firstUserReverse = await rows.first().locator('td').first().textContent();
    const secondUserReverse = await rows.nth(1).locator('td').first().textContent();

    // Should be sorted in reverse
    expect(firstUserReverse! >= secondUserReverse!).toBeTruthy();
  });

  test('should navigate between pages', async ({ page }) => {
    // Check we're on page 1 (verify by checking pagination text)
    await expect(page.getByText(/全 1000 件中 1 - 20/).first()).toBeVisible();

    // Click page 2
    const page2Button = page.getByRole('button', { name: '2' }).first();
    await expect(page2Button).toBeVisible();
    await page2Button.click();
    await page.waitForTimeout(500);

    // Check we're on page 2 (verify by checking pagination text)
    await expect(page.getByText(/全 1000 件中 21 - 40/).first()).toBeVisible();
  });

  test('should change items per page', async ({ page }) => {
    // Check default is 20 items per page
    await expect(page.getByText(/全 1000 件中 1 - 20/).first()).toBeVisible();

    // Change to 50 items per page (use custom dropdown)
    const itemsPerPageLabel = page.locator('text=表示件数').first();
    await expect(itemsPerPageLabel).toBeVisible({ timeout: 5000 });
    const dropdownButton = itemsPerPageLabel.locator('..').locator('button').filter({ hasText: /^20$/ }).first();
    await expect(dropdownButton).toBeVisible({ timeout: 5000 });
    await dropdownButton.click();
    await page.waitForTimeout(500);
    
    // Find and click option 50 in the dropdown menu
    const option50 = page.locator('div.absolute').filter({ hasText: /^50$/ }).getByRole('button', { name: /^50$/ }).first();
    await expect(option50).toBeVisible({ timeout: 2000 });
    await option50.click();
    await page.waitForTimeout(500);

    // Check showing 50 items
    await expect(page.getByText(/全 1000 件中 1 - 50/).first()).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Click logout button
    await page.getByRole('button', { name: /ログアウト/ }).click();

    // Should redirect to login page
    await expect(page).toHaveURL('/login');
    await expect(page.getByText('ようこそ')).toBeVisible();
  });
});
