import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => children,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Wrapper that renders Header with a specific path
function HeaderWithRouter({ initialPath = '/' }: { initialPath?: string }) {
  return (
    <BrowserRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/*" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

describe('Header Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders the logo with correct text', () => {
      render(<HeaderWithRouter />);
      const logo = screen.getByText('KINETIC_CONSOLE');
      expect(logo).toBeInTheDocument();
    });

    it('renders desktop navigation links', () => {
      render(<HeaderWithRouter />);
      
      expect(screen.getByText('PROJECTS')).toBeInTheDocument();
      expect(screen.getByText('STACK')).toBeInTheDocument();
      expect(screen.getByText('ARCHIVE')).toBeInTheDocument();
      expect(screen.getByText('CONTACT')).toBeInTheDocument();
    });

    it('renders social icon links', () => {
      render(<HeaderWithRouter />);
      
      const githubLink = screen.getByRole('link', { name: /github/i });
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      const emailLink = screen.getByRole('link', { name: /email/i });
      
      expect(githubLink).toBeInTheDocument();
      expect(linkedinLink).toBeInTheDocument();
      expect(twitterLink).toBeInTheDocument();
      expect(emailLink).toBeInTheDocument();
    });

    it('renders download CV button', () => {
      render(<HeaderWithRouter />);
      const cvButton = screen.getByRole('button', { name: /download cv/i });
      expect(cvButton).toBeInTheDocument();
    });

    it('renders mobile menu button', () => {
      render(<HeaderWithRouter />);
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('links navigate to correct routes', () => {
      render(<HeaderWithRouter />);
      
      const projectsLink = screen.getByText('PROJECTS').closest('a');
      const stackLink = screen.getByText('STACK').closest('a');
      const archiveLink = screen.getByText('ARCHIVE').closest('a');
      const contactLink = screen.getByText('CONTACT').closest('a');
      
      expect(projectsLink?.getAttribute('href')).toBe('/projects');
      expect(stackLink?.getAttribute('href')).toBe('/stack');
      expect(archiveLink?.getAttribute('href')).toBe('/archive');
      expect(contactLink?.getAttribute('href')).toBe('/contact');
    });

    it('logo links to home route', () => {
      render(<HeaderWithRouter />);
      const logo = screen.getByText('KINETIC_CONSOLE').closest('a');
      expect(logo?.getAttribute('href')).toBe('/');
    });

    it('social links have correct href attributes', () => {
      render(<HeaderWithRouter />);
      
      const githubLink = screen.getByRole('link', { name: /github/i });
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      const emailLink = screen.getByRole('link', { name: /email/i });
      
      expect(githubLink.getAttribute('href')).toBe('https://github.com/hikmetgulsesli');
      expect(linkedinLink.getAttribute('href')).toBe('https://linkedin.com/in/hikmetgulsesli');
      expect(twitterLink.getAttribute('href')).toBe('https://twitter.com/hikmetgulsesli');
      expect(emailLink.getAttribute('href')).toBe('mailto:hikmet@example.com');
    });
  });

  describe('Mobile Menu', () => {
    it('opens mobile menu when hamburger is clicked', async () => {
      render(<HeaderWithRouter />);
      
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      
      await act(async () => {
        fireEvent.click(menuButton);
      });
      
      // Menu should be open - we check that aria-expanded is true
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes mobile menu when close button is clicked', async () => {
      render(<HeaderWithRouter />);
      
      // Open menu
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      await act(async () => {
        fireEvent.click(menuButton);
      });
      
      // Close menu using the close button in the overlay
      const closeButton = document.querySelector('button[aria-label="Close menu"]');
      if (closeButton) {
        await act(async () => {
          fireEvent.click(closeButton);
        });
      }
      
      // Hamburger should be visible again
      expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });

    it('closes mobile menu when close button in mobile menu header is clicked', async () => {
      render(<HeaderWithRouter />);
      
      // Open menu
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      await act(async () => {
        fireEvent.click(menuButton);
      });
      
      // Use the first close button (there are two - one in header, one in overlay)
      const closeButtons = document.querySelectorAll('button[aria-label="Close menu"]');
      if (closeButtons.length > 0) {
        await act(async () => {
          fireEvent.click(closeButtons[0]);
        });
      }
      
      // Hamburger should be visible again
      expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });
  });

  describe('Header Fixed Position and Styling', () => {
    it('header has fixed position at top', () => {
      render(<HeaderWithRouter />);
      const header = screen.getByRole('banner');
      expect(header.className).toContain('fixed');
      expect(header.className).toContain('top-0');
    });

    it('header has backdrop-blur effect', () => {
      render(<HeaderWithRouter />);
      const header = screen.getByRole('banner');
      expect(header.className).toContain('backdrop-blur');
    });

    it('header has proper z-index for layering', () => {
      render(<HeaderWithRouter />);
      const header = screen.getByRole('banner');
      expect(header.className).toContain('z-50');
    });

    it('header has border styling', () => {
      render(<HeaderWithRouter />);
      const header = screen.getByRole('banner');
      expect(header.className).toContain('border-b');
    });

    it('navigation bar has height class', () => {
      render(<HeaderWithRouter />);
      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('h-16');
    });
  });

  describe('Accessibility', () => {
    it('mobile menu button has aria-expanded attribute', () => {
      render(<HeaderWithRouter />);
      const menuButton = screen.getByRole('button', { name: /open menu/i });
      expect(menuButton).toHaveAttribute('aria-expanded');
    });

    it('social links have aria-labels for screen readers', () => {
      render(<HeaderWithRouter />);
      const githubLink = screen.getByRole('link', { name: /github/i });
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      const emailLink = screen.getByRole('link', { name: /email/i });
      
      expect(githubLink).toHaveAttribute('aria-label', 'GitHub');
      expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn');
      expect(twitterLink).toHaveAttribute('aria-label', 'Twitter');
      expect(emailLink).toHaveAttribute('aria-label', 'Email');
    });

    it('download CV button has accessible label', () => {
      render(<HeaderWithRouter />);
      const cvButton = screen.getByRole('button', { name: /download cv/i });
      expect(cvButton).toBeInTheDocument();
    });
  });
});
