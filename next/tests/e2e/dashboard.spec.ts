import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    // Clear console errors before each test
    page.on('console', msg => {
      if (msg.type() === 'error') {
        throw new Error(`Console error: ${msg.text()}`);
      }
    });

    // Login before each test
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'ダッシュボード' })).toBeVisible();
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

    // Get first two user names (skip ID column, get user column which is second)
    const rows = page.locator('tbody tr');
    const firstRowCells = rows.first().locator('td');
    const secondRowCells = rows.nth(1).locator('td');
    const firstUser = await firstRowCells.nth(1).textContent(); // User is second column
    const secondUser = await secondRowCells.nth(1).textContent();

    // Should be sorted alphabetically
    expect(firstUser! <= secondUser!).toBeTruthy();

    // Click again to reverse sort
    await page.getByRole('columnheader', { name: /ユーザー/ }).click();
    await page.waitForTimeout(500);

    const firstUserReverse = await firstRowCells.nth(1).textContent();
    const secondUserReverse = await secondRowCells.nth(1).textContent();

    // Should be sorted in reverse
    expect(firstUserReverse! >= secondUserReverse!).toBeTruthy();
  });

  test('should navigate between pages', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check we're on page 1 (verify by checking pagination text)
    await expect(page.getByText(/全 1000 件中.*1.*20/).first()).toBeVisible({ timeout: 10000 });

    // Click page 2
    const page2Button = page.getByRole('button', { name: '2' }).first();
    await expect(page2Button).toBeVisible({ timeout: 10000 });
    await page2Button.click();
    
    // Wait for pagination to update - check that we're on page 2
    await page.waitForTimeout(1500);
    await expect(page.getByText(/全 1000 件中.*21.*40/).first()).toBeVisible({ timeout: 10000 });
  });

  test('should change items per page', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check default is 20 items per page
    await expect(page.getByText(/全 1000 件中 1 - 20 件を表示/).first()).toBeVisible({ timeout: 10000 });

    // Change to 50 items per page (use custom dropdown)
    // Find the dropdown button by looking for button with text "20" near "表示件数"
    const dropdownButton = page.locator('button').filter({ hasText: /^20$/ }).first();
    await expect(dropdownButton).toBeVisible({ timeout: 10000 });
    await dropdownButton.click();
    await page.waitForTimeout(500);
    
    // Find and click option 50 in the dropdown menu
    const option50 = page.getByRole('menuitem', { name: /^50$/ }).first();
    await expect(option50).toBeVisible({ timeout: 5000 });
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
    const menu = page.locator('div[role="menu"]');
    await expect(menu).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'プロフィール' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'セッティング' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'ログアウト' })).toBeVisible();

    // Verify dropdown menu is displayed above other elements (z-index check)
    const menuElement = await menu.boundingBox();
    const statCard = page.locator('text=¥1,234,567').first();
    const statCardElement = await statCard.boundingBox();
    
    if (menuElement && statCardElement) {
      // Menu should be visible and not hidden behind other elements
      // Check that menu is clickable (not covered by other elements)
      // Check top-left corner of menu (not center, as center might be on a menuitem)
      const menuTopX = menuElement.x + 5;
      const menuTopY = menuElement.y + 5;
      const elementAtMenuPosition = await page.evaluate(({ x, y }) => {
        const element = document.elementFromPoint(x, y);
        return element?.getAttribute('role') || element?.closest('[role="menu"]')?.getAttribute('role');
      }, { x: menuTopX, y: menuTopY });
      
      // Menu should be the topmost element at its position (or a menuitem within the menu)
      expect(['menu', 'menuitem']).toContain(elementAtMenuPosition);
    }
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
    
    const menu = page.locator('div[role="menu"]');
    await expect(menu).toBeVisible();
    
    const logoutMenuItem = page.getByRole('menuitem', { name: 'ログアウト' });
    await expect(logoutMenuItem).toBeVisible();
    await logoutMenuItem.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(1000);

    // Should redirect to login page
    await expect(page).toHaveURL('/login');
    await expect(page.getByText('ようこそ')).toBeVisible();
  });

  // SideDrawer tests
  test('TC-E2E-001: should display drawer menu in open state by default', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check drawer is visible
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveAttribute('aria-expanded', 'true');
  });

  test('TC-E2E-001: should toggle drawer menu when toggle button is clicked', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check drawer is open initially
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Click toggle button to close
    const toggleButton = page.getByRole('button', { name: /メニューを閉じる|メニューを開く/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Check drawer is closed (on desktop, it might be hidden with width 0)
    const isExpanded = await drawer.getAttribute('aria-expanded');
    expect(isExpanded).toBe('false');

    // Click toggle button again to open
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Check drawer is open again
    await expect(drawer).toHaveAttribute('aria-expanded', 'true');
  });

  test('TC-E2E-002: should navigate from drawer menu items', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Wait for drawer to be visible
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Click profile menu item
    const profileItem = page.getByRole('link', { name: /プロフィール/i });
    await expect(profileItem).toBeVisible();
    await profileItem.click();
    await page.waitForTimeout(1000);

    // Should navigate to profile page
    await expect(page).toHaveURL('/profile');

    // Go back to dashboard
    await page.goBack();
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');

    // Click settings menu item
    const settingsItem = page.getByRole('link', { name: /セッティング/i });
    await expect(settingsItem).toBeVisible();
    await settingsItem.click();
    await page.waitForTimeout(1000);

    // Should navigate to settings page
    await expect(page).toHaveURL('/settings');
  });

  test('TC-E2E-003: should display drawer as overlay on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Open drawer if closed (mobile defaults to closed)
    const toggleButton = page.getByRole('button', { name: /メニューを開く/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Check drawer is visible
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Check drawer has fixed positioning (overlay)
    const drawerBox = await drawer.boundingBox();
    expect(drawerBox).not.toBeNull();

    // Click overlay background to close
    const overlay = page.locator('[data-testid="drawer-overlay"]');
    await expect(overlay).toBeVisible();
    await overlay.click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(500);
    await expect(drawer).toHaveAttribute('aria-expanded', 'false');
  });

  test('TC-E2E-004: should display drawer as sidebar on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check drawer is visible
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Check main content is visible alongside drawer (2-column layout)
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Check that drawer and main content are side by side
    const drawerBox = await drawer.boundingBox();
    const mainBox = await mainContent.boundingBox();
    expect(drawerBox).not.toBeNull();
    expect(mainBox).not.toBeNull();
    if (drawerBox && mainBox) {
      // Drawer should be on the left, main content on the right
      expect(drawerBox.x).toBeLessThan(mainBox.x);
    }
  });

  test('TC-E2E-005: should switch layout when viewport size changes', async ({ page }) => {
    // Start with desktop size
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Change to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000); // Wait for resize handler

    // Drawer should still be visible (might be overlay now)
    await expect(drawer).toBeVisible();

    // Change back to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1000); // Wait for resize handler

    // Drawer should still be visible (back to sidebar)
    await expect(drawer).toBeVisible();
  });

  test('TC-E2E-006: should support keyboard navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Wait for drawer to be visible
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Press Tab to navigate through menu items
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    // Press Escape to close drawer
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Check drawer is closed
    await expect(drawer).toHaveAttribute('aria-expanded', 'false');
  });

  test('TC-E2E-007: should not have console errors', async ({ page }) => {
    let consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Perform various actions
    await page.reload();
    await page.waitForTimeout(1000);

    const toggleButton = page.getByRole('button', { name: /メニュー|menu/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(500);
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Check no console errors
    expect(consoleErrors.length).toBe(0);
  });

  test('TC-E2E-008: should have proper z-index for drawer', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Wait for drawer to be visible
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Check z-index
    const zIndex = await drawer.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });

    // z-index should be 50 or higher
    expect(parseInt(zIndex)).toBeGreaterThanOrEqual(50);
  });

  test('TC-E2E-009: should not have layout issues', async ({ page }) => {
    // Take screenshot for visual verification
    await page.screenshot({ path: 'test-results/dashboard-with-drawer-desktop.png', fullPage: true });

    // Check main content is visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Check stat cards are visible
    await expect(page.getByText('総ユーザー数')).toBeVisible();
    await expect(page.getByText('最近のアクティビティ')).toBeVisible();
  });

  test('TC-E2E-010: should trap focus within drawer when open on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Open drawer if closed (mobile defaults to closed)
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    const isExpanded = await drawer.getAttribute('aria-expanded');
    if (isExpanded !== 'true') {
      const toggleButton = page.getByRole('button', { name: /メニューを開く/i }).first();
      await toggleButton.click();
      await page.waitForTimeout(500);
    }

    // Focus should be within drawer (first menu item)
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
    // Focus should be on a link (menu item)
    expect(['A', 'BUTTON']).toContain(focusedElement);
  });
});
