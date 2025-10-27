import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "address", type: "string" }),
  ],
});
