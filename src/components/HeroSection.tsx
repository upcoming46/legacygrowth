import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Mail, Star, TrendingUp, DollarSign } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+2348127297536", "_blank");
  };

  const handleEmailClick = () => {
    const subject = "Let's Turn My Digital Dreams Into Reality";
    const body = "Hi Harper,\n\nI'm excited about the possibility of working with you to transform my digital business. I've been struggling with tech overwhelm and I'm ready for a clear path to success.\n\nI'd love to learn more about:\n- How you can help me set up my digital business\n- Your proven system for generating consistent sales\n- What results I can expect\n\nI'm ready to stop being stuck and start selling. When can we chat?\n\nBest regards";
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open(`mailto:harperharvey834@gmail.com?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-luxury">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Success Indicators */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-6">
              <Card className="p-2 sm:p-3 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-white">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs sm:text-sm font-medium">Digital Expert</span>
                </div>
              </Card>
              <Card className="p-2 sm:p-3 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-xs sm:text-sm font-medium">Proven Results</span>
                </div>
              </Card>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              From Stuck to{" "}
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Sales
              </span>
            </h1>
            
            <h2 className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-4 font-medium font-serif">
              The Digital Shortcut That's Changing Lives
            </h2>
            
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Real results. Real people. Real freedom. Discover the system that's helped moms, 
              9-5 workers, and digital beginners turn confusion into consistent sales—without tech overwhelm.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="xl"
                variant="whatsapp"
                onClick={handleWhatsAppClick}
                className="group text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Chat with Harper on WhatsApp</span>
                <span className="sm:hidden">WhatsApp Harper</span>
              </Button>
              
              <Button
                size="xl"
                variant="hero"
                onClick={handleEmailClick}
                className="group text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Email Harper</span>
                <span className="sm:hidden">Email</span>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
              <Card className="p-3 sm:p-4 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-4 text-white">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <DollarSign className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-center lg:text-left">Helping everyday people turn digital skills into passive income</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img
                src={heroImage}
                alt="Harper Harvey helping people achieve digital success"
                className="w-full h-auto rounded-2xl shadow-elegant"
              />
              {/* Floating Success Cards */}
              <Card className="absolute -top-4 -left-4 p-3 bg-white shadow-success animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">$424 overnight sale!</span>
                </div>
              </Card>
              
              <Card className="absolute -bottom-4 -right-4 p-3 bg-white shadow-glow">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">1.6K views in 3 days</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}