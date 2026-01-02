import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ItemsPerPageDropdown from '@/components/DataTable/ItemsPerPageDropdown';

describe('ItemsPerPageDropdown', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('should render with current value', () => {
    render(
      <ItemsPerPageDropdown
        value={20}
        options={[10, 20, 50, 100]}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('20')).toBeInTheDocument();
  });

  test('should open dropdown when clicked', async () => {
    render(
      <ItemsPerPageDropdown
        value={20}
        options={[10, 20, 50, 100]}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByRole('button', { name: /^20$/ });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^10$/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^50$/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^100$/ })).toBeInTheDocument();
    });
  });

  test('should call onChange when option is selected', async () => {
    render(
      <ItemsPerPageDropdown
        value={20}
        options={[10, 20, 50, 100]}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByRole('button', { name: /^20$/ });
    fireEvent.click(button);

    await waitFor(() => {
      const option50 = screen.getByRole('button', { name: /^50$/ });
      expect(option50).toBeInTheDocument();
    });

    const option50 = screen.getByRole('button', { name: /^50$/ });
    fireEvent.click(option50);

    expect(mockOnChange).toHaveBeenCalledWith(50);
  });

  test('should close dropdown after selection', async () => {
    render(
      <ItemsPerPageDropdown
        value={20}
        options={[10, 20, 50, 100]}
        onChange={mockOnChange}
      />
    );

    const button = screen.getByRole('button', { name: /^20$/ });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^50$/ })).toBeInTheDocument();
    });

    const option50 = screen.getByRole('button', { name: /^50$/ });
    fireEvent.click(option50);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /^10$/ })).not.toBeInTheDocument();
    });
  });

  test('should close dropdown when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <ItemsPerPageDropdown
          value={20}
          options={[10, 20, 50, 100]}
          onChange={mockOnChange}
        />
      </div>
    );

    const button = screen.getByRole('button', { name: /^20$/ });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^10$/ })).toBeInTheDocument();
    });

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /^10$/ })).not.toBeInTheDocument();
    });
  });
});

