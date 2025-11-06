import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ConsentBanner from "@/components/site/ConsentBanner";

import { getDefaultMeta } from "@/lib/seo";





export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ConsentBanner/>
        <Analytics />
      </body>
    </html>
  );
}


export async function generateMetadata() {
  return await getDefaultMeta();
}
