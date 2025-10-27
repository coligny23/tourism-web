import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
});
