import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Eye } from "lucide-react";

export function ResultsGallerySection() {
  const results = [
    {
      type: "Sale Notification",
      amount: "$424",
      description: "Overnight sale after setup",
      time: "3:42 AM",
      icon: DollarSign,
      gradient: "gradient-gold"
    },
    {
      type: "Traffic Spike", 
      amount: "1.6K",
      description: "TikTok views in 3 days",
      time: "2 hours ago",
      icon: Eye,
      gradient: "gradient-purple"
    },
    {
      type: "Revenue Stream",
      amount: "$1,200", 
      description: "First week earnings",
      time: "Just now",
      icon: TrendingUp,
      gradient: "gradient-navy"
    },
    {
      type: "Follower Growth",
      amount: "2,500",
      description: "New followers in 30 days", 
      time: "1 week ago",
      icon: Users,
      gradient: "gradient-gold"
    },
    {
      type: "Commission Earned",
      amount: "$856",
      description: "Single affiliate sale",
      time: "5 minutes ago", 
      icon: DollarSign,
      gradient: "gradient-purple"
    },
    {
      type: "Conversion Rate",
      amount: "23%",
      description: "Store conversion rate",
      time: "Updated",
      icon: TrendingUp,
      gradient: "gradient-navy"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-accent text-accent-foreground mb-4 px-3 sm:px-4 py-2 text-sm sm:text-base">
            ✨ Trusted by 100+ Students
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            Results Gallery
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Real results from real students. These aren't fake screenshots—these are actual notifications from Harper's students.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {results.map((result, index) => {
            const IconComponent = result.icon;
            return (
              <Card 
                key={index}
                className={`bg-gradient-luxury p-6 text-white border-0 hover:transform hover:scale-105 transition-all duration-500 hover:shadow-luxury group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {result.type}
                    </Badge>
                    <span className="text-white/60 text-sm">{result.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{result.amount}</div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see your results here next?
          </p>
          <div className="inline-flex items-center gap-2 text-accent font-semibold">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            New results posting every day
          </div>
        </div>
      </div>
    </section>
  );
}