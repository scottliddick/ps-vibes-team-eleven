import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roshambo Royale",
  description: "Battle Royale Rock-Paper-Scissors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">{children}</body>
    </html>
  );
}
