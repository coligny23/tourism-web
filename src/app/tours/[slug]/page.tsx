import { getTourBySlug } from "@/lib/cms";
import { urlFor } from "@/lib/sanity.image";
import { getDefaultMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

type TourImage = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};


type ItineraryItem = {
  day: string;
  title: string;
  details: string;
};

type Tour = {
  title: string;
  summary?: string;
  duration: string;
  price: number;
  gallery?: TourImage[];
  itinerary?: ItineraryItem[];
};


export async function generateStaticParams() {
  const query = groq`*[_type == "tour" && defined(slug.current)][].slug.current`;
  const slugs: string[] = await sanityClient.fetch(query);
  return slugs.map((slug) => ({ slug }));
}


// ✅ Dynamic SEO metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const defaults = await getDefaultMeta();
  const tour = await getTourBySlug(params.slug);

  const ogImage = tour?.image
    ? [{ url: urlFor(tour.coverImage)?.width(1200).height(630).fit("crop").url() ?? "" }]
    : defaults.openGraph?.images;

  return {
    ...defaults,
    title: tour?.title ? `${tour.title} | ${defaults.title}` : defaults.title,
    description: tour?.summary ?? defaults.description,
    openGraph: {
      ...defaults.openGraph,
      title: tour?.title ? `${tour.title} | ${defaults.title}` : defaults.title,
      description: tour?.summary ?? defaults.description,
      images: ogImage,
    },
  };
}

// ✅ Page content
export default async function TourPage({ params }: { params: { slug: string } }) {
  const tour: Tour | null = await getTourBySlug(params.slug);

  if (!tour) {
    return <div className="p-8 text-center text-neutral-600">Tour not found.</div>;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
        <p className="text-neutral-600 mb-4">{tour.summary}</p>
        <p className="font-semibold text-brand">
          {tour.duration} — ${tour.price.toLocaleString()}
        </p>
      </section>

      {/* ✅ Gallery */}
      {tour.gallery && tour.gallery.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {tour.gallery.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={urlFor(img).width(800).height(600).url()}
                  alt={tour.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ✅ Itinerary */}
      {tour.itinerary && tour.itinerary.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
          <div className="space-y-4">
            {tour.itinerary.map((day, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 hover:bg-white transition"
              >
                <h3 className="font-semibold text-lg text-brand mb-1">
                  {day.day}: {day.title}
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">{day.details}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ✅ CTA */}
      <section className="text-center border-t pt-10 mt-10">
        <h2 className="text-2xl font-semibold mb-4">Ready to Book Your Adventure?</h2>
        <Link
          href="/plan-my-trip"
          className="inline-block rounded-lg bg-brand px-6 py-3 text-white font-semibold hover:opacity-90"
        >
          Book This Safari
        </Link>
      </section>
    </main>
  );
}
