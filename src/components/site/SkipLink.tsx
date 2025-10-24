export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 'focus:z-100' focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow"
    >
      Skip to content
    </a>
  );
}
