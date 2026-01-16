import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Layout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isSearchPage = location.pathname === '/search';
    const isWatchPage = location.pathname === '/watch';
    const hideSearch = isHomePage || isSearchPage || isWatchPage;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 flex items-center px-4 md:px-6 justify-between gap-4">
                <div className="flex items-center gap-4 shrink-0">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/logo.png" alt="YouTubeNoAds" className="w-8 h-8 rounded-lg" />
                        <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:inline">YouTubeNoAds</span>
                    </Link>
                </div>

                <div className={`flex-1 max-w-xl mx-auto transition-opacity duration-300 ${hideSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    {!hideSearch && <SearchBar variant="compact" className="w-full" />}
                </div>

                <div className="shrink-0 w-8 md:w-32 flex justify-end">
                    {/* Placeholder for user/settings */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 mt-16 p-4 md:p-6 overflow-y-auto">
                <div className={`${isWatchPage ? 'max-w-[1800px]' : 'max-w-7xl'} mx-auto w-full`}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
