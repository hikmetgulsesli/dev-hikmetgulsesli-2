import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('Footer Component', () => {
  describe('Structure', () => {
    it('Footer component module can be imported', async () => {
      const { Footer } = await import('@/components/layout/Footer');
      expect(Footer).toBeDefined();
    });

    it('renders footer element with correct classes', async () => {
      const { render } = await import('@testing-library/react');
      const { Footer } = await import('@/components/layout/Footer');
      
      const { container } = render(Footer());
      const footer = container.querySelector('footer');
      
      expect(footer).toBeInTheDocument();
      expect(footer?.className).toContain('bg-slate-950');
      expect(footer?.className).toContain('border-emerald-500');
      expect(footer?.className).toContain('py-6');
      expect(footer?.className).toContain('mt-auto');
    });

    it('renders brand name HIKMET GÜLEŞLİ', async () => {
      const { render } = await import('@testing-library/react');
      const { Footer } = await import('@/components/layout/Footer');
      
      const { container } = render(Footer());
      const html = container.innerHTML;
      
      expect(html).toContain('HIKMET');
      expect(html).toContain('GÜLEŞLİ');
    });

    it('renders SYSTEM_READY indicator', async () => {
      const { render } = await import('@testing-library/react');
      const { Footer } = await import('@/components/layout/Footer');
      
      const { container } = render(Footer());
      const html = container.innerHTML;
      
      expect(html).toContain('SYSTEM_READY');
    });

    it('renders copyright with current year', async () => {
      const { render } = await import('@testing-library/react');
      const { Footer } = await import('@/components/layout/Footer');
      
      const { container } = render(Footer());
      const html = container.innerHTML;
      const year = new Date().getFullYear();
      
      expect(html).toContain(String(year));
      expect(html).toContain('©');
    });
  });

  describe('Navigation Links', () => {
    it('renders all quick link labels', async () => {
      const { render } = await import('@testing-library/react');
      const { Footer } = await import('@/components/layout/Footer');
      
      const { container } = render(Footer());
      const html = container.innerHTML;
      
      expect(html).toContain('Ana Sayfa');
      expect(html).toContain('Projeler');
      expect(html).toContain('Blog');
      expect(html).toContain('Hakkında');
      expect(html).toContain('İletişim');
    });

    it('quick links have correct hrefs', async () => {
      const { render } = await import('@testing-library/react');
      const { Footer } = await import('@/components/layout/Footer');
      
      const { container } = render(Footer());
      const links = container.querySelectorAll('a');
      
      const hrefs = Array.from(links).map(a => a.getAttribute('href'));
      
      expect(hrefs).toContain('/');
      expect(hrefs).toContain('/projects');
      expect(hrefs).toContain('/blog');
      expect(hrefs).toContain('/about');
      expect(hrefs).toContain('/contact');
    });

    it('social links have correct URLs', async () => {
      const { render } = await import('@testing-library/react');
      const { Footer } = await import('@/components/layout/Footer');
      
      const { container } = render(Footer());
      const html = container.innerHTML;
      
      expect(html).toContain('github.com/hikmetgulsesli');
      expect(html).toContain('linkedin.com/in/hikmetgulsesli');
      expect(html).toContain('twitter.com/hikmetgulsesli');
      expect(html).toContain('mailto:hikmet@hikmetgulsesli.com');
    });
  });
});
