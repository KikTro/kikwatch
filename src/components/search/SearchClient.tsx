'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Movie, searchContent } from '@/lib/tmdb';
import InfiniteScrollGrid from '@/components/movie/InfiniteScrollGrid';

export default function SearchClient() {
  const [query, setQuery] = useState('');
  const [initialResults, setInitialResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 250);

  // Set loading to true immediately when user starts typing
  useEffect(() => {
    if (query.trim() && query !== debouncedQuery) {
      setLoading(true);
    }
  }, [query, debouncedQuery]);

  useEffect(() => {
    async function fetchResults() {
      if (!debouncedQuery.trim()) {
        setInitialResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await searchContent(debouncedQuery, 1);
        setInitialResults(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [debouncedQuery]);

  const fetchMoreSearchResults = useCallback(async (page: number) => {
    if (!debouncedQuery.trim()) return [];
    return await searchContent(debouncedQuery, page);
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-kik-accent)] focus:ring-1 focus:ring-[var(--color-kik-accent)] transition-all"
          placeholder="Search for movies, TV shows, genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-[var(--color-kik-accent)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && initialResults.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Search Results for "{debouncedQuery}"</h2>
          <InfiniteScrollGrid 
            // Add a key so InfiniteScrollGrid resets when query changes
            key={debouncedQuery} 
            initialMovies={initialResults} 
            fetchMore={fetchMoreSearchResults} 
          />
        </div>
      )}

      {!loading && debouncedQuery && initialResults.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl">No results found for "{debouncedQuery}"</p>
          <p className="mt-2">Try checking for typos or using different keywords.</p>
        </div>
      )}

      {!debouncedQuery && (
        <div className="text-center py-20 text-gray-500">
          <SearchIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl">Discover your next favorite story</p>
        </div>
      )}
    </div>
  );
}
