import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, BookOpen, TrendingUp, Zap } from "lucide-react";

export function PickYourPathSection() {
  const paths = [
    {
      icon: BookOpen,
      title: "I just bought the course and feel lost",
      description: "Perfect! Let's get you set up properly from day one.",
      whatsappMessage: "Hey Harper, I just bought the course and feel completely lost. I really need help getting set up properly. What's next?",
      color: "luxury-navy"
    },
    {
      icon: Zap,
      title: "I set up my store but have no sales",
      description: "Time to optimize and get those conversions flowing.",
      whatsappMessage: "Hey Harper, I've set up my store but I'm not getting any sales. I need help with optimization and conversions. Can you help?",
      color: "luxury-purple"
    },
    {
      icon: TrendingUp,
      title: "I want to scale and automate",
      description: "Let's build systems that work while you sleep.",
      whatsappMessage: "Hey Harper, I'm ready to scale my business and want to set up automation systems. Let's talk about taking this to the next level!",
      color: "luxury-gold"
    }
  ];

  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+234812729753?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Pick Your Path
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Where are you right now? Choose your situation below and get personalized guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {paths.map((path, index) => {
            const IconComponent = path.icon;
            return (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-center hover:bg-white/15 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-luxury group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                    <IconComponent className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-white mb-4">
                    {path.title}
                  </h3>
                  <p className="text-white/70 mb-6">
                    {path.description}
                  </p>
                </div>
                
                <Button
                  onClick={() => handleWhatsAppClick(path.whatsappMessage)}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold py-3 transition-all duration-300 hover:shadow-gold"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start This Path
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}