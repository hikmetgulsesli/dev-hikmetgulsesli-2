'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, FileText, Folder, User, Mail, Clock, ArrowRight } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  action?: () => void;
  group: string;
  keywords?: string[];
}

const commandGroups = [
  {
    label: '// quick_links',
    items: [
      { id: 'home', label: 'Ana Sayfa', href: '/', group: 'quick_links', icon: <FileText size={16} /> },
      { id: 'projects', label: 'Projeler', href: '/projects', group: 'quick_links', icon: <Folder size={16} /> },
      { id: 'blog', label: 'Blog', href: '/blog', group: 'quick_links', icon: <FileText size={16} /> },
      { id: 'about', label: 'Hakkında', href: '/about', group: 'quick_links', icon: <User size={16} /> },
      { id: 'contact', label: 'İletişim', href: '/contact', group: 'quick_links', icon: <Mail size={16} /> },
    ],
  },
  {
    label: '// recent',
    items: [],
  },
];

const STORAGE_KEY = 'command-palette-recent';
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addRecentSearch(query: string): void {
  if (typeof window === 'undefined') return;
  try {
    const recent = getRecentSearches().filter((q) => q !== query);
    recent.unshift(query);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // Ignore storage errors
  }
}

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get recent searches
  const recentSearches = isOpen ? getRecentSearches() : [];

  // Filter items based on query
  const filteredGroups = commandGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      if (!query) return true;
      const lowerQuery = query.toLowerCase();
      return (
        item.label.toLowerCase().includes(lowerQuery) ||
        item.keywords?.some((k) => k.toLowerCase().includes(lowerQuery))
      );
    }),
  }));

  // Flatten for navigation
  const flatItems = filteredGroups.flatMap((g) => g.items);

  // Open/close handlers
  const open = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, open, close]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % Math.max(1, flatItems.length));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + flatItems.length) % Math.max(1, flatItems.length));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatItems[selectedIndex]) {
            if (query) {
              addRecentSearch(query);
            }
            if (flatItems[selectedIndex].href) {
              window.location.href = flatItems[selectedIndex].href;
              close();
            } else if (flatItems[selectedIndex].action) {
              flatItems[selectedIndex].action!();
              close();
            }
          } else if (query) {
            // If no item selected but there's a query, save it
            addRecentSearch(query);
            close();
          }
          break;
      }
    },
    [isOpen, flatItems, selectedIndex, query, close]
  );

  // Select item on click
  const handleSelect = useCallback(
    (item: CommandItem) => {
      if (query) {
        addRecentSearch(query);
      }
      if (item.href) {
        window.location.href = item.href;
        close();
      } else if (item.action) {
        item.action();
        close();
      }
    },
    [query, close]
  );

  return {
    isOpen,
    query,
    setQuery,
    selectedIndex,
    setSelectedIndex,
    filteredGroups,
    recentSearches,
    flatItems,
    inputRef,
    open,
    close,
    handleKeyNavigation,
    handleSelect,
  };
}

export function CommandPalette() {
  const {
    isOpen,
    query,
    setQuery,
    selectedIndex,
    setSelectedIndex,
    filteredGroups,
    recentSearches,
    flatItems,
    inputRef,
    open,
    close,
    handleKeyNavigation,
    handleSelect,
  } = useCommandPalette();

  if (!isOpen) {
    return (
      <button
        onClick={open}
        className="flex items-center gap-2 px-4 py-2 border border-emerald-500/20 rounded-lg text-sm text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400 transition-all duration-200"
        aria-label="Komut paletini aç"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Arama...</span>
        <kbd className="hidden sm:inline text-xs bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl mx-4 bg-slate-900 border border-emerald-500/20 rounded-xl shadow-2xl shadow-emerald-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <Search size={20} className="text-slate-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyNavigation}
            placeholder="Ara..."
            className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 outline-none text-base"
          />
          <kbd className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filteredGroups.map((group) => {
            if (group.items.length === 0) return null;
            return (
              <div key={group.label}>
                {/* Group Label */}
                <div className="px-4 py-2 text-xs font-mono text-slate-500">
                  {group.label}
                </div>

                {/* Group Items */}
                {group.items.map((item, index) => {
                  const globalIndex = flatItems.findIndex((f) => f.id === item.id);
                  const isSelected = globalIndex === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100 ${
                        isSelected
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {item.icon && (
                        <span className={isSelected ? 'text-emerald-400' : 'text-slate-500'}>
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1 font-medium">{item.label}</span>
                      {isSelected && (
                        <ArrowRight size={14} className="text-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* Empty State */}
          {flatItems.length === 0 && (
            <div className="px-4 py-8 text-center text-slate-500">
              <Search size={24} className="mx-auto mb-2 opacity-50" />
              <p>Sonuç bulunamadı</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-slate-700 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">↑↓</kbd>
            navigasyon
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">↵</kbd>
            seç
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">esc</kbd>
            kapat
          </span>
        </div>
      </div>
    </div>
  );
}
