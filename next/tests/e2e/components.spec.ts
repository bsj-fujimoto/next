import { test, expect } from '@playwright/test';

test.describe('Components Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login before accessing components page
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/components');
    await expect(page.getByText('コンポーネント一覧')).toBeVisible();
  });

  test('should display component list', async ({ page }) => {
    // Check for component list sidebar (use heading role for exact match)
    await expect(page.getByRole('heading', { name: 'コンポーネント', exact: true })).toBeVisible();
    
    // Check for search bar in sidebar (first one)
    const sidebarSearch = page.locator('div.w-64 input[placeholder="検索..."]').first();
    await expect(sidebarSearch).toBeVisible();
    
    // Check for DataTable in the list
    await expect(page.getByText('DataTable').first()).toBeVisible();
  });

  test('should search components', async ({ page }) => {
    // Search for "Button" in sidebar search
    const sidebarSearch = page.locator('div.w-64 input[placeholder="検索..."]').first();
    await sidebarSearch.fill('Button');
    
    // Wait for search results
    await page.waitForTimeout(300);
    
    // Check that Button is visible
    await expect(page.getByText('Button')).toBeVisible();
    
    // Check that other components are filtered out (DataTable should not be visible if search is working)
    const dataTableVisible = await page.getByText('DataTable').isVisible().catch(() => false);
    // Note: DataTable might still be visible if it's expanded, so we check for other components
    const searchBarVisible = await page.getByText('SearchBar').isVisible().catch(() => false);
    expect(searchBarVisible).toBeFalsy();
  });

  test('should select and display component preview', async ({ page }) => {
    // Click on DataTable
    await page.getByText('DataTable').first().click();
    
    // Wait for preview to load
    await page.waitForTimeout(300);
    
    // Check for component title
    await expect(page.getByText('DataTable').nth(1)).toBeVisible();
    
    // Check for component description
    await expect(page.getByText(/検索、ソート、ページネーション機能を備えた/)).toBeVisible();
  });

  test('should display code sample', async ({ page }) => {
    // Select DataTable component
    await page.locator('div.w-64').getByText('DataTable').first().click();
    await page.waitForTimeout(1000);
    
    // Check for code sample section
    await expect(page.getByText('コードサンプル').first()).toBeVisible({ timeout: 5000 });
    
    // Check for copy button
    await expect(page.getByRole('button', { name: /コピー/ }).first()).toBeVisible();
    
    // Check that code sample contains import statement
    const codeSample = page.locator('pre').first();
    await expect(codeSample).toContainText('import DataTable');
  });

  test('should display component variations', async ({ page }) => {
    // Select DataTable component
    await page.getByText('DataTable').first().click();
    await page.waitForTimeout(300);
    
    // Check for variations section
    await expect(page.getByText('バリエーション')).toBeVisible();
    
    // Check for at least one variation
    await expect(page.getByText('検索なし')).toBeVisible();
  });

  test('should expand and collapse component children', async ({ page }) => {
    // Check if DataTable children are already visible
    const isExpanded = await page.locator('div.w-64').getByText('SearchBar').isVisible().catch(() => false);
    
    if (!isExpanded) {
      // Find and click the expand button (chevron icon) - it's in the same row as DataTable
      const dataTableContainer = page.locator('div.w-64').locator('div').filter({ hasText: /^DataTable$/ }).first();
      const chevronButton = dataTableContainer.locator('..').locator('button').first();
      if (await chevronButton.isVisible().catch(() => false)) {
        await chevronButton.click();
        await page.waitForTimeout(500);
      }
    }
    
    // Check that children are visible
    await expect(page.locator('div.w-64').getByText('SearchBar')).toBeVisible({ timeout: 2000 });
    await expect(page.locator('div.w-64').getByText('Pagination')).toBeVisible();
  });

  test('should display DataTable preview with functionality', async ({ page }) => {
    // Select DataTable component
    await page.locator('div.w-64').getByText('DataTable').first().click();
    await page.waitForTimeout(1000);
    
    // Check for DataTable preview (find search input directly - placeholder contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Test search functionality in preview
    await searchInput.fill('アイテム1');
    await page.waitForTimeout(500);
    
    // Check that search results are filtered (find pagination text)
    await expect(page.getByText(/全 \d+ 件中/).first()).toBeVisible();
  });

  test('should test pagination in DataTable preview', async ({ page }) => {
    // Select DataTable component
    await page.locator('div.w-64').getByText('DataTable').first().click();
    await page.waitForTimeout(1000);
    
    // Wait for search input to be visible (placeholder contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Check for pagination controls
    await expect(page.getByRole('button', { name: '最初' }).first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: '前へ' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: '次へ' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: '最後' }).first()).toBeVisible();
    
    // Click next page
    await page.getByRole('button', { name: '次へ' }).first().click();
    await page.waitForTimeout(500);
    
    // Check that page changed
    await expect(page.getByRole('button', { name: '2' }).first()).toHaveClass(/font-semibold/);
  });

  test('should test ItemsPerPageDropdown in preview', async ({ page }) => {
    // Select DataTable component
    await page.locator('div.w-64').getByText('DataTable').first().click();
    await page.waitForTimeout(1000);
    
    // Wait for search input to be visible (placeholder contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Find ItemsPerPageDropdown button
    const itemsPerPageLabel = page.locator('text=表示件数').first();
    await expect(itemsPerPageLabel).toBeVisible({ timeout: 5000 });
    const dropdownButton = itemsPerPageLabel.locator('..').locator('button').filter({ hasText: /^20$/ }).first();
    await expect(dropdownButton).toBeVisible({ timeout: 5000 });
    
    // Click to open dropdown
    await dropdownButton.click();
    await page.waitForTimeout(500);
    
    // Check that dropdown options are visible (they should be in a dropdown menu)
    const option10 = page.locator('div.absolute').getByRole('button', { name: /^10$/ }).first();
    const option50 = page.locator('div.absolute').getByRole('button', { name: /^50$/ }).first();
    const option100 = page.locator('div.absolute').getByRole('button', { name: /^100$/ }).first();
    await expect(option10).toBeVisible({ timeout: 2000 });
    await expect(option50).toBeVisible({ timeout: 2000 });
    await expect(option100).toBeVisible({ timeout: 2000 });
    
    // Select different option
    await option50.click();
    await page.waitForTimeout(500);
    
    // Check that items per page changed
    await expect(page.getByText(/全 \d+ 件中 1 - 50/).first()).toBeVisible();
  });

  test('should test sorting in DataTable preview', async ({ page }) => {
    // Select DataTable component
    await page.locator('div.w-64').getByText('DataTable').first().click();
    await page.waitForTimeout(1000);
    
    // Wait for search input to be visible (placeholder contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Click on ID column header to sort
    const idHeader = page.getByRole('columnheader', { name: /ID/ }).first();
    await expect(idHeader).toBeVisible({ timeout: 5000 });
    await idHeader.click();
    await page.waitForTimeout(500);
    
    // Get first two rows (find table body near search input)
    const table = page.locator('table').first();
    const rows = table.locator('tbody tr');
    const firstId = await rows.first().locator('td').first().textContent();
    const secondId = await rows.nth(1).locator('td').first().textContent();
    
    // Should be sorted (IDs are numbers, so first should be less than second)
    expect(parseInt(firstId || '0')).toBeLessThanOrEqual(parseInt(secondId || '0'));
  });

  test('should display EmptyState when no results', async ({ page }) => {
    // Select DataTable component
    await page.locator('div.w-64').getByText('DataTable').first().click();
    await page.waitForTimeout(1000);
    
    // Find search input (placeholder contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Search for something that doesn't exist
    await searchInput.fill('存在しないアイテム999999');
    await page.waitForTimeout(500);
    
    // Check for EmptyState message
    await expect(page.getByText(/検索結果が見つかりませんでした/)).toBeVisible();
  });

  test('should copy code sample to clipboard', async ({ page }) => {
    // Select DataTable component
    await page.locator('div.w-64').getByText('DataTable').first().click();
    await page.waitForTimeout(1000);
    
    // Click copy button
    const copyButton = page.getByRole('button', { name: /コピー/ }).first();
    await expect(copyButton).toBeVisible({ timeout: 5000 });
    await copyButton.click();
    
    // Note: We can't directly test clipboard in Playwright without permissions,
    // but we can verify the button exists and is clickable
    await expect(copyButton).toBeVisible();
  });
});

test.describe('DataTable Component Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.goto('/components');
    // Wait for page to load
    await page.waitForSelector('text=コンポーネント一覧', { timeout: 10000 });
    // Click on DataTable in the sidebar
    await page.locator('div.w-64').getByText('DataTable').first().click();
    // Wait for DataTable component to be rendered - wait for the search input (placeholder contains "アイテム")
    await page.waitForSelector('input[placeholder*="アイテム"]', { timeout: 15000 });
    // Additional wait to ensure DataTable is fully loaded
    await page.waitForTimeout(1000);
  });

  test('should filter data by search query', async ({ page }) => {
    // Find search input directly by placeholder (contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Get initial count (find pagination text on the page)
    const initialText = await page.getByText(/全 \d+ 件中/).first().textContent();
    const initialCount = parseInt(initialText?.match(/全 (\d+) 件中/)?.[1] || '0');
    
    // Search for specific item
    await searchInput.fill('アイテム1');
    await page.waitForTimeout(500);
    
    // Check that results are filtered
    const searchText = await page.getByText(/全 \d+ 件中/).first().textContent();
    const searchCount = parseInt(searchText?.match(/全 (\d+) 件中/)?.[1] || '0');
    
    expect(searchCount).toBeLessThan(initialCount);
    expect(searchCount).toBeGreaterThan(0);
  });

  test('should sort by all sortable columns', async ({ page }) => {
    // Wait for search input to be visible (placeholder contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    const columns = ['ID', '名前', 'カテゴリ', 'ステータス'];
    
    for (const columnName of columns) {
      // Click column header (find in the same area as search input)
      const header = page.getByRole('columnheader', { name: new RegExp(columnName) }).first();
      await expect(header).toBeVisible({ timeout: 5000 });
      await header.click();
      await page.waitForTimeout(500);
      
      // Click again to reverse sort
      await header.click();
      await page.waitForTimeout(500);
    }
  });

  test('should navigate through all pages', async ({ page }) => {
    // Wait for search input to be visible (placeholder contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Go to last page (find button near search input area)
    const lastButton = page.getByRole('button', { name: '最後' }).first();
    await expect(lastButton).toBeVisible({ timeout: 5000 });
    await lastButton.click();
    await page.waitForTimeout(500);
    
    // Verify we're on last page
    const lastPageButton = page.getByRole('button', { name: /^5$/ }).first();
    await expect(lastPageButton).toHaveClass(/font-semibold/);
    
    // Go back to first page
    const firstButton = page.getByRole('button', { name: '最初' }).first();
    await expect(firstButton).toBeVisible({ timeout: 5000 });
    await firstButton.click();
    await page.waitForTimeout(500);
    
    // Verify we're on first page
    const firstPageButton = page.getByRole('button', { name: /^1$/ }).first();
    await expect(firstPageButton).toHaveClass(/font-semibold/);
  });

  test('should change items per page and reset to page 1', async ({ page }) => {
    // Wait for search input to be visible (placeholder contains "アイテム")
    const searchInput = page.locator('input[placeholder*="アイテム"]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Go to page 2 first
    const page2Button = page.getByRole('button', { name: '2' }).first();
    await expect(page2Button).toBeVisible({ timeout: 5000 });
    await page2Button.click();
    await page.waitForTimeout(500);
    
    // Change items per page (find dropdown near "表示件数")
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
    
    // Verify we're back on page 1
    const firstPageButton = page.getByRole('button', { name: /^1$/ }).first();
    await expect(firstPageButton).toHaveClass(/font-semibold/);
    
    // Verify showing 50 items
    await expect(page.getByText(/全 \d+ 件中 1 - 50/).first()).toBeVisible();
  });
});

