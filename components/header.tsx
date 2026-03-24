"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Icons for social links
function GithubIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function XIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const navLinks = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/stack", label: "STACK" },
  { href: "/archive", label: "ARCHIVE" },
  { href: "/contact", label: "CONTACT" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)] fixed top-0 w-full z-50">
        <nav className="flex justify-between items-center px-8 h-16 w-full max-w-none">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-emerald-500 tracking-widest font-headline cursor-pointer">
            KINETIC_CONSOLE
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-headline uppercase tracking-tighter font-bold text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Download CV Button */}
          <button className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] px-4 py-2 rounded-lg font-headline uppercase tracking-tighter font-bold text-sm hover:bg-[var(--primary)]/20 transition-all scale-95 active:opacity-80 cursor-pointer">
            DOWNLOAD_CV
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[var(--background)]/95 backdrop-blur-lg md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col items-center justify-center min-h-full gap-8 pt-16">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-headline text-2xl uppercase tracking-tighter font-bold text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-6 mt-8"
              >
                <Link href="https://github.com/hikmetgulsesli" className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors cursor-pointer">
                  <GithubIcon />
                </Link>
                <Link href="https://linkedin.com/in/hikmetgulsesli" className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors cursor-pointer">
                  <LinkedinIcon />
                </Link>
                <Link href="https://twitter.com/hikmetgulsesli" className="text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors cursor-pointer">
                  <XIcon />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
