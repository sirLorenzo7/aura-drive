import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import EcosystemSection from "@/components/EcosystemSection";
import MobileAppSection from "@/components/MobileAppSection";
import TechSpecsSection from "@/components/TechSpecsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <MobileAppSection />
    <EcosystemSection />
    <TechSpecsSection />
    <Footer />
  </div>
);

export default Index;
