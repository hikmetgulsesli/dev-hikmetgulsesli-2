"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, ExternalLink, Terminal } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";
import { Project } from "@/types";

// Demo projects data
const demoProjects: Project[] = [
  {
    id: "1",
    slug: "vesta-dashboard",
    title: "Vesta Dashboard",
    description: "Modern veri görselleştirme araçlarıyla donatılmış, gerçek zamanlı analitik sunan kapsamlı admin paneli.",
    shortDescription: "Modern analytics dashboard with real-time data visualization",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    images: [],
    category: "web",
    techStack: [
      { id: "1", name: "React", category: "frontend" },
      { id: "2", name: "Tailwind", category: "frontend" },
      { id: "3", name: "Node.js", category: "backend" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/vesta",
    liveUrl: "https://vesta-dashboard.vercel.app",
    featured: true,
    publishedAt: "2024-06-15",
    status: "published",
    content: "",
    createdAt: "2024-01-01",
    updatedAt: "2024-06-15",
  },
  {
    id: "2",
    slug: "claw-agent-sdk",
    title: "Claw Agent SDK",
    description: "Otonom yapay zeka ajanları oluşturmak için tasarlanmış yüksek performanslı kütüphane ve framework.",
    shortDescription: "High-performance library for building autonomous AI agents",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    images: [],
    category: "open-source",
    techStack: [
      { id: "4", name: "TypeScript", category: "frontend" },
      { id: "5", name: "Python", category: "backend" },
      { id: "6", name: "LLM", category: "tool" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/claw-sdk",
    featured: true,
    publishedAt: "2024-05-20",
    status: "published",
    content: "",
    createdAt: "2024-01-01",
    updatedAt: "2024-05-20",
  },
  {
    id: "3",
    slug: "echo-mobile",
    title: "Echo Mobile",
    description: "Odaklanmayı ön planda tutan, uçtan uca şifreli ve minimal tasarımlı mesajlaşma uygulaması.",
    shortDescription: "End-to-end encrypted messaging with focus-first design",
    thumbnail: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    images: [],
    category: "mobile",
    techStack: [
      { id: "7", name: "React Native", category: "mobile" },
      { id: "8", name: "Firebase", category: "backend" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/echo",
    featured: false,
    publishedAt: "2024-04-10",
    status: "published",
    content: "",
    createdAt: "2024-01-01",
    updatedAt: "2024-04-10",
  },
  {
    id: "4",
    slug: "quantum-ui",
    title: "Quantum UI",
    description: "Modern web uygulamaları için geliştirilmiş, yüksek performanslı ve erişilebilir bileşen kütüphanesi.",
    shortDescription: "High-performance component library for modern web apps",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    images: [],
    category: "open-source",
    techStack: [
      { id: "9", name: "Next.js", category: "frontend" },
      { id: "10", name: "Framer Motion", category: "frontend" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/quantum-ui",
    liveUrl: "https://quantum-ui.dev",
    featured: true,
    publishedAt: "2024-03-25",
    status: "published",
    content: "",
    createdAt: "2024-01-01",
    updatedAt: "2024-03-25",
  },
  {
    id: "5",
    slug: "freightlog",
    title: "FreightLog",
    description: "Karmaşık lojistik ve tedarik zinciri süreçlerini uçtan uca yöneten kurumsal takip sistemi.",
    shortDescription: "Enterprise logistics and supply chain management system",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    images: [],
    category: "freelance",
    techStack: [
      { id: "11", name: "Vue.js", category: "frontend" },
      { id: "12", name: "Go", category: "backend" },
    ],
    liveUrl: "https://freightlog.example.com",
    client: "FreightLog Inc.",
    featured: false,
    publishedAt: "2024-02-14",
    status: "published",
    content: "",
    createdAt: "2024-01-01",
    updatedAt: "2024-02-14",
  },
  {
    id: "6",
    slug: "sentience-os",
    title: "Sentience OS",
    description: "Web tarayıcısı üzerinde çalışan, Rust ve WebAssembly ile güçlendirilmiş deneysel terminal masaüstü.",
    shortDescription: "Experimental terminal desktop powered by Rust and WebAssembly",
    thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
    images: [],
    category: "open-source",
    techStack: [
      { id: "13", name: "Rust", category: "tool" },
      { id: "14", name: "WebAssembly", category: "tool" },
    ],
    githubUrl: "https://github.com/hikmetgulsesli/sentience",
    featured: true,
    publishedAt: "2024-01-30",
    status: "published",
    content: "",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-30",
  },
];

type Category = "all" | "web" | "mobile" | "open-source" | "freelance";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "TÜMÜ" },
  { id: "web", label: "WEB" },
  { id: "mobile", label: "MOBİL" },
  { id: "open-source", label: "AÇIK KAYNAK" },
  { id: "freelance", label: "FREELANCE" },
];

// Project Card component
function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={fadeUpVariants}
      className="group relative flex flex-col bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
          {project.category === "open-source" ? "AÇIK KAYNAK" : project.category.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech.id}
              className="text-[10px] font-mono bg-secondary text-secondary-foreground px-2 py-0.5 rounded"
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              Source
            </Link>
          ) : (
            <span />
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Demo
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Empty state component
function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {searchQuery ? "Sonuç Bulunamadı" : "Proje Yok"}
      </h3>
      <p className="text-muted-foreground max-w-md">
        {searchQuery
          ? `"${searchQuery}" araması için eşleşen proje bulunamadı.`
          : "Henüz proje eklenmemiş."}
      </p>
    </motion.div>
  );
}

// Command Palette
function CommandPalette({
  isOpen,
  onClose,
  projects,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelect: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return projects.slice(0, 5);
    const lower = query.toLowerCase();
    return projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.techStack.some((t) => t.name.toLowerCase().includes(lower))
      )
      .slice(0, 8);
  }, [query, projects]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-xl bg-card border border-border rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Proje Ara..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
            <div className="flex gap-1">
              <kbd className="text-[10px] border border-border px-1.5 rounded">⌘</kbd>
              <kbd className="text-[10px] border border-border px-1.5 rounded">K</kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    onSelect(project.slug);
                    onClose();
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded bg-secondary overflow-hidden flex-shrink-0">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {project.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {project.shortDescription}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                Sonuç bulunamadı
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Filter projects based on category and search
  const filteredProjects = useMemo(() => {
    return demoProjects.filter((project) => {
      const categoryMatch = activeCategory === "all" || project.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const searchMatch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.techStack.some((tech) => tech.name.toLowerCase().includes(searchLower));

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery]);

  // Keyboard shortcut for command palette
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setCommandPaletteOpen(true);
    }
    if (e.key === "Escape") {
      setCommandPaletteOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleProjectSelect = (slug: string) => {
    window.location.href = `/projects/${slug}`;
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-primary" />
            <span className="text-primary font-mono text-sm tracking-wider">
              PROJECTS
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Work
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Sektördeki deneyimim boyunca geliştirdiğim ve açık kaynak olarak paylaştığım çalışmalar.
          </p>
        </motion.header>

        {/* Filter Bar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="sticky top-16 z-40 -mx-6 md:-mx-12 px-6 md:px-12 py-4 bg-background/95 backdrop-blur-md border-b border-border mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Pills */}
            <div className="flex gap-2 p-1 bg-secondary rounded-lg overflow-x-auto w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-md text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setCommandPaletteOpen(true)}
                placeholder="Proje Ara..."
                className="w-full bg-secondary border-none rounded-md py-2 pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5">
                <kbd className="text-[10px] border border-border px-1 rounded">⌘</kbd>
                <kbd className="text-[10px] border border-border px-1 rounded">K</kbd>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <EmptyState searchQuery={searchQuery} />
            )}
          </AnimatePresence>
        </motion.section>

        {/* CTA */}
        {filteredProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 py-12 px-8 bg-secondary/50 border border-border rounded-xl"
          >
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Bir projeniz mi var?
            </h2>
            <p className="text-muted-foreground mb-6">
              Fikirlerinizi gerçeğe dönüştürmek için iletişime geçin.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              İletişime Geç
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.section>
        )}
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        projects={demoProjects}
        onSelect={handleProjectSelect}
      />
    </main>
  );
}
