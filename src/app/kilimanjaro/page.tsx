export default function KilimanjaroPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Kilimanjaro</h1>
      <p className="mt-2 text-neutral-700">
        Routes, safety, packing list, and seasonality—everything you need to plan your climb.
      </p>
      <div id="packing" className="mt-10">
        <h2 className="text-lg font-semibold">Packing List</h2>
        <p className="mt-1 text-neutral-700">Detailed checklist coming soon.</p>
      </div>
      <div id="safety" className="mt-8">
        <h2 className="text-lg font-semibold">Safety & Health</h2>
        <p className="mt-1 text-neutral-700">Guidelines and acclimatization advice coming soon.</p>
      </div>
      <div id="season" className="mt-8">
        <h2 className="text-lg font-semibold">Best Season</h2>
        <p className="mt-1 text-neutral-700">Month-by-month guidance coming soon.</p>
      </div>
    </main>
  );
}
