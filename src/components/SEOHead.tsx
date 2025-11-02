import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEOHead({ 
  title = "Legacy Growth | Harper Harvey - Digital Marketing Expert & Course Creator",
  description = "Learn how digital marketing works and start earning from home with Legacy Growth. Discover if digital marketing can make you rich with proven strategies. Digital marketing courses, jobs, and certification that work. Join 2.7M+ customers.",
  keywords = "Legacy Growth, Harper Harvey, digital marketing jobs, digital marketing courses, how digital marketing works, can digital marketing make you rich, digital marketing from home, digital marketing make money, digital marketing certification, digital marketing agency, digital marketing career, digital marketing beginner, how to promote course online, digital marketing expert",
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