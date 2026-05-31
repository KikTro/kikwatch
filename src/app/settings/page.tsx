'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { 
  Settings, 
  Sliders, 
  Trash2, 
  Info, 
  Check, 
  Play, 
  Volume2, 
  Languages 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { clearMyList, clearContinueWatching } = useUserStore();
  
  // Settings Options
  const [resolution, setResolution] = useState('1080p');
  const [playerSource, setPlayerSource] = useState('VidKing Primary');
  const [volumeLevel, setVolumeLevel] = useState(80);
  const [subtitleSize, setSubtitleSize] = useState('medium');
  const [subtitleColor, setSubtitleColor] = useState('yellow');
  
  // Alert Statuses
  const [alertText, setAlertText] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'info'>('success');

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerAlert = (text: string, type: 'success' | 'info' = 'success') => {
    setAlertText(text);
    setAlertType(type);
    setTimeout(() => {
      setAlertText('');
    }, 2000);
  };

  const handleClearWatchlist = () => {
    if (confirm('Are you sure you want to clear your watchlist? This cannot be undone.')) {
      clearMyList();
      triggerAlert('Your watchlist has been cleared!', 'success');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your "Continue Watching" history? This cannot be undone.')) {
      clearContinueWatching();
      triggerAlert('Your watch history has been reset!', 'success');
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-kik-bg)] pb-20 pt-8 md:pt-12 select-none">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Title */}
        <div className="flex items-center gap-3 mb-10">
          <Settings className="w-8 h-8 text-[var(--color-kik-accent)]" />
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        </div>

        {/* Global Floating Toast Alert */}
        <AnimatePresence>
          {alertText && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-xl ${
                alertType === 'success'
                  ? 'bg-blue-600/10 border-blue-500/30 text-blue-400'
                  : 'bg-white/5 border-white/10 text-gray-300'
              }`}
            >
              <Check className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">{alertText}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-8">
          
          {/* 1. Playback Preferences */}
          <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Play className="w-5 h-5 text-[var(--color-kik-accent)]" /> Playback Preferences
            </h2>
            
            <div className="flex flex-col gap-6">
              {/* Default Resolution */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-semibold text-white">Default Resolution</span>
                  <span className="text-xs text-gray-400 mt-1">Pre-select preferred target format when available.</span>
                </div>
                <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5 self-start md:self-auto">
                  {['720p', '1080p', '4K UHD'].map((res) => (
                    <button
                      key={res}
                      onClick={() => {
                        setResolution(res);
                        triggerAlert(`Default set to ${res}!`, 'info');
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        resolution === res
                          ? 'bg-[var(--color-kik-accent)] text-white shadow-md shadow-blue-500/10'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Streaming Embed Server */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/5 pt-6">
                <div>
                  <span className="block text-sm font-semibold text-white">Embed Streaming Server</span>
                  <span className="text-xs text-gray-400 mt-1">Select fallback stream mirrors if playback struggles.</span>
                </div>
                <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5 self-start md:self-auto">
                  {['VidKing Primary', 'Server Alternate'].map((source) => (
                    <button
                      key={source}
                      onClick={() => {
                        setPlayerSource(source);
                        triggerAlert(`Mirrors updated to ${source}!`, 'info');
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        playerSource === source
                          ? 'bg-[var(--color-kik-accent)] text-white shadow-md shadow-blue-500/10'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {source}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 2. Subtitle Configuration */}
          <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Languages className="w-5 h-5 text-[var(--color-kik-accent)]" /> Captions & Subtitles
            </h2>
            
            <div className="flex flex-col gap-6">
              {/* Text Size */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-semibold text-white">Subtitle Text Size</span>
                  <span className="text-xs text-gray-400 mt-1">Adjust readability scaling.</span>
                </div>
                <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5 self-start md:self-auto">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSubtitleSize(size);
                        triggerAlert(`Subtitle size set to ${size}!`, 'info');
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                        subtitleSize === size
                          ? 'bg-[var(--color-kik-accent)] text-white shadow-md shadow-blue-500/10'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption Style Theme */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/5 pt-6">
                <div>
                  <span className="block text-sm font-semibold text-white">Caption Theme Color</span>
                  <span className="text-xs text-gray-400 mt-1">Select text colors to fit readability contrast.</span>
                </div>
                <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5 self-start md:self-auto">
                  {['white', 'yellow', 'cyan'].map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSubtitleColor(color);
                        triggerAlert(`Captions set to ${color} theme!`, 'info');
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                        subtitleColor === color
                          ? 'bg-[var(--color-kik-accent)] text-white shadow-md shadow-blue-500/10'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. Privacy & Storage Management */}
          <section className="bg-white/5 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[var(--color-kik-accent)]" /> Cache & Storage
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                <div>
                  <span className="block text-sm font-bold text-red-400">Clear Watch History</span>
                  <span className="text-xs text-gray-400 mt-0.5">Clears items saved inside your "Continue Watching" row.</span>
                </div>
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600/15 border border-red-500/30 hover:bg-red-600/25 text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Reset History
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                <div>
                  <span className="block text-sm font-bold text-red-400">Reset Saved Watchlist</span>
                  <span className="text-xs text-gray-400 mt-0.5">Deletes all items bookmarked in your My List collection.</span>
                </div>
                <button
                  onClick={handleClearWatchlist}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600/15 border border-red-500/30 hover:bg-red-600/25 text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Reset Watchlist
                </button>
              </div>
            </div>
          </section>



        </div>
      </div>
    </main>
  );
}
