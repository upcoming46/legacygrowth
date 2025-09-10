import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TwoStepCTAModal } from "@/components/TwoStepCTAModal";
import { MessageCircle, Mail, CheckCircle, Sparkles } from "lucide-react";

export function FinalCTASection() {
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

  const benefits = [
    "No more tech overwhelm - I handle everything",
    "Start seeing results in days, not months", 
    "Join hundreds of successful clients",
    "Get personal guidance from a proven expert"
  ];

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-bounce">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <div className="absolute bottom-10 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce" style={{ animationDelay: '2s' }}>
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Are You Ready To Finally Make This Work?
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Whether you just got your DWA course, or you've been stuck with no sales—this is your shortcut.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Value Proposition */}
          <Card className="p-8 mb-12 bg-white/10 border-white/20 backdrop-blur-sm animate-scale-in">
            <div className="text-center text-white mb-8">
              <h3 className="text-2xl font-bold mb-6">
                You don't need to figure it all out yourself.
              </h3>
              <p className="text-lg opacity-90 mb-6">
                You just need someone who's done it hundreds of times.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 text-white animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg text-white font-medium">
                Let's build the system that makes you the next success story.
              </p>
            </div>
          </Card>

          {/* Main CTA */}
          <div className="text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-8">
              Ready to transform your digital business today?
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="xl"
                variant="whatsapp"
                onClick={handleWhatsAppClick}
                className="group shadow-success"
              >
                <MessageCircle className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                Message Harper on WhatsApp Now
              </Button>
              
              <Button
                size="xl"
                variant="hero"
                onClick={handleEmailClick}
                className="group bg-white text-primary hover:bg-white/90"
              >
                <Mail className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                Email Harper Directly
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="text-center text-white">
                  <MessageCircle className="h-6 w-6 mx-auto mb-2 text-green-300" />
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm opacity-90">0812 729 7536</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="text-center text-white">
                  <Mail className="h-6 w-6 mx-auto mb-2 text-blue-300" />
                  <p className="font-medium">Email</p>
                  <p className="text-sm opacity-90">harperharvey834@gmail.com</p>
                </div>
              </Card>
            </div>

            {/* Final Promise */}
            <div className="mt-12">
              <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
                <p className="text-white text-lg font-medium">
                  💼 <strong>Harper Harvey</strong> | Digital Success Expert
                </p>
                <p className="text-white/80 mt-2">
                  Helping everyday people turn digital skills into passive income
                </p>
              </Card>
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