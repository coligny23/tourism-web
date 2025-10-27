// Tour card data for the listing page
export const TOURS_CARD_QUERY = /* groq */ `
*[_type == "tour"]{
  _id,
  title,
  slug,
  price,
  duration,
  summary,
  image,
  park->{ name, slug }
} | order(_createdAt desc)
`;

// Parks and Kili routes (for filters, etc.)
export const PARKS_QUERY = /* groq */ `*[_type == "park"]{ _id, name, slug, image } | order(name asc)`;
export const ROUTES_QUERY = /* groq */ `*[_type == "route"]{ _id, name, slug, difficulty, duration } | order(name asc)`;
