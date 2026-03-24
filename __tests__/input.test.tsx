import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('renders text input correctly', () => {
    render(<Input type="text" placeholder="Adınızı girin" />);
    const input = screen.getByPlaceholderText('Adınızı girin');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders email input correctly', () => {
    render(<Input type="email" placeholder="ornek@email.com" />);
    const input = screen.getByPlaceholderText('ornek@email.com');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders password input correctly', () => {
    render(<Input type="password" placeholder="Şifre" />);
    const input = screen.getByPlaceholderText('Şifre');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('shows error state with border-error', () => {
    render(<Input error errorMessage="Bu alan zorunludur" placeholder="Hata" />);
    const input = screen.getByPlaceholderText('Hata');
    expect(input.className).toContain('border-error');
  });

  it('shows error message when error prop is true', () => {
    render(<Input error errorMessage="Bu alan zorunludur" id="test-input" />);
    expect(screen.getByText('Bu alan zorunludur')).toBeInTheDocument();
  });

  it('renders leftIcon correctly', () => {
    render(
      <Input leftIcon={<span data-testid="search-icon">🔍</span>} placeholder="Ara" />
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('renders rightIcon correctly', () => {
    render(
      <Input rightIcon={<span data-testid="clear-icon">✕</span>} placeholder="Temizle" />
    );
    expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
  });

  it('renders sm size correctly', () => {
    render(<Input inputSize="sm" placeholder="Küçük" />);
    const input = screen.getByPlaceholderText('Küçük');
    expect(input.className).toContain('px-3 py-2 text-sm');
  });

  it('renders md size correctly', () => {
    render(<Input inputSize="md" placeholder="Orta" />);
    const input = screen.getByPlaceholderText('Orta');
    expect(input.className).toContain('px-4 py-3 text-base');
  });

  it('renders lg size correctly', () => {
    render(<Input inputSize="lg" placeholder="Büyük" />);
    const input = screen.getByPlaceholderText('Büyük');
    expect(input.className).toContain('px-5 py-4 text-lg');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Devre dışı" />);
    const input = screen.getByPlaceholderText('Devre dışı');
    expect(input).toBeDisabled();
  });

  it('focus state shows border-primary and ring-primary/20', () => {
    render(<Input placeholder="Odaklan" />);
    const input = screen.getByPlaceholderText('Odaklan');
    expect(input.className).toContain('focus:border-primary');
    expect(input.className).toContain('focus:ring-primary/20');
  });
});
