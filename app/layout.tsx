import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/cn";
import FeedbackWidget from "@/components/FeedbackWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajit Yadav",
  description:
    "Portfolio showcasing projects, skills, and professional journey",
  keywords: ["Software Engineer", "AI", "Cloud Security", "Next.js"],
  openGraph: {
    title: "Ajit Yadav Portfolio",
    description: "Explore my professional projects and expertise",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={cn(
          inter.variable,
          "antialiased scroll-smooth transition-colors duration-300"
        )}
        style={{ background: "var(--bg-primary)", color: "var(--text-secondary)" }}
      >
        {children}
        <FeedbackWidget />
      </body>
    </html>
  );
}