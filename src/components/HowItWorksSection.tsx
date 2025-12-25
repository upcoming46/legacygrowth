import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Settings, Smartphone, Target, Bot, GraduationCap } from "lucide-react";
import { getWhatsAppLink } from "@/config/whatsapp";

export function HowItWorksSection() {
  const handleWhatsAppClick = () => {
    window.open(getWhatsAppLink(), "_blank");
  };

  const services = [
    {
      icon: Settings,
      title: "Step 1: Complete Done-For-You Setup",
      description: "I build your Beacons store, sales funnel, payment system, and email automation. Everything ready to collect payments in 72 hours.",
      color: "text-primary"
    },
    {
      icon: Smartphone, 
      title: "Step 2: Content & Marketing Strategy",
      description: "Receive proven Instagram and Facebook content templates that convert followers into buyers automatically.",
      color: "text-success"
    },
    {
      icon: Bot,
      title: "Step 3: Lead Generation Automation", 
      description: "Automated lead magnet funnels and chatbot sequences that bring interested customers to you 24/7.",
      color: "text-purple-500"
    },
    {
      icon: Target,
      title: "Step 4: Conversion Optimization",
      description: "High-converting sales pages built with premium tools (Canva Pro, ManyChat, Beacons AI) proven to get sales.",
      color: "text-orange-500"
    },
    {
      icon: GraduationCap,
      title: "Step 5: Ongoing Support & Training",
      description: "30 days of WhatsApp support so you're never confused about how to use your new system.",
      color: "text-blue-500"
    }
  ];

  // Add HowTo Schema
  useEffect(() => {
    let existingScript = document.getElementById('howto-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Set Up a High-Converting Sales Funnel for Digital Products",
      "description": "Complete guide to setting up a sales funnel that generates consistent revenue from digital products and courses",
      "step": services.map((service, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": service.title,
        "text": service.description
      }))
    };

    const script = document.createElement('script');
    script.id = 'howto-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(howToSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('howto-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How Do I Help You Get Sales From Your Digital Products?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here's my proven 5-step process that takes you from confused to converting in 72 hours
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className="p-8 text-center hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <IconComponent className={`h-8 w-8 inline-flex p-4 rounded-full bg-muted mb-6 group-hover:scale-110 transition-transform ${service.color}`} />
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <Card className="p-8 bg-primary text-primary-foreground max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">
              Ready to Stop Struggling and Start Selling?
            </h3>
            <Button
              size="xl"
              variant="hero"
              onClick={handleWhatsAppClick}
              className="bg-white text-foreground hover:bg-white/90"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Book Your Setup Now via WhatsApp
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}