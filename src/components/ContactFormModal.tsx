import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/config/whatsapp";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    situation: "",
    challenge: "",
    goal: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hi Harper! 
    
Name: ${formData.name}

Current Situation: ${formData.situation}

Main Challenge: ${formData.challenge}

My Goal: ${formData.goal}

I'd love to discuss how you can help me achieve this!`;

    window.open(getWhatsAppLink(message), '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Let's Start Your Transformation</DialogTitle>
          <DialogDescription>
            Answer these quick questions and we'll continue the conversation on WhatsApp
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <Label htmlFor="situation">Where are you right now?</Label>
            <Input
              id="situation"
              value={formData.situation}
              onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
              placeholder="e.g., Just bought DWA course, Have a store but no sales"
              required
            />
          </div>

          <div>
            <Label htmlFor="challenge">What's your biggest challenge?</Label>
            <Textarea
              id="challenge"
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              placeholder="e.g., Don't know how to set up my store, Getting traffic but no conversions"
              required
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="goal">What do you want to achieve?</Label>
            <Input
              id="goal"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              placeholder="e.g., Make my first $1000, Automate my business"
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" variant="whatsapp">
            <MessageCircle className="mr-2 h-5 w-5" />
            Continue on WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}