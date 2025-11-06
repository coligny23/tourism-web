import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", validation: r => r.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),

    // ✅ SEO defaults
    defineField({
      name: "defaultMetaTitle",
      type: "string",
      title: "Default Meta Title",
      description: "Used as the base title across the site if no page overrides it."
    }),
    defineField({
      name: "defaultMetaDescription",
      type: "text",
      title: "Default Meta Description",
      rows: 3,
      description: "Used as the default meta description if a page doesn’t set one."
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Default Open Graph Image",
      description: "Shown on WhatsApp/Twitter previews when a page doesn’t provide its own.",
      options: { hotspot: true }
    }),

    // Contact
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "address", type: "string" }),
  ],
});
