import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Less is more",
  description: "A simple blog that displays markdown files from a GitHub repository in a timeline format.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DarkModeToggle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
