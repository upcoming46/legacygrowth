import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEOHead({ 
  title = "Legacy Growth | Harper Harvey - Digital Marketing Sales & Funnel Setup Expert",
  description = "Expert help for digital marketers to get more sales. Professional course promotion, store setup, sales funnel optimization, and Instagram marketing. Turn your digital products into consistent sales. 100+ students earning $424+ overnight with our proven setup system.",
  keywords = "Legacy Growth, Harper Harvey, digital marketing sales help, course promotion services, sales funnel setup, digital marketing store setup, increase course sales, funnel optimization, how to promote course online, digital marketing consultant, Instagram marketing setup, Beacons store setup, course sales strategy, digital product promotion, marketing automation setup",
  image = "/assets/hero-image.jpg",
  url = "https://legacygrowth.site"
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update meta tags dynamically
    document.title = title;
    
    // Update description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }
    
    // Update keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', keywords);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', image);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', url);
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', image);
    }
    
  }, [title, description, keywords, image, url]);

  return null;
}