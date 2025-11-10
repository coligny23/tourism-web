import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'park', type: 'reference', to: [{ type: 'park' }], title: 'Park' }),
    defineField({ name: 'duration', type: 'string', title: 'Duration (e.g. 6 Days)' }),
    defineField({ name: 'price', type: 'number', title: 'Price (USD)' }),
    defineField({ name: 'summary', type: 'text', title: 'Short Summary' }),

    // ✅ Photo Gallery
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
    }),

    // ✅ Itinerary
    defineField({
      name: 'itinerary',
      title: 'Itinerary (Day by Day)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', type: 'string', title: 'Day (e.g. Day 1)' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'details', type: 'text', title: 'Details' },
          ],
        },
      ],
    }),
  ],
})
