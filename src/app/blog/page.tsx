import Link from "next/link";
import Image from "next/image";
import { getDefaultMeta } from "@/lib/seo";
import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { urlFor } from "@/lib/sanity.image";

type BlogPost = {
  _id: string;
  title: string;
  excerpt?: string;
  slug: string;
  coverUrl?: string;
};


// ✅ Static SEO for Blog Listing
export async function generateMetadata() {
  const defaults = await getDefaultMeta();
  return {
    ...defaults,
    title: `Travel Blog | ${defaults.title}`,
    description:
      "Read expert travel stories, Tanzania safari tips, Kilimanjaro climbing guides, and Zanzibar beach inspiration — written by local adventure specialists.",
    openGraph: {
      ...defaults.openGraph,
      title: `Travel Blog | ${defaults.title}`,
      description:
        "Explore the latest Tanzania travel insights, guides, and wildlife stories with Echelon Safaris Co.",
    },
  };
}

// ✅ GROQ query to fetch all blog posts
const POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(_createdAt desc){
    _id,
    title,
    excerpt,
    "slug": slug.current,
    "coverUrl": coverImage.asset->url
  }
`;

// ✅ Page Component
export default async function BlogPage() {
  const posts = await sanityClient.fetch(POSTS_QUERY, {}, { next: { revalidate: 300, tags: ["blog"] } });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Travel Blog</h1>
        <p className="text-neutral-600">
          Insights, stories, and travel guides from Tanzania’s top safari experts.
        </p>
      </header>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.length > 0 ? (
          posts.map((post: BlogPost) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow"
            >
              {post.coverUrl && (
                <div className="relative h-56 w-full">
                  <Image
                    src={post.coverUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="text-sm text-neutral-600">{post.excerpt}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-neutral-600">No blog posts found.</p>
        )}
      </section>
    </main>
  );
}
