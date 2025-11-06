import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

const SETTINGS_QUERY = groq`
  *[_type == "settings"][0]{
    siteName,
    tagline,
    defaultMetaTitle,
    defaultMetaDescription,
    "ogImage": ogImage.asset->url,
    contactEmail,
    phone,
    address
  }
`;

export async function getDefaultMeta() {
  const s = await sanityClient.fetch(SETTINGS_QUERY);

  const title = s?.defaultMetaTitle || s?.siteName || "Echelon Safaris Co";
  const description =
    s?.defaultMetaDescription ||
    s?.tagline ||
    "Crafting unforgettable adventures across Tanzania.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: s?.ogImage ? [{ url: s.ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: s?.ogImage ? [s.ogImage] : [],
    },
  };
}
