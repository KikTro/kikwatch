'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { 
  Settings, 
  Sliders, 
  Trash2, 
  Check, 
  Languages,
  Heart,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { clearMyList, clearContinueWatching } = useUserStore();
  
  // Settings Options
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

  const handleCopyUPI = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('kiktrolabs@ybl');
      triggerAlert('UPI ID copied to clipboard!', 'success');
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-kik-bg)] pb-20 pt-8 md:pt-12 select-none">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Title */}
        <div className="flex items-center gap-3.5 mb-10">
          <Settings className="w-8 h-8 text-white" />
          <h1 className="text-3xl font-black text-white tracking-tight select-text">Settings</h1>
        </div>

        {/* Global Floating Toast Alert */}
        <AnimatePresence>
          {alertText && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border backdrop-blur-2xl shadow-2xl ${
                alertType === 'success'
                  ? 'bg-white text-black border-white/10'
                  : 'bg-white/10 border-white/10 text-white'
              }`}
            >
              <Check className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider">{alertText}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-8">
          
          {/* 1. Support Us & Buy Me A Coffee (High-End Premium Card) */}
          <section className="bg-gradient-to-br from-purple-950/40 via-indigo-950/30 to-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:border-white/20">
            {/* Shimmer Ambient Gradient behind */}
            <div className="absolute -top-1/4 -right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-600/15 transition-all duration-700 animate-pulse" />
            
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2.5 tracking-tight">
              <Heart className="w-5.5 h-5.5 text-red-500 fill-red-500 animate-pulse" /> Support KikWatch
            </h2>
            
            <p className="text-sm text-white/70 leading-relaxed max-w-xl mb-6">
              Enjoying free cinematic streaming with zero ads and zero subscriptions? Support our platform to keep the servers alive, blazing fast, and forever free. Every coffee counts!
            </p>

            <div className="flex flex-col md:flex-row gap-8 items-center border-t border-white/5 pt-6 mt-2">
              {/* Refined CSS Mock UPI QR Code (Apple Design Aesthetics) */}
              <div className="relative w-40 h-40 bg-white p-3.5 rounded-2xl shadow-xl flex-shrink-0 flex items-center justify-center border border-white/10 select-none">
                {/* Mock QR Alignment squares */}
                <div className="absolute top-3.5 left-3.5 w-7 h-7 border-[3px] border-black rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-black rounded-[2px]" />
                </div>
                <div className="absolute top-3.5 right-3.5 w-7 h-7 border-[3px] border-black rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-black rounded-[2px]" />
                </div>
                <div className="absolute bottom-3.5 left-3.5 w-7 h-7 border-[3px] border-black rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-black rounded-[2px]" />
                </div>
                
                {/* Visual mesh array representing QR matrix */}
                <div className="w-full h-full flex flex-col justify-between pt-8 pl-8 pr-1 pb-1">
                  <div className="flex justify-between w-full h-2.5">
                    <div className="w-4 bg-black h-1 rounded" />
                    <div className="w-3 bg-black h-1 rounded" />
                    <div className="w-1.5 bg-black h-1 rounded" />
                  </div>
                  <div className="flex justify-between w-full h-2.5">
                    <div className="w-2 bg-black h-1 rounded" />
                    <div className="w-6 bg-black h-1 rounded" />
                  </div>
                  <div className="flex justify-between w-full h-2.5">
                    <div className="w-5 bg-black h-1 rounded" />
                    <div className="w-2 bg-black h-1 rounded" />
                    <div className="w-3 bg-black h-1 rounded" />
                  </div>
                  <div className="flex justify-between w-full h-2.5">
                    <div className="w-3 bg-black h-1 rounded" />
                    <div className="w-4 bg-black h-1 rounded" />
                  </div>
                  <div className="flex justify-between w-full h-2.5">
                    <div className="w-1.5 bg-black h-1 rounded" />
                    <div className="w-2 bg-black h-1 rounded" />
                    <div className="w-5 bg-black h-1 rounded" />
                  </div>
                </div>

                {/* Center UPI Logo Icon */}
                <div className="absolute inset-0 m-auto w-10 h-10 bg-black text-white text-[9px] font-black rounded-xl border border-white/20 flex items-center justify-center tracking-tight shadow-md uppercase">
                  UPI
                </div>
              </div>

              {/* UPI ID copy and payment information */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Pay via any UPI App</span>
                  <span className="text-sm font-semibold text-white/80">Scan the QR or copy the UPI ID below to pay directly from GPay, PhonePe, Paytm, or BHIM.</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                  <div className="flex-grow flex items-center justify-between bg-black/40 border border-white/10 px-4 py-3 rounded-xl select-text">
                    <span className="font-mono text-sm font-bold text-white tracking-wider select-all">kiktrolabs@ybl</span>
                    <button 
                      onClick={handleCopyUPI}
                      className="text-white/60 hover:text-white transition-colors ml-2 p-1 hover:scale-105 transition-all cursor-pointer"
                      title="Copy UPI ID"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={handleCopyUPI}
                    className="px-6 py-3 bg-white text-black hover:bg-white/90 active:scale-95 text-xs font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer self-stretch sm:self-auto uppercase tracking-widest"
                  >
                    Copy UPI ID
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Subtitle Configuration */}
          <section className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:border-white/20">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5">
              <Languages className="w-5 h-5 text-white" /> Captions & Subtitles
            </h2>
            
            <div className="flex flex-col gap-6">
              {/* Text Size */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-semibold text-white">Subtitle Text Size</span>
                  <span className="text-xs text-gray-400 mt-1">Adjust captions readability scaling.</span>
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
                          ? 'bg-white text-black shadow-lg font-extrabold'
                          : 'bg-white/5 text-white/50 border border-white/5 hover:text-white hover:bg-white/10'
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
                          ? 'bg-white text-black shadow-lg font-extrabold'
                          : 'bg-white/5 text-white/50 border border-white/5 hover:text-white hover:bg-white/10'
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
          <section className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:border-white/20">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-white" /> Cache & Storage
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                <div>
                  <span className="block text-sm font-bold text-red-400">Clear Watch History</span>
                  <span className="text-xs text-gray-400 mt-0.5">Clears items saved inside your "Continue Watching" row.</span>
                </div>
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Reset History
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                <div>
                  <span className="block text-sm font-bold text-red-400">Reset Saved Watchlist</span>
                  <span className="text-xs text-gray-400 mt-0.5">Deletes all items bookmarked in your My List collection.</span>
                </div>
                <button
                  onClick={handleClearWatchlist}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
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
