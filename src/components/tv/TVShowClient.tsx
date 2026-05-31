'use client';

import { useState } from 'react';
import VidKingPlayer from '@/components/player/VidKingPlayer';
import { Movie } from '@/lib/tmdb';

interface TVShowClientProps {
  show: Movie;
  seasons: any[]; // Expecting seasons data from TMDB
}

export default function TVShowClient({ show, seasons }: TVShowClientProps) {
  // Default to season 1, episode 1 if available
  const initialSeason = seasons.length > 0 ? (seasons[0].season_number === 0 && seasons.length > 1 ? seasons[1].season_number : seasons[0].season_number) : 1;
  
  const [selectedSeason, setSelectedSeason] = useState<number>(initialSeason);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);

  // Generate an array of episodes for the selected season (simplified mock if no real data)
  const currentSeasonData = seasons.find(s => s.season_number === selectedSeason);
  const episodeCount = currentSeasonData?.episode_count || 24;
  const episodes = Array.from({ length: episodeCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="relative z-10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.15)] ring-1 ring-white/10">
        <VidKingPlayer movie={show} season={selectedSeason} episode={selectedEpisode} />
      </div>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm text-gray-400 font-medium">Season</label>
          <select 
            value={selectedSeason}
            onChange={(e) => {
              setSelectedSeason(Number(e.target.value));
              setSelectedEpisode(1); // Reset to ep 1 on season change
            }}
            className="bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 outline-none focus:border-[var(--color-kik-accent)] transition-colors"
          >
            {seasons.map((s) => (
              <option key={s.id} value={s.season_number}>
                {s.name} ({s.episode_count} Episodes)
              </option>
            ))}
            {seasons.length === 0 && <option value={1}>Season 1</option>}
          </select>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm text-gray-400 font-medium">Episode</label>
          <select 
            value={selectedEpisode}
            onChange={(e) => setSelectedEpisode(Number(e.target.value))}
            className="bg-black/50 border border-white/10 text-white rounded-lg px-4 py-3 outline-none focus:border-[var(--color-kik-accent)] transition-colors"
          >
            {episodes.map((ep) => (
              <option key={ep} value={ep}>
                Episode {ep}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
