import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TwoStepCTAModal } from "@/components/TwoStepCTAModal";
import { ShaderBackground } from "@/components/ui/neural-network-hero";
import { MessageCircle, Mail, Star, TrendingUp, DollarSign } from "lucide-react";
import { RevenueTrendChart } from "@/components/RevenueTrendChart";

export function HeroSection() {
  const [showCTAModal, setShowCTAModal] = useState(false);
  const [ctaType, setCTAType] = useState<"general" | "funnel" | "setup">("general");

  const handleWhatsAppClick = () => {
    setCTAType("general");
    setShowCTAModal(true);
  };

  const handleEmailClick = () => {
    setCTAType("setup");
    setShowCTAModal(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Neural Network Shader Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ShaderBackground />
      </div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Success Indicators */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-6">
              <Card className="p-2 sm:p-3 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-white">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-medium">Digital Expert</span>
                </div>
              </Card>
              <Card className="p-2 sm:p-3 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-xs sm:text-sm font-medium">Proven Results</span>
                </div>
              </Card>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Struggling to Get Sales? Here's How to Turn Your Digital Products Into Revenue
            </h1>
            
            <h2 className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-4 font-medium font-serif">
              Professional Sales Funnel Setup That Gets Results in 7-14 Days
            </h2>
            
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              If you have a digital product but struggle to get consistent sales, I can help. Expert funnel setup and optimization service that helped 100+ digital marketers generate their first $424+ in overnight sales. No tech skills required—I handle everything for you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="xl"
                variant="whatsapp"
                onClick={handleWhatsAppClick}
                className="group text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Start Your Transformation</span>
                <span className="sm:hidden">Get Started</span>
              </Button>
              
              <Button
                size="xl"
                className="group text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold hover:shadow-glow"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Book Your Setup</span>
                <span className="sm:hidden">Book Setup</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
              <Card className="p-3 sm:p-4 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-4 text-white">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <DollarSign className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-center lg:text-left">Helping everyday people turn digital skills into passive income</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Interactive Chart */}
          <div className="relative animate-scale-in flex items-center justify-center">
            <div className="relative w-full max-w-lg mx-auto">
              <RevenueTrendChart />
            </div>
          </div>
        </div>
      </div>
      
      <TwoStepCTAModal 
        isOpen={showCTAModal} 
        onClose={() => setShowCTAModal(false)}
        ctaType={ctaType}
      />
    </section>
  );
}