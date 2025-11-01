import microsoftLogo from "@/assets/logos/microsoft.png";
import danoneLogo from "@/assets/logos/danone.png";
import pfizerLogo from "@/assets/logos/pfizer.png";
import visaLogo from "@/assets/logos/visa.png";
import paramountLogo from "@/assets/logos/paramount.png";
import netflixLogo from "@/assets/logos/netflix.png";
import googleLogo from "@/assets/logos/google.png";
import amazonLogo from "@/assets/logos/amazon.png";

export function TrustedLogosSection() {
  const logos = [
    { src: microsoftLogo, alt: "Microsoft" },
    { src: danoneLogo, alt: "Danone" },
    { src: pfizerLogo, alt: "Pfizer" },
    { src: visaLogo, alt: "Visa" },
    { src: paramountLogo, alt: "Paramount" },
    { src: netflixLogo, alt: "Netflix" },
    { src: googleLogo, alt: "Google" },
    { src: amazonLogo, alt: "Amazon" },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="py-8 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6">
          Trusted By Over 2.7 Million Customers
        </h3>
        <div className="relative">
          <div className="flex animate-scroll-logos">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
