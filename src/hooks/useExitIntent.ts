import { useState, useEffect, useCallback } from 'react';

export function useExitIntent() {
  const [shouldShow, setShouldShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if mouse leaves from the top of the viewport
    if (e.clientY <= 0 && !hasShown) {
      setShouldShow(true);
      setHasShown(true);
    }
  }, [hasShown]);

  useEffect(() => {
    // Add a delay before enabling exit intent detection
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 10000); // 10 seconds delay

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const resetExitIntent = () => {
    setShouldShow(false);
  };

  return { shouldShow, resetExitIntent };
}