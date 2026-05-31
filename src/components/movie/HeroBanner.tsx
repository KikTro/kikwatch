'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Movie, getImageUrl } from '@/lib/tmdb';
import Link from 'next/link';
import WatchlistButton from './WatchlistButton';

export default function HeroBanner({ movie }: { movie: Movie }) {
  if (!movie) return null;

  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date || '').split('-')[0];
  const backdropImg = movie.backdrop_path || movie.poster_path;
  
  return (
    <div className="relative w-full h-[75vh] md:h-[92vh] flex items-center overflow-hidden">
      
      {/* Cinematic Vignette Background Gradients */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <img
          src={getImageUrl(backdropImg, 'original')}
          alt={title}
          className="w-full h-full object-cover object-top scale-105 animate-scale-slow"
        />
        {/* Left Side Heavy Shadow Vignette */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to right, #05070D 0%, rgba(5, 7, 13, 0.85) 50%, transparent 100%)'
          }}
        />
        
        {/* Bottom Spill Vignette */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to top, #05070D 0%, rgba(5, 7, 13, 0.15) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Hero Content Area with wide spacing */}
      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 pt-24 md:pt-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl lg:max-w-3xl"
        >
          {/* Tagline or Specifications Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            <span className="text-[9px] tracking-[0.2em] font-black px-2 py-0.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded uppercase">
              Trending Title
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 leading-tight text-glow select-text"
          >
            {title}
          </motion.h1>

          {/* Meta Details Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-300 mb-6 font-medium">
            <span className="text-[var(--color-kik-cyan)] font-bold">
              ★ {movie.vote_average?.toFixed(1)} Rating
            </span>
            <span className="text-gray-600 select-none">•</span>
            <span>{movie.media_type === 'tv' ? 'TV Series' : 'Movie'}</span>
            <span className="text-gray-600 select-none">•</span>
            <span>{year}</span>
          </div>

          {/* Overview Description */}
          <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-8 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl lg:max-w-2xl select-text">
            {movie.overview}
          </p>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${movie.media_type}/${movie.id}`}>
              <button className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5 cursor-pointer">
                <Play className="w-5 h-5 fill-black" />
                Watch Now
              </button>
            </Link>
            
            <WatchlistButton movie={movie} variant="hero" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
