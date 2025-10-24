export const NAV = {
  safaris: {
    popularParks: [
      { href: "/tours?park=serengeti", label: "Serengeti" },
      { href: "/tours?park=ngorongoro", label: "Ngorongoro" },
      { href: "/tours?park=tarangire", label: "Tarangire" }
    ],
    byStyle: [
      { href: "/tours?style=budget", label: "Budget" },
      { href: "/tours?style=midrange", label: "Mid-Range" },
      { href: "/tours?style=luxury", label: "Luxury" }
    ],
    byDuration: [
      { href: "/tours?days=3-4", label: "3–4 Days" },
      { href: "/tours?days=5-6", label: "5–6 Days" },
      { href: "/tours?days=7+", label: "7+ Days" }
    ]
  },
  kilimanjaro: {
    routes: [
      { href: "/kilimanjaro/machame", label: "Machame" },
      { href: "/kilimanjaro/lemosho", label: "Lemosho" },
      { href: "/kilimanjaro/marangu", label: "Marangu" }
    ],
    plan: [
      { href: "/kilimanjaro#packing", label: "Packing List" },
      { href: "/kilimanjaro#safety", label: "Safety & Health" },
      { href: "/kilimanjaro#season", label: "Best Season" }
    ]
  },
  zanzibar: {
    plan: [
      { href: "/zanzibar#when-to-go", label: "When to Go" },
      { href: "/zanzibar#where-to-stay", label: "Where to Stay" },
      { href: "/zanzibar#packages", label: "Packages" }
    ],
    islands: [
      { href: "/zanzibar#nungwi", label: "Nungwi" },
      { href: "/zanzibar#paje", label: "Paje" },
      { href: "/zanzibar#stone-town", label: "Stone Town" }
    ]
  }
} as const;
