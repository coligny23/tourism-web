import { defineType, defineField } from "sanity";

export const park = defineType({
  name: "park",
  title: "Park",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
  ],
});
