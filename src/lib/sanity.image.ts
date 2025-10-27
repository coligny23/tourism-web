import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityClient } from "./sanity.client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(src: Image | null | undefined) {
  if (!src) return builder.image({ _type: "image", asset: { _ref: "dummyRef" } as unknown as Image });
  return builder.image(src);
}
