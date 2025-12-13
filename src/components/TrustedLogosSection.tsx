import microsoftLogo from "@/assets/logos/microsoft.png";
import danoneLogo from "@/assets/logos/danone.png";
import pfizerLogo from "@/assets/logos/pfizer.png";
import paramountLogo from "@/assets/logos/paramount.png";
import netflixLogo from "@/assets/logos/netflix.png";
import amazonLogo from "@/assets/logos/amazon.png";
import taboolaLogo from "@/assets/logos/taboola.png";
import visaLogo from "@/assets/logos/visa.png";
import tunecoreLogo from "@/assets/logos/tunecore.png";
import airbnbLogo from "@/assets/logos/airbnb.png";
import walmartLogo from "@/assets/logos/walmart.png";
import fiverrLogo from "@/assets/logos/fiverr.png";
import googleLogo from "@/assets/logos/google.png";
import paypalLogo from "@/assets/logos/paypal.png";
import stripeLogo from "@/assets/logos/stripe.png";
import skoolLogo from "@/assets/logos/skool.png";
import beaconsLogo from "@/assets/logos/beacons.png";

export function TrustedLogosSection() {
  const logos = [
    { src: microsoftLogo, alt: "Microsoft" },
    { src: danoneLogo, alt: "Danone" },
    { src: pfizerLogo, alt: "Pfizer" },
    { src: paramountLogo, alt: "Paramount" },
    { src: netflixLogo, alt: "Netflix" },
    { src: amazonLogo, alt: "Amazon" },
    { src: taboolaLogo, alt: "Taboola" },
    { src: visaLogo, alt: "Visa" },
    { src: tunecoreLogo, alt: "TuneCore" },
    { src: airbnbLogo, alt: "Airbnb" },
    { src: walmartLogo, alt: "Walmart" },
    { src: fiverrLogo, alt: "Fiverr" },
    { src: googleLogo, alt: "Google" },
    { src: paypalLogo, alt: "PayPal" },
    { src: stripeLogo, alt: "Stripe" },
    { src: skoolLogo, alt: "Skool" },
    { src: beaconsLogo, alt: "Beacons" },
  ];

  // Triple the logos for seamless infinite loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="py-8 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6">
          Trusted By Over 2.7 Million Customers
        </h3>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll-logos w-max">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 flex items-center justify-center min-w-[80px] sm:min-w-[100px] md:min-w-[120px]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 sm:h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  decoding="async"
                  width={120}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
