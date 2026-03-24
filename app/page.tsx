import { Header } from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-16">
        <section className="relative min-h-[921px] flex flex-col justify-center px-8 md:px-24 py-20 bg-surface">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-surface-container-low border border-outline-variant/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Available for work
              </span>
            </div>

            <div className="space-y-4">
              <p className="font-label text-primary text-xl tracking-tight">
                &gt; Merhaba, ben Hikmet_
              </p>
              <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-none text-gradient">
                KINETIC
                <br />
                EXPERIENCES.
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                Building high-performance applications with{" "}
                <span className="text-on-surface font-semibold">
                  React, Next.js, and TypeScript
                </span>
                . Focused on creating immersive digital interfaces that bridge
                the gap between human and machine.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/about"
                className="px-8 py-4 bg-primary text-on-primary font-bold rounded-md shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:scale-105 transition-transform flex items-center gap-2"
              >
                <span className="font-label">//</span> Hakkımda Bilgi Al
              </a>
              <a
                href="/projects"
                className="px-8 py-4 border border-outline-variant/30 text-on-surface font-bold rounded-md hover:bg-primary/5 transition-colors flex items-center gap-2"
              >
                <span className="font-label">&gt;</span> Projeleri Gör
              </a>
            </div>

            <div className="flex gap-6 pt-12 text-on-surface-variant">
              <a
                href="https://github.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              >
                <span className="material-symbols-outlined text-lg">terminal</span>
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              >
                <span className="material-symbols-outlined text-lg">share</span>
                LINKEDIN
              </a>
              <a
                href="https://x.com/hikmetgulsesli"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-label text-sm"
              >
                <span className="material-symbols-outlined text-lg">alternate_email</span>
                X_SOCIAL
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
