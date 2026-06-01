'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Film, 
  Tv, 
  TrendingUp, 
  Search, 
  Bookmark, 
  Settings, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SplashScreen from './SplashScreen';

const menuLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Movies', path: '/movies', icon: Film },
  { name: 'TV Shows', path: '/tv', icon: Tv },
  { name: 'Trending', path: '/trending', icon: TrendingUp },
  { name: 'Search', path: '/search', icon: Search },
  { name: 'Watchlist', path: '/my-list', icon: Bookmark },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [splashActive, setSplashActive] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    // Auto-collapse sidebar on Movie and TV details/watch pages
    if (pathname.startsWith('/movie/') || pathname.startsWith('/tv/')) {
      setIsCollapsed(true);
    }
  }, [pathname]);

  return (
    <>
      {/* 1. Startup Splash Screen */}
      <AnimatePresence mode="wait">
        {splashActive && (
          <SplashScreen onComplete={() => setSplashActive(false)} />
        )}
      </AnimatePresence>

      {/* 2. Main Application Layout (renders once splash screen finishes fading) */}
      {!splashActive && (
        <div className="flex min-h-screen bg-[var(--color-kik-bg)] text-white overflow-hidden relative">
          
          {/* A. Fixed Left-Sidebar Navigation Rail (Desktop with Collapse state) */}
          <aside 
            className={`hidden md:flex flex-col justify-between fixed top-0 left-0 bottom-0 z-40 sidebar-glass transition-all duration-300 ease-in-out ${
              isCollapsed ? 'w-20 p-4' : 'w-64 lg:w-72 p-6'
            }`}
          >
            {/* Logo area */}
            <div className="flex flex-col gap-8">
              <div className={`flex flex-col select-none pt-2 ${isCollapsed ? 'items-center' : 'pl-3'}`}>
                <Link 
                  href="/" 
                  className="text-2xl font-bold tracking-tighter text-white leading-none"
                >
                  {isCollapsed ? (
                    <span className="flex items-center">K<span className="text-[var(--color-kik-accent)]">W</span></span>
                  ) : (
                    <span>Kik<span className="text-[var(--color-kik-accent)]">Watch</span></span>
                  )}
                </Link>
                {!isCollapsed && (
                  <span className="text-[9px] text-gray-500 font-semibold tracking-wider mt-1 hover:text-gray-400 transition-colors uppercase">
                    by krishnendu @ KikTro
                  </span>
                )}
              </div>

              {/* Big Collapse Button (Top of all navigation links) */}
              <div className={`flex ${isCollapsed ? 'justify-center' : 'pl-3 pr-3'}`}>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className={`flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 ${
                    isCollapsed ? 'w-12 h-12' : 'w-full py-2.5 px-4 gap-3'
                  }`}
                  title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                  {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                  {!isCollapsed && <span className="font-bold tracking-wider text-[10px] uppercase">Minimize Menu</span>}
                </button>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="flex flex-col gap-1.5">
                {menuLinks.map((link) => {
                  const isActive = pathname === link.path;
                  const Icon = link.icon;
                  
                  return (
                    <Link
                       key={link.name}
                      href={link.path}
                      className={`relative flex items-center rounded-xl text-sm font-semibold transition-all duration-300 group cursor-pointer ${
                        isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-3'
                      } ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                      title={isCollapsed ? link.name : undefined}
                    >
                      {/* Active Indicator Glow Pill (Framer Motion layouts glide between links!) */}
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-pill"
                          className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-xl -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-[var(--color-kik-accent)]' : 'text-gray-400 group-hover:text-white'}`} />
                      
                      {!isCollapsed && (
                        <span className="tracking-wide whitespace-nowrap overflow-hidden">
                          {link.name}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* B. Mobile Drawer Sidebar (collapsible off-canvas) */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Backdrop overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-45 md:hidden"
                />

                {/* Off-canvas sidebar */}
                <motion.aside
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="fixed top-0 left-0 bottom-0 w-64 z-50 bg-[#05070D] border-r border-white/5 p-6 flex flex-col justify-between md:hidden"
                >
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col pl-2 select-none">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white leading-none">
                          Kik<span className="text-[var(--color-kik-accent)]">Watch</span>
                        </Link>
                        <span className="text-[9px] text-gray-500 font-semibold tracking-wider mt-1 uppercase">
                          by krishnendu @ KikTro
                        </span>
                      </div>
                      <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <nav className="flex flex-col gap-1.5">
                      {menuLinks.map((link) => {
                        const isActive = pathname === link.path;
                        const Icon = link.icon;
                        
                        return (
                          <Link
                            key={link.name}
                            href={link.path}
                            className={`relative flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                              isActive 
                                ? 'text-white bg-blue-600/10 border border-blue-500/20' 
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--color-kik-accent)]' : 'text-gray-400'}`} />
                            <span>{link.name}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* C. Mobile Header Top-Bar */}
          <header className="fixed top-0 left-0 right-0 h-16 z-30 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-white hover:text-gray-300 transition-colors p-2 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center select-none">
              <Link href="/" className="text-xl font-bold tracking-tighter text-white leading-none">
                Kik<span className="text-[var(--color-kik-accent)]">Watch</span>
              </Link>
              <span className="text-[8px] text-gray-400 font-semibold tracking-wider mt-0.5 uppercase">
                by krishnendu @ KikTro
              </span>
            </div>
            <Link href="/search" className="text-white hover:text-gray-300 p-2">
              <Search className="w-5 h-5" />
            </Link>
          </header>

          {/* D. Main Content Layout (scrolling independently and padded for Sidebar offset) */}
          <div 
            className={`flex-grow min-h-screen min-w-0 relative flex flex-col pt-16 md:pt-0 transition-all duration-300 ease-in-out overflow-x-hidden ${
              isCollapsed ? 'md:pl-20' : 'md:pl-64 lg:pl-72'
            }`}
          >
            {/* VERY SMOOTH PAGE TRANSITIONS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex-1 flex flex-col"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}
