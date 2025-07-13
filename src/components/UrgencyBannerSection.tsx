import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Clock, MessageCircle } from "lucide-react";

export function UrgencyBannerSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 33,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = "Hey Harper, I saw there are only 3 spots left for July setup! I don't want to miss out. Can we get my store ready to sell in 72 hours?";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+2348127297536?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-8 bg-gradient-to-r from-red-600 to-red-700 border-t-4 border-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">
                🔥 Only 3 Spots Left for July Setup
              </h3>
              <p className="text-white/90 text-sm">
                Get your store ready to sell in 72 hours. Secure your spot today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-white">
              <Clock className="h-5 w-5" />
              <div className="flex gap-2 text-sm font-mono">
                <div className="bg-white/20 px-2 py-1 rounded">
                  {timeLeft.days.toString().padStart(2, '0')}d
                </div>
                <div className="bg-white/20 px-2 py-1 rounded">
                  {timeLeft.hours.toString().padStart(2, '0')}h
                </div>
                <div className="bg-white/20 px-2 py-1 rounded">
                  {timeLeft.minutes.toString().padStart(2, '0')}m
                </div>
                <div className="bg-white/20 px-2 py-1 rounded">
                  {timeLeft.seconds.toString().padStart(2, '0')}s
                </div>
              </div>
            </div>

            <Button
              onClick={handleWhatsAppClick}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 py-2 transition-all duration-300 hover:shadow-gold animate-glow-pulse"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Secure My Spot
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}