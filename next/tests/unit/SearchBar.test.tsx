import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/DataTable/SearchBar';

describe('SearchBar', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('should render with placeholder', () => {
    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
        placeholder="検索..."
      />
    );

    const input = screen.getByPlaceholderText('検索...');
    expect(input).toBeInTheDocument();
  });

  test('should display current value', () => {
    render(
      <SearchBar
        value="test query"
        onChange={mockOnChange}
        placeholder="検索..."
      />
    );

    const input = screen.getByPlaceholderText('検索...') as HTMLInputElement;
    expect(input.value).toBe('test query');
  });

  test('should call onChange when input changes', () => {
    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
        placeholder="検索..."
      />
    );

    const input = screen.getByPlaceholderText('検索...');
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(mockOnChange).toHaveBeenCalledWith('new query');
  });

  test('should use default placeholder when not provided', () => {
    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
      />
    );

    const input = screen.getByPlaceholderText('検索...');
    expect(input).toBeInTheDocument();
  });
});

