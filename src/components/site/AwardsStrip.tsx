export default function AwardsStrip() {
  const items = ["TATO", "TripAdvisor", "SafariBookings", "Kilimanjaro Guides", "CarbonCare"];
  return (
    <section aria-label="Awards and partners" className="border-y border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-6 px-4 py-6 md:grid-cols-5">
        {items.map((name) => (
          <div
            key={name}
            className="flex h-10 items-center justify-center rounded-md border border-dashed border-neutral-300 text-xs text-neutral-500"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
