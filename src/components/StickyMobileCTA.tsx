import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, X } from "lucide-react";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(true);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hi Harper! I'm interested in your digital business setup. Can we discuss how you can help me start earning online?"
    );
    window.open(`https://wa.me/2348127297536?text=${message}`, "_blank");
  };

  const handleCalendarClick = () => {
    window.open("https://calendly.com/harper-harvey/business-audit", "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden safe-area-pb">
      <div className="bg-gradient-luxury border-t border-luxury-gold/20 p-3 sm:p-4 shadow-luxury">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={handleWhatsAppClick}
            className="flex-1 bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 font-semibold min-h-[48px] touch-manipulation text-sm sm:text-base"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">WhatsApp</span>
            <span className="xs:hidden">Chat</span>
          </Button>
          
          <Button
            onClick={handleCalendarClick}
            variant="outline"
            className="flex-1 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black min-h-[48px] touch-manipulation text-sm sm:text-base"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Book Audit</span>
            <span className="xs:hidden">Book</span>
          </Button>
          
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/10 min-w-[44px] min-h-[44px] touch-manipulation flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}