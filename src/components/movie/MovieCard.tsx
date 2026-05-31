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
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative group w-[160px] md:w-[200px] lg:w-[240px] flex-shrink-0 cursor-pointer rounded-lg overflow-hidden"
    >
      <Link href={`/${movie.media_type}/${movie.id}`}>
        <div className="aspect-[2/3] w-full bg-gray-900 rounded-lg overflow-hidden relative">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 mb-1">
              {title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
              <span className="flex items-center gap-1 text-[var(--color-kik-cyan)] font-semibold">
                ★ {movie.vote_average?.toFixed(1)}
              </span>
              <span>{year}</span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[var(--color-kik-accent)] hover:bg-blue-500 text-white py-1.5 rounded-md flex items-center justify-center transition-colors">
                <Play className="w-4 h-4" />
              </button>
              <button 
                onClick={handleListToggle}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-md flex items-center justify-center transition-colors"
              >
                {inList ? <span className="text-xl leading-none">-</span> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
