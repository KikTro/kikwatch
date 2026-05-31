'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import MovieCard from './MovieCard';
import { Movie } from '@/lib/tmdb';

interface InfiniteScrollGridProps {
  initialMovies: Movie[];
  fetchMore: (page: number) => Promise<Movie[]>;
}

export default function InfiniteScrollGrid({ initialMovies, fetchMore }: InfiniteScrollGridProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      const nextPage = page + 1;
      const newMovies = await fetchMore(nextPage);
      
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        // Filter out duplicates just in case
        setMovies(prev => {
          const existingIds = new Set(prev.map(m => m.id));
          const uniqueNew = newMovies.filter(m => !existingIds.has(m.id));
          return [...prev, ...uniqueNew];
        });
        setPage(nextPage);
      }
    } catch (error) {
      console.error('Failed to load more movies:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="flex justify-center">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div ref={observerTarget} className="w-full flex justify-center py-12">
          {loading && (
            <div className="w-10 h-10 border-4 border-[var(--color-kik-blue)] border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      )}
      
      {!hasMore && movies.length > 0 && (
        <div className="w-full text-center py-12 text-white/50">
          You have reached the end of the catalog.
        </div>
      )}
    </>
  );
}
