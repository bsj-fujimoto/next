import { test, expect } from '@playwright/test';

test.describe('Components Page', () => {
  test.beforeEach(async ({ page }) => {
    // Clear console errors before each test
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/components');
    await page.waitForLoadState('networkidle');
    
    // Check for console errors
    if (consoleErrors.length > 0) {
      throw new Error(`Console errors detected: ${consoleErrors.join(', ')}`);
    }
  });

  test('should display DropdownMenu component without errors', async ({ page }) => {
    // Click on DropdownMenu in the sidebar
    await page.getByText('DropdownMenu').click();
    await page.waitForTimeout(500);

    // Check that DropdownMenu is selected
    await expect(page.getByText('DropdownMenu').first()).toBeVisible();

    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);

    if (consoleErrors.length > 0) {
      throw new Error(`Console errors detected: ${consoleErrors.join(', ')}`);
    }
  });

  test('should display AvatarDropdown component without errors', async ({ page }) => {
    // Click on AvatarDropdown in the sidebar
    await page.getByText('AvatarDropdown').click();
    await page.waitForTimeout(500);

    // Check that AvatarDropdown is selected
    await expect(page.getByText('AvatarDropdown').first()).toBeVisible();

    // Check for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);

    if (consoleErrors.length > 0) {
      throw new Error(`Console errors detected: ${consoleErrors.join(', ')}`);
    }
  });

  test('should display DropdownMenu preview and dropdown appears above other elements', async ({ page }) => {
    await page.getByText('DropdownMenu').click();
    await page.waitForTimeout(1000);

    // Find the preview button in the preview section and click it
    const previewSection = page.locator('text=プレビュー').locator('..').first();
    const previewButton = previewSection.locator('button:has-text("メニューを開く")').first();
    await previewButton.waitFor({ state: 'visible', timeout: 10000 });
    await previewButton.click();
    await page.waitForTimeout(500);

    // Check dropdown menu is visible
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Verify dropdown menu is displayed above other elements (z-index check)
    const menuElement = await menu.boundingBox();
    if (menuElement) {
      const menuCenterX = menuElement.x + menuElement.width / 2;
      const menuCenterY = menuElement.y + menuElement.height / 2;
      const elementAtMenuPosition = await page.evaluate((x, y) => {
        return document.elementFromPoint(x, y)?.getAttribute('role');
      }, menuCenterX, menuCenterY);
      
      // Menu should be the topmost element at its position
      expect(elementAtMenuPosition).toBe('menu');
    }
  });

  test('should display AvatarDropdown preview and dropdown appears above other elements', async ({ page }) => {
    await page.getByText('AvatarDropdown').click();
    await page.waitForTimeout(500);

    // Find the avatar button in preview and click it
    const avatarButton = page.locator('button[aria-label="ユーザーメニュー"]').first();
    await avatarButton.waitFor({ state: 'visible' });
    await avatarButton.click();
    await page.waitForTimeout(300);

    // Check dropdown menu is visible
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Verify dropdown menu is displayed above other elements (z-index check)
    const menuElement = await menu.boundingBox();
    if (menuElement) {
      const menuCenterX = menuElement.x + menuElement.width / 2;
      const menuCenterY = menuElement.y + menuElement.height / 2;
      const elementAtMenuPosition = await page.evaluate((x, y) => {
        return document.elementFromPoint(x, y)?.getAttribute('role');
      }, menuCenterX, menuCenterY);
      
      // Menu should be the topmost element at its position
      expect(elementAtMenuPosition).toBe('menu');
    }
  });
});
