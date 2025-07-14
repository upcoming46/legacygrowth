import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Check, MessageCircle, Mail } from "lucide-react";

export function WhatIfSection() {
  const negativeScenarios = [
    "What if you keep waiting another month?",
    "What if you keep watching everyone else post their wins while you feel stuck?", 
    "What if your buyers try to purchase and the payment fails?",
    "What if you never figure out the tech setup on your own?"
  ];

  const positiveScenarios = [
    "What if you wake up to $424 overnight?",
    "What if your store finally feels real and ready?",
    "What if you never have to worry about setup again?",
    "What if you become the success story others look up to?"
  ];

  const handleWhatsAppClick = () => {
    const message = "Hey Harper, I'm tired of waiting and watching others succeed. I'm ready to get my digital business set up properly. Let's do this!";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+2348127297536?text=${encodedMessage}`, '_blank');
  };

  const handleEmailClick = () => {
    const subject = "I Choose Success - Ready to Work with Harper";
    const body = "Hi Harper,\n\nI'm tired of waiting and watching others succeed while I stay stuck. I'm ready to make the decision that will change everything.\n\nI want to:\n- Stop struggling with tech overwhelm\n- Finally get my digital business set up properly\n- Start generating real results like your other clients\n- Transform my confusion into consistent sales\n\nI'm ready to choose success over staying stuck. Let's make this happen!\n\nBest regards";
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:harperharvey834@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-luxury">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 sm:mb-6">
            The Cost of Waiting
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Every day you delay is a day of missed opportunities. Let's flip the script.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
          {/* Negative Scenarios */}
          <Card className="bg-white/5 backdrop-blur-sm border-red-500/30 p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                If You Keep Waiting...
              </h3>
            </div>
            
            <div className="space-y-4">
              {negativeScenarios.map((scenario, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <p className="text-white/80">{scenario}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Positive Scenarios */}
          <Card className="bg-white/5 backdrop-blur-sm border-accent/30 p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                When You Take Action...
              </h3>
            </div>
            
            <div className="space-y-4">
              {positiveScenarios.map((scenario, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <p className="text-white/80">{scenario}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-serif font-bold text-white mb-6">
            Which Reality Do You Choose?
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            The difference between struggling and succeeding isn't talent or luck—it's taking action when the moment is right. That moment is now.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-gold hover:transform hover:scale-105"
            >
              <MessageCircle className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Choose Success - WhatsApp Harper</span>
              <span className="sm:hidden">WhatsApp Harper</span>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={handleEmailClick}
              className="border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300"
            >
              <Mail className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Email Harper</span>
              <span className="sm:hidden">Email</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}