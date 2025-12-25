import { useState, useRef, useCallback, ReactNode } from "react";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => Promise<void>;
}

export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const threshold = 80;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(diff * 0.5, threshold + 20));
    }
  }, [isPulling, isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      
      if (onRefresh) {
        await onRefresh();
      } else {
        window.location.reload();
      }
      
      setIsRefreshing(false);
    }

    setIsPulling(false);
    setPullDistance(0);
  }, [isPulling, pullDistance, onRefresh]);

  const progress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-center transition-all duration-200 md:hidden"
        style={{
          top: `${Math.max(pullDistance - 60, -60)}px`,
          opacity: pullDistance > 10 ? 1 : 0,
        }}
      >
        <div className="bg-luxury-gold/90 rounded-full p-3 shadow-lg">
          <RefreshCw
            className={`w-6 h-6 text-luxury-black transition-transform duration-200 ${
              isRefreshing ? "animate-spin" : ""
            }`}
            style={{
              transform: isRefreshing ? undefined : `rotate(${progress * 360}deg)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
