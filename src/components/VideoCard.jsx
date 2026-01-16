import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Eye } from 'lucide-react';

const VideoCard = ({ video, variant = "vertical" }) => {
    const navigate = useNavigate();
    const isHorizontal = variant === "horizontal";

    return (
        <div
            onClick={() => navigate(`/watch?v=${video.id}`)}
            className={`group cursor-pointer bg-white rounded-2xl overflow-hidden transition-all duration-300 ${isHorizontal ? 'flex gap-3' : 'shadow-sm hover:shadow-xl hover:-translate-y-1 border border-gray-100 p-2'}`}
        >
            <div className={`relative ${isHorizontal ? 'w-40 shrink-0' : 'aspect-video mb-3'} bg-gray-100 rounded-xl overflow-hidden`}>
                <div className="aspect-video">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                {/* Duration Badge */}
                {video.duration && (
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded font-bold">
                        {video.duration}
                    </div>
                )}
            </div>

            <div className={`flex-1 ${isHorizontal ? 'py-0.5' : 'px-1'}`}>
                <h3 className={`font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 ${isHorizontal ? 'text-xs mb-1' : 'text-sm'}`}>
                    {video.title}
                </h3>
                <p className={`text-gray-500 font-medium ${isHorizontal ? 'text-[10px]' : 'text-xs mt-2'}`}>{video.channel}</p>

                {(video.views || video.uploaded) && (
                    <div className={`flex items-center gap-2 text-gray-400 ${isHorizontal ? 'text-[10px] mt-0.5' : 'text-[10px] mt-1'}`}>
                        {video.views && (
                            <span className="flex items-center gap-1">
                                {video.views}
                            </span>
                        )}
                        {video.views && video.uploaded && <span>•</span>}
                        {video.uploaded && <span>{video.uploaded}</span>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCard;
