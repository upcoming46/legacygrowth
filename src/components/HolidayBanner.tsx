import { useHolidayTheme } from '@/hooks/useHolidayTheme';
import { X } from 'lucide-react';
import { useState } from 'react';

export const HolidayBanner = () => {
  const { currentHoliday } = useHolidayTheme();
  const [isVisible, setIsVisible] = useState(true);

  if (!currentHoliday || !isVisible) return null;

  return (
    <div 
      className="relative py-3 px-4 text-center font-semibold text-white overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(${currentHoliday.theme.gradientFrom}), hsl(${currentHoliday.theme.gradientTo}))`
      }}
    >
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        {currentHoliday.decorations.pattern === 'snowflakes' && (
          <div className="animate-pulse">❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️</div>
        )}
        {currentHoliday.decorations.pattern === 'hearts' && (
          <div className="animate-pulse">💕 💕 💕 💕 💕 💕 💕 💕</div>
        )}
        {currentHoliday.decorations.pattern === 'sparkles' && (
          <div className="animate-pulse">✨ ✨ ✨ ✨ ✨ ✨ ✨</div>
        )}
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2">
        <span className="text-xl animate-bounce">{currentHoliday.decorations.icon}</span>
        <span className="text-sm md:text-base">{currentHoliday.bannerMessage}</span>
        <span className="text-xl animate-bounce">{currentHoliday.decorations.icon}</span>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
