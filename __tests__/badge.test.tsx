import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders default variant correctly', () => {
    render(<Badge variant="default">Varsayılan</Badge>);
    const badge = screen.getByText('Varsayılan');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-surface-container');
  });

  it('renders primary variant correctly', () => {
    render(<Badge variant="primary">Birincil</Badge>);
    const badge = screen.getByText('Birincil');
    expect(badge.className).toContain('bg-primary/20');
    expect(badge.className).toContain('text-primary');
  });

  it('renders secondary variant correctly', () => {
    render(<Badge variant="secondary">İkincil</Badge>);
    const badge = screen.getByText('İkincil');
    expect(badge.className).toContain('bg-secondary/20');
    expect(badge.className).toContain('text-secondary');
  });

  it('renders accent variant correctly', () => {
    render(<Badge variant="accent">Acent</Badge>);
    const badge = screen.getByText('Acent');
    expect(badge.className).toContain('bg-secondary/20');
    expect(badge.className).toContain('text-secondary');
  });

  it('renders success variant correctly', () => {
    render(<Badge variant="success">Başarılı</Badge>);
    const badge = screen.getByText('Başarılı');
    expect(badge.className).toContain('bg-success/20');
    expect(badge.className).toContain('text-success');
  });

  it('renders warning variant correctly', () => {
    render(<Badge variant="warning">Uyarı</Badge>);
    const badge = screen.getByText('Uyarı');
    expect(badge.className).toContain('bg-warning/20');
    expect(badge.className).toContain('text-warning');
  });

  it('renders error variant correctly', () => {
    render(<Badge variant="error">Hata</Badge>);
    const badge = screen.getByText('Hata');
    expect(badge.className).toContain('bg-error/20');
    expect(badge.className).toContain('text-error');
  });

  it('renders sm size correctly', () => {
    render(<Badge size="sm">Küçük</Badge>);
    const badge = screen.getByText('Küçük');
    expect(badge.className).toContain('px-2 py-0.5 text-xs');
  });

  it('renders md size correctly', () => {
    render(<Badge size="md">Orta</Badge>);
    const badge = screen.getByText('Orta');
    expect(badge.className).toContain('px-3 py-1 text-sm');
  });

  it('renders removable badge with X button', () => {
    const handleRemove = vi.fn();
    render(<Badge removable onRemove={handleRemove}>Kaldırılabilir</Badge>);
    const badge = screen.getByText('Kaldırılabilir');
    expect(badge).toBeInTheDocument();
    const removeButton = screen.getByRole('button', { name: 'Kaldır' });
    expect(removeButton).toBeInTheDocument();
  });
});
