import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SideDrawer from '@/components/SideDrawer';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SideDrawer', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    // Reset window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(min-width: 1024px)',
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

  test('TC-U-001: should render drawer in open state by default', () => {
    const { container } = render(<SideDrawer isOpen={true} onClose={jest.fn()} />);
    
    const drawer = container.querySelector('[role="navigation"]');
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveAttribute('aria-expanded', 'true');
  });

  test('TC-U-002: should close drawer when close button is clicked', async () => {
    const onClose = jest.fn();
    render(<SideDrawer isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByRole('button', { name: /閉じる|close/i });
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('TC-U-003: should open drawer when isOpen prop changes to true', () => {
    const { rerender } = render(<SideDrawer isOpen={false} onClose={jest.fn()} />);
    
    const drawer = screen.queryByRole('navigation');
    expect(drawer).not.toBeInTheDocument();
    
    rerender(<SideDrawer isOpen={true} onClose={jest.fn()} />);
    
    const openedDrawer = screen.getByRole('navigation');
    expect(openedDrawer).toBeInTheDocument();
    expect(openedDrawer).toHaveAttribute('aria-expanded', 'true');
  });

  test('TC-U-004: should call onClick when menu item is clicked', async () => {
    const menuItems = [
      { label: 'ダッシュボード', path: '/dashboard' },
      { label: 'プロフィール', path: '/profile' },
    ];
    
    render(<SideDrawer isOpen={true} onClose={jest.fn()} menuItems={menuItems} />);
    
    const profileItem = screen.getByText('プロフィール');
    fireEvent.click(profileItem);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/profile');
    });
  });

  test('TC-U-005: should close drawer when Escape key is pressed', async () => {
    const onClose = jest.fn();
    render(<SideDrawer isOpen={true} onClose={onClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('TC-U-006: should navigate focus with Tab key', async () => {
    const menuItems = [
      { label: 'ダッシュボード', path: '/dashboard' },
      { label: 'プロフィール', path: '/profile' },
      { label: 'セッティング', path: '/settings' },
    ];
    
    render(<SideDrawer isOpen={true} onClose={jest.fn()} menuItems={menuItems} />);
    
    const firstItem = screen.getByText('ダッシュボード');
    firstItem.focus();
    
    fireEvent.keyDown(firstItem, { key: 'Tab', code: 'Tab' });
    
    // Focus should move to next item
    await waitFor(() => {
      const profileItem = screen.getByText('プロフィール');
      expect(profileItem).toHaveFocus();
    });
  });

  test('TC-U-007: should move focus to first menu item when drawer opens', async () => {
    const menuItems = [
      { label: 'ダッシュボード', path: '/dashboard' },
      { label: 'プロフィール', path: '/profile' },
    ];
    
    const { rerender } = render(<SideDrawer isOpen={false} onClose={jest.fn()} menuItems={menuItems} />);
    
    rerender(<SideDrawer isOpen={true} onClose={jest.fn()} menuItems={menuItems} />);
    
    await waitFor(() => {
      const firstItem = screen.getByText('ダッシュボード');
      expect(firstItem).toHaveFocus();
    });
  });

  test('TC-U-008: should return focus to trigger button when drawer closes', async () => {
    const onClose = jest.fn();
    const triggerButton = document.createElement('button');
    triggerButton.setAttribute('data-testid', 'trigger-button');
    document.body.appendChild(triggerButton);
    
    const { rerender } = render(
      <SideDrawer 
        isOpen={true} 
        onClose={onClose} 
        triggerButtonRef={{ current: triggerButton } as React.RefObject<HTMLButtonElement>}
      />
    );
    
    triggerButton.focus();
    const drawer = screen.getByRole('navigation');
    drawer.focus();
    
    rerender(
      <SideDrawer 
        isOpen={false} 
        onClose={onClose} 
        triggerButtonRef={{ current: triggerButton } as React.RefObject<HTMLButtonElement>}
      />
    );
    
    await waitFor(() => {
      expect(triggerButton).toHaveFocus();
    });
    
    document.body.removeChild(triggerButton);
  });

  test('TC-U-009: should render as overlay on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query !== '(min-width: 1024px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    
    const { container } = render(<SideDrawer isOpen={true} onClose={jest.fn()} />);
    
    const drawer = container.querySelector('[role="navigation"]');
    expect(drawer).toHaveClass('fixed'); // Overlay should be fixed positioned
  });

  test('TC-U-010: should render as sidebar on desktop', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(min-width: 1024px)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    
    const { container } = render(<SideDrawer isOpen={true} onClose={jest.fn()} />);
    
    const drawer = container.querySelector('[role="navigation"]');
    expect(drawer).toHaveClass('relative'); // Sidebar should be relative positioned
  });

  test('TC-U-011: should close drawer when overlay background is clicked', async () => {
    const onClose = jest.fn();
    const { container } = render(<SideDrawer isOpen={true} onClose={onClose} />);
    
    const overlay = container.querySelector('[data-testid="drawer-overlay"]');
    if (overlay) {
      fireEvent.click(overlay);
      
      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    }
  });

  test('TC-U-012: should have proper ARIA attributes', () => {
    render(<SideDrawer isOpen={true} onClose={jest.fn()} />);
    
    const drawer = screen.getByRole('navigation');
    expect(drawer).toHaveAttribute('aria-label', expect.stringContaining('メニュー'));
    expect(drawer).toHaveAttribute('aria-expanded', 'true');
    
    const closeButton = screen.getByRole('button', { name: /閉じる|close/i });
    expect(closeButton).toHaveAttribute('aria-label', expect.stringContaining('閉じる'));
  });
});
