import { Card } from "@/components/ui/card";
import { Award, Shield, Star, Trophy, CheckCircle, Zap } from "lucide-react";

export function CertificationBadges() {
  const certifications = [
    {
      icon: Award,
      title: "Certified Funnel Strategist",
      issuer: "Digital Marketing Institute",
      year: "2023"
    },
    {
      icon: Shield,
      title: "Advanced Conversion Optimization",
      issuer: "CXL Institute",
      year: "2024"
    },
    {
      icon: Star,
      title: "Google Ads Certified",
      issuer: "Google",
      year: "2024"
    },
    {
      icon: Trophy,
      title: "Sales Funnel Expert",
      issuer: "ClickFunnels",
      year: "2023"
    },
    {
      icon: CheckCircle,
      title: "Meta Blueprint Certified",
      issuer: "Meta",
      year: "2024"
    },
    {
      icon: Zap,
      title: "Email Marketing Specialist",
      issuer: "HubSpot Academy",
      year: "2023"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certified <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Backed by industry-leading certifications and continuous professional development
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <Card 
                key={index}
                className="p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg backdrop-blur-sm bg-card/80 border hover:border-primary/50 group"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-sm mb-2 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs font-semibold text-primary">
                  {cert.year}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
