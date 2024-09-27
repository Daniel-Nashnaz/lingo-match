import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 border-t-2 border-b-2 border-blue-500"></div>
);

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center">
            <LoadingSpinner />
            <h2 className="text-xl sm:text-2xl font-semibold mt-4 text-black">Loading...</h2>
        </div>
    );
}
