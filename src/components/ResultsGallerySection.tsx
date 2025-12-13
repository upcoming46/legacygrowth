import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import result1 from "@/assets/client-results/result-1.jpg";
import result2 from "@/assets/client-results/result-2.jpg";
import result3 from "@/assets/client-results/result-3.jpg";
import result4 from "@/assets/client-results/result-4.jpg";
import result5 from "@/assets/client-results/result-5.jpg";

export function ResultsGallerySection() {
  const [visibleResults, setVisibleResults] = useState(6); // Show only 6 initially
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const results = [
    {
      type: "Cash App Balance",
      amount: "$474,542",
      description: "Total cash app earnings",
      time: "Real client result",
      icon: DollarSign,
      gradient: "gradient-gold",
      image: result1
    },
    {
      type: "Bank Balance", 
      amount: "$256,880",
      description: "Available bank balance",
      time: "Real client result",
      icon: DollarSign,
      gradient: "gradient-purple",
      image: result2
    },
    {
      type: "PayPal Balance",
      amount: "$70,900", 
      description: "PayPal account balance",
      time: "Real client result",
      icon: DollarSign,
      gradient: "gradient-navy",
      image: result3
    },
    {
      type: "Beacons Revenue",
      amount: "$38,378",
      description: "Monthly Beacons earnings", 
      time: "Real client result",
      icon: TrendingUp,
      gradient: "gradient-gold",
      image: result4
    },
    {
      type: "Credit Alert",
      amount: "$30,000",
      description: "Bank credit notification",
      time: "Real client result", 
      icon: DollarSign,
      gradient: "gradient-purple",
      image: result5
    },
    {
      type: "Store Revenue",
      amount: "$25,639",
      description: "Digital store earnings",
      time: "Real client result",
      icon: TrendingUp,
      gradient: "gradient-navy",
      image: result1
    },
    {
      type: "Direct Deposit",
      amount: "$20,833",
      description: "Cash App direct deposit",
      time: "Real client result",
      icon: DollarSign,
      gradient: "gradient-gold",
      image: result2
    },
    {
      type: "Stan Store",
      amount: "$12,747",
      description: "Stan store total revenue",
      time: "Real client result",
      icon: TrendingUp,
      gradient: "gradient-purple",
      image: result3
    },
    {
      type: "Daily Balance",
      amount: "$15,102",
      description: "Cash App daily balance",
      time: "Real client result",
      icon: DollarSign,
      gradient: "gradient-navy",
      image: result4
    }
  ];

  const loadMoreResults = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleResults(prev => Math.min(prev + 3, results.length));
      setIsLoading(false);
    }, 500);
  };

  return (
    <section id="results-gallery" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-accent text-accent-foreground mb-4 px-3 sm:px-4 py-2 text-sm sm:text-base">
            ✨ Trusted by 1000+ Students
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4 sm:mb-6">
            Results Gallery
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Real results from real students. These aren't fake screenshots—these are actual notifications from Harper's students.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {results.slice(0, visibleResults).map((result, index) => {
            const IconComponent = result.icon;
            return (
              <Card 
                key={index}
                className={`bg-gradient-luxury p-6 text-white border-0 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-luxury group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  {/* Result Screenshot */}
                  <div className="mb-4">
                    <img 
                      src={result.image} 
                      alt={`${result.type} result screenshot`} 
                      className="w-full h-24 object-cover rounded-lg shadow-lg opacity-90"
                      loading="lazy"
                      decoding="async"
                      width="355"
                      height="96"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      style={{ opacity: '0', transition: 'opacity 0.3s ease' }}
                    />
                  </div>
                  
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

        {visibleResults < results.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreResults}
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : `Show More Results (${results.length - visibleResults} remaining)`}
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see your results here next?
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-semibold">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            New results posting every day
          </div>
        </div>
      </div>
    </section>
  );
}