import { useState, lazy, Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { WhoIHelpSection } from "@/components/WhoIHelpSection";
import { PickYourPathSection } from "@/components/PickYourPathSection";
import { SEOHead } from "@/components/SEOHead";
import { UrgencyBannerSection } from "@/components/UrgencyBannerSection";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { LazySection } from "@/components/LazySection";
import { TrustedLogosSection } from "@/components/TrustedLogosSection";
import { LiveSuccessCounter } from "@/components/LiveSuccessCounter";
import { MobileNavigation } from "@/components/MobileNavigation";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useHolidayTheme } from "@/hooks/useHolidayTheme";
import { HolidayBanner } from "@/components/HolidayBanner";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { PullToRefresh } from "@/components/PullToRefresh";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-loaded heavy components
const PortfolioSection = lazy(() => import("@/components/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const ROICalculator = lazy(() => import("@/components/ROICalculator").then(m => ({ default: m.ROICalculator })));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const ResultsGallerySection = lazy(() => import("@/components/ResultsGallerySection").then(m => ({ default: m.ResultsGallerySection })));
const ThreeStagePromiseSection = lazy(() => import("@/components/ThreeStagePromiseSection").then(m => ({ default: m.ThreeStagePromiseSection })));
const PremiumTestimonials = lazy(() => import("@/components/ui/premium-testimonials").then(m => ({ default: m.PremiumTestimonials })));
const CertificationBadges = lazy(() => import("@/components/CertificationBadges").then(m => ({ default: m.CertificationBadges })));
const WhatIfSection = lazy(() => import("@/components/WhatIfSection").then(m => ({ default: m.WhatIfSection })));
const WhyNowSection = lazy(() => import("@/components/WhyNowSection").then(m => ({ default: m.WhyNowSection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
const FinalCTASection = lazy(() => import("@/components/FinalCTASection").then(m => ({ default: m.FinalCTASection })));
const ExitIntentModal = lazy(() => import("@/components/ExitIntentModal").then(m => ({ default: m.ExitIntentModal })));
const QuizModal = lazy(() => import("@/components/QuizModal").then(m => ({ default: m.QuizModal })));
const ContactFormModal = lazy(() => import("@/components/ContactFormModal").then(m => ({ default: m.ContactFormModal })));
const HolidayOfferCard = lazy(() => import("@/components/HolidayOfferCard").then(m => ({ default: m.HolidayOfferCard })));

function SectionSkeleton({ height = "min-h-[400px]" }: { height?: string }) {
  return (
    <div className={`${height} space-y-6 p-8`}>
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-5 w-1/2 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

const Index = () => {
  const { shouldShow: showExitIntent, resetExitIntent } = useExitIntent();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const { currentHoliday } = useHolidayTheme();
  const navigate = useNavigate();

  return (
    <PullToRefresh>
      <SEOHead />
      <ReadingProgressBar />
      
      <HolidayBanner />
      
      <UrgencyBannerSection />
      
      {/* Payment CTA Banner with Mobile Navigation */}
      <section className="sticky top-0 z-40 bg-gradient-luxury border-b border-luxury-gold/30 shadow-luxury">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <CreditCard className="w-5 h-5 text-accent flex-shrink-0 hidden sm:block" />
              <p className="text-white font-semibold text-sm md:text-base truncate">
                <span className="hidden sm:inline">Ready to secure your spot? Multiple payment options available!</span>
                <span className="sm:hidden">Secure your spot today!</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate('/payment-methods')}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-4 sm:px-6 py-2 shadow-gold whitespace-nowrap min-h-[44px] touch-manipulation text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Secure Your Spot Now</span>
                <span className="sm:hidden">Get Started</span>
              </Button>
              <MobileNavigation />
            </div>
          </div>
        </div>
      </section>
      
      <HeroSection />
      <TrustedLogosSection />
      <LiveSuccessCounter />
      <WhoIHelpSection />
      
      <LazySection fallbackHeight="min-h-[600px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[600px]" />}>
          <PortfolioSection />
        </Suspense>
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

      <LazySection fallbackHeight="min-h-[400px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
          <ROICalculator />
        </Suspense>
      </LazySection>

      {currentHoliday && (
        <LazySection fallbackHeight="min-h-[300px]">
          <Suspense fallback={<SectionSkeleton height="min-h-[300px]" />}>
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
          </Suspense>
        </LazySection>
      )}
      
      <LazySection fallbackHeight="min-h-[500px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <HowItWorksSection />
        </Suspense>
      </LazySection>
      
      <LazySection fallbackHeight="min-h-[600px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[600px]" />}>
          <ResultsGallerySection />
        </Suspense>
      </LazySection>
      
      <LazySection fallbackHeight="min-h-[500px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <ThreeStagePromiseSection />
        </Suspense>
      </LazySection>
      
      <LazySection fallbackHeight="min-h-[600px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[600px]" />}>
          <PremiumTestimonials />
        </Suspense>
      </LazySection>

      <LazySection fallbackHeight="min-h-[300px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[300px]" />}>
          <CertificationBadges />
        </Suspense>
      </LazySection>
      
      <LazySection fallbackHeight="min-h-[400px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
          <WhatIfSection />
        </Suspense>
      </LazySection>
      
      <LazySection fallbackHeight="min-h-[500px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
          <WhyNowSection />
        </Suspense>
      </LazySection>

      <LazySection fallbackHeight="min-h-[400px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
          <FAQSection />
        </Suspense>
      </LazySection>
      
      <LazySection fallbackHeight="min-h-[300px]">
        <Suspense fallback={<SectionSkeleton height="min-h-[300px]" />}>
          <FinalCTASection />
        </Suspense>
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
      <ScrollToTopButton />
      <Suspense fallback={null}>
        <ExitIntentModal 
          isOpen={showExitIntent} 
          onClose={resetExitIntent}
        />
      </Suspense>
      <Suspense fallback={null}>
        <QuizModal 
          isOpen={showQuiz} 
          onClose={() => setShowQuiz(false)}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ContactFormModal 
          isOpen={showContactForm} 
          onClose={() => setShowContactForm(false)}
        />
      </Suspense>
    </PullToRefresh>
  );
};

export default Index;
