import { test, expect } from '@playwright/test';

test.describe('Components Page Manual Check', () => {
  test('take screenshots for manual review', async ({ page }) => {
    // ログイン状態を設定
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    
    // Componentsページに移動
    await page.goto('/components');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Markdownの読み込みを待つ
    
    // DataTableページのスクリーンショット
    await page.screenshot({ path: 'test-results/components-datatable.png', fullPage: true });
    
    // SVGアイコンの確認
    const svgElements = await page.locator('span.text-white svg').count();
    console.log(`Found ${svgElements} SVG icons`);
    
    // コードブロックの確認
    const codeBlocks = await page.locator('pre code, .react-syntax-highlighter').count();
    console.log(`Found ${codeBlocks} code blocks`);
    
    // SearchBarに切り替え
    await page.getByText('SearchBar').first().click();
    await page.waitForTimeout(2000);
    
    // SearchBarページのスクリーンショット
    await page.screenshot({ path: 'test-results/components-searchbar.png', fullPage: true });
    
    // エラーメッセージの確認
    const errorMessages = await page.locator('text=/Error|error|Cannot read/i').count();
    console.log(`Found ${errorMessages} error messages`);
    
    expect(errorMessages).toBe(0);
  });
});

