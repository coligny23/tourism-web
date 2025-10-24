"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroText() {
  return (
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
  );
}
