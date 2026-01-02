import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataTable from '@/components/DataTable';
import type { Column } from '@/types/table';

interface TestItem {
  id: number;
  name: string;
  category: string;
  status: string;
}

describe('DataTable', () => {
  const testData: TestItem[] = [
    { id: 1, name: 'アイテム1', category: 'カテゴリ1', status: '有効' },
    { id: 2, name: 'アイテム2', category: 'カテゴリ2', status: '無効' },
    { id: 3, name: 'アイテム3', category: 'カテゴリ1', status: '保留中' },
    { id: 4, name: 'アイテム4', category: 'カテゴリ2', status: '有効' },
    { id: 5, name: 'アイテム5', category: 'カテゴリ1', status: '無効' },
  ];

  const columns: Column<TestItem>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: '名前', sortable: true },
    { key: 'category', label: 'カテゴリ', sortable: true },
    { key: 'status', label: 'ステータス', sortable: true },
  ];

  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('should render table with data', () => {
    render(<DataTable data={testData} columns={columns} />);
    
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('名前')).toBeInTheDocument();
    expect(screen.getByText('アイテム1')).toBeInTheDocument();
    expect(screen.getByText('アイテム2')).toBeInTheDocument();
  });

  test('should filter data by search query', async () => {
    render(<DataTable data={testData} columns={columns} />);
    
    const searchInput = screen.getByPlaceholderText(/検索/);
    fireEvent.change(searchInput, { target: { value: 'アイテム1' } });
    
    await waitFor(() => {
      expect(screen.getByText('アイテム1')).toBeInTheDocument();
      expect(screen.queryByText('アイテム2')).not.toBeInTheDocument();
    });
  });

  test('should sort data by column', async () => {
    render(<DataTable data={testData} columns={columns} />);
    
    const idHeader = screen.getByRole('columnheader', { name: /ID/ });
    fireEvent.click(idHeader);
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      // First data row (skip header)
      const firstRow = rows[1];
      expect(firstRow).toHaveTextContent('1');
    });
  });

  test('should paginate data', async () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `アイテム${i + 1}`,
      category: `カテゴリ${Math.floor(i / 5) + 1}`,
      status: '有効',
    }));

    render(<DataTable data={largeData} columns={columns} itemsPerPageOptions={[10, 20, 50]} defaultItemsPerPage={10} />);
    
    // Should show first 10 items
    expect(screen.getByText('アイテム1')).toBeInTheDocument();
    expect(screen.getByText('アイテム10')).toBeInTheDocument();
    expect(screen.queryByText('アイテム11')).not.toBeInTheDocument();
    
    // Click next page (use getAllByRole to get first one)
    const nextButtons = screen.getAllByRole('button', { name: /次へ/ });
    fireEvent.click(nextButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText('アイテム11')).toBeInTheDocument();
      expect(screen.queryByText('アイテム1')).not.toBeInTheDocument();
    });
  });

  test('should display empty state when no results', async () => {
    render(<DataTable data={testData} columns={columns} />);
    
    const searchInput = screen.getByPlaceholderText(/検索/);
    fireEvent.change(searchInput, { target: { value: '存在しないアイテム999' } });
    
    await waitFor(() => {
      expect(screen.getByText(/検索結果が見つかりませんでした/)).toBeInTheDocument();
    });
  });

  test('should change items per page', async () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `アイテム${i + 1}`,
      category: `カテゴリ${Math.floor(i / 5) + 1}`,
      status: '有効',
    }));

    render(<DataTable data={largeData} columns={columns} itemsPerPageOptions={[10, 20, 50]} defaultItemsPerPage={10} />);
    
    // Find items per page dropdown button (use getAllByRole to get first one)
    const dropdownButtons = screen.getAllByRole('button', { name: /^10$/ });
    fireEvent.click(dropdownButtons[0]);
    
    await waitFor(() => {
      // After clicking, dropdown opens and shows options
      // Options are buttons with text "20" and "50"
      const option20 = screen.getAllByRole('button', { name: /^20$/ }).find(
        btn => btn.textContent === '20' && !btn.closest('[class*="px-3 py-1"]')
      );
      expect(option20).toBeInTheDocument();
    });
    
    // Click option 20 (find the one in dropdown, not the main button)
    const allButtons20 = screen.getAllByRole('button', { name: /^20$/ });
    // The dropdown option should be the one that's not disabled and is in the dropdown
    const option20 = allButtons20.find(btn => 
      btn.textContent === '20' && 
      !btn.hasAttribute('disabled') &&
      btn.closest('div[class*="absolute"]')
    ) || allButtons20[allButtons20.length - 1];
    
    fireEvent.click(option20);
    
    await waitFor(() => {
      // Should show 20 items now
      expect(screen.getByText('アイテム20')).toBeInTheDocument();
    });
  });
});

