import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = ({ initialValue = '', placeholder = "Search or paste YouTube URL...", className = "", variant = "large" }) => {
    const [url, setUrl] = useState(initialValue);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        // Check if it's a YouTube URL
        let videoId = null;
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        }

        // If it's a video URL, go to player. Otherwise, search
        if (videoId) {
            navigate(`/watch?v=${videoId}`);
        } else {
            navigate(`/search?q=${encodeURIComponent(url)}`);
        }
    };

    const isCompact = variant === "compact";

    return (
        <form onSubmit={handleSearch} className={`relative group ${className}`}>
            {!isCompact && <div className="absolute inset-0 bg-red-200 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>}
            <div className={`relative flex items-center bg-white shadow-xl rounded-full border border-gray-100 p-1.5 focus-within:ring-4 focus-within:ring-red-50 transition-shadow ${isCompact ? 'shadow-sm py-1' : 'p-2'}`}>
                <Search className={`${isCompact ? 'ml-3 w-4 h-4' : 'ml-4 w-6 h-6'} text-gray-400`} />
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`flex-1 ml-3 md:ml-4 outline-none bg-transparent text-gray-800 placeholder:text-gray-300 ${isCompact ? 'text-sm h-7' : 'text-lg h-10'}`}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button
                    type="submit"
                    className={`${isCompact ? 'px-4 py-1.5 text-sm' : 'px-8 py-3'} bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-transform active:scale-95`}
                >
                    {isCompact ? 'Search' : 'Watch'}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
