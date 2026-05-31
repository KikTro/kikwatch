import InfiniteScrollGrid from '@/components/movie/InfiniteScrollGrid';
import { getPopularMovies } from '@/lib/tmdb';

export default async function MoviesPage() {
  const initialMovies = await getPopularMovies(1);

  async function fetchMoreMovies(page: number) {
    'use server';
    return await getPopularMovies(page);
  }

  return (
    <main className="min-h-screen bg-[var(--color-kik-bg)] pb-20 pt-8 md:pt-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">Movies</h1>
        <InfiniteScrollGrid 
          initialMovies={initialMovies} 
          fetchMore={fetchMoreMovies} 
        />
      </div>
    </main>
  );
}
