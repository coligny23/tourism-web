import { defineType, defineField } from "sanity";

export const stay = defineType({
  name: "stay",
  title: "Stay (Zanzibar or Lodge)",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", type: "text" }),
  ],
});
