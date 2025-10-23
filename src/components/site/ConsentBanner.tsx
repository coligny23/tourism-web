"use client";

import { useEffect, useState } from "react";

export default function ConsentBanner() {
  // Compute initial state once (no setState in effect)
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem("consent");
  });

  // Sync across tabs/windows (no synchronous setState on mount)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "consent") setOpen(!e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!open) return null;

  const accept = () => {
    localStorage.setItem("consent", "granted");
    setOpen(false);
  };
  const decline = () => {
    localStorage.setItem("consent", "denied");
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl rounded-t-2xl border border-neutral-200 bg-white/95 p-4 shadow-xl">
      <p className="text-sm text-neutral-700">
        We use cookies/analytics to improve your experience. You can change your mind anytime.
      </p>
      <div className="mt-3 flex gap-2">
        <button className="rounded-lg bg-brand px-3 py-2 text-sm text-white" onClick={accept}>
          Accept
        </button>
        <button className="rounded-lg border border-neutral-300 px-3 py-2 text-sm" onClick={decline}>
          Decline
        </button>
      </div>
    </div>
  );
}
