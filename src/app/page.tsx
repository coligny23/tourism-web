import SkipLink from "@/components/site/SkipLink";

import Hero from "@/components/site/Hero";
import AwardsStrip from "@/components/site/AwardsStrip";
import ReviewsCarousel from "@/components/site/ReviewsCarousel";

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main">
        <Hero />
        <AwardsStrip />
        <ReviewsCarousel />
      </main>
          </>
  );
}
