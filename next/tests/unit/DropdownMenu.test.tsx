import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DropdownMenu, { DropdownMenuItem } from '@/components/DropdownMenu';

describe('DropdownMenu', () => {
  const mockItems: DropdownMenuItem[] = [
    { label: 'Item 1', onClick: jest.fn() },
    { label: 'Item 2', onClick: jest.fn() },
    { label: 'Item 3', onClick: jest.fn() },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render trigger', () => {
    render(
      <DropdownMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />
    );

    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  test('should open dropdown menu when trigger is clicked', async () => {
    render(
      <DropdownMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />
    );

    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  test('should call onClick when menu item is clicked', async () => {
    render(
      <DropdownMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />
    );

    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    const item1 = screen.getByText('Item 1');
    fireEvent.click(item1);

    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);
  });

  test('should close dropdown menu when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <DropdownMenu
          trigger={<button>Open Menu</button>}
          items={mockItems}
        />
      </div>
    );

    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    await waitFor(() => {
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });
  });

  test('should support keyboard navigation', async () => {
    render(
      <DropdownMenu
        trigger={<button>Open Menu</button>}
        items={mockItems}
      />
    );

    const trigger = screen.getByText('Open Menu');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    // ArrowDown should move to next item
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    await waitFor(() => {
      expect(screen.getByText('Item 2')).toHaveFocus();
    });

    // Escape should close menu
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });
  });
});

