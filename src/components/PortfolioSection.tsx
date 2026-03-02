import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Eye } from "lucide-react";
import { SwipeableGallery } from "@/components/SwipeableGallery";
import { useIsMobile } from "@/hooks/use-mobile";
import template1 from "@/assets/templates/template1.webp";
import template2 from "@/assets/templates/template2.webp";
import template4 from "@/assets/templates/template4.webp";
import template6 from "@/assets/templates/template6.webp";
import template7 from "@/assets/templates/template7.webp";
import template8 from "@/assets/templates/template8.webp";
import template9 from "@/assets/templates/template9.webp";
import template15 from "@/assets/templates/template15.webp";
import template16 from "@/assets/templates/template16.webp";
import template18 from "@/assets/templates/template18.webp";
import dwaTemplate from "@/assets/templates/dwa-template.png";
import oralHealthTemplate from "@/assets/templates/oral-health-template.png";
import legacyBuilderTemplate from "@/assets/templates/legacy-builder-template.png";
import goldenStrategiesTemplate from "@/assets/templates/golden-strategies-template.png";

function BlurUpImage({ src, alt, className = "", width, height }: { src: string; alt: string; className?: string; width: number; height: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-muted/30">
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted/40" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        className={`transition-all duration-500 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'} ${className}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

export function PortfolioSection() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const templates = [
    { src: template1, alt: "Fashion & Lifestyle Store", category: "Fashion" },
    { src: template2, alt: "Food & Recipe Store", category: "Food" },
    { src: template4, alt: "Music Artist Store", category: "Music" },
    { src: template6, alt: "Band & Music Store", category: "Music" },
    { src: template7, alt: "Fitness & Wellness Store", category: "Fitness" },
    { src: template8, alt: "Photography Portfolio Store", category: "Lifestyle" },
    { src: template9, alt: "Gaming & Streaming Store", category: "Gaming" },
    { src: template15, alt: "Comedy & Entertainment Store", category: "Entertainment" },
    { src: template16, alt: "Parenting & Lifestyle Store", category: "Lifestyle" },
    { src: template18, alt: "Podcast Store", category: "Media" },
    { src: dwaTemplate, alt: "Digital Academy Store", category: "Education" },
    { src: oralHealthTemplate, alt: "Health & Wellness Store", category: "Health" },
    { src: legacyBuilderTemplate, alt: "Digital Business Blueprint Store", category: "Business" },
    { src: goldenStrategiesTemplate, alt: "Marketing Strategies Store", category: "Marketing" },
  ];

  const renderCard = (template: typeof templates[0], index: number, showOverlayAlways = false) => (
    <Card
      key={index}
      className={`group relative overflow-hidden cursor-pointer hover:shadow-elegant transition-all duration-300 touch-manipulation ${!showOverlayAlways ? 'transform hover:scale-105' : ''}`}
      style={!showOverlayAlways ? { animationDelay: `${index * 0.1}s` } : undefined}
      onClick={() => setSelectedTemplate(template.src)}
    >
      <div className="relative" style={{ aspectRatio: '9/16' }}>
        <BlurUpImage
          src={template.src}
          alt={template.alt}
          className="w-full h-full object-cover"
          width={225}
          height={400}
        />
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${showOverlayAlways ? 'bg-black/40' : 'bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'}`}>
          <Eye className="h-8 w-8 text-white" />
          <p className="text-white font-semibold text-sm px-2 text-center">{template.category}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            My Store Templates Portfolio
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore professionally designed Beacons stores I've built across various niches.
            Click any template to view in full detail.
          </p>
        </div>

        {isMobile ? (
          <SwipeableGallery className="max-w-sm mx-auto">
            {templates.map((t, i) => renderCard(t, i, true))}
          </SwipeableGallery>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {templates.map((t, i) => renderCard(t, i))}
          </div>
        )}

        <div className="text-center mt-12 animate-fade-in">
          <Card className="p-8 bg-primary text-primary-foreground max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Want a Custom Store Like These?</h3>
            <p className="text-lg opacity-90">Each store is tailored to convert visitors into customers. Let me build yours next.</p>
          </Card>
        </div>
      </div>

      <Dialog open={selectedTemplate !== null} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[95vh] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Store Template Preview</DialogTitle>
          <div className="relative w-full h-full max-h-[95vh] overflow-y-auto">
            {selectedTemplate && (
              <img
                src={selectedTemplate}
                alt="Full template view"
                className="w-full h-auto"
                loading="eager"
                decoding="async"
                width={600}
                height={1067}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
