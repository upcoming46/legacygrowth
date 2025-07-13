import { HeroSection } from "@/components/HeroSection";
import { WhoIHelpSection } from "@/components/WhoIHelpSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ClientResultsSection } from "@/components/ClientResultsSection";
import { WhyNowSection } from "@/components/WhyNowSection";
import { FinalCTASection } from "@/components/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhoIHelpSection />
      <HowItWorksSection />
      <ClientResultsSection />
      <WhyNowSection />
      <FinalCTASection />
    </div>
  );
};

export default Index;
