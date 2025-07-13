import { Card } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, Eye, Zap } from "lucide-react";

export function WhyNowSection() {
  const delayPains = [
    {
      icon: Eye,
      title: "Lost visibility",
      description: "Every day without a system is another day your ideal customers can't find you",
      color: "text-red-500"
    },
    {
      icon: TrendingDown,
      title: "Missed sales", 
      description: "While you're figuring things out, competitors with systems are taking your customers",
      color: "text-orange-500"
    },
    {
      icon: Zap,
      title: "Zero momentum",
      description: "Without consistent action, you're starting from scratch every single day",
      color: "text-yellow-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">Urgent</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Don't Wait. The Price of Delay Is Higher Than You Think.
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The economy is shifting fast. Course buyers are out there—but only if they see you.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Every day you wait is a day of:
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {delayPains.map((pain, index) => {
              const IconComponent = pain.icon;
              return (
                <Card 
                  key={index}
                  className="p-8 text-center hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-fade-in border-l-4 border-l-red-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`inline-flex p-4 rounded-full bg-red-100 dark:bg-red-900/30 mb-6 ${pain.color}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {pain.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pain.description}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center animate-fade-in">
            <Card className="p-8 bg-gradient-primary text-white max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Don't let tech fear or setup stress be the reason you stay stuck.
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Your future self will thank you for taking action today. Every successful entrepreneur 
                started with a single decision to move forward.
              </p>
              <div className="bg-white/20 rounded-lg p-4">
                <p className="text-sm font-medium">
                  💡 The best time to plant a tree was 20 years ago. The second best time is now.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}