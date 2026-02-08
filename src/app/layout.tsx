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
      <body className="antialiased">{children}</body>
    </html>
  );
}
