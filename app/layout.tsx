import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Learn Crypto - Interactive Blockchain Learning Platform",
  description: "Explore cryptocurrency and blockchain technology through interactive mind maps and curated learning resources. From beginner to advanced topics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
