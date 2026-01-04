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

    // Find the preview button - it should be rendered in the preview section
    const previewButton = page.locator('button:has-text("メニューを開く")').first();
    await previewButton.waitFor({ state: 'visible', timeout: 10000 });
    await previewButton.click();
    await page.waitForTimeout(500);

    // Check dropdown menu is visible
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Verify dropdown menu is displayed above other elements (z-index check)
    const menuElement = await menu.boundingBox();
    if (menuElement) {
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

  test('should display AvatarDropdown preview and dropdown appears above other elements', async ({ page }) => {
    await page.getByText('AvatarDropdown').click();
    await page.waitForTimeout(1000);

    // Find the avatar button in preview and click it
    const avatarButton = page.locator('button[aria-label="ユーザーメニュー"]').first();
    await avatarButton.waitFor({ state: 'visible', timeout: 10000 });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // Check dropdown menu is visible
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    // Verify dropdown menu is displayed above other elements (z-index check)
    const menuElement = await menu.boundingBox();
    if (menuElement) {
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
});
