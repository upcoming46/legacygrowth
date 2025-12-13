import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-4 z-40 min-w-[48px] min-h-[48px] w-12 h-12 rounded-full shadow-elegant bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 touch-manipulation ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
