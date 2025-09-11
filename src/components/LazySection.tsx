import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallbackHeight?: string;
  showSkeleton?: boolean;
}

export const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  threshold = 0.1, 
  rootMargin = '200px',
  fallbackHeight = 'min-h-96',
  showSkeleton = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  const renderFallback = () => {
    if (!showSkeleton) {
      return <div className={`${fallbackHeight} flex items-center justify-center`} />;
    }

    return (
      <div className={`${fallbackHeight} space-y-6 p-8`}>
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={ref}>
      {isVisible ? children : renderFallback()}
    </div>
  );
};