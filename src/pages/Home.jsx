import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import api from '../services/api';

const Home = () => {
    const [trendingVideos, setTrendingVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        try {
            const data = await api.getTrending();
            setTrendingVideos(data.videos || []);
        } catch (error) {
            console.error('Failed to fetch trending videos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-12 py-10">
            <div className="text-center space-y-4 max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                    YouTube <span className="text-red-600">No Ads</span>
                </h1>
                <p className="text-xl text-gray-500">
                    Watch YouTube videos without the clutter.
                    <br className="hidden md:block" />
                    Paste a link or search to start watching instantly.
                </p>
            </div>

            <div className="w-full max-w-2xl px-4">
                <SearchBar className="max-w-2xl w-full" />
            </div>

            {/* Trending Section */}
            <div className="w-full max-w-7xl px-4 mt-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-gray-900">Trending Now</h3>
                    <div className="h-px flex-1 bg-gray-100 mx-6 hidden md:block"></div>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {trendingVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                )}

                {!loading && trendingVideos.length === 0 && (
                    <p className="text-gray-500 text-center py-20 bg-gray-50 rounded-3xl">
                        Failed to load trending videos. Make sure the server is healthy.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;
