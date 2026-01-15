import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Eye } from 'lucide-react';

const VideoCard = ({ video }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/watch?v=${video.id}`)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 p-2"
        >
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-white fill-current ml-1" />
                    </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                        {video.duration}
                    </div>
                )}
            </div>

            <div className="px-1">
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                    {video.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 font-medium">{video.channel}</p>

                {(video.views || video.uploaded) && (
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                        {video.views && (
                            <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
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
