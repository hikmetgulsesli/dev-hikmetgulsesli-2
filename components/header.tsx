"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "PROJECTS" },
  { href: "/stack", label: "STACK" },
  { href: "/archive", label: "ARCHIVE" },
  { href: "/contact", label: "CONTACT" },
];

const socialLinks = [
  {
    href: "https://github.com/hikmetgulsesli",
    label: "GITHUB",
    icon: "terminal",
  },
  {
    href: "https://linkedin.com/in/hikmetgulsesli",
    label: "LINKEDIN",
    icon: "share",
  },
  {
    href: "https://x.com/hikmetgulsesli",
    label: "X_SOCIAL",
    icon: "alternate_email",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/10">
        <nav className="flex justify-between items-center px-8 h-16 w-full max-w-none">
          <Link
            href="/"
            className="text-xl font-bold text-emerald-500 tracking-widest font-headline hover:text-emerald-400 transition-colors"
          >
            KINETIC_CONSOLE
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline uppercase tracking-tighter font-bold pb-1 relative group ${
                  isActive(link.href)
                    ? "text-primary border-b-2 border-primary"
                    : "text-slate-400 hover:text-emerald-300"
                }`}
              >
                {link.label}
                {!isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full group-hover:animate-underline-grow transition-all" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-label text-sm text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {link.icon}
                </span>
                <span className="sr-only">{link.label}</span>
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-slate-400 hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col h-full pt-16">
              <div className="flex justify-end px-8 py-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center items-center gap-8 px-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-headline text-2xl uppercase tracking-tighter font-bold pb-1 ${
                      isActive(link.href)
                        ? "text-primary border-b-2 border-primary"
                        : "text-slate-400 hover:text-emerald-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex justify-center gap-6 pb-12">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-label text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
