import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Settings, Rocket, TrendingUp, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/config/whatsapp";

export function ThreeStagePromiseSection() {
  const stages = [
    {
      phase: "Phase 1",
      title: "Setup",
      description: "Store, Beacons, Affiliate link, Payments",
      details: [
        "Complete Beacons.ai store setup",
        "Payment gateway integration", 
        "Affiliate link optimization",
        "Professional branding setup"
      ],
      icon: Settings,
      color: "luxury-navy",
      timeline: "Day 1-2"
    },
    {
      phase: "Phase 2", 
      title: "Launch",
      description: "Social media, content, posting system",
      details: [
        "Content strategy development",
        "Automated posting system",
        "Instagram & Facebook optimization",
        "Engagement funnel creation"
      ],
      icon: Rocket,
      color: "luxury-purple", 
      timeline: "Day 3-5"
    },
    {
      phase: "Phase 3",
      title: "Scale", 
      description: "Lead generation, funnel, automation",
      details: [
        "Advanced funnel optimization",
        "Lead generation automation",
        "ManyChat integration",
        "Revenue scaling systems"
      ],
      icon: TrendingUp,
      color: "luxury-gold",
      timeline: "Day 6+"
    }
  ];

  const handleWhatsAppClick = () => {
    window.open(getWhatsAppLink("Hey Harper, I love your 3-Stage Promise system! I'm ready to go through all three phases and build a real business. Let's start with Phase 1!"), '_blank');
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-accent text-accent-foreground mb-4 px-4 py-2">
            ✨ Proven Framework
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Harper's 3-Stage Promise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This isn't random help—it's a structured system that's worked for 100+ students. 
            Here's exactly how we'll transform your digital business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {stages.map((stage, index) => {
            const IconComponent = stage.icon;
            return (
              <Card 
                key={index}
                className="relative p-8 hover:transform hover:scale-105 transition-all duration-500 hover:shadow-luxury group border-2 hover:border-accent/20"
              >
                {/* Stage Number */}
                <div className="absolute -top-4 left-8">
                  <Badge className="bg-accent text-accent-foreground px-4 py-2 text-sm font-bold">
                    {stage.phase}
                  </Badge>
                </div>

                <div className="text-center mb-6 mt-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {stage.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {stage.timeline}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {stage.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-gradient-luxury p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Ready to Go Through All 3 Phases?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Most people try to figure this out alone and get stuck in Phase 1 forever. 
              With Harper's guidance, you'll move through all 3 phases systematically.
            </p>
            
            <Button 
              size="lg"
              onClick={handleWhatsAppClick}
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:shadow-gold hover:transform hover:scale-105"
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Start Phase 1 Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}