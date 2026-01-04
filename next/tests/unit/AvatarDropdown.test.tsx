import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import AvatarDropdown from '@/components/AvatarDropdown';
import { logout } from '@/utils/auth';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock auth utils
jest.mock('@/utils/auth', () => ({
  logout: jest.fn(),
}));

describe('AvatarDropdown', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  test('should render avatar icon', () => {
    render(<AvatarDropdown />);

    const avatarButton = screen.getByRole('button', { name: /アバター|avatar|ユーザー/i });
    expect(avatarButton).toBeInTheDocument();
  });

  test('should open dropdown menu when avatar icon is clicked', async () => {
    render(<AvatarDropdown />);

    const avatarButton = screen.getByRole('button', { name: /アバター|avatar|ユーザー/i });
    fireEvent.click(avatarButton);

    await waitFor(() => {
      expect(screen.getByText('プロフィール')).toBeInTheDocument();
      expect(screen.getByText('セッティング')).toBeInTheDocument();
      expect(screen.getByText('ログアウト')).toBeInTheDocument();
    });
  });

  test('should close dropdown menu when avatar icon is clicked again', async () => {
    render(<AvatarDropdown />);

    const avatarButton = screen.getByRole('button', { name: /アバター|avatar|ユーザー/i });
    
    // Open menu
    fireEvent.click(avatarButton);
    await waitFor(() => {
      expect(screen.getByText('プロフィール')).toBeInTheDocument();
    });

    // Close menu
    fireEvent.click(avatarButton);
    await waitFor(() => {
      expect(screen.queryByText('プロフィール')).not.toBeInTheDocument();
    });
  });

  test('should close dropdown menu when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <AvatarDropdown />
      </div>
    );

    const avatarButton = screen.getByRole('button', { name: /アバター|avatar|ユーザー/i });
    fireEvent.click(avatarButton);

    await waitFor(() => {
      expect(screen.getByText('プロフィール')).toBeInTheDocument();
    });

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    await waitFor(() => {
      expect(screen.queryByText('プロフィール')).not.toBeInTheDocument();
    });
  });

  test('should navigate to profile page when profile menu item is clicked', async () => {
    render(<AvatarDropdown />);

    const avatarButton = screen.getByRole('button', { name: /アバター|avatar|ユーザー/i });
    fireEvent.click(avatarButton);

    await waitFor(() => {
      expect(screen.getByText('プロフィール')).toBeInTheDocument();
    });

    const profileButton = screen.getByText('プロフィール');
    fireEvent.click(profileButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/profile');
    });
  });

  test('should navigate to settings page when settings menu item is clicked', async () => {
    render(<AvatarDropdown />);

    const avatarButton = screen.getByRole('button', { name: /アバター|avatar|ユーザー/i });
    fireEvent.click(avatarButton);

    await waitFor(() => {
      expect(screen.getByText('セッティング')).toBeInTheDocument();
    });

    const settingsButton = screen.getByText('セッティング');
    fireEvent.click(settingsButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/settings');
    });
  });

  test('should call logout handler when logout menu item is clicked', async () => {
    render(<AvatarDropdown />);

    const avatarButton = screen.getByRole('button', { name: /アバター|avatar|ユーザー/i });
    fireEvent.click(avatarButton);

    await waitFor(() => {
      expect(screen.getByText('ログアウト')).toBeInTheDocument();
    });

    const logoutButton = screen.getByText('ログアウト');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(logout).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
});


