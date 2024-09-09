import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "unknown Messages",
  description:
    "Create a unique link to receive anonymous messages and honest feedback. Discover what people think without knowing who sent it.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <AuthProvider>
        <body className={`${inter.className}`}>
          <main>{children}</main>
          <Toaster />
          {/* Footer */}
          <footer className="text-center p-4 md:p-6">
            &copy; 2024 unknown message. All rights reserved.
          </footer>
          <Analytics />
        </body>
      </AuthProvider>
    </html>
  );
}
