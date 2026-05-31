'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import MovieCard from '@/components/movie/MovieCard';
import { Bookmark } from 'lucide-react';

export default function MyListClient() {
  const [mounted, setMounted] = useState(false);
  const { myList } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!myList || myList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Bookmark className="w-20 h-20 mb-6 opacity-20" />
        <h2 className="text-2xl font-bold text-white mb-2">Your List is Empty</h2>
        <p>Add shows and movies to your list to watch them later.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">My List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {myList.map((movie) => (
          <div key={movie.id} className="flex justify-center">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
