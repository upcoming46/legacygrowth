import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { WhoIHelpSection } from "@/components/WhoIHelpSection";
import { PickYourPathSection } from "@/components/PickYourPathSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ResultsGallerySection } from "@/components/ResultsGallerySection";
import { SEOHead } from "@/components/SEOHead";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ThreeStagePromiseSection } from "@/components/ThreeStagePromiseSection";
import { WhatIfSection } from "@/components/WhatIfSection";
import { UrgencyBannerSection } from "@/components/UrgencyBannerSection";
import { WhyNowSection } from "@/components/WhyNowSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { QuizModal } from "@/components/QuizModal";
import { LazySection } from "@/components/LazySection";
import { TrustedLogosSection } from "@/components/TrustedLogosSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactFormModal } from "@/components/ContactFormModal";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useHolidayTheme } from "@/hooks/useHolidayTheme";
import { HolidayBanner } from "@/components/HolidayBanner";
import { HolidayOfferCard } from "@/components/HolidayOfferCard";
import { ROICalculator } from "@/components/ROICalculator";
import { LiveSuccessCounter } from "@/components/LiveSuccessCounter";
import { CertificationBadges } from "@/components/CertificationBadges";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { shouldShow: showExitIntent, resetExitIntent } = useExitIntent();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const { currentHoliday } = useHolidayTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <SEOHead />
      <ReadingProgressBar />
      
      {/* Holiday Banner - Shows at top when holiday is active */}
      <HolidayBanner />
      
      <UrgencyBannerSection />
      
      {/* Payment CTA Banner */}
      <section className="sticky top-0 z-40 bg-gradient-luxury border-b border-luxury-gold/30 shadow-luxury">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4 flex-wrap justify-between w-full">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-accent" />
                <p className="text-white font-semibold text-sm md:text-base">
                  Ready to secure your spot? Multiple payment options available!
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => navigate('/blog')}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold"
                >
                  Free Resources
                </Button>
                <Button
                  onClick={() => navigate('/client-portal')}
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold"
                >
                  Client Login
                </Button>
                <Button
                  onClick={() => navigate('/payment-methods')}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-6 py-2 shadow-gold"
                >
                  Secure Your Spot Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <HeroSection />
      <TrustedLogosSection />
      <LiveSuccessCounter />
      <WhoIHelpSection />
      
      <LazySection>
        <PortfolioSection />
      </LazySection>
      
      {/* Quiz CTA Section */}
      <section className="py-16 bg-gradient-luxury">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center space-x-2 text-luxury-gold">
              <Brain className="w-8 h-8" />
              <span className="text-lg font-semibold">Free Business Assessment</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Discover Your Perfect Path to $5K+ Monthly
            </h2>
            <p className="text-white/90 text-lg">
              Take our 4-question quiz and get a personalized business blueprint based on your current situation and goals.
            </p>
            <Button
              onClick={() => setShowQuiz(true)}
              className="bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 font-semibold px-8 py-4 text-lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              Take the Quiz (2 minutes)
            </Button>
            <p className="text-white/70 text-sm">Join 1000+ students who discovered their ideal path</p>
          </div>
        </div>
      </section>

      <PickYourPathSection />

      <LazySection>
        <ROICalculator />
      </LazySection>

      {/* Holiday Special Offer - Shows when holiday is active */}
      {currentHoliday && (
        <LazySection>
          <section className="py-16 px-4 bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {currentHoliday.decorations.icon} Limited Time {currentHoliday.name} Offer {currentHoliday.decorations.icon}
                </h2>
                <p className="text-lg text-muted-foreground">
                  Celebrate {currentHoliday.name} with exclusive savings on all digital business setups!
                </p>
              </div>
              <HolidayOfferCard onCTAClick={() => setShowContactForm(true)} />
            </div>
          </section>
        </LazySection>
      )}
      
      <LazySection>
        <HowItWorksSection />
      </LazySection>
      
      <LazySection>
        <ResultsGallerySection />
      </LazySection>
      
      <LazySection>
        <ThreeStagePromiseSection />
      </LazySection>
      
      <LazySection>
        <TestimonialsSection />
      </LazySection>

      <LazySection>
        <CertificationBadges />
      </LazySection>
      
      <LazySection>
        <WhatIfSection />
      </LazySection>
      
      <LazySection>
        <WhyNowSection />
      </LazySection>

      <LazySection>
        <FAQSection />
      </LazySection>
      
      <LazySection>
        <FinalCTASection />
      </LazySection>

      {/* Quick Contact CTA */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Have Questions? Let's Talk
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Not ready to commit? That's okay! Message me with your questions and let's see if this is the right fit for you.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setShowContactForm(true)}
            className="shadow-lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Ask a Question
          </Button>
        </div>
      </section>
      
      <StickyMobileCTA />
      <ExitIntentModal 
        isOpen={showExitIntent} 
        onClose={resetExitIntent}
      />
      <QuizModal 
        isOpen={showQuiz} 
        onClose={() => setShowQuiz(false)}
      />
      <ContactFormModal 
        isOpen={showContactForm} 
        onClose={() => setShowContactForm(false)}
      />
    </div>
  );
};

export default Index;
