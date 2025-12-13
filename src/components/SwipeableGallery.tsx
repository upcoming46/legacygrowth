import { useState, useRef, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SwipeableGalleryProps {
  children: React.ReactNode[];
  className?: string;
}

export function SwipeableGallery({ children, className = '' }: SwipeableGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < children.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < children.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Gallery Container */}
      <div
        className="overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] rounded-full bg-background/90 backdrop-blur-sm shadow-lg touch-manipulation disabled:opacity-30"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        disabled={currentIndex === children.length - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] rounded-full bg-background/90 backdrop-blur-sm shadow-lg touch-manipulation disabled:opacity-30"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`min-w-[12px] min-h-[12px] w-3 h-3 rounded-full transition-all duration-200 touch-manipulation ${
              index === currentIndex 
                ? 'bg-primary scale-110' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
