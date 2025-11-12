import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, DollarSign, Zap, Target } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function LiveSuccessCounter() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("success-counter");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const stats = [
    {
      icon: Users,
      label: "Success Stories",
      value: 147,
      suffix: "+",
      color: "text-blue-500"
    },
    {
      icon: DollarSign,
      label: "Client Revenue Generated",
      value: 12500000,
      prefix: "$",
      suffix: "+",
      color: "text-green-500"
    },
    {
      icon: Zap,
      label: "Funnels Built",
      value: 289,
      suffix: "+",
      color: "text-purple-500"
    },
    {
      icon: Target,
      label: "Average ROI Increase",
      value: 247,
      suffix: "%",
      color: "text-orange-500"
    }
  ];

  return (
    <section id="success-counter" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Results, <span className="text-primary">Real Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These numbers tell the story of businesses transformed through strategic funnel optimization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index}
                className="p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-card/50 border-2 hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full bg-primary/10 ${stat.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {isInView ? (
                    <AnimatedCounter 
                      end={stat.value} 
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>{stat.prefix}0{stat.suffix}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            Updated in real-time as we continue to help businesses scale
          </p>
        </div>
      </div>
    </section>
  );
}
