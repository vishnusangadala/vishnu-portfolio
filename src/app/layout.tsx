import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/content";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  keywords: [
    "backend engineer",
    "distributed systems",
    "multi-agent AI",
    "LangGraph",
    "Kafka",
    "Spring Boot",
    "Kubernetes",
    "software engineer",
  ],
  openGraph: {
    type: "website",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
