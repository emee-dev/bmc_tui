import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { JetBrains_Mono } from "next/font/google";

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuyMeACoffee.tui - Terminal-Style Creator Support",
  description:
    "A terminal-inspired platform for supporting your favorite creators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-webtui-theme="dark"
      suppressHydrationWarning
      className={jetbrains_mono.className}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
