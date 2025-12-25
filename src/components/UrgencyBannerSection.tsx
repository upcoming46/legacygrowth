import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Clock, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/config/whatsapp";

export function UrgencyBannerSection() {
  // Get current month name
  const getCurrentMonth = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return months[new Date().getMonth()];
  };

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
    const currentMonth = getCurrentMonth();
    window.open(getWhatsAppLink(`Hey Harper, I saw there are only 3 spots left for ${currentMonth} setup! I don't want to miss out. Can we get my store ready to sell in 72 hours?`), '_blank');
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8 bg-gradient-to-r from-red-600 to-red-700 border-t-4 border-accent">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
          <Flame className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-pulse flex-shrink-0 bg-white/20 rounded-full p-2" />
          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
              🔥 Only 3 Spots Left for {getCurrentMonth()} Setup
            </h3>
            <p className="text-white/90 text-sm">
              Get your store ready to sell in 72 hours. Secure your spot today.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-4 text-white">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="flex gap-1 sm:gap-2 text-xs sm:text-sm font-mono">
              <span className="bg-white/20 px-1 sm:px-2 py-1 rounded text-center min-w-[2rem] sm:min-w-[2.5rem]">
                {timeLeft.days.toString().padStart(2, '0')}d
              </span>
              <span className="bg-white/20 px-1 sm:px-2 py-1 rounded text-center min-w-[2rem] sm:min-w-[2.5rem]">
                {timeLeft.hours.toString().padStart(2, '0')}h
              </span>
              <span className="bg-white/20 px-1 sm:px-2 py-1 rounded text-center min-w-[2rem] sm:min-w-[2.5rem]">
                {timeLeft.minutes.toString().padStart(2, '0')}m
              </span>
              <span className="bg-white/20 px-1 sm:px-2 py-1 rounded text-center min-w-[2rem] sm:min-w-[2.5rem]">
                {timeLeft.seconds.toString().padStart(2, '0')}s
              </span>
            </span>
          </div>

          <Button
            onClick={handleWhatsAppClick}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-4 sm:px-6 py-2 transition-all duration-300 hover:shadow-gold animate-glow-pulse text-sm sm:text-base w-full sm:w-auto"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Secure My Spot</span>
            <span className="sm:hidden">Secure Spot</span>
          </Button>
        </div>
      </div>
    </section>
  );
}