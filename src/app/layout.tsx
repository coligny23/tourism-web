import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: " Echelon Safaris Co",
    template: "%s | Echelon Safaris Co"
  },
  description: "Premium Tanzania safaris, Kilimanjaro climbs, and Zanzibar getaways.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
