import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, Eye, Clock, User, ChevronDown, ChevronUp, Play, MessageSquare, ThumbsUp } from 'lucide-react';
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
        <div className="pb-10 max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back</span>
                </button>
            </div>

            <div className="space-y-12">
                {/* Player Section */}
                <div className="space-y-6">
                    <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5">
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
                    <div className="mt-4">
                        {loading ? (
                            <Loading />
                        ) : videoInfo ? (
                            <div className="space-y-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                    {videoInfo.title}
                                </h1>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-b border-gray-100 pb-4">
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1.5 font-bold text-gray-900">
                                            {videoInfo.channel}
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span>{videoInfo.views}</span>
                                        <span>{videoInfo.uploaded}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium text-sm">
                                            <Heart className="w-4 h-4" />
                                            Like
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-medium text-sm">
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </button>
                                    </div>
                                </div>

                                {videoInfo.description && (
                                    <div className="mt-4 bg-gray-50 rounded-2xl p-4">
                                        <button
                                            onClick={() => setShowDescription(!showDescription)}
                                            className="flex items-center justify-between w-full text-left"
                                        >
                                            <span className="font-semibold text-gray-900 text-sm">Description</span>
                                            {showDescription ? (
                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            )}
                                        </button>
                                        {showDescription && (
                                            <p className="mt-3 text-gray-700 whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto">
                                                {videoInfo.description}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Comments Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <MessageSquare className="w-6 h-6 text-gray-400" />
                            Comments
                        </h2>

                        {loadingComments ? (
                            <Loading />
                        ) : comments.length > 0 ? (
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
                                                <span className="font-bold text-sm text-gray-900">{comment.author}</span>
                                                <span className="text-xs text-gray-500">{comment.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {comment.text}
                                            </p>
                                            <div className="flex items-center gap-4 pt-1">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <ThumbsUp className="w-3.5 h-3.5" />
                                                    {comment.likes}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm py-8 text-center bg-gray-50 rounded-2xl">
                                No comments available for this video.
                            </p>
                        )}
                    </div>

                    {/* Related Videos Side Column */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <Play className="w-6 h-6 text-red-600 fill-current" />
                            Up Next
                        </h2>

                        <div className="grid grid-cols-1 gap-6">
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <div key={i} className="space-y-3 animate-pulse">
                                        <div className="aspect-video bg-gray-200 rounded-2xl"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </div>
                                ))
                            ) : videoInfo?.related?.length > 0 ? (
                                videoInfo.related.slice(0, 10).map((video) => (
                                    <VideoCard key={video.id} video={video} />
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-10 bg-gray-50 rounded-2xl">
                                    No recommendations.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
