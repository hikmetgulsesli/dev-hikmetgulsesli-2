import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Hikmet Güleşli | Full-Stack Developer",
  description:
    "Hikmet Güleşli - Full-Stack Developer, UI/UX Designer. Building high-performance applications with React, Next.js, and TypeScript.",
  keywords: [
    "web developer",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "portfolio",
  ],
  authors: [{ name: "Hikmet Güleşli", url: "https://hikmetgulsesli.com" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hikmetgulsesli.com",
    siteName: "Hikmet Güleşli",
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
