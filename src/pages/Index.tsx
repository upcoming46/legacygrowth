import { useState } from "react";
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
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { QuizModal } from "@/components/QuizModal";
import { LazySection } from "@/components/LazySection";
import { TrustedLogosSection } from "@/components/TrustedLogosSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactFormModal } from "@/components/ContactFormModal";
import { useExitIntent } from "@/hooks/useExitIntent";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { shouldShow: showExitIntent, resetExitIntent } = useExitIntent();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <ReadingProgressBar />
      <UrgencyBannerSection />
      
      {/* Payment CTA Banner */}
      <section className="sticky top-0 z-40 bg-gradient-luxury border-b border-luxury-gold/30 shadow-luxury">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-accent" />
              <p className="text-white font-semibold text-sm md:text-base">
                Ready to secure your spot? Multiple payment options available!
              </p>
            </div>
            <Button
              onClick={() => navigate('/payment-methods')}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-6 py-2 shadow-gold"
            >
              Secure Your Spot Now
            </Button>
          </div>
        </div>
      </section>
      
      <HeroSection />
      <TrustedLogosSection />
      <WhoIHelpSection />
      
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
        <HowItWorksSection />
      </LazySection>
      
      <LazySection>
        <ResultsGallerySection />
      </LazySection>
      
      <LazySection>
        <ThreeStagePromiseSection />
      </LazySection>
      
      <LazySection>
        <ClientResultsSection />
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
