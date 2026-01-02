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

  test('should display avatar icon', async ({ page }) => {
    // Check avatar icon is visible in header
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await expect(avatarButton).toBeVisible();
  });

  test('should open dropdown menu when avatar icon is clicked', async ({ page }) => {
    // Find and click avatar icon
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // Check dropdown menu is visible
    await expect(page.getByRole('menuitem', { name: 'プロフィール' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'セッティング' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'ログアウト' })).toBeVisible();
  });

  test('should close dropdown menu when clicking outside', async ({ page }) => {
    // Open menu
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // Verify menu is open
    await expect(page.getByRole('menuitem', { name: 'プロフィール' })).toBeVisible();

    // Click outside (on header title)
    await page.getByText('ダッシュボード').click();
    await page.waitForTimeout(500);

    // Verify menu is closed
    await expect(page.getByRole('menuitem', { name: 'プロフィール' })).not.toBeVisible();
  });

  test('should navigate to profile page', async ({ page }) => {
    // Open menu
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // Wait for menu to be visible
    const menu = page.locator('div[role="menu"]');
    await expect(menu).toBeVisible();

    // Click profile menu item using text content
    const profileMenuItem = page.getByRole('menuitem', { name: 'プロフィール' });
    await expect(profileMenuItem).toBeVisible();
    
    // Use evaluate to click directly on the element
    await profileMenuItem.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(1000);

    // Should navigate to profile page
    await expect(page).toHaveURL('/profile');
  });

  test('should navigate to settings page', async ({ page }) => {
    // Open menu
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // Wait for menu to be visible
    const menu = page.locator('div[role="menu"]');
    await expect(menu).toBeVisible();

    // Click settings menu item using text content
    const settingsMenuItem = page.getByRole('menuitem', { name: 'セッティング' });
    await expect(settingsMenuItem).toBeVisible();
    
    // Use evaluate to click directly on the element
    await settingsMenuItem.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(1000);

    // Should navigate to settings page
    await expect(page).toHaveURL('/settings');
  });

  test('should logout successfully from dropdown menu', async ({ page }) => {
    // Open menu
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // Wait for menu to be visible
    const menu = page.locator('div[role="menu"]');
    await expect(menu).toBeVisible();

    // Click logout menu item using text content
    const logoutMenuItem = page.getByRole('menuitem', { name: 'ログアウト' });
    await expect(logoutMenuItem).toBeVisible();
    
    // Use evaluate to click directly on the element
    await logoutMenuItem.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(1000);

    // Should redirect to login page
    await expect(page).toHaveURL('/login');
    await expect(page.getByText('ようこそ')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // This test is kept for backward compatibility
    // Open dropdown and click logout
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);
    
    const logoutMenuItem = page.getByRole('menuitem', { name: 'ログアウト' });
    await logoutMenuItem.click();
    await page.waitForTimeout(1000);

    // Should redirect to login page
    await expect(page).toHaveURL('/login');
    await expect(page.getByText('ようこそ')).toBeVisible();
  });
});
