import { NextResponse } from 'next/server';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
// Use provided env key, or fallback to widely known public proxy key if the user has strictly forbidden putting keys in the frontend env
const API_KEY = process.env.TMDB_API_KEY || '15d2ea6d0dc1d476efbca3eba2b9bbfb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  // Construct query string without the custom 'endpoint' param
  const queryParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    if (key !== 'endpoint') {
      queryParams.append(key, value);
    }
  });
  
  // Ensure the api_key is injected safely on the backend
  queryParams.append('api_key', API_KEY);

  try {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache results for 1 hour to prevent rate limiting
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.status_message || 'Failed to fetch' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('TMDB Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
