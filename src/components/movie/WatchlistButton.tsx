'use client';

import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { Movie } from '@/lib/tmdb';
import { useUserStore } from '@/store/useUserStore';

interface WatchlistButtonProps {
  movie: Movie;
  className?: string;
  variant?: 'primary' | 'hero';
}

export default function WatchlistButton({ movie, className = '', variant = 'primary' }: WatchlistButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { addToMyList, removeFromMyList, isInMyList } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const inList = mounted ? isInMyList(movie.id) : false;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!mounted) return;
    if (inList) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  if (variant === 'hero') {
    return (
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-6 md:px-8 py-3 rounded-md font-bold transition-all backdrop-blur-md cursor-pointer ${
          inList
            ? 'bg-[var(--color-kik-accent)] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
            : 'bg-white/20 hover:bg-white/30 text-white'
        } ${className}`}
      >
        {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        {inList ? 'In Watchlist' : 'My List'}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all border cursor-pointer ${
        inList
          ? 'bg-[var(--color-kik-accent)]/10 border-[var(--color-kik-accent)] text-[var(--color-kik-cyan)] hover:bg-[var(--color-kik-accent)]/20 shadow-md shadow-blue-500/5'
          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
      } ${className}`}
    >
      {inList ? <Check className="w-5 h-5 text-[var(--color-kik-cyan)]" /> : <Plus className="w-5 h-5" />}
      {inList ? 'In Watchlist' : 'Add to Watchlist'}
    </button>
  );
}
