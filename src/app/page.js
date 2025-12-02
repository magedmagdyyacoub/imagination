import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="bg-body text-body">
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );
}
