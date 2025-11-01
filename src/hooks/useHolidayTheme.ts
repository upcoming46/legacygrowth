import { useEffect, useState } from 'react';
import { getCurrentHoliday, Holiday } from '@/config/holidays';

export const useHolidayTheme = () => {
  const [currentHoliday, setCurrentHoliday] = useState<Holiday | null>(null);

  useEffect(() => {
    // Check for holiday on mount
    const holiday = getCurrentHoliday();
    setCurrentHoliday(holiday);

    // Apply holiday theme if active
    if (holiday) {
      applyHolidayTheme(holiday);
    }

    // Check daily for holiday changes (at midnight)
    const checkHoliday = () => {
      const newHoliday = getCurrentHoliday();
      if (newHoliday?.id !== currentHoliday?.id) {
        setCurrentHoliday(newHoliday);
        if (newHoliday) {
          applyHolidayTheme(newHoliday);
        } else {
          removeHolidayTheme();
        }
      }
    };

    // Check every hour
    const interval = setInterval(checkHoliday, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [currentHoliday]);

  return { currentHoliday, isHoliday: !!currentHoliday };
};

const applyHolidayTheme = (holiday: Holiday) => {
  const root = document.documentElement;
  
  // Apply holiday colors to CSS variables
  root.style.setProperty('--holiday-primary', holiday.theme.primaryColor);
  root.style.setProperty('--holiday-secondary', holiday.theme.secondaryColor);
  root.style.setProperty('--holiday-accent', holiday.theme.accentColor);
  root.style.setProperty('--holiday-bg', holiday.theme.backgroundColor);
  
  // Add holiday class to body
  document.body.classList.add('holiday-theme', `holiday-${holiday.id}`);
};

const removeHolidayTheme = () => {
  document.body.classList.remove('holiday-theme');
  // Remove all holiday-specific classes
  const classList = Array.from(document.body.classList);
  classList.forEach(className => {
    if (className.startsWith('holiday-')) {
      document.body.classList.remove(className);
    }
  });
};
