import { HeroSection } from "@/components/HeroSection";
import { WhoIHelpSection } from "@/components/WhoIHelpSection";
import { PickYourPathSection } from "@/components/PickYourPathSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ResultsGallerySection } from "@/components/ResultsGallerySection";
import { ClientResultsSection } from "@/components/ClientResultsSection";
import { ThreeStagePromiseSection } from "@/components/ThreeStagePromiseSection";
import { WhatIfSection } from "@/components/WhatIfSection";
import { UrgencyBannerSection } from "@/components/UrgencyBannerSection";
import { WhyNowSection } from "@/components/WhyNowSection";
import { FinalCTASection } from "@/components/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <UrgencyBannerSection />
      <HeroSection />
      <WhoIHelpSection />
      <PickYourPathSection />
      <HowItWorksSection />
      <ResultsGallerySection />
      <ThreeStagePromiseSection />
      <ClientResultsSection />
      <WhatIfSection />
      <WhyNowSection />
      <FinalCTASection />
    </div>
  );
};

export default Index;
