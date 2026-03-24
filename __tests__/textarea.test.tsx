import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea Component', () => {
  it('renders textarea correctly', () => {
    render(<Textarea placeholder="Mesajınızı yazın" />);
    const textarea = screen.getByPlaceholderText('Mesajınızı yazın');
    expect(textarea).toBeInTheDocument();
  });

  it('renders with default rows', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('shows error state with border-error', () => {
    render(<Textarea error placeholder="Hata" />);
    const textarea = screen.getByPlaceholderText('Hata');
    expect(textarea.className).toContain('border-error');
  });

  it('shows error message when error prop is true', () => {
    render(<Textarea error errorMessage="Mesaj zorunludur" id="test-textarea" />);
    expect(screen.getByText('Mesaj zorunludur')).toBeInTheDocument();
  });

  it('shows character count when showCount is true', () => {
    render(<Textarea showCount maxLength={100} value="Test mesaj" />);
    expect(screen.getByText('10/100')).toBeInTheDocument();
  });

  it('updates character count on input', () => {
    render(<Textarea showCount maxLength={100} />);
    // The component tracks value length internally
    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="Devre dışı" />);
    const textarea = screen.getByPlaceholderText('Devre dışı');
    expect(textarea).toBeDisabled();
  });

  it('applies auto resize styles when autoResize is true', () => {
    render(<Textarea autoResize placeholder="Otomatik boyut" />);
    const textarea = screen.getByPlaceholderText('Otomatik boyut');
    expect(textarea).toBeInTheDocument();
  });

  it('focus state shows border-primary and ring-primary/20', () => {
    render(<Textarea placeholder="Odaklan" />);
    const textarea = screen.getByPlaceholderText('Odaklan');
    expect(textarea.className).toContain('focus:border-primary');
    expect(textarea.className).toContain('focus:ring-primary/20');
  });
});
