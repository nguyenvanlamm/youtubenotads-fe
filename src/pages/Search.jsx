import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import api from '../services/api';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            handleSearch(query);
        }
    }, [query]);

    const handleSearch = async (searchQuery) => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.search(searchQuery);
            setVideos(data.videos);
        } catch (err) {
            setError('Failed to search videos. Make sure the Python server is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-10">
            {/* Search Bar */}
            <div className="mb-12">
                <SearchBar initialValue={query} className="max-w-2xl mx-auto" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6">
                Results for: <span className="text-red-600">"{query}"</span>
            </h2>

            {loading && (
                <div className="py-20">
                    <Loading size="lg" />
                </div>
            )}

            {error && (
                <div className="text-center py-10">
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                    <p className="text-gray-500 mt-2">Run: <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">npm run server</code></p>
                </div>
            )}

            {!loading && !error && videos.length === 0 && query && (
                <p className="text-gray-500 text-center py-10 bg-gray-50 rounded-2xl">No videos found matching your search.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default Search;
