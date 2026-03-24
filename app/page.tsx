"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, ChevronDown, ArrowRight, Clock } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";

// Custom SVG Icons for social links
function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// Typing animation hook
function useTypingAnimation(
  texts: string[],
  typingSpeed: number = 80,
  erasingSpeed: number = 50,
  pauseDuration: number = 2000
) {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (!isErasing) {
      // Typing
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause then start erasing
        const timeout = setTimeout(() => {
          setIsErasing(true);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      // Erasing
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, erasingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished erasing, move to next text
        setIsErasing(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, currentTextIndex, isErasing, texts, typingSpeed, erasingSpeed, pauseDuration]);

  return displayText;
}

// Status Badge with ping animation
function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-3 px-3 py-1 bg-[var(--surface-container-low)] border border-[var(--outline-variant)]/20 rounded-full"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-[var(--on-surface-variant)]">
        Available for work
      </span>
    </motion.div>
  );
}

// Social Icon Button
function SocialIcon({
  icon: IconComponent,
  label,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="hover:text-[var(--primary)] transition-colors flex items-center gap-2 font-mono text-sm text-[var(--on-surface-variant)] cursor-pointer"
    >
      <IconComponent />
      <span className="uppercase">{label}</span>
    </Link>
  );
}

// Hero Section
function HeroSection() {
  const roles = ["Full-Stack Developer", "UI/UX Designer", "Problem Solver"];
  const typedText = useTypingAnimation(roles, 80, 50, 2000);

  return (
    <section className="relative min-h-[921px] flex flex-col justify-center px-8 md:px-24 py-20 bg-[var(--surface)]">
      <div className="max-w-4xl space-y-8">
        {/* Status Badge */}
        <StatusBadge />

        {/* Greeting and Title */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-mono text-[var(--primary)] text-xl tracking-tight"
          >
            &gt; Merhaba, ben Hikmet_
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-none"
          >
            <span className="text-gradient">KINETIC</span>
            <br />
            <span className="text-gradient">EXPERIENCES.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-[var(--on-surface-variant)] max-w-2xl leading-relaxed"
          >
            Building high-performance applications with{" "}
            <span className="text-[var(--on-surface)] font-semibold">
              React, Next.js, and TypeScript
            </span>
            . Focused on creating immersive digital interfaces that bridge the gap between human and machine.
          </motion.p>

          {/* Typing animation display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="h-8"
          >
            <span className="font-mono text-[var(--on-surface-variant)]">
              {typedText}
              <span className="animate-pulse text-[var(--primary)]">|</span>
            </span>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <Link
            href="/about"
            className="px-8 py-4 bg-[var(--primary)] text-[var(--on-primary)] font-bold rounded-md shadow-[var(--shadow-glow-primary)] hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
          >
            <span className="font-mono">//</span> Hakkımda Bilgi Al
          </Link>
          <Link
            href="/projects"
            className="px-8 py-4 border border-[var(--outline-variant)]/30 text-[var(--on-surface)] font-bold rounded-md hover:bg-[var(--primary)]/5 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="font-mono">&gt;</span> Projeleri Gör
          </Link>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex gap-6 pt-12"
        >
          <SocialIcon icon={GithubIcon} label="GITHUB" href="https://github.com/hikmetgulsesli" />
          <SocialIcon icon={LinkedinIcon} label="LINKEDIN" href="https://linkedin.com/in/hikmetgulsesli" />
          <SocialIcon icon={XIcon} label="X_SOCIAL" href="https://twitter.com/hikmetgulsesli" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-[var(--primary)]" />
      </motion.div>
    </section>
  );
}

// Project Card
function ProjectCard({
  title,
  description,
  image,
  tech,
  index,
}: {
  title: string;
  description: string;
  image: string;
  tech: string[];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-[var(--surface-container)] hover:bg-[var(--surface-container-high)] transition-all duration-300 border-l-2 border-transparent hover:border-[var(--primary)] overflow-hidden cursor-pointer"
    >
      <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="font-headline text-xl font-bold tracking-tight uppercase">
          {title}
        </h3>
        <p className="text-sm text-[var(--on-surface-variant)] line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-[var(--surface-container-lowest)] font-mono text-[10px] text-[var(--secondary)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// Featured Projects Section
function FeaturedProjectsSection() {
  const projects = [
    {
      title: "Sentinel Dashboard",
      description: "Real-time network security monitoring interface with 3D packet visualization.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkxyt6DgfFIcoJXJU2ynxAPf_Kh0K2mgXzQYeDmICUPu84aXeppBelsxi9eHFLTEHRF_-mVWEw8R77KKTw3sGULpYXm8-lemSAxX8_HUCjsmMvtnIpDbdhRTsX6RwPi4ZvgVcf59uljbHHUn78WpRklZV2H6IFdfJDHhAADrHD_Nr2AsRtSojOAJ3m5zhMmXoCtdMk3LVXQDwUTsU3DoKFyzA5KRmp0n-JcZ6EVwgS9wJzwWg2lL0WSDmxBKVwFkJFSqbLPLq1YT0",
      tech: ["REACT", "TAILWIND", "D3.JS"],
    },
    {
      title: "Claw Open Projects",
      description: "A decentralized collaboration platform for open-source hardware developers.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG1iAyEaYNjFG5dorw33MtiEbBOuinKJdGswv0LIPOFmD3tbOUhX1bmkHeU89vZekUXNoGxiP0yDZEo3dTFdPIfNogbNY2FbEoJ1n-SXJVWGti_b6xOABo5vWc8ORNl_g7tELU93mYjGuYtirFSBW9qI-AkAQzuZ4rNvzY1pri1o07WSOLNR0PwHJ4WU0uI_-u2Z-VkjjnhSmZrDwk11G8U9z11EHfeafC3ijAn0eFWK-H5IQm-kaKXD9hW8QNARmI2Mh2EAhXxmo",
      tech: ["NEXT.JS", "TYPESCRIPT", "POSTGRES"],
    },
    {
      title: "AI Agent Platform",
      description: "Autonomous agent orchestration framework for complex business workflows.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg897AAyV5wtVBrsS9VplMPCXPsKwOrPur_J_KVH6yzThF0cdjJD-5D5YVQGaXYsGexWyfXVjnGLIQ8LT-7ENc0yTloPE47RbqoQuzdjNcWb0GKh_9SXKmUuoYfmwn1zRiT33yfi3K8_xp63p_g9XuiEWgPxwtlqF0myc-7KhyACXFYnHpcaDvgHtXpkDsuZSQESbwBUcadfC9qVC9oREw5JuhcyrV57_fjLokx_ghnmrC09eq-o-oxp8c5ciS1lwmWbI_y6xxDik",
      tech: ["PYTHON", "LANGCHAIN", "FASTAPI"],
    },
  ];

  return (
    <section className="py-24 px-8 md:px-24 bg-[var(--surface-container-low)]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="flex justify-between items-end mb-12"
      >
        <motion.div variants={fadeUpVariants}>
          <span className="font-mono text-[var(--primary)] text-sm uppercase tracking-[0.3em] block mb-2">
            // featured_projects
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase">
            Selected Works
          </h2>
        </motion.div>
        <motion.div variants={fadeUpVariants}>
          <Link
            href="/projects"
            className="font-mono text-[var(--primary)] hover:underline underline-offset-8 transition-all cursor-pointer"
          >
            Tümünü Gör →
          </Link>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>
    </section>
  );
}

// Blog Post Card
function BlogPostCard({
  date,
  title,
  excerpt,
  readTime,
  index,
}: {
  date: string;
  title: string;
  excerpt: string;
  readTime: number;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-4 cursor-pointer"
    >
      <div className="font-mono text-xs text-[var(--tertiary-fixed-dim)] tracking-widest uppercase">
        {date}
      </div>
      <h3 className="font-headline text-2xl font-bold tracking-tight hover:text-[var(--primary)] transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-[var(--on-surface-variant)] text-sm leading-relaxed">
        {excerpt}
      </p>
      <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--on-surface-variant)]">
        <Clock className="w-4 h-4" />
        {readTime} MIN READ
      </div>
    </motion.article>
  );
}

// Recent Writing Section
function RecentWritingSection() {
  const posts = [
    {
      date: "MARCH 12, 2024",
      title: "Optimizing React for 60fps",
      excerpt:
        "A deep dive into virtualization, memory management, and rendering pipelines in complex dashboards.",
      readTime: 8,
    },
    {
      date: "FEB 28, 2024",
      title: "The Future of AI Agents",
      excerpt:
        "Why the next shift in UI will be agentic, moving from interfaces to instructions and workflows.",
      readTime: 12,
    },
    {
      date: "JAN 15, 2024",
      title: "Building Terminal UIs",
      excerpt:
        "Exploring the psychology of the CLI and how to translate that efficiency to the modern web browser.",
      readTime: 6,
    },
  ];

  return (
    <section className="py-24 px-8 md:px-24 bg-[var(--surface)]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-12"
      >
        <motion.div variants={fadeUpVariants}>
          <span className="font-mono text-[var(--primary)] text-sm uppercase tracking-[0.3em] block mb-2">
            // recent_writing
          </span>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter uppercase">
            Logs & Research
          </h2>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {posts.map((post, index) => (
          <BlogPostCard key={post.title} {...post} index={index} />
        ))}
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-32 px-8 md:px-24 bg-[var(--surface-container-lowest)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--primary)]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
      >
        <motion.h2 variants={fadeUpVariants} className="font-headline text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
          Let&apos;s build something{" "}
          <span className="text-[var(--primary)]">amazing</span>
          {" "}together.
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          className="text-[var(--on-surface-variant)] text-lg max-w-xl mx-auto"
        >
          Currently open for new projects and collaborations. If you have a challenge that needs precise execution, let&apos;s talk.
        </motion.p>

        <motion.div variants={fadeUpVariants} className="pt-8">
          <Link
            href="/contact"
            className="px-12 py-5 bg-[var(--primary)] text-[var(--on-primary)] font-bold rounded-md shadow-[var(--shadow-glow-primary-lg)] hover:scale-105 transition-transform flex items-center gap-3 mx-auto uppercase tracking-widest cursor-pointer"
          >
            <Mail className="w-6 h-6" />
            İletişime Geç
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Main Home Page Component
export default function HomePage() {
  return (
    <main className="flex-grow">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline opacity-50"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects */}
      <FeaturedProjectsSection />

      {/* Recent Writing */}
      <RecentWritingSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
