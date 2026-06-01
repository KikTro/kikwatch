'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Plus } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';
import { useUserStore } from '@/store/useUserStore';

export default function MovieCard({ movie }: { movie: Movie }) {
  const [mounted, setMounted] = useState(false);
  const { addToMyList, removeFromMyList, isInMyList } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const inList = mounted ? isInMyList(movie.id) : false;

  const handleListToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mounted && inList) removeFromMyList(movie.id);
    else if (mounted) addToMyList(movie);
  };

  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date || '').split('-')[0];

  return (
    <div className="relative group w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 cursor-pointer select-none">
      {/* Apple TV-style Content-Aware Ambient Shadow (Blurred Cover Image) */}
      <div className="absolute inset-x-3 bottom-[-16px] top-6 -z-10 opacity-60 blur-xl md:blur-2xl transition-all duration-500 ease-out group-hover:opacity-90 group-hover:scale-105 group-hover:translate-y-3 pointer-events-none">
        <img
          src={getImageUrl(movie.poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
          loading="lazy"
        />
      </div>

      <Link href={`/${movie.media_type}/${movie.id}`}>
        <motion.div
          whileHover={{ scale: 1.06, y: -6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-[2/3] bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl transition-colors duration-300 group-hover:border-white/20"
        >
          <img
            src={getImageUrl(movie.poster_path)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 mb-1 tracking-tight">
              {title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs text-gray-300 mb-3 font-semibold">
              <span className="flex items-center gap-1 text-[var(--color-kik-cyan)]">
                ★ {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-gray-500">•</span>
              <span>{year}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-white hover:bg-gray-205 text-black py-1.5 rounded-xl font-bold flex items-center justify-center transition-colors text-xs">
                <Play className="w-3.5 h-3.5 fill-black mr-1" /> Play
              </button>
              <button 
                onClick={handleListToggle}
                className="w-8 h-8 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 text-xs"
              >
                {inList ? <span className="text-lg leading-none">-</span> : <Plus className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
