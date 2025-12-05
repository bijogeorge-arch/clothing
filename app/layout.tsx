import type { Metadata } from "next";
import { Syne, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "@/components/ui/sonner";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chalchitra | Cinematic Streetwear",
  description: "Premium streetwear for the modern narrative. Shop the latest drop.",
  keywords: ["Streetwear", "Fashion", "India", "Clothing"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased selection:bg-neon-lime selection:text-black",
        inter.variable,
        syne.variable,
        spaceMono.variable
      )}>
        <Navbar user={user} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
