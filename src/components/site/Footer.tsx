import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-brand" />
              <span className="font-semibold">Echelon Safaris Co</span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">
              Arusha HQ · Trusted local operator for safaris, Kili & Zanzibar.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Explore</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link className="hover:underline" href="/tours">Safaris</Link></li>
              <li><Link className="hover:underline" href="/kilimanjaro">Kilimanjaro</Link></li>
              <li><Link className="hover:underline" href="/zanzibar">Zanzibar</Link></li>
              <li><Link className="hover:underline" href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Trust</div>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Licensed • TATO member</li>
              <li>Secure checkout (hosted)</li>
              <li>Transparent pricing</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <ul className="mt-2 space-y-2 text-sm text-neutral-700">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +255 (0) 000 000</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@example.com</li>
              <li className="flex items-center gap-2">
                <Link href="https://instagram.com" className="inline-flex items-center gap-1 hover:underline">
                  <Instagram className="h-4 w-4" /> Instagram
                </Link>
                <Link href="https://facebook.com" className="ml-3 inline-flex items-center gap-1 hover:underline">
                  <Facebook className="h-4 w-4" /> Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-500">
          © {new Date().getFullYear()} Echelon Safaris Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
