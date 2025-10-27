import { defineType, defineField } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "content", type: "text" }),
    defineField({ name: "rating", type: "number", validation: (r) => r.min(1).max(5) }),
  ],
});
