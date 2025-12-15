import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Reviewer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "content",
      title: "Review Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: "tour",
      title: "Related Tour",
      type: "reference",
      to: [{ type: "tour" }],
      validation: (Rule) => Rule.required(),
      description: "Link this review to a specific tour so it appears on that tour page.",
    }),
  ],
});
