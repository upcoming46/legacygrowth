import { useHolidayTheme } from '@/hooks/useHolidayTheme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface HolidayOfferCardProps {
  onCTAClick: () => void;
}

export const HolidayOfferCard = ({ onCTAClick }: HolidayOfferCardProps) => {
  const { currentHoliday } = useHolidayTheme();

  if (!currentHoliday) return null;

  return (
    <Card 
      className="p-6 border-2 shadow-2xl relative overflow-hidden animate-fade-in"
      style={{
        borderColor: `hsl(${currentHoliday.theme.primaryColor})`,
        background: `linear-gradient(135deg, hsl(${currentHoliday.theme.backgroundColor}), white)`
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 text-6xl opacity-20 -mr-4 -mt-4">
        {currentHoliday.decorations.icon}
      </div>
      <div className="absolute bottom-0 left-0 text-6xl opacity-20 -ml-4 -mb-4">
        {currentHoliday.decorations.icon}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles 
            className="h-5 w-5" 
            style={{ color: `hsl(${currentHoliday.theme.primaryColor})` }}
          />
          <h3 
            className="text-xl font-bold"
            style={{ color: `hsl(${currentHoliday.theme.primaryColor})` }}
          >
            {currentHoliday.offer.title}
          </h3>
        </div>

        <div className="mb-4">
          <div 
            className="text-4xl font-bold mb-2"
            style={{ 
              color: `hsl(${currentHoliday.theme.primaryColor})`,
              textShadow: `2px 2px 4px hsl(${currentHoliday.theme.secondaryColor} / 0.3)`
            }}
          >
            {currentHoliday.offer.discount}
          </div>
          <p className="text-muted-foreground">
            {currentHoliday.offer.description}
          </p>
        </div>

        <Button 
          onClick={onCTAClick}
          className="w-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          style={{
            background: `linear-gradient(135deg, hsl(${currentHoliday.theme.primaryColor}), hsl(${currentHoliday.theme.secondaryColor}))`
          }}
        >
          Claim {currentHoliday.name} Offer Now! {currentHoliday.decorations.icon}
        </Button>

        <p className="text-xs text-center mt-3 text-muted-foreground">
          Limited time offer - Valid until {new Date(new Date().getFullYear(), parseInt(currentHoliday.endDate.split('-')[0]) - 1, parseInt(currentHoliday.endDate.split('-')[1])).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
};
