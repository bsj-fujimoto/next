import { test, expect } from '@playwright/test';

test.describe('SideDrawer Demo Video', () => {
  test('should demonstrate drawer functionality', async ({ page }) => {
    // Clear console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        throw new Error(`Console error: ${msg.text()}`);
      }
    });

    // Login
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'ダッシュボード' })).toBeVisible();
    await page.waitForTimeout(2000); // Wait for page to stabilize

    // Desktop view - show drawer open
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/demo-1-desktop-open.png', fullPage: true });

    // Click toggle to close
    const toggleButton = page.getByRole('button', { name: /メニューを閉じる|メニューを開く/i }).first();
    await toggleButton.click();
    await page.waitForTimeout(800); // Wait for animation
    await page.screenshot({ path: 'test-results/demo-2-desktop-closed.png', fullPage: true });

    // Click toggle to open again
    await toggleButton.click();
    await page.waitForTimeout(800); // Wait for animation
    await page.screenshot({ path: 'test-results/demo-3-desktop-reopened.png', fullPage: true });

    // Navigate to mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/demo-4-mobile-closed.png', fullPage: true });

    // Open drawer on mobile
    const mobileToggleButton = page.getByRole('button', { name: /メニューを開く/i }).first();
    await mobileToggleButton.click();
    await page.waitForTimeout(800); // Wait for animation
    await page.screenshot({ path: 'test-results/demo-5-mobile-open.png', fullPage: true });

    // Show menu items
    const profileItem = page.getByRole('link', { name: /プロフィール/i });
    await expect(profileItem).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'test-results/demo-6-menu-items.png', fullPage: true });

    // Go back to desktop view for keyboard test
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1000);
    
    // Ensure drawer is open
    const desktopDrawer = page.getByRole('navigation', { name: /メインメニュー/i });
    const desktopExpanded = await desktopDrawer.getAttribute('aria-expanded');
    if (desktopExpanded !== 'true') {
      const desktopToggle = page.getByRole('button', { name: /メニューを開く/i }).first();
      await desktopToggle.click();
      await page.waitForTimeout(800);
    }
    
    // Test keyboard navigation - Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800); // Wait for animation
    await page.screenshot({ path: 'test-results/demo-7-closed-via-escape.png', fullPage: true });
  });
});
