const quickLinks = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Projeler', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Hakkında', href: '/about' },
  { label: 'İletişim', href: '/contact' },
];

const socialLinks = [
  { 
    label: 'GitHub', 
    href: 'https://github.com/hikmetgulsesli',
  },
  { 
    label: 'LinkedIn', 
    href: 'https://linkedin.com/in/hikmetgulsesli',
  },
  { 
    label: 'Twitter', 
    href: 'https://twitter.com/hikmetgulsesli',
  },
  { 
    label: 'Email', 
    href: 'mailto:hikmet@hikmetgulsesli.com',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-emerald-500/10 w-full py-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-4">
          <div className="text-emerald-500 font-bold font-headline">
            HIKMET GÜLEŞLİ
          </div>
        </div>

        {/* Quick Links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label text-xs tracking-mono text-slate-400 hover:text-emerald-400 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-label text-xs tracking-mono text-slate-500 hover:text-emerald-400 transition-colors duration-200"
              aria-label={social.label}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center">
        <div className="font-label text-xs tracking-mono text-slate-500">
          © {currentYear} HIKMET GÜLEŞLİ // SYSTEM_READY
        </div>
      </div>
    </footer>
  );
}
