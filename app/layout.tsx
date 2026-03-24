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
  description: "Building high-performance applications with React, Next.js, and TypeScript. Focused on creating immersive digital interfaces that bridge the gap between human and machine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
