import { Card } from "@/components/ui/card";
import { Star, DollarSign, TrendingUp, Clock, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

export function ClientResultsSection() {
  const [popupTestimonials, setPopupTestimonials] = useState<Array<{id: number, testimonial: any, visible: boolean}>>([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote: "I hit $474,542 in my Cash App after Harper set up my digital systems. I never thought this was possible!",
      name: "Client M.",
      role: "Digital Entrepreneur",
      icon: "💰",
      metric: "$474,542 total",
      metricIcon: DollarSign
    },
    {
      quote: "My PayPal went from $0 to $70,900 in just a few months. Harper's strategies actually work!",
      name: "Sarah K.",
      role: "Course Creator", 
      icon: "🚀",
      metric: "$70,900 PayPal",
      metricIcon: DollarSign
    },
    {
      quote: "Got a $30,000 credit alert from my bank after implementing Harper's system. This changed everything!",
      name: "Alex P.",
      role: "Affiliate Marketer",
      icon: "🏦", 
      metric: "$30,000 alert",
      metricIcon: DollarSign
    },
    {
      quote: "My Beacons store hit $38,378.73 this month alone. Harper's setup process is incredible!",
      name: "Jessica R.",
      role: "Digital Creator",
      icon: "📊",
      metric: "$38,378.73/month",
      metricIcon: TrendingUp
    },
    {
      quote: "Woke up to $20,833 direct deposit in my Cash App. Harper's automation really works while you sleep!",
      name: "Michael T.",
      role: "Busy Parent",
      icon: "😴",
      metric: "$20,833 deposit",
      metricIcon: DollarSign
    },
    {
      quote: "My bank balance went to $256,880. I was broke 6 months ago. Harper saved my life!",
      name: "Lisa M.",
      role: "Former 9-5er",
      icon: "🙏",
      metric: "$256,880 balance",
      metricIcon: DollarSign
    },
    {
      quote: "My Stan store generated $12,747 with 3,057 visits. Harper's conversion tactics are insane!",
      name: "David C.",
      role: "Content Creator",
      icon: "📈",
      metric: "$12,747 revenue",
      metricIcon: TrendingUp
    },
    {
      quote: "From $0 to $25,639.73 in total earnings. Harper doesn't just teach, he delivers results!",
      name: "Emma W.",
      role: "New Entrepreneur",
      icon: "✨",
      metric: "$25,639.73 total",
      metricIcon: DollarSign
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const testimonial = testimonials[testimonialIndex % testimonials.length];
      const newPopup = {
        id: Date.now(),
        testimonial,
        visible: true
      };

      setPopupTestimonials(prev => [...prev, newPopup]);
      setTestimonialIndex(prev => prev + 1);

      // Remove popup after 5 seconds
      setTimeout(() => {
        setPopupTestimonials(prev => 
          prev.map(popup => 
            popup.id === newPopup.id ? { ...popup, visible: false } : popup
          )
        );
      }, 5000);

      // Clean up hidden popups after 6 seconds
      setTimeout(() => {
        setPopupTestimonials(prev => prev.filter(popup => popup.id !== newPopup.id));
      }, 6000);
    }, 10000); // New popup every 10 seconds (changed from 60 seconds for demo)

    return () => clearInterval(interval);
  }, [testimonialIndex]);

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
            { number: "1000+", label: "Success Stories" },
            { number: "$5.2M+", label: "Client Revenue Generated" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "12hr", label: "Average Setup Time" }
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="p-6 hover:shadow-glow transition-all duration-300">
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            </div>
          ))}
        </div>

        {/* Animated Popup Testimonials */}
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {popupTestimonials.map((popup) => {
            const MetricIcon = popup.testimonial.metricIcon;
            return (
              <div
                key={popup.id}
                className={`
                  bg-background border shadow-glow rounded-lg p-4 max-w-sm transform transition-all duration-500 ease-out
                  ${popup.visible 
                    ? 'translate-x-0 opacity-100 scale-100' 
                    : 'translate-x-full opacity-0 scale-95'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {popup.testimonial.name}
                      </p>
                      <span className="text-xs text-muted-foreground">just now</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {popup.testimonial.quote}
                    </p>
                    <div className="flex items-center gap-1">
                      <MetricIcon className="h-3 w-3 text-success" />
                      <span className="text-xs font-bold text-success">
                        {popup.testimonial.metric}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {popup.testimonial.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}