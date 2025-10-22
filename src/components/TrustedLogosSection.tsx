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

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="py-8 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6">
          Trusted by millions of customers worldwide
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
