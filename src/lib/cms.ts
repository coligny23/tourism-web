import { sanityClient } from "./sanity.client";
import { TOURS_CARD_QUERY, PARKS_QUERY, ROUTES_QUERY } from "./queries";
import { z } from "zod";

const Slug = z.object({ current: z.string() });

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

export type TourCardT = z.infer<typeof TourCard>;
export type ParkCardT = z.infer<typeof ParkCard>;
export type RouteCardT = z.infer<typeof RouteCard>;

// ISR + strong types using Next's route cache tags
export async function getTours() {
  const data = await sanityClient.fetch(TOURS_CARD_QUERY, {}, { next: { revalidate: 60, tags: ["tours"] } });
  return z.array(TourCard).parse(data);
}

export async function getParks() {
  const data = await sanityClient.fetch(PARKS_QUERY, {}, { next: { revalidate: 300, tags: ["parks"] } });
  return z.array(ParkCard).parse(data);
}

export async function getRoutes() {
  const data = await sanityClient.fetch(ROUTES_QUERY, {}, { next: { revalidate: 300, tags: ["routes"] } });
  return z.array(RouteCard).parse(data);
}
