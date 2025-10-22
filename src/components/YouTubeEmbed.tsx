import { useEffect, useRef, useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, title = "YouTube video" }: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && iframeRef.current) {
          // Send play command to iframe
          iframeRef.current.contentWindow?.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        } else if (!entry.isIntersecting && iframeRef.current) {
          // Send pause command to iframe
          iframeRef.current.contentWindow?.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*'
          );
        }
      },
      { threshold: 0.5 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
      <iframe
        ref={iframeRef}
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-elegant"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&enablejsapi=1&loop=1&playlist=${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
