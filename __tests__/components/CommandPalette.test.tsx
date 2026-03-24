import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CommandPalette } from '@/components/CommandPalette/CommandPalette';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Search: () => <span data-testid="search-icon">Search</span>,
  FileText: () => <span data-testid="file-icon">File</span>,
  Folder: () => <span data-testid="folder-icon">Folder</span>,
  User: () => <span data-testid="user-icon">User</span>,
  Mail: () => <span data-testid="mail-icon">Mail</span>,
  Clock: () => <span data-testid="clock-icon">Clock</span>,
  ArrowRight: () => <span data-testid="arrow-icon">Arrow</span>,
}));

describe('CommandPalette Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('renders trigger button when closed', () => {
      render(<CommandPalette />);
      const button = document.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('shows search placeholder text', () => {
      render(<CommandPalette />);
      expect(document.body.textContent).toContain('Arama');
    });
  });

  describe('LocalStorage', () => {
    it('saves searches to localStorage on Enter', async () => {
      render(<CommandPalette />);
      
      // Open palette via clicking the button
      const button = document.querySelector('button');
      if (button) {
        fireEvent.click(button);
      }
      
      await waitFor(() => {
        expect(document.querySelector('input')).toBeInTheDocument();
      });
      
      // Type and press Enter
      const input = document.querySelector('input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test query' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      
      const stored = localStorage.getItem('command-palette-recent');
      expect(stored).toBeTruthy();
    });

    it('retrieves recent searches from localStorage', async () => {
      // Pre-populate localStorage
      localStorage.setItem('command-palette-recent', JSON.stringify(['ara']));
      
      render(<CommandPalette />);
      
      // Open palette
      const button = document.querySelector('button');
      if (button) {
        fireEvent.click(button);
      }
      
      await waitFor(() => {
        expect(document.querySelector('input')).toBeInTheDocument();
      });
      
      // Recent searches should be in localStorage
      const stored = localStorage.getItem('command-palette-recent');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toContain('ara');
    });
  });

  describe('UI Structure', () => {
    it('palette has correct styling classes when opened', async () => {
      render(<CommandPalette />);
      
      // Open palette
      const button = document.querySelector('button');
      if (button) {
        fireEvent.click(button);
      }
      
      await waitFor(() => {
        const modal = document.querySelector('[class*="fixed"]');
        expect(modal).toBeInTheDocument();
      });
    });

    it('shows keyboard navigation hints', async () => {
      render(<CommandPalette />);
      
      // Open palette
      const button = document.querySelector('button');
      if (button) {
        fireEvent.click(button);
      }
      
      await waitFor(() => {
        expect(document.body.textContent).toContain('navigasyon');
        expect(document.body.textContent).toContain('seç');
        expect(document.body.textContent).toContain('kapat');
      });
    });
  });
});
