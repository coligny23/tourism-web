import { groq } from "next-sanity";
import { sanityClient } from "./sanity.client";
import { TOURS_CARD_QUERY, PARKS_QUERY, ROUTES_QUERY } from "./queries";
import { z } from "zod";

// 🔹 Base Slug schema
const Slug = z.object({ current: z.string() });

// 🔹 Zod schemas for type-safe parsing
export const ParkCard = z.object({
  _id: z.string(),
  name: z.string(),
  slug: Slug,
  image: z.any().nullable().optional(),
});

export const RouteCard = z.object({
  _id: z.string(),
  name: z.string(),
  slug: Slug,
  difficulty: z.string().optional(),
  duration: z.string().optional(),
});

export const TourCard = z.object({
  _id: z.string(),
  title: z.string(),
  slug: Slug,
  price: z.number().optional().nullable(),
  duration: z.string().optional(),
  summary: z.string().optional(),
  image: z.any().nullable().optional(),
  park: ParkCard.pick({ name: true, slug: true }).nullable().optional(),
});

// 🔹 Inferred types
export type TourCardT = z.infer<typeof TourCard>;
export type ParkCardT = z.infer<typeof ParkCard>;
export type RouteCardT = z.infer<typeof RouteCard>;

// 🔹 ISR + strong types using Next's route cache tags
export async function getTours() {
  const data = await sanityClient.fetch(
    TOURS_CARD_QUERY,
    {},
    { next: { revalidate: 60, tags: ["tours"] } }
  );
  return z.array(TourCard).parse(data);
}

export async function getParks() {
  const data = await sanityClient.fetch(
    PARKS_QUERY,
    {},
    { next: { revalidate: 300, tags: ["parks"] } }
  );
  return z.array(ParkCard).parse(data);
}

export async function getRoutes() {
  const data = await sanityClient.fetch(
    ROUTES_QUERY,
    {},
    { next: { revalidate: 300, tags: ["routes"] } }
  );
  return z.array(RouteCard).parse(data);
}

// ✅ Unified getTourBySlug — keep only this one!
export async function getTourBySlug(slug: string) {
  if (!slug) return null;

  const query = groq`*[_type=="tour" && slug.current==$slug][0]{
    _id,
    title,
    summary,
    duration,
    price,
    park->{title},
    gallery,
    itinerary
  }`;

  return sanityClient.fetch(query, { slug }, { next: { revalidate: 300, tags: ["tours"] } });
}

export async function getReviewsByTourSlug(slug: string) {
  if (!slug) return [];

  const query = groq`*[_type=="review" && defined(tour) && tour->slug.current==$slug]
    | order(_createdAt desc){
      _id,
      name,
      country,
      rating,
      content
    }`;

  const data = await sanityClient.fetch(
    query,
    { slug },
    { next: { revalidate: 300, tags: ["reviews", `tour:${slug}`] } }
  );

  return z.array(Review).parse(data);
}


// ✅ Fetch blog post by slug
export async function getPostBySlug(slug: string) {
  if (!slug) return null;
  const query = groq`*[_type=="blogPost" && slug.current==$slug][0]{
    _id, title, excerpt, coverImage, slug
  }`;
  return sanityClient.fetch(query, { slug }, { next: { revalidate: 300, tags: ["blog"] } });
}

export const Review = z.object({
  _id: z.string(),
  name: z.string(),
  country: z.string(),
  rating: z.number().min(1).max(5),
  content: z.string(),
});

export type ReviewT = z.infer<typeof Review>;
