import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Settings, Smartphone, Target, Bot, GraduationCap } from "lucide-react";

export function HowItWorksSection() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+2348127297536", "_blank");
  };

  const services = [
    {
      icon: Settings,
      title: "Done-for-you setup",
      description: "Beacons, funnels, links, email & payment systems ready to go",
      color: "text-primary"
    },
    {
      icon: Smartphone, 
      title: "Daily content strategy",
      description: "Hands-free Instagram/Facebook posting that actually converts",
      color: "text-success"
    },
    {
      icon: Bot,
      title: "Lead generation automation", 
      description: "No more cold DMs - let the system bring customers to you",
      color: "text-purple-500"
    },
    {
      icon: Target,
      title: "High-converting funnel strategy",
      description: "Built with premium tools (Canva Pro, ManyChat, Beacons AI)",
      color: "text-orange-500"
    },
    {
      icon: GraduationCap,
      title: "Private guidance",
      description: "So you're never stuck or confused again",
      color: "text-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What You Get When You Work With Harper
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete done-for-you system that takes you from confused to converting
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
          <Card className="p-8 bg-gradient-success text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">
              Ready to Stop Struggling and Start Selling?
            </h3>
            <Button
              size="xl"
              variant="hero"
              onClick={handleWhatsAppClick}
              className="bg-white text-success hover:bg-white/90"
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