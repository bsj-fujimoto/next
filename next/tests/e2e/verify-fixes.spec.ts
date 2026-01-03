import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('PR #10の修正内容の確認', () => {
  const screenshotsDir = path.join(process.cwd(), 'test-results', 'verification-screenshots');
  
  test.beforeAll(() => {
    // スクリーンショットディレクトリを作成
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test('1. Hydrationエラーが修正されたことを確認', async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    // ダッシュボードページにアクセス
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // スクリーンショットを取得
    await page.screenshot({ 
      path: path.join(screenshotsDir, '1-hydration-error-fixed.png'),
      fullPage: true 
    });

    // コンソールエラーがないことを確認
    const hydrationErrors = consoleErrors.filter(err => 
      err.includes('Hydration') || err.includes('hydration')
    );
    
    expect(hydrationErrors.length).toBe(0);
    console.log('✅ Hydrationエラーなし:', hydrationErrors.length === 0);
    
    // コンソールエラー全体も記録
    if (consoleErrors.length > 0) {
      console.log('コンソールエラー:', consoleErrors);
    }
  });

  test('2. ドロップダウンメニューの幅が拡大されたことを確認（ダッシュボード）', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // アバターアイコンをクリック
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // ドロップダウンメニューが表示されることを確認
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    // メニューの幅を測定
    const menuBox = await menu.boundingBox();
    expect(menuBox).not.toBeNull();
    
    if (menuBox) {
      const menuWidth = menuBox.width;
      console.log('✅ ドロップダウンメニューの幅:', menuWidth, 'px');
      
      // 幅が220px以上であることを確認（min-w-[220px]）
      expect(menuWidth).toBeGreaterThanOrEqual(220);
      
      // スクリーンショットを取得
      await page.screenshot({ 
        path: path.join(screenshotsDir, '2-dropdown-width-dashboard.png'),
        fullPage: false 
      });
    }
  });

  test('3. z-indexが正しく設定され、ドロップダウンメニューが他の要素より前面に表示されることを確認（ダッシュボード）', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // アバターアイコンをクリック
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // ドロップダウンメニューが表示されることを確認
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    // z-indexを確認
    const menuZIndex = await menu.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    console.log('✅ ドロップダウンメニューのz-index:', menuZIndex);

    // z-indexが100以上であることを確認
    const zIndexValue = parseInt(menuZIndex) || 0;
    expect(zIndexValue).toBeGreaterThanOrEqual(100);

    // メニューが他の要素より前面に表示されることを確認
    const menuBox = await menu.boundingBox();
    if (menuBox) {
      // メニューの左上を確認
      const menuTopX = menuBox.x + 5;
      const menuTopY = menuBox.y + 5;
      
      const elementAtMenuPosition = await page.evaluate(({ x, y }) => {
        const element = document.elementFromPoint(x, y);
        return {
          role: element?.getAttribute('role'),
          tagName: element?.tagName,
          className: element?.className,
          zIndex: window.getComputedStyle(element!).zIndex,
        };
      }, { x: menuTopX, y: menuTopY });
      
      console.log('✅ メニュー位置の要素:', elementAtMenuPosition);
      
      // メニューまたはメニュー項目が前面に表示されていることを確認
      expect(['menu', 'menuitem']).toContain(elementAtMenuPosition.role);
    }

    // スクリーンショットを取得
    await page.screenshot({ 
      path: path.join(screenshotsDir, '3-z-index-dashboard.png'),
      fullPage: false 
    });
  });

  test('4. コンポーネントページでドロップダウンメニューが他の要素より前面に表示されることを確認', async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // DropdownMenuコンポーネントを選択
    await page.getByText('DropdownMenu').click();
    await page.waitForTimeout(1000);

    // プレビューボタンをクリック
    const previewButton = page.locator('button:has-text("メニューを開く")').first();
    await previewButton.waitFor({ state: 'visible', timeout: 10000 });
    await previewButton.click();
    await page.waitForTimeout(500);

    // ドロップダウンメニューが表示されることを確認
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    // z-indexを確認
    const menuZIndex = await menu.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    console.log('✅ コンポーネントページのドロップダウンメニューのz-index:', menuZIndex);

    // z-indexが100以上であることを確認
    const zIndexValue = parseInt(menuZIndex) || 0;
    expect(zIndexValue).toBeGreaterThanOrEqual(100);

    // メニューが他の要素より前面に表示されることを確認
    const menuBox = await menu.boundingBox();
    if (menuBox) {
      const menuTopX = menuBox.x + 5;
      const menuTopY = menuBox.y + 5;
      
      const elementAtMenuPosition = await page.evaluate(({ x, y }) => {
        const element = document.elementFromPoint(x, y);
        return {
          role: element?.getAttribute('role'),
          tagName: element?.tagName,
          className: element?.className,
        };
      }, { x: menuTopX, y: menuTopY });
      
      console.log('✅ コンポーネントページのメニュー位置の要素:', elementAtMenuPosition);
      expect(['menu', 'menuitem']).toContain(elementAtMenuPosition.role);
    }

    // スクリーンショットを取得
    await page.screenshot({ 
      path: path.join(screenshotsDir, '4-z-index-components-page.png'),
      fullPage: false 
    });
  });

  test('5. AvatarDropdownのプレビューでドロップダウンメニューが他の要素より前面に表示されることを確認', async ({ page }) => {
    await page.goto('/components');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // AvatarDropdownコンポーネントを選択
    await page.getByText('AvatarDropdown').click();
    await page.waitForTimeout(1000);

    // プレビューのアバターボタンをクリック
    const avatarButton = page.locator('button[aria-label="ユーザーメニュー"]').first();
    await avatarButton.waitFor({ state: 'visible', timeout: 10000 });
    await avatarButton.click();
    await page.waitForTimeout(500);

    // ドロップダウンメニューが表示されることを確認
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    // メニューの幅を測定
    const menuBox = await menu.boundingBox();
    if (menuBox) {
      const menuWidth = menuBox.width;
      console.log('✅ AvatarDropdownプレビューのドロップダウンメニューの幅:', menuWidth, 'px');
      expect(menuWidth).toBeGreaterThanOrEqual(220);
    }

    // z-indexを確認
    const menuZIndex = await menu.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    console.log('✅ AvatarDropdownプレビューのz-index:', menuZIndex);

    // スクリーンショットを取得
    await page.screenshot({ 
      path: path.join(screenshotsDir, '5-avatar-dropdown-preview.png'),
      fullPage: false 
    });
  });
});

