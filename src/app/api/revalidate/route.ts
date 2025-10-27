import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET ?? "";
  const url = new URL(req.url);
  const tokenFromReq = url.searchParams.get("secret") ?? "";

  if (secret && tokenFromReq !== secret) {
    return new Response("Invalid secret", { status: 401 });
  }

  // Revalidate the cache tags with a profile (Next 16+)
  const tags = ["tours", "parks", "routes", "blog", "settings"];
  for (const t of tags) revalidateTag(t, "max"); // ← add "max"

  return Response.json({ revalidated: true, tags });
}
