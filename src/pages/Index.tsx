import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ModulesSection from "@/components/landing/ModulesSection";
import ArchitectureSection from "@/components/landing/ArchitectureSection";
import MetricsSection from "@/components/landing/MetricsSection";
import CredibilitySection from "@/components/landing/CredibilitySection";
import LandingFooter from "@/components/landing/LandingFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ModulesSection />
        <ArchitectureSection />
        <MetricsSection />
        <CredibilitySection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Index;
