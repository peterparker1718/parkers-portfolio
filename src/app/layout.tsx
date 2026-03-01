import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Java Bridge Coffee — We Are The Source & The Distribution",
  description:
    "The private reserve of Indonesian coffee. Direct trade, PhD science, sovereign access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&family=Roboto+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
