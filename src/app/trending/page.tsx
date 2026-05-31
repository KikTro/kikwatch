import InfiniteScrollGrid from '@/components/movie/InfiniteScrollGrid';
import { getTrending } from '@/lib/tmdb';

export default async function TrendingPage() {
  const initialTrending = await getTrending(1);

  async function fetchMoreTrending(page: number) {
    'use server';
    return await getTrending(page);
  }

  return (
    <main className="min-h-screen bg-[var(--color-kik-bg)] pb-20 pt-8 md:pt-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">Trending Now</h1>
        <InfiniteScrollGrid 
          initialMovies={initialTrending} 
          fetchMore={fetchMoreTrending} 
        />
      </div>
    </main>
  );
}
