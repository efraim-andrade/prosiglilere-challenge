import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { QueryProvider } from "@/lib/query-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harry Potter Characters",
  description:
    "Harry Potter characters list to a Prosigliere Challenge by Efraim Andrade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <header className="relative flex items-center justify-center w-full border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
            <Link href="/" className="absolute left-4">
              GoBack
            </Link>

            <h1 className="text-lg font-semibold text-center">
              Harry Potter Characters
            </h1>
          </header>

          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
