import { getPostBySlug } from "@/lib/cms";
import { getDefaultMeta } from "@/lib/seo";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";

import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

// ✅ Pre-generate all slugs for static rendering and ISR
export async function generateStaticParams() {
  const query = groq`*[_type == "blogPost" && defined(slug.current)][].slug.current`;
  const slugs: string[] = await sanityClient.fetch(query);
  return slugs.map((slug) => ({ slug }));
}


// ✅ Dynamic SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const defaults = await getDefaultMeta();
  const post = await getPostBySlug(params.slug);

  const ogImage =
  post?.coverImage
    ? [{ url: urlFor(post.coverImage)?.width(1200).height(630).fit("crop").url() ?? "" }]
    : defaults.openGraph?.images;


  return {
    ...defaults,
    title: post?.title ? `${post.title} | ${defaults.title}` : defaults.title,
    description: post?.excerpt ?? defaults.description,
    openGraph: {
      ...defaults.openGraph,
      title: post?.title ? `${post.title} | ${defaults.title}` : defaults.title,
      description: post?.excerpt ?? defaults.description,
      images: ogImage,
    },
  };
}

// ✅ Page content
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div className="p-8 text-center text-neutral-600">Post not found.</div>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      {post.coverImage && (
        <div className="relative h-[360px] w-full mb-6">
          <Image
            src={urlFor(post.coverImage).width(1600).height(900).url()}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      <article className="prose max-w-none text-neutral-800">
        <p>{post.excerpt}</p>
      </article>
    </main>
  );
}
