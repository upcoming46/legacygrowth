import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  schema?: 'home' | 'blog' | 'article';
  articleData?: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    category: string;
  };
}

export function SEOHead({ 
  title = "How to Get More Sales from Your Digital Products | Expert Funnel Setup by Harper Harvey",
  description = "Struggling to get sales from your digital products? I help digital marketers set up high-converting sales funnels that generate consistent revenue. 100+ clients achieved $424+ in first-night sales with proven funnel strategies. Expert in course promotion, store optimization, and Instagram marketing automation.",
  keywords = "how to get more sales digital products, how to promote my course online, sales funnel setup service, digital marketing consultant for sales, increase course sales fast, funnel optimization expert, Beacons store setup help, Instagram marketing automation, course launch strategy, digital product sales help, conversion rate optimization, online store setup expert, sales funnel builder service, digital marketing sales specialist",
  image = "/assets/hero-image.jpg",
  url = "https://legacygrowth.site",
  schema = 'home',
  articleData
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
    
    // Add JSON-LD structured data
    let existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredDataGraph: any[] = [
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        "name": "Legacy Growth",
        "url": url,
        "logo": {
          "@type": "ImageObject",
          "url": `${url}/assets/hero-image.jpg`
        },
        "founder": {
          "@type": "Person",
          "name": "Harper Harvey",
          "jobTitle": "Digital Marketing Sales & Funnel Optimization Expert",
          "description": "Expert digital marketing consultant specializing in sales funnel setup, course promotion, and conversion optimization. Helped 100+ clients generate consistent sales from digital products.",
          "knowsAbout": ["Sales Funnel Optimization", "Course Promotion", "Digital Marketing", "Conversion Rate Optimization", "Instagram Marketing", "Marketing Automation"]
        },
        "sameAs": [
          "https://www.instagram.com/legacygrowth",
          "https://legacygrowth.site"
        ]
      },
      // Service Schema
      {
        "@type": "Service",
        "@id": `${url}#service`,
        "serviceType": "Digital Marketing Sales Funnel Setup",
        "provider": {
          "@id": `${url}#organization`
        },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Marketing Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Course Promotion & Launch Strategy",
                "description": "Complete course promotion setup with proven sales funnels that convert visitors into paying students"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sales Funnel Optimization",
                "description": "Expert funnel optimization to increase conversion rates and maximize revenue from existing traffic"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Digital Store Setup",
                "description": "Professional Beacons and digital store setup with conversion-optimized design and automation"
              }
            }
          ]
        }
      },
      // Webpage Schema
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": title,
        "description": description,
        "publisher": {
          "@id": `${url}#organization`
        },
        "inLanguage": "en-US"
      }
    ];

    // Add Article schema if article data is provided
    if (schema === 'article' && articleData) {
      structuredDataGraph.push({
        "@type": "Article",
        "headline": articleData.headline,
        "datePublished": articleData.datePublished,
        "dateModified": articleData.dateModified || articleData.datePublished,
        "author": {
          "@type": "Person",
          "name": articleData.author
        },
        "publisher": {
          "@id": `${url}#organization`
        },
        "image": image,
        "articleSection": articleData.category,
        "inLanguage": "en-US"
      });
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": structuredDataGraph
    };

    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
  }, [title, description, keywords, image, url, schema, articleData]);

  return null;
}