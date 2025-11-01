// Holiday configurations for automatic seasonal theming
export interface Holiday {
  id: string;
  name: string;
  startDate: string; // MM-DD format
  endDate: string; // MM-DD format
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
  decorations: {
    icon: string;
    pattern: string;
  };
  offer: {
    title: string;
    discount: string;
    description: string;
  };
  bannerMessage: string;
}

export const holidays: Holiday[] = [
  {
    id: "new-year",
    name: "New Year's Day",
    startDate: "12-28",
    endDate: "01-05",
    theme: {
      primaryColor: "220 90% 56%",
      secondaryColor: "280 90% 60%",
      accentColor: "45 100% 51%",
      backgroundColor: "220 40% 98%",
      gradientFrom: "220 90% 56%",
      gradientTo: "280 90% 60%"
    },
    decorations: {
      icon: "✨",
      pattern: "sparkles"
    },
    offer: {
      title: "New Year Special",
      discount: "30% OFF",
      description: "Start your digital journey with our New Year offer!"
    },
    bannerMessage: "🎉 Happy New Year! New beginnings, new opportunities - 30% OFF all setups!"
  },
  {
    id: "valentines",
    name: "Valentine's Day",
    startDate: "02-10",
    endDate: "02-15",
    theme: {
      primaryColor: "350 100% 45%",
      secondaryColor: "340 82% 52%",
      accentColor: "320 100% 70%",
      backgroundColor: "350 100% 98%",
      gradientFrom: "350 100% 45%",
      gradientTo: "320 100% 70%"
    },
    decorations: {
      icon: "💕",
      pattern: "hearts"
    },
    offer: {
      title: "Love Your Business",
      discount: "25% OFF",
      description: "Fall in love with your digital success!"
    },
    bannerMessage: "💝 Valentine's Special - Show your business some love! 25% OFF"
  },
  {
    id: "easter",
    name: "Easter",
    startDate: "03-25",
    endDate: "04-05",
    theme: {
      primaryColor: "280 100% 65%",
      secondaryColor: "45 100% 51%",
      accentColor: "140 100% 45%",
      backgroundColor: "280 50% 98%",
      gradientFrom: "280 100% 65%",
      gradientTo: "140 100% 45%"
    },
    decorations: {
      icon: "🐣",
      pattern: "eggs"
    },
    offer: {
      title: "Easter Transformation",
      discount: "20% OFF",
      description: "Rebirth your business this Easter!"
    },
    bannerMessage: "🐰 Easter Special - Transform your business! 20% OFF"
  },
  {
    id: "independence-day",
    name: "Independence Day",
    startDate: "07-01",
    endDate: "07-07",
    theme: {
      primaryColor: "220 90% 56%",
      secondaryColor: "0 100% 50%",
      accentColor: "0 0% 100%",
      backgroundColor: "220 40% 98%",
      gradientFrom: "0 100% 50%",
      gradientTo: "220 90% 56%"
    },
    decorations: {
      icon: "🎆",
      pattern: "fireworks"
    },
    offer: {
      title: "Independence Sale",
      discount: "40% OFF",
      description: "Celebrate financial independence!"
    },
    bannerMessage: "🎆 Independence Day - Achieve financial freedom! 40% OFF"
  },
  {
    id: "halloween",
    name: "Halloween",
    startDate: "10-25",
    endDate: "11-01",
    theme: {
      primaryColor: "30 100% 50%",
      secondaryColor: "280 100% 35%",
      accentColor: "0 0% 0%",
      backgroundColor: "30 80% 98%",
      gradientFrom: "30 100% 50%",
      gradientTo: "280 100% 35%"
    },
    decorations: {
      icon: "🎃",
      pattern: "spooky"
    },
    offer: {
      title: "Spooktacular Deal",
      discount: "35% OFF",
      description: "Don't be scared of success - grab this deal!"
    },
    bannerMessage: "🎃 Halloween Special - Frighteningly good deals! 35% OFF"
  },
  {
    id: "black-friday",
    name: "Black Friday",
    startDate: "11-23",
    endDate: "11-27",
    theme: {
      primaryColor: "0 0% 0%",
      secondaryColor: "45 100% 51%",
      accentColor: "0 100% 50%",
      backgroundColor: "0 0% 95%",
      gradientFrom: "0 0% 0%",
      gradientTo: "0 0% 20%"
    },
    decorations: {
      icon: "🛍️",
      pattern: "shopping"
    },
    offer: {
      title: "Black Friday MEGA DEAL",
      discount: "50% OFF",
      description: "Our BIGGEST sale of the year!"
    },
    bannerMessage: "🛍️ BLACK FRIDAY - Massive 50% OFF! Limited time only!"
  },
  {
    id: "cyber-monday",
    name: "Cyber Monday",
    startDate: "11-28",
    endDate: "11-30",
    theme: {
      primaryColor: "220 90% 56%",
      secondaryColor: "180 100% 45%",
      accentColor: "280 90% 60%",
      backgroundColor: "220 40% 98%",
      gradientFrom: "220 90% 56%",
      gradientTo: "180 100% 45%"
    },
    decorations: {
      icon: "💻",
      pattern: "digital"
    },
    offer: {
      title: "Cyber Monday Special",
      discount: "45% OFF",
      description: "Digital deals for digital success!"
    },
    bannerMessage: "💻 CYBER MONDAY - Digital transformation at 45% OFF!"
  },
  {
    id: "christmas",
    name: "Christmas",
    startDate: "12-15",
    endDate: "12-27",
    theme: {
      primaryColor: "0 100% 50%",
      secondaryColor: "140 100% 35%",
      accentColor: "45 100% 51%",
      backgroundColor: "0 100% 98%",
      gradientFrom: "0 100% 50%",
      gradientTo: "140 100% 35%"
    },
    decorations: {
      icon: "🎄",
      pattern: "snowflakes"
    },
    offer: {
      title: "Christmas Gift",
      discount: "40% OFF",
      description: "Gift yourself a successful business this Christmas!"
    },
    bannerMessage: "🎄 Merry Christmas! Gift yourself success - 40% OFF all setups!"
  },
  {
    id: "boxing-day",
    name: "Boxing Day",
    startDate: "12-26",
    endDate: "12-27",
    theme: {
      primaryColor: "0 100% 50%",
      secondaryColor: "45 100% 51%",
      accentColor: "0 0% 0%",
      backgroundColor: "0 0% 98%",
      gradientFrom: "0 100% 50%",
      gradientTo: "45 100% 51%"
    },
    decorations: {
      icon: "🎁",
      pattern: "boxes"
    },
    offer: {
      title: "Boxing Day Blowout",
      discount: "45% OFF",
      description: "Unbox your potential with massive savings!"
    },
    bannerMessage: "🎁 Boxing Day - Unbox amazing deals! 45% OFF"
  }
];

// Get current active holiday based on today's date
export const getCurrentHoliday = (): Holiday | null => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const currentDateStr = `${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;

  for (const holiday of holidays) {
    const [startMonth, startDay] = holiday.startDate.split('-').map(Number);
    const [endMonth, endDay] = holiday.endDate.split('-').map(Number);

    // Handle holidays that span across year boundary (like New Year)
    if (startMonth > endMonth) {
      if (
        (currentMonth === startMonth && currentDay >= startDay) ||
        (currentMonth === endMonth && currentDay <= endDay) ||
        (currentMonth > startMonth || currentMonth < endMonth)
      ) {
        return holiday;
      }
    } else {
      // Normal case
      if (
        (currentMonth > startMonth || (currentMonth === startMonth && currentDay >= startDay)) &&
        (currentMonth < endMonth || (currentMonth === endMonth && currentDay <= endDay))
      ) {
        return holiday;
      }
    }
  }

  return null;
};
