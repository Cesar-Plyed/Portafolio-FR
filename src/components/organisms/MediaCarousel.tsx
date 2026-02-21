import React, { useState, useRef, useEffect } from "react";
import type { MediaItem } from "src/types/MediaItem";

interface Props {
  media: MediaItem[];
}

const MediaCarousel: React.FC<Props> = ({ media }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % media.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="w-full relative overflow-hidden rounded-lg">
      <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {media.map((m, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {m.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.src} alt={m.alt || "media"} className="w-full h-full object-cover" />
            ) : (
              <video src={m.src} controls className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <button
          className="p-2 bg-white/80 dark:bg-neutral-800/80 rounded-md"
          onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)}
        >
          ‹
        </button>
      </div>

      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <button
          className="p-2 bg-white/80 dark:bg-neutral-800/80 rounded-md"
          onClick={() => setIndex((i) => (i + 1) % media.length)}
        >
          ›
        </button>
      </div>

      <div className="flex gap-2 justify-center mt-3">
        {media.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-primary" : "bg-neutral-300 dark:bg-neutral-600"}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaCarousel;
