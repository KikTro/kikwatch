import InfiniteScrollGrid from '@/components/movie/InfiniteScrollGrid';
import { getPopularTVShows } from '@/lib/tmdb';

export default async function TVShowsPage() {
  const initialShows = await getPopularTVShows(1);

  async function fetchMoreShows(page: number) {
    'use server';
    return await getPopularTVShows(page);
  }

  return (
    <main className="min-h-screen bg-[var(--color-kik-bg)] pb-20 pt-8 md:pt-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">TV Shows</h1>
        <InfiniteScrollGrid 
          initialMovies={initialShows} 
          fetchMore={fetchMoreShows} 
        />
      </div>
    </main>
  );
}
