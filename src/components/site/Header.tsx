"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import FocusTrap from "@/lib/focus-trap";
import { NAV } from "@/data/nav";

type MenuKey = "safaris" | "kilimanjaro" | "zanzibar" | null;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 2);
  onScroll();
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);


  // close menus on escape / outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const navLink =
    "px-3 py-2 rounded-lg text-sm font-medium hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <header className={cn(
        "sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur transition-shadow",
        scrolled && "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
        )}>
      <div className="container flex h-16 items-center justify-between" ref={wrapRef}>
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <span className="h-7 w-7 rounded-full bg-brand" />
          <span className="text-base font-semibold">Echelon Safaris Co</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-1 ml-auto">
          {/* Safaris (mega) */}
          <div className="relative">
            <button
              className={cn(navLink, open === "safaris" && "bg-neutral-100")}
              aria-expanded={open === "safaris"}
              aria-controls="menu-safaris"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o === "safaris" ? null : "safaris"));
              }}
            >
              Safaris <ChevronDown className="ml-1 inline h-4 w-4" />
            </button>
            <MegaMenu id="menu-safaris" open={open === "safaris"}>
              <MenuSection title="Popular Parks" links={NAV.safaris.popularParks} />
              <MenuSection title="By Style" links={NAV.safaris.byStyle} />
              <MenuSection title="By Duration" links={NAV.safaris.byDuration} />
            </MegaMenu>
          </div>

          {/* Kilimanjaro (mega) */}
          <div className="relative">
            <button
              className={cn(navLink, open === "kilimanjaro" && "bg-neutral-100")}
              aria-expanded={open === "kilimanjaro"}
              aria-controls="menu-kili"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o === "kilimanjaro" ? null : "kilimanjaro"));
              }}
            >
              Kilimanjaro <ChevronDown className="ml-1 inline h-4 w-4" />
            </button>
            <MegaMenu id="menu-kili" open={open === "kilimanjaro"}>
              <MenuSection title="Routes" links={NAV.kilimanjaro.routes} />
              <MenuSection title="Plan" links={NAV.kilimanjaro.plan} />
            </MegaMenu>
          </div>

          {/* Zanzibar (mega) */}
          <div className="relative">
            <button
              className={cn(navLink, open === "zanzibar" && "bg-neutral-100")}
              aria-expanded={open === "zanzibar"}
              aria-controls="menu-zanzibar"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((o) => (o === "zanzibar" ? null : "zanzibar"));
              }}
            >
              Zanzibar <ChevronDown className="ml-1 inline h-4 w-4" />
            </button>
            <MegaMenu id="menu-zanzibar" open={open === "zanzibar"}>
              <MenuSection title="Plan" links={NAV.zanzibar.plan} />
              <MenuSection title="Islands" links={NAV.zanzibar.islands} />
            </MegaMenu>
          </div>

          <Link className={cn(navLink, "link-underline")} href="/blog" prefetch={false}>Blog</Link>
          <Link className={cn(navLink, "link-underline")} href="/about" prefetch={false}>About</Link>


          <Link
            href="/plan-my-trip"
            className="ml-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Plan My Trip
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl space-y-3 px-4 py-4">
            <MobileGroup title="Safaris" links={[...NAV.safaris.popularParks, { href: "/tours", label: "All Safaris" }]} />
            <MobileGroup title="Kilimanjaro" links={[...NAV.kilimanjaro.routes, { href: "/kilimanjaro", label: "All Routes" }]} />
            <MobileGroup title="Zanzibar" links={NAV.zanzibar.plan} />
            <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100" href="/blog">Blog</Link>
            <Link className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100" href="/about">About</Link>
            <Link className="block rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white" href="/plan-my-trip">Plan My Trip</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaMenu({
  id,
  open,
  children,
}: {
  id: string;
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      role="menu"
      aria-hidden={!open}
      className={cn(
        "absolute left-0 top-full w-[640px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl",
        "grid grid-cols-3 gap-4",
        !open && "hidden"
      )}
    >
      <FocusTrap active={open}>{children}</FocusTrap>
    </div>
  );
}

function MenuSection({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">{title}</div>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link className="block rounded-md px-2 py-1 text-sm hover:bg-neutral-100" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileGroup({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">{title}</div>
      <div className="space-y-1">
        {links.map((l) => (
          <Link key={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-100" href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
