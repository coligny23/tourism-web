"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";


const HeroText = dynamic(() => import("./HeroText"), {
  ssr: false,
  loading: () => (
    <div className="max-w-xl rounded-2xl bg-white/70 p-5 text-neutral-600">
      Loading…
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative w-full">
      {/* Full-bleed image with fixed height to avoid CLS */}
      <div className="relative h-[52vh] min-h-[380px] w-full md:h-[60vh] lg:h-[72vh]">
        <Image
          src="/images/hero-zebras.jpg" // your local file
          alt="Zebras crossing the savannah"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Subtle gradient for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Content box, aligned to the image bottom, centered horizontally */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-6 md:pb-10">
        <div className="container pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-xl rounded-2xl bg-white/85 p-5 backdrop-blur"
          >
            <h1 className="text-2xl font-semibold md:text-4xl">
              Tanzania Safaris & Kilimanjaro Specialists
            </h1>
            <p className="mt-2 text-neutral-700 md:text-lg">
              Hand-crafted itineraries with trusted local guides. Fair pricing. Safe, seamless bookings.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/plan-my-trip"><Button>Plan My Trip</Button></Link>
              <Link href="/tours"><Button variant="outline">Browse Tours</Button></Link>
            </div>
            <p className="mt-2 text-xs text-neutral-600">Award-winning service · 4.9/5 reviews</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
