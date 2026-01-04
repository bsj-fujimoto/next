import { test, expect } from '@playwright/test';

// ヘッドレスモードを無効化（ブラウザを表示）
test.use({ headless: false });

test.describe('PR #10の修正内容のデモンストレーション', () => {

  test('1. Hydrationエラーの修正を確認', async ({ page }) => {
    console.log('\n=== 1. Hydrationエラーの修正を確認 ===\n');
    
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('❌ コンソールエラー:', msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
        console.log('⚠️  コンソール警告:', msg.text());
      }
    });

    console.log('📝 ダッシュボードページにアクセス中...');
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('✅ ページが読み込まれました');
    console.log('📊 コンソールエラーの確認中...');
    
    // Hydrationエラーをチェック
    const hydrationErrors = consoleErrors.filter(err => 
      err.includes('Hydration') || err.includes('hydration')
    );
    
    if (hydrationErrors.length === 0) {
      console.log('✅ Hydrationエラー: なし');
      console.log('✅ 修正が正しく適用されています！');
    } else {
      console.log('❌ Hydrationエラーが検出されました:', hydrationErrors);
    }
    
    expect(hydrationErrors.length).toBe(0);
    
    console.log('\n⏸️  5秒待機します。ブラウザで確認してください...\n');
    await page.waitForTimeout(5000);
  });

  test('2. ドロップダウンメニューの幅が拡大されたことを確認（ダッシュボード）', async ({ page }) => {
    console.log('\n=== 2. ドロップダウンメニューの幅が拡大されたことを確認 ===\n');
    
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('📝 アバターアイコンをクリック中...');
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    console.log('✅ ドロップダウンメニューが開きました');
    
    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    const menuBox = await menu.boundingBox();
    if (menuBox) {
      const menuWidth = menuBox.width;
      console.log(`📏 ドロップダウンメニューの幅: ${menuWidth}px`);
      
      if (menuWidth >= 220) {
        console.log('✅ 幅が220px以上です（修正が適用されています）');
      } else {
        console.log(`❌ 幅が${menuWidth}pxで、220px未満です`);
      }
      
      expect(menuWidth).toBeGreaterThanOrEqual(220);
    }

    console.log('\n⏸️  5秒待機します。ブラウザでメニューの幅を確認してください...\n');
    await page.waitForTimeout(5000);
  });

  test('3. z-indexが正しく設定され、メニューが前面に表示されることを確認（ダッシュボード）', async ({ page }) => {
    console.log('\n=== 3. z-indexの確認（ダッシュボード） ===\n');
    
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('📝 アバターアイコンをクリック中...');
    const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
    await avatarButton.click();
    await page.waitForTimeout(500);

    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    console.log('📊 z-indexを確認中...');
    const menuZIndex = await menu.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    console.log(`📏 ドロップダウンメニューのz-index: ${menuZIndex}`);
    
    const zIndexValue = parseInt(menuZIndex) || 0;
    if (zIndexValue >= 100) {
      console.log('✅ z-indexが100以上です（修正が適用されています）');
    } else {
      console.log(`❌ z-indexが${zIndexValue}で、100未満です`);
    }
    expect(zIndexValue).toBeGreaterThanOrEqual(100);

    console.log('📊 メニューが他の要素より前面に表示されているか確認中...');
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
      
      console.log('📍 メニュー位置の要素:', elementAtMenuPosition);
      
      if (['menu', 'menuitem'].includes(elementAtMenuPosition.role || '')) {
        console.log('✅ メニューが他の要素より前面に表示されています');
      } else {
        console.log('❌ メニューが他の要素に隠れている可能性があります');
      }
      
      expect(['menu', 'menuitem']).toContain(elementAtMenuPosition.role);
    }

    console.log('\n⏸️  5秒待機します。ブラウザでメニューが前面に表示されているか確認してください...\n');
    await page.waitForTimeout(5000);
  });

  test('4. コンポーネントページでドロップダウンメニューが前面に表示されることを確認', async ({ page }) => {
    console.log('\n=== 4. z-indexの確認（コンポーネントページ） ===\n');
    
    await page.goto('/components');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('📝 DropdownMenuコンポーネントを選択中...');
    await page.getByText('DropdownMenu').click();
    await page.waitForTimeout(1000);

    console.log('📝 プレビューボタンをクリック中...');
    const previewButton = page.locator('button:has-text("メニューを開く")').first();
    await previewButton.waitFor({ state: 'visible', timeout: 10000 });
    await previewButton.click();
    await page.waitForTimeout(1000);

    const menu = page.locator('div[role="menu"]').first();
    await menu.waitFor({ state: 'visible', timeout: 10000 });
    await expect(menu).toBeVisible();

    console.log('📊 z-indexを確認中...');
    const menuZIndex = await menu.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    console.log(`📏 ドロップダウンメニューのz-index: ${menuZIndex}`);
    
    const zIndexValue = parseInt(menuZIndex) || 0;
    if (zIndexValue >= 100) {
      console.log('✅ z-indexが100以上です（修正が適用されています）');
    } else {
      console.log(`❌ z-indexが${zIndexValue}で、100未満です`);
    }
    expect(zIndexValue).toBeGreaterThanOrEqual(100);

    console.log('📊 メニューが他の要素より前面に表示されているか確認中...');
    const menuBox = await menu.boundingBox();
    if (menuBox) {
      const menuTopX = menuBox.x + 5;
      const menuTopY = menuBox.y + 5;
      
      const elementAtMenuPosition = await page.evaluate(({ x, y }) => {
        const element = document.elementFromPoint(x, y);
        return {
          role: element?.getAttribute('role'),
          tagName: element?.tagName,
        };
      }, { x: menuTopX, y: menuTopY });
      
      console.log('📍 メニュー位置の要素:', elementAtMenuPosition);
      
      if (['menu', 'menuitem'].includes(elementAtMenuPosition.role || '')) {
        console.log('✅ メニューが他の要素より前面に表示されています');
      } else {
        console.log('❌ メニューが他の要素に隠れている可能性があります');
      }
      
      expect(['menu', 'menuitem']).toContain(elementAtMenuPosition.role);
    }

    console.log('\n⏸️  5秒待機します。ブラウザでメニューが前面に表示されているか確認してください...\n');
    await page.waitForTimeout(5000);
  });

  test('5. AvatarDropdownプレビューでメニューの幅とz-indexを確認', async ({ page }) => {
    console.log('\n=== 5. AvatarDropdownプレビューの確認 ===\n');
    
    await page.goto('/components');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('📝 AvatarDropdownコンポーネントを選択中...');
    await page.getByText('AvatarDropdown').click();
    await page.waitForTimeout(1000);

    console.log('📝 プレビューのアバターボタンをクリック中...');
    const avatarButton = page.locator('button[aria-label="ユーザーメニュー"]').first();
    await avatarButton.waitFor({ state: 'visible', timeout: 10000 });
    await avatarButton.click();
    await page.waitForTimeout(500);

    const menu = page.locator('div[role="menu"]').first();
    await expect(menu).toBeVisible();

    console.log('📊 メニューの幅を確認中...');
    const menuBox = await menu.boundingBox();
    if (menuBox) {
      const menuWidth = menuBox.width;
      console.log(`📏 ドロップダウンメニューの幅: ${menuWidth}px`);
      
      if (menuWidth >= 220) {
        console.log('✅ 幅が220px以上です（修正が適用されています）');
      } else {
        console.log(`❌ 幅が${menuWidth}pxで、220px未満です`);
      }
      expect(menuWidth).toBeGreaterThanOrEqual(220);
    }

    console.log('📊 z-indexを確認中...');
    const menuZIndex = await menu.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });
    console.log(`📏 ドロップダウンメニューのz-index: ${menuZIndex}`);
    
    const zIndexValue = parseInt(menuZIndex) || 0;
    if (zIndexValue >= 100) {
      console.log('✅ z-indexが100以上です（修正が適用されています）');
    } else {
      console.log(`❌ z-indexが${zIndexValue}で、100未満です`);
    }
    expect(zIndexValue).toBeGreaterThanOrEqual(100);

    console.log('\n⏸️  5秒待機します。ブラウザでメニューの幅とz-indexを確認してください...\n');
    await page.waitForTimeout(5000);
  });
});

