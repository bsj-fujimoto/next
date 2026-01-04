import { test, expect } from '@playwright/test';

test.describe('SideDrawer Evidence Collection', () => {
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
    await page.waitForTimeout(1000); // Wait for page to stabilize
  });

  test('should capture desktop drawer open state', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Take screenshot of desktop drawer open state
    await page.screenshot({ 
      path: 'test-results/side-drawer-desktop-open.png',
      fullPage: true 
    });
  });

  test('should capture desktop drawer closed state', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Close drawer
    const toggleButton = page.getByRole('button', { name: /メニューを閉じる|メニューを開く/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(500);

    // Take screenshot of desktop drawer closed state
    await page.screenshot({ 
      path: 'test-results/side-drawer-desktop-closed.png',
      fullPage: true 
    });
  });

  test('should capture mobile drawer open state', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
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

    // Take screenshot of mobile drawer open state
    await page.screenshot({ 
      path: 'test-results/side-drawer-mobile-open.png',
      fullPage: true 
    });
  });

  test('should capture mobile drawer closed state', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Ensure drawer is closed
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    const isExpanded = await drawer.getAttribute('aria-expanded');
    if (isExpanded === 'true') {
      const toggleButton = page.getByRole('button', { name: /メニューを閉じる/i }).first();
      await toggleButton.click();
      await page.waitForTimeout(500);
    }

    // Take screenshot of mobile drawer closed state
    await page.screenshot({ 
      path: 'test-results/side-drawer-mobile-closed.png',
      fullPage: true 
    });
  });

  test('should capture drawer menu navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Ensure drawer is open
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Hover over profile menu item
    const profileItem = page.getByRole('link', { name: /プロフィール/i });
    await profileItem.hover();
    await page.waitForTimeout(300);

    // Take screenshot showing menu items
    await page.screenshot({ 
      path: 'test-results/side-drawer-menu-items.png',
      fullPage: true 
    });
  });

  test('should capture drawer toggle animation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Ensure drawer is open
    const drawer = page.getByRole('navigation', { name: /メインメニュー/i });
    await expect(drawer).toBeVisible();

    // Take screenshot before closing
    await page.screenshot({ 
      path: 'test-results/side-drawer-before-close.png',
      fullPage: true 
    });

    // Close drawer
    const toggleButton = page.getByRole('button', { name: /メニューを閉じる|メニューを開く/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(500); // Wait for animation

    // Take screenshot after closing
    await page.screenshot({ 
      path: 'test-results/side-drawer-after-close.png',
      fullPage: true 
    });
  });
});
