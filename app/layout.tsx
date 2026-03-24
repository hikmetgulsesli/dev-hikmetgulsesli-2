import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hikmet Güleşli - Full-Stack Developer",
      },
    ],
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
  alternates: {
    canonical: "https://hikmetgulsesli.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={cn(spaceGrotesk.variable, inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
