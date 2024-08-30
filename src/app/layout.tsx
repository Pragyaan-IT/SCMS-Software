import SessionWrapper from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { AppProvider } from "@/components/providers/context-provider";
import ModalProvider from "@/components/providers/modal-provider";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "SCMS by Pragyaan",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-svh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <AppProvider>
          <NextTopLoader color="black" showSpinner={false} />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SessionWrapper>
              {children}
              <ModalProvider />
            </SessionWrapper>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
