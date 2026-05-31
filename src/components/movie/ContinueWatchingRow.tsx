'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import ContentRow from './ContentRow';

export default function ContinueWatchingRow() {
  const [mounted, setMounted] = useState(false);
  const { continueWatching } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !continueWatching || continueWatching.length === 0) return null;

  // Map progress to Movie objects to reuse ContentRow and MovieCard
  // or we can build a specialized ContinueWatchingCard. Let's reuse MovieCard for simplicity first.
  const movies = continueWatching.map(p => p.details);

  return <ContentRow title="Continue Watching" movies={movies} />;
}
