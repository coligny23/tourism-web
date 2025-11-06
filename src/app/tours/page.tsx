import { getDefaultMeta } from "@/lib/seo";

export async function generateMetadata() {
  const defaults = await getDefaultMeta();
  return {
    ...defaults,
    title: `Safaris | ${defaults.title}`,
    description:
      "Browse Tanzania safari packages across Serengeti, Ngorongoro, and Tarangire. Hand-crafted itineraries with trusted local guides.",
    openGraph: {
      ...defaults.openGraph,
      title: `Safaris | ${defaults.title}`,
    },
  };
}


import Image from "next/image";
import Link from "next/link";
import { getTours } from "@/lib/cms";
import { urlFor } from "@/lib/sanity.image";



export default async function ToursPage() {
  const tours = await getTours();

  return (
    <main className="container py-12">
      <h1 className="text-2xl font-semibold">Safaris</h1>
      <p className="mt-2 text-neutral-700">Filters & search coming soon.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((t) => {
          const href = `/tours/${t.slug.current}`;
          const img = t.image ? urlFor(t.image).width(800).height(540).quality(70).fit("crop").url() : null;
          return (
            <article key={t._id} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <Link href={href} className="block">
                <div className="relative aspect-[4/3] w-full">
                  {img && (
                    <Image
                      src={img}
                      alt={t.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{t.title}</h2>
                  <div className="mt-1 text-sm text-neutral-600">
                    {t.park?.name ? `${t.park.name} · ` : ""}{t.duration ?? "Flexible"}
                  </div>
                  {t.summary && <p className="mt-2 line-clamp-2 text-sm text-neutral-700">{t.summary}</p>}
                  <div className="mt-3 text-sm font-medium">
                    {t.price ? <>From ${t.price.toLocaleString()}</> : "Enquire"}
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
