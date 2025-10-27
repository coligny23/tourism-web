import { defineType, defineField } from "sanity";

export const route = defineType({
  name: "route",
  title: "Kilimanjaro Route",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "difficulty", type: "string" }),
    defineField({ name: "duration", type: "string" }),
    defineField({ name: "description", type: "text" }),
  ],
});
