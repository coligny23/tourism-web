import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with fixed dimensions to avoid CLS */}
      <div className="relative mx-auto aspect-16/7 w-full max-w-6xl">
        <Image
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2400&auto=format&fit=crop"
          alt="Safari landscape in Serengeti"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end p-6 md:items-center md:p-10">
          <div className="max-w-xl rounded-2xl bg-white/85 p-5 backdrop-blur">
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
            <p className="mt-2 text-xs text-neutral-500">Award-winning service · 4.9/5 reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
