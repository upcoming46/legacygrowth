import { Card } from "@/components/ui/card";
import { Star, DollarSign, TrendingUp, Clock } from "lucide-react";

export function ClientResultsSection() {
  const testimonials = [
    {
      quote: "I made $424 overnight after Harper set up my Beacons store. I didn't even know how to log in before this.",
      name: "Anita Foster",
      role: "Side Hustle Mom",
      icon: "🌟",
      metric: "$424 overnight",
      metricIcon: DollarSign
    },
    {
      quote: "I was stuck for 2 months. Harper got my sales rolling in 3 days flat.",
      name: "Jill",
      role: "9-5 Worker", 
      icon: "💼",
      metric: "3 days to sales",
      metricIcon: Clock
    },
    {
      quote: "My TikTok post hit 1.6K views in 3 days after Harper took over my content.",
      name: "Rebirth",
      role: "Digital Creator",
      icon: "🔥", 
      metric: "1.6K views",
      metricIcon: TrendingUp
    },
    {
      quote: "Finally someone who explains tech stuff in normal language. My funnel is converting at 8%!",
      name: "Sarah M.",
      role: "Course Creator",
      icon: "💡",
      metric: "8% conversion",
      metricIcon: TrendingUp
    },
    {
      quote: "Harper's automation saved me 20 hours a week. I'm actually making money while I sleep now.",
      name: "Marcus T.",
      role: "Busy Dad",
      icon: "⏰",
      metric: "20hrs saved/week",
      metricIcon: Clock
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Proof It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real people. Real results. Real transformations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const MetricIcon = testimonial.metricIcon;
            return (
              <Card 
                key={index}
                className="p-6 hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-fade-in group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{testimonial.icon}</span>
                        {testimonial.role}
                      </p>
                    </div>

                    {/* Metric */}
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-success font-bold">
                        <MetricIcon className="h-4 w-4" />
                        <span className="text-sm">{testimonial.metric}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Success Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Success Stories" },
            { number: "$2.1M+", label: "Client Revenue Generated" },
            { number: "95%", label: "Client Satisfaction" },
            { number: "24hr", label: "Average Setup Time" }
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="p-6 hover:shadow-glow transition-all duration-300">
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}