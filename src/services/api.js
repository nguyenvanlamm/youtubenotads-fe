const BASE_URL = 'http://localhost:3001/api';

export const api = {
    search: async (query) => {
        const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Search failed');
        return response.json();
    },
    getVideoInfo: async (videoId) => {
        const response = await fetch(`${BASE_URL}/video/${videoId}`);
        if (!response.ok) throw new Error('Failed to fetch video info');
        return response.json();
    },
    getTrending: async () => {
        const response = await fetch(`${BASE_URL}/trending`);
        if (!response.ok) throw new Error('Failed to fetch trending videos');
        return response.json();
    },
    getComments: async (videoId) => {
        const response = await fetch(`${BASE_URL}/comments/${videoId}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        return response.json();
    }
};

export default api;
