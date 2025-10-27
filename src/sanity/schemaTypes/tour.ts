import { defineType, defineField } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "park", type: "reference", to: [{ type: "park" }] }),
    defineField({ name: "duration", type: "string", title: "Duration (e.g. 5 days)" }),
    defineField({ name: "price", type: "number", title: "Price (USD)" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
  ],
});
