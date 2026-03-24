"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const navLinks = [
  { label: "PROJECTS", href: "/projects" },
  { label: "STACK", href: "/stack" },
  { label: "ARCHIVE", href: "/archive" },
  { label: "CONTACT", href: "/contact" },
];

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 w-full z-50 transition-all duration-300
          ${isScrolled
            ? "bg-slate-950/90 backdrop-blur-xl border-b border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
            : "bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/10"
          }
        `}
      >
        <nav className="flex justify-between items-center px-8 h-16 w-full max-w-none">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-emerald-500 tracking-widest font-headline hover:text-emerald-400 transition-colors"
          >
            KINETIC_CONSOLE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`
                  relative font-headline uppercase tracking-tighter font-bold text-sm
                  transition-colors duration-200 pb-1
                  ${isActive(link.href)
                    ? "text-emerald-400 border-b-2 border-emerald-500"
                    : "text-slate-400 hover:text-emerald-300"
                  }
                `}
              >
                <span className="relative inline-block">
                  {link.label}
                  {!isActive(link.href) && (
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-emerald-400 transition-all duration-200 hover:w-full" />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop Social Links */}
          <div className="hidden md:flex gap-4 items-center">
            <a
              href="https://github.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com/in/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://twitter.com/hikmetgulsesli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <TwitterIcon size={18} />
            </a>
            <a
              href="mailto:hikmet@example.com"
              aria-label="Email"
              className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <MailIcon size={18} />
            </a>
            <button
              className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg font-headline uppercase tracking-tighter font-bold text-sm hover:bg-primary/20 transition-all scale-95 active:opacity-80 ml-2"
              aria-label="Download CV"
            >
              <span className="flex items-center gap-2">
                <Download size={14} />
                DOWNLOAD_CV
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-emerald-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-surface/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-8">
              {/* Close Button */}
              <div className="absolute top-4 right-8">
                <button
                  className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={link.href}
                      className={`
                        font-headline uppercase tracking-tighter font-bold text-2xl
                        transition-colors duration-200
                        ${isActive(link.href)
                          ? "text-emerald-400"
                          : "text-slate-300 hover:text-emerald-300"
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Social Links */}
              <div className="flex gap-6 mt-auto mb-12">
                <a
                  href="https://github.com/hikmetgulsesli"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 text-slate-400 hover:text-emerald-400 transition-colors bg-surface-container-low rounded-full"
                >
                  <GithubIcon size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/hikmetgulsesli"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 text-slate-400 hover:text-emerald-400 transition-colors bg-surface-container-low rounded-full"
                >
                  <LinkedinIcon size={22} />
                </a>
                <a
                  href="https://twitter.com/hikmetgulsesli"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-3 text-slate-400 hover:text-emerald-400 transition-colors bg-surface-container-low rounded-full"
                >
                  <TwitterIcon size={22} />
                </a>
                <a
                  href="mailto:hikmet@example.com"
                  aria-label="Email"
                  className="p-3 text-slate-400 hover:text-emerald-400 transition-colors bg-surface-container-low rounded-full"
                >
                  <MailIcon size={22} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
