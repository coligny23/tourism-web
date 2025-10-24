export default function ReviewsCarousel() {
  const reviews = [
    { name: "Amelie • FR", text: "Flawless 6-day safari. Amazing guides & logistics!" },
    { name: "Darren • UK", text: "Summited Kili via Machame—safe, well-paced, unforgettable." },
    { name: "Grace • KE", text: "Zanzibar add-on was smooth. Hotels exactly as promised." },
  ];
  return (
    <section aria-label="Guest reviews" className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-lg font-semibold">What guests say</h2>
        <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-2">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="snap-start shrink-0 basis-[280px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <blockquote className="text-sm text-neutral-700">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-3 text-xs text-neutral-500">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
