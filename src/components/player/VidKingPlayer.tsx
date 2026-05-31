'use client';

import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Movie } from '@/lib/tmdb';

interface VidKingPlayerProps {
  movie: Movie;
  season?: number;
  episode?: number;
}

export default function VidKingPlayer({ movie, season, episode }: VidKingPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { updateProgress } = useUserStore();
  const [loading, setLoading] = useState(true);

  // Generate Embed URL safely
  const isMovie = movie.media_type === 'movie';
  const baseUrl = isMovie
    ? `https://www.vidking.net/embed/movie/${movie.id}`
    : `https://www.vidking.net/embed/tv/${movie.id}/${season || 1}/${episode || 1}`;

  // Robust loading timeout fallback to clear spinner even if cross-origin onload event is blocked
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [baseUrl]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.vidking.net') return;
      
      const data = event.data;
      if (data && typeof data === 'object') {
        if (data.type === 'timeupdate' && data.currentTime && data.duration) {
          updateProgress({
            id: movie.id.toString(),
            type: isMovie ? 'movie' : 'tv',
            progress: data.currentTime,
            duration: data.duration,
            timestamp: Date.now(),
            details: movie,
            season,
            episode,
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [movie, isMovie, season, episode, updateProgress]);

  // Use a key to force iframe remount when source changes
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl shadow-blue-900/20">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <iframe
        key={baseUrl}
        ref={iframeRef}
        src={baseUrl}
        className="w-full h-full"
        allowFullScreen
        onLoad={() => setLoading(false)}
        allow="autoplay; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
}
