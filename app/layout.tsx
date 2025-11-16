import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
