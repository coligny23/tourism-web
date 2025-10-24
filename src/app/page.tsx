import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import AwardsStrip from "@/components/site/AwardsStrip";
import ReviewsCarousel from "@/components/site/ReviewsCarousel";
import Footer from "@/components/site/Footer";


export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AwardsStrip />
        <ReviewsCarousel />
      </main>
      <Footer />
    </>
  );
}
