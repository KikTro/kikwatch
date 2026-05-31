import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/lib/tmdb';

export interface WatchProgress {
  id: string;
  type: 'movie' | 'tv';
  progress: number;
  duration: number;
  timestamp: number;
  details: Movie;
  season?: number;
  episode?: number;
}

interface UserState {
  myList: Movie[];
  continueWatching: WatchProgress[];
  addToMyList: (movie: Movie) => void;
  removeFromMyList: (id: number) => void;
  isInMyList: (id: number) => boolean;
  updateProgress: (progress: WatchProgress) => void;
  removeFromContinueWatching: (id: string) => void;
  clearMyList: () => void;
  clearContinueWatching: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      myList: [],
      continueWatching: [],
      addToMyList: (movie) =>
        set((state) => {
          if (state.myList.some((m) => m.id === movie.id)) return state;
          return { myList: [movie, ...state.myList] };
        }),
      removeFromMyList: (id) =>
        set((state) => ({
          myList: state.myList.filter((m) => m.id !== id),
        })),
      isInMyList: (id) => get().myList.some((m) => m.id === id),
      updateProgress: (progress) =>
        set((state) => {
          // Keep only the most recent progress for a specific movie/show
          const filtered = state.continueWatching.filter((p) => p.id !== progress.id);
          // Only keep if watched more than 5% and less than 95%
          const percentage = progress.duration > 0 ? (progress.progress / progress.duration) * 100 : 0;
          
          if (percentage > 95) {
            // Considered finished
            return { continueWatching: filtered };
          }
          
          return {
            continueWatching: [progress, ...filtered].slice(0, 20), // Keep last 20
          };
        }),
      removeFromContinueWatching: (id) =>
        set((state) => ({
          continueWatching: state.continueWatching.filter((p) => p.id !== id),
        })),
      clearMyList: () => set({ myList: [] }),
      clearContinueWatching: () => set({ continueWatching: [] }),
    }),
    {
      name: 'kikwatch-user-storage',
    }
  )
);
