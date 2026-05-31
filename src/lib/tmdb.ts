export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type?: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  similar?: {
    results: Movie[];
  };
  number_of_seasons?: number; // Added for TV shows
}

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY || '15d2ea6d0dc1d476efbca3eba2b9bbfb';

async function fetchFromProxy(endpoint: string, params: Record<string, string> = {}): Promise<any> {
  // If on client side (browser), call our secure internal API route proxy
  if (typeof window !== 'undefined') {
    const queryParams = new URLSearchParams({ endpoint, ...params });
    try {
      const res = await fetch(`/api/tmdb?${queryParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch from proxy');
      return await res.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint} on client:`, error);
      return null;
    }
  }

  // If on server side (SSR), fetch directly from TMDB API.
  // This completely circumvents port configuration issues and ECONNREFUSED localhost failures.
  const queryParams = new URLSearchParams({ ...params, api_key: API_KEY });
  try {
    const res = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache SSR requests for 1 hour to prevent API rate limits
    });
    if (!res.ok) throw new Error(`TMDB Direct fetch failed for ${endpoint}`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint} directly on server:`, error);
    return null;
  }
}

export async function getTrending(page: number = 1): Promise<Movie[]> {
  const data = await fetchFromProxy('/trending/all/day', { page: page.toString() });
  return data?.results || [];
}

export async function getTopRatedMovies(page: number = 1): Promise<Movie[]> {
  const data = await fetchFromProxy('/movie/top_rated', { page: page.toString() });
  return (data?.results || []).map((m: Movie) => ({ ...m, media_type: 'movie' }));
}

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  const data = await fetchFromProxy('/movie/popular', { page: page.toString() });
  return (data?.results || []).map((m: Movie) => ({ ...m, media_type: 'movie' }));
}

export async function getPopularTVShows(page: number = 1): Promise<Movie[]> {
  const data = await fetchFromProxy('/tv/popular', { page: page.toString() });
  return (data?.results || []).map((m: Movie) => ({ ...m, media_type: 'tv' }));
}

export async function getDetails(id: string, type: 'movie' | 'tv'): Promise<Movie | null> {
  const data = await fetchFromProxy(`/${type}/${id}`, { append_to_response: 'similar,credits' });
  if (!data) return null;
  return { ...data, media_type: type };
}

export async function searchContent(query: string, page: number = 1): Promise<Movie[]> {
  if (!query) return [];
  const data = await fetchFromProxy('/search/multi', { query, page: page.toString() });
  // Filter out people
  return (data?.results || []).filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv');
}

export function getImageUrl(path: string | null, size: 'w500' | 'original' = 'w500') {
  if (!path || path === 'null') return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
