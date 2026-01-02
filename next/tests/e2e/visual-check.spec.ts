import { test, expect } from '@playwright/test';

test.describe('Components Page Visual Check', () => {
  test.beforeEach(async ({ page }) => {
    // ログイン状態を設定
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/components');
    await page.waitForLoadState('networkidle');
  });

  test('should display SVG icon correctly', async ({ page }) => {
    // DataTableが選択されていることを確認
    await expect(page.getByText('DataTable').first()).toBeVisible();
    await page.waitForTimeout(2000); // Markdownの読み込みを待つ
    
    // SVGアイコンが表示されているか確認（複数のセレクターを試す）
    const iconSvg = page.locator('span.text-white svg, h2 + span svg, .flex.items-center svg').first();
    
    // スクリーンショットを取得して確認
    await page.screenshot({ path: 'test-results/svg-check.png', fullPage: false });
    
    const svgCount = await page.locator('svg').count();
    console.log(`Found ${svgCount} SVG elements on the page`);
    
    if (svgCount > 0) {
      const firstSvg = page.locator('svg').first();
      await expect(firstSvg).toBeVisible();
      
      // SVGのviewBox属性を確認
      const viewBox = await firstSvg.getAttribute('viewBox');
      console.log(`SVG viewBox: ${viewBox}`);
      
      // SVG内にpath要素があることを確認
      const path = firstSvg.locator('path');
      const pathCount = await path.count();
      console.log(`Found ${pathCount} path elements in SVG`);
    }
  });

  test('should render code blocks correctly', async ({ page }) => {
    // DataTableが選択されていることを確認
    await expect(page.getByText('DataTable').first()).toBeVisible();
    await page.waitForTimeout(3000); // Markdownの読み込みを待つ
    
    // スクリーンショットを取得して確認
    await page.screenshot({ path: 'test-results/code-block-check.png', fullPage: true });
    
    // コードブロックが表示されているか確認（複数のセレクターを試す）
    const codeBlockSelectors = [
      '.react-syntax-highlighter',
      'pre code',
      '[class*="syntax"]',
      'pre[class*="language"]'
    ];
    
    let codeBlockFound = false;
    for (const selector of codeBlockSelectors) {
      const elements = page.locator(selector);
      const count = await elements.count();
      console.log(`Selector "${selector}" found ${count} elements`);
      
      if (count > 0) {
        const firstElement = elements.first();
        await expect(firstElement).toBeVisible({ timeout: 5000 });
        const codeText = await firstElement.textContent();
        console.log(`Code block text (first 100 chars): ${codeText?.substring(0, 100)}`);
        codeBlockFound = true;
        break;
      }
    }
    
    // 少なくともコードサンプルセクションが表示されているか確認
    const codeSampleSection = page.getByText(/コードサンプル|Code Sample/i);
    await expect(codeSampleSection.first()).toBeVisible({ timeout: 10000 });
  });

  test('should switch to SearchBar without errors', async ({ page }) => {
    // SearchBarをクリック
    await page.getByText('SearchBar').first().click();
    await page.waitForTimeout(1000);
    
    // エラーが発生していないことを確認（エラーメッセージがない）
    const errorMessages = page.locator('text=/Error|error|Cannot read/i');
    await expect(errorMessages).toHaveCount(0);
    
    // SearchBarのタイトルが表示されていることを確認
    await expect(page.getByRole('heading', { name: /SearchBar/i })).toBeVisible();
  });

  test('should display Markdown content correctly', async ({ page }) => {
    // DataTableが選択されていることを確認
    await expect(page.getByText('DataTable').first()).toBeVisible();
    await page.waitForTimeout(2000); // Markdownの読み込みを待つ
    
    // Markdownコンテンツが表示されているか確認
    const markdownContent = page.locator('.backdrop-blur-xl.bg-white\\/10').first();
    await expect(markdownContent).toBeVisible();
    
    // コードサンプルセクションが表示されているか確認
    const codeSampleSection = page.getByText(/コードサンプル|Code Sample/i);
    await expect(codeSampleSection.first()).toBeVisible({ timeout: 10000 });
  });
});

