import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Gift, Clock, Star } from "lucide-react";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExitIntentModal({ isOpen, onClose }: ExitIntentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    instagram: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store to Google Sheet via webhook (placeholder)
      const webhookData = {
        timestamp: new Date().toISOString(),
        type: "exit_intent_lead",
        ...formData,
        source: "exit_intent_modal",
        offer: "7_minute_funnel_teardown"
      };

      // Replace with actual webhook URL
      await fetch("https://hooks.zapier.com/hooks/catch/your-webhook-id/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookData),
        mode: "no-cors"
      });

      setShowSuccess(true);
      toast({
        title: "Success! 🎉",
        description: "Your 7-minute funnel teardown will be sent within 24 hours!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalendarClick = () => {
    window.open("https://calendly.com/harper-harvey/funnel-teardown", "_blank");
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gradient-luxury text-white border-luxury-gold">
          <div className="text-center space-y-6 py-8">
            <div className="mx-auto w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center">
              <Gift className="w-8 h-8 text-luxury-black" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">You're All Set! 🎉</h3>
              <p className="text-white/90">
                Your 7-minute funnel teardown will be delivered to {formData.email} within 24 hours.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleCalendarClick}
                className="w-full bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90"
              >
                Book Your Free Strategy Call
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Continue Browsing
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-luxury text-white border-luxury-gold">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-serif text-luxury-gold">
            Wait! Don't Leave Empty-Handed 🎁
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Offer Section */}
          <div className="text-center space-y-4 py-4">
            <div className="flex items-center justify-center space-x-2 text-luxury-gold">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">FREE BONUS</span>
              <Star className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-xl font-serif font-bold">
              Get Your Personal 7-Minute Funnel Teardown
            </h3>
            <p className="text-white/90 text-sm">
              I'll personally review your current setup and send you a custom video showing exactly what to fix to start making money online.
            </p>
            <div className="flex items-center justify-center space-x-2 text-luxury-gold text-sm">
              <Clock className="w-4 h-4" />
              <span>Delivered within 24 hours</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your first name"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-white">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+1234567890"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-white">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@username"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 font-semibold py-3"
            >
              {isSubmitting ? "Sending..." : "Get My Free Teardown →"}
            </Button>
          </form>

          <p className="text-xs text-white/70 text-center">
            No spam, ever. I'll personally review your funnel and send you actionable insights.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}