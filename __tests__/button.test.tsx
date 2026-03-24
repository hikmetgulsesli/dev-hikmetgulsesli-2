import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders primary variant correctly', () => {
    render(<Button variant="primary">Gönder</Button>);
    const button = screen.getByRole('button', { name: 'Gönder' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-primary');
  });

  it('renders secondary variant correctly', () => {
    render(<Button variant="secondary">İptal</Button>);
    const button = screen.getByRole('button', { name: 'İptal' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('border-outline');
  });

  it('renders ghost variant correctly', () => {
    render(<Button variant="ghost">Detaylar</Button>);
    const button = screen.getByRole('button', { name: 'Detaylar' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('text-on-surface-variant');
  });

  it('renders destructive variant correctly', () => {
    render(<Button variant="destructive">Sil</Button>);
    const button = screen.getByRole('button', { name: 'Sil' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-error');
  });

  it('renders link variant correctly', () => {
    render(<Button variant="link">Daha Fazla</Button>);
    const button = screen.getByRole('button', { name: 'Daha Fazla' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('underline');
  });

  it('renders sm size correctly', () => {
    render(<Button size="sm">Küçük</Button>);
    const button = screen.getByRole('button', { name: 'Küçük' });
    expect(button.className).toContain('px-4 py-2 text-sm');
  });

  it('renders md size correctly', () => {
    render(<Button size="md">Orta</Button>);
    const button = screen.getByRole('button', { name: 'Orta' });
    expect(button.className).toContain('px-6 py-3 text-base');
  });

  it('renders lg size correctly', () => {
    render(<Button size="lg">Büyük</Button>);
    const button = screen.getByRole('button', { name: 'Büyük' });
    expect(button.className).toContain('px-8 py-4 text-lg');
  });

  it('renders icon size correctly', () => {
    render(<Button size="icon" aria-label="Kapat">X</Button>);
    const button = screen.getByLabelText('Kapat');
    expect(button.className).toContain('p-3');
  });

  it('shows loading state with spinner', () => {
    render(<Button loading>Yükleniyor</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.className).toContain('opacity-50');
    const svg = button.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('disables interaction when disabled', () => {
    render(<Button disabled>Devre Dışı</Button>);
    const button = screen.getByRole('button', { name: 'Devre Dışı' });
    expect(button).toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Tıkla</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Tıkla' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when loading', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} loading>Tıkla</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders leftIcon correctly', () => {
    render(<Button leftIcon={<span data-testid="left-icon">+</span>}>Ekle</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders rightIcon correctly', () => {
    render(<Button rightIcon={<span data-testid="right-icon">→</span>}>Git</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
