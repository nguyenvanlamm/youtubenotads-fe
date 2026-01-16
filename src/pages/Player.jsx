import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Eye, Clock, User, ChevronDown, ChevronUp, Play, MessageSquare, ThumbsUp, ThumbsDown, MoreHorizontal, Download } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import Loading from '../components/Loading';
import api from '../services/api';

const Player = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('v');
    const navigate = useNavigate();

    const [videoInfo, setVideoInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingComments, setLoadingComments] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        if (videoId) {
            window.scrollTo(0, 0);
            fetchVideoInfo();
            fetchComments();
        }
    }, [videoId]);

    const fetchVideoInfo = async () => {
        setLoading(true);
        try {
            const data = await api.getVideoInfo(videoId);
            setVideoInfo(data);
        } catch (error) {
            console.error('Failed to fetch video info:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const data = await api.getComments(videoId);
            setComments(data.comments || []);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setLoadingComments(false);
        }
    };

    if (!videoId) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <p className="text-gray-500 text-lg">No video loaded.</p>
                <button onClick={() => navigate('/')} className="text-red-600 font-medium hover:underline">Go Home</button>
            </div>
        );
    }

    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    return (
        <div className="pb-10 mx-auto max-w-7xl">
            <div className="flex flex-col gap-6">
                {/* Main Content Area */}
                <div className="space-y-4">
                    {/* Video Player */}
                    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-gray-100">
                        <iframe
                            src={embedUrl}
                            title="YouTube video player"
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>

                    {/* Metadata Section */}
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                        </div>
                    ) : videoInfo ? (
                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                                {videoInfo.title}
                            </h1>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold shrink-0">
                                        {videoInfo.channel?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 leading-tight">
                                            {videoInfo.channel}
                                        </span>
                                        <span className="text-xs text-gray-500">1.2M subscribers</span>
                                    </div>
                                    <button className="ml-3 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
                                        Subscribe
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                                    <div className="flex items-center bg-gray-100 rounded-full shrink-0">
                                        <button className="flex items-center gap-2 px-4 py-2 border-r border-gray-200 hover:bg-gray-200 transition-colors text-sm font-medium">
                                            <ThumbsUp className="w-5 h-5" />
                                            <span>42K</span>
                                        </button>
                                        <button className="px-4 py-2 hover:bg-gray-200 transition-colors">
                                            <ThumbsDown className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium shrink-0">
                                        <Share2 className="w-5 h-5" />
                                        <span>Share</span>
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium shrink-0">
                                        <Download className="w-5 h-5" />
                                        <span>Download</span>
                                    </button>
                                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shrink-0">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Description Box */}
                            <div className="mt-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl p-4 cursor-pointer" onClick={() => setShowDescription(!showDescription)}>
                                <div className="flex gap-2 text-sm font-bold text-gray-900 mb-1">
                                    <span>{videoInfo.views}</span>
                                    <span>{videoInfo.uploaded}</span>
                                </div>
                                <div className={`text-sm text-gray-800 whitespace-pre-wrap leading-relaxed ${!showDescription ? 'line-clamp-2' : ''}`}>
                                    {videoInfo.description}
                                </div>
                                <button className="mt-1 text-sm font-bold text-gray-900">
                                    {showDescription ? 'Show less' : '...more'}
                                </button>
                            </div>
                        </div>
                    ) : null}


                    {/* Comments Section */}
                    <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-6 mb-8">
                            <h2 className="text-xl font-bold text-gray-900">
                                {comments.length} Comments
                            </h2>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <span className="text-sm font-bold">Sort by</span>
                            </div>
                        </div>

                        {loadingComments ? (
                            <Loading />
                        ) : (
                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-4">
                                        <img
                                            src={comment.authorThumb}
                                            alt={comment.author}
                                            className="w-10 h-10 rounded-full object-cover shrink-0"
                                        />
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-xs text-gray-900">{comment.author}</span>
                                                <span className="text-[10px] text-gray-500">{comment.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-800 leading-relaxed">
                                                {comment.text}
                                            </p>
                                            <div className="flex items-center gap-4 pt-1">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 hover:bg-gray-100 p-1.5 rounded-full cursor-pointer transition-colors">
                                                    <ThumbsUp className="w-4 h-4" />
                                                    {comment.likes}
                                                </div>
                                                <div className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                                                    <ThumbsDown className="w-4 h-4" />
                                                </div>
                                                <button className="text-[10px] font-bold py-1 px-3 hover:bg-gray-100 rounded-full transition-colors">Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
