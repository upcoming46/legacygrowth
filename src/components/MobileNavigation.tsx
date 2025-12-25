import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, MessageCircle, Calendar, CreditCard, HelpCircle, Star, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getWhatsAppLink } from "@/config/whatsapp";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  const handleWhatsAppClick = () => {
    window.open(getWhatsAppLink("Hi Harper! I'm interested in your digital business setup. Can we discuss how you can help me start earning online?"), "_blank");
    setIsOpen(false);
  };

  const handleCalendarClick = () => {
    window.open("https://calendly.com/harper-harvey/business-audit", "_blank");
    setIsOpen(false);
  };

  const handlePaymentClick = () => {
    navigate('/payment-methods');
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Results", icon: Star, action: () => scrollToSection('results-gallery') },
    { label: "How It Works", icon: HelpCircle, action: () => scrollToSection('how-it-works') },
    { label: "Testimonials", icon: Star, action: () => scrollToSection('testimonials') },
    { label: "FAQ", icon: HelpCircle, action: () => scrollToSection('faq') },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="min-w-[44px] min-h-[44px] text-white hover:bg-white/10 touch-manipulation"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[300px] sm:w-[350px] bg-gradient-luxury border-luxury-gold/20 p-0"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-luxury-gold/20">
              <span className="text-luxury-gold font-serif font-bold text-lg">Menu</span>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={item.action}
                      className="w-full flex items-center gap-3 px-4 py-4 text-white hover:bg-white/10 transition-colors min-h-[48px] touch-manipulation"
                    >
                      <item.icon className="h-5 w-5 text-luxury-gold flex-shrink-0" />
                      <span className="text-base font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Buttons */}
            <div className="p-4 space-y-3 border-t border-luxury-gold/20">
              <Button
                onClick={handleWhatsAppClick}
                className="w-full min-h-[48px] bg-green-600 hover:bg-green-700 text-white font-semibold touch-manipulation"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Now
              </Button>
              
              <Button
                onClick={handleCalendarClick}
                variant="outline"
                className="w-full min-h-[48px] border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black font-semibold touch-manipulation"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Free Audit
              </Button>
              
              <Button
                onClick={handlePaymentClick}
                className="w-full min-h-[48px] bg-accent hover:bg-accent/90 text-accent-foreground font-bold touch-manipulation"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Secure Your Spot
              </Button>
            </div>

            {/* Contact Info */}
            <div className="p-4 border-t border-luxury-gold/20">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Phone className="h-4 w-4" />
                <span>Questions? Message anytime</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
