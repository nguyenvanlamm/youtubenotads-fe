import React from 'react';

const Loading = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-4',
        lg: 'w-16 h-16 border-4'
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className={`${sizeClasses[size] || sizeClasses.md} border-red-600 border-t-transparent rounded-full animate-spin`}></div>
        </div>
    );
};

export default Loading;
