import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

describe('Card Component', () => {
  it('renders default variant correctly', () => {
    render(<Card variant="default">Kart İçeriği</Card>);
    const card = screen.getByText('Kart İçeriği');
    expect(card).toBeInTheDocument();
    expect(card.className).toContain('bg-surface-container');
  });

  it('renders interactive variant correctly', () => {
    render(<Card variant="interactive">Etkileşimli Kart</Card>);
    const card = screen.getByText('Etkileşimli Kart');
    expect(card).toBeInTheDocument();
    expect(card.className).toContain('hover:border-primary');
    expect(card.className).toContain('hover:-translate-y-0.5');
  });

  it('renders featured variant correctly', () => {
    render(<Card variant="featured">Öne Çıkan Kart</Card>);
    const card = screen.getByText('Öne Çıkan Kart');
    expect(card).toBeInTheDocument();
    expect(card.className).toContain('border-2 border-primary');
  });

  it('renders with different padding options', () => {
    const { rerender } = render(<Card padding="none">Pad none</Card>);
    // padding="none" means no padding class applied
    const noneCard = screen.getByText('Pad none');
    expect(noneCard.className).not.toContain('p-4');
    expect(noneCard.className).not.toContain('p-6');
    expect(noneCard.className).not.toContain('p-8');

    rerender(<Card padding="sm">Pad sm</Card>);
    expect(screen.getByText('Pad sm').className).toContain('p-4');

    rerender(<Card padding="md">Pad md</Card>);
    expect(screen.getByText('Pad md').className).toContain('p-6');

    rerender(<Card padding="lg">Pad lg</Card>);
    expect(screen.getByText('Pad lg').className).toContain('p-8');
  });

  it('CardHeader renders correctly', () => {
    render(<CardHeader>Başlık Alanı</CardHeader>);
    expect(screen.getByText('Başlık Alanı')).toBeInTheDocument();
  });

  it('CardTitle renders correctly', () => {
    render(<CardTitle>Kart Başlığı</CardTitle>);
    const title = screen.getByText('Kart Başlığı');
    expect(title).toBeInTheDocument();
    expect(title.className).toContain('font-headline');
  });

  it('CardDescription renders correctly', () => {
    render(<CardDescription>Açıklama metni burada</CardDescription>);
    const desc = screen.getByText('Açıklama metni burada');
    expect(desc).toBeInTheDocument();
    expect(desc.className).toContain('text-on-surface-variant');
  });

  it('CardContent renders correctly', () => {
    render(<CardContent>İçerik</CardContent>);
    expect(screen.getByText('İçerik')).toBeInTheDocument();
  });

  it('CardFooter renders correctly', () => {
    render(<CardFooter>Alt Bilgi</CardFooter>);
    expect(screen.getByText('Alt Bilgi')).toBeInTheDocument();
  });

  it('applies hover prop correctly', () => {
    render(<Card hover>Hover Kart</Card>);
    const card = screen.getByText('Hover Kart');
    expect(card.className).toContain('hover:border-primary');
    expect(card.className).toContain('hover:-translate-y-0.5');
  });
});
