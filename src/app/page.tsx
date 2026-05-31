import HeroBanner from '@/components/movie/HeroBanner';
import ContentRow from '@/components/movie/ContentRow';
import { getTrending, getTopRatedMovies, getPopularMovies, getPopularTVShows } from '@/lib/tmdb';

import ContinueWatchingRow from '@/components/movie/ContinueWatchingRow';

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const [trending, topRated, popularMovies, popularTV] = await Promise.all([
    getTrending(),
    getTopRatedMovies(),
    getPopularMovies(),
    getPopularTVShows(),
  ]);

  const featuredMovie = trending[0];

  return (
    <main className="min-h-screen bg-[var(--color-kik-bg)] pb-20">
      
      {/* Hero Section */}
      {featuredMovie && <HeroBanner movie={featuredMovie} />}
      
      {/* Content Rows */}
      <div className="flex flex-col gap-8 -mt-20 relative z-20">
        <ContinueWatchingRow />
        <ContentRow title="Trending Now" movies={trending.slice(1)} />
        <ContentRow title="Top Rated Movies" movies={topRated} />
        <ContentRow title="Popular Movies" movies={popularMovies} />
        <ContentRow title="Popular TV Shows" movies={popularTV} />
      </div>
    </main>
  );
}
