import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hikmet Güleşli",
    template: "%s | Hikmet Güleşli",
  },
  description:
    "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
  keywords: [
    "web developer",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "portfolio",
  ],
  authors: [{ name: "Hikmet Güleşli", url: "https://hikmetgulsesli.com" }],
  creator: "Hikmet Güleşli",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hikmetgulsesli.com",
    siteName: "Hikmet Güleşli",
    title: "Hikmet Güleşli - Full-Stack Developer",
    description:
      "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Modern web teknolojileri ile dijital ürünler geliştiriyorum.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hikmetgulsesli",
    creator: "@hikmetgulsesli",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col bg-[var(--background)] text-[var(--on-surface)] antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
