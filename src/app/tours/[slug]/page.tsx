import { getTourBySlug } from "@/lib/cms";
import { urlFor } from "@/lib/sanity.image";
import { getDefaultMeta } from "@/lib/seo";
import Image from "next/image";

import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

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
  const tour = await getTourBySlug(params.slug);

  if (!tour) {
    return <div className="p-8 text-center text-neutral-600">Tour not found.</div>;
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      {tour.image && (
        <div className="relative h-[420px] w-full mb-6">
          <Image
            src={urlFor(tour.image).width(1600).height(900).url()}
            alt={tour.title}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-3">{tour.title}</h1>
      <p className="text-lg text-neutral-700 mb-6">{tour.summary}</p>

      {tour.highlights && (
        <ul className="list-disc pl-5 space-y-1 text-neutral-700">
          {tour.highlights.map((h: string, i: number) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      <div className="mt-8 p-4 border rounded-lg bg-neutral-50">
        <p className="text-sm text-neutral-600">
          <strong>Duration:</strong> {tour.duration} | <strong>Price:</strong> ${tour.price}
        </p>
      </div>
    </main>
  );
}
