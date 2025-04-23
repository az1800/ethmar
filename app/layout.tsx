import { Geist } from "next/font/google";
import { Tajawal, Cairo } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { PostsProvider } from "../Contexts/PostsContext";
import { PostFiltersProvider } from "../Contexts/PostFiltersContext";
import { Metadata } from "next";

import "./globals.css";
import { useState } from "react";
import QueryProvider from "@/context/QueryProvider";
import { NotificationProvider } from "@/components/Notification";
import PlausibleProvider from "next-plausible";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"], // Regular, Medium, Bold
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "600", "700"], // Regular, SemiBold, Bold
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Ethmar | إثمار",
  description:
    "Ethmar is an initiative that spreads financial knowledge to help people achieve financial freedom.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      className={`${tajawal.className} ${cairo.className}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-background text-foreground">
        <PlausibleProvider domain="ethmar.xyz">
          <NotificationProvider>
            <QueryProvider>
              <PostsProvider>
                <PostFiltersProvider>{children}</PostFiltersProvider>
              </PostsProvider>
            </QueryProvider>
          </NotificationProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
