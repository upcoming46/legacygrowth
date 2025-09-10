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
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-gradient-luxury border-t border-luxury-gold/20 p-4 shadow-luxury">
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleWhatsAppClick}
            className="flex-1 bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 font-semibold"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp Now
          </Button>
          
          <Button
            onClick={handleCalendarClick}
            variant="outline"
            className="flex-1 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Audit
          </Button>
          
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}