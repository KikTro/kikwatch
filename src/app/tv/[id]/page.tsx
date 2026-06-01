import { getDetails, getImageUrl } from '@/lib/tmdb';
import Navbar from '@/components/layout/Navbar';
import ContentRow from '@/components/movie/ContentRow';
import TVShowClient from '@/components/tv/TVShowClient';
import WatchlistButton from '@/components/movie/WatchlistButton';
import { Star, Tv, Calendar, Globe2, Network, Users } from 'lucide-react';

export default async function TVPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  // Request TV show details with similar and credits appended
  const show: any = await getDetails(resolvedParams.id, 'tv');

  if (!show) {
    return (
      <div className="min-h-screen bg-[var(--color-kik-bg)] text-white flex justify-center items-center">
        TV Show not found
      </div>
    );
  }

  const title = show.name || show.title;
  const year = (show.first_air_date || '').split('-')[0];
  const seasons = show.seasons || [];

  // Parse Creators and Cast
  const creators = show.created_by?.map((c: any) => c.name).join(', ') || 'N/A';
  const networks = show.networks?.map((n: any) => n.name).join(', ') || 'N/A';
  const cast = show.credits?.cast?.slice(0, 6) || [];

  return (
    <main className="min-h-screen bg-[var(--color-kik-bg)] pb-20 pt-8 md:pt-12">

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Top Section: Centered Cinematic Player with Season/Episode Selectors */}
        <div className="w-full max-w-5xl mx-auto mb-8 relative z-10">
          <TVShowClient show={show} seasons={seasons} />
        </div>

        {/* Bottom Section: Spacious details flowing beautifully under player */}
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
          
          {/* Main heading row with poster and specs */}
          <div className="flex flex-col md:flex-row gap-6 md:items-start border-b border-white/5 pb-8">
            {/* Apple TV-style Content-Aware Ambient Shadow on Detail Page */}
            <div className="relative w-36 h-52 flex-shrink-0 self-center md:self-start select-none group">
              <div className="absolute inset-x-2 bottom-[-14px] top-4 -z-10 opacity-60 blur-xl pointer-events-none">
                <img 
                  src={getImageUrl(show.poster_path, 'w500')} 
                  alt="" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <img 
                src={getImageUrl(show.poster_path, 'w500')} 
                alt={title} 
                className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl relative"
              />
            </div>
            
            <div className="flex-1 flex flex-col justify-center text-center md:text-left pt-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 leading-tight select-text">
                {title}
              </h1>
              
              {show.tagline && (
                <p className="text-base italic text-gray-400 mb-4">"{show.tagline}"</p>
              )}

              <div className="flex items-center justify-center md:justify-start flex-wrap gap-x-3 gap-y-1.5 text-sm text-gray-300 mb-5 font-semibold">
                <span className="flex items-center gap-1 text-[var(--color-kik-cyan)] font-bold">
                  <Star className="w-4 h-4 fill-current" /> {show.vote_average?.toFixed(1)} Rating
                </span>
                <span className="text-gray-600 select-none">•</span>
                <span>{year}</span>
                <span className="text-gray-600 select-none">•</span>
                <span>{show.number_of_seasons ? `${show.number_of_seasons} Seasons` : 'N/A'}</span>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {show.genres?.map((g: any) => (
                  <span key={g.id} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 font-medium">
                    {g.name}
                  </span>
                ))}
              </div>

              {/* Format badges and interactive watchlist actions inline */}
              <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-white/5 pt-6 mt-1 w-full justify-center md:justify-start">
                <WatchlistButton movie={show} className="w-full sm:w-auto" />
              </div>
            </div>
          </div>

          {/* Details split: Storyline left, specifications card right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Storyline block */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <h2 className="text-xs tracking-wider uppercase text-gray-500 font-bold">Storyline</h2>
              <p className="text-gray-200 leading-relaxed text-base select-text">
                {show.overview}
              </p>
            </div>

            {/* Technical card */}
            <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/5 p-5 flex flex-col gap-4 text-xs shadow-2xl">
              <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                <span className="text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Creator</span>
                <span className="text-white font-semibold text-sm truncate" title={creators}>{creators}</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                <span className="text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5"><Network className="w-3.5 h-3.5" /> Network</span>
                <span className="text-white font-semibold text-sm truncate" title={networks}>{networks}</span>
              </div>
              <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                <span className="text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5" /> Language</span>
                <span className="text-white font-semibold text-sm uppercase">{show.original_language || 'EN'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5"><Tv className="w-3.5 h-3.5" /> Library Size</span>
                <span className="text-white font-semibold text-sm">
                  {show.number_of_seasons || 1} Seasons / {show.number_of_episodes || 0} Episodes
                </span>
              </div>
            </div>
          </div>

          {/* Principal Cast horizontal grid cards */}
          {cast.length > 0 && (
            <div className="border-t border-white/5 pt-8 mt-4">
              <h2 className="text-xs tracking-wider uppercase text-gray-500 font-bold mb-5">Principal Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {cast.map((actor: any) => (
                  <div key={actor.id} className="flex flex-col items-center text-center bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all p-4 rounded-2xl shadow-sm">
                    <img 
                      src={actor.profile_path ? getImageUrl(actor.profile_path, 'w500') : 'https://via.placeholder.com/150?text=No+Photo'}
                      alt={actor.name}
                      className="w-16 h-16 object-cover rounded-full border border-white/10 mb-3 shadow-md"
                    />
                    <span className="text-white font-bold text-xs line-clamp-1">{actor.name}</span>
                    <span className="text-gray-400 text-[10px] line-clamp-1 mt-1">{actor.character}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Similar Shows Carousel */}
        {show.similar?.results?.length > 0 && (
          <div className="mt-16">
            <ContentRow title="Similar TV Shows" movies={show.similar.results.map((m: any) => ({ ...m, media_type: 'tv' }))} />
          </div>
        )}
      </div>
    </main>
  );
}
