const YOUTUBE_API_KEY = 'AIzaSyAVooyzUOt_uTFxN4aXgNk8vm06T5xB1xU';
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

interface YouTubeVideo {
    videoId: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
}

interface YouTubeApiResponse {
    items: {
        id: {
            videoId: string;
        };
        snippet: {
            title: string;
            thumbnails: {
                medium: {
                    url: string;
                };
            };
            channelTitle: string;
        };
    }[];
}

export async function searchRecipeVideo(recipeName: string): Promise<YouTubeVideo | null> {
    try {
        const searchQuery = `${recipeName} recipe tutorial`;
        const response = await fetch(
            `${YOUTUBE_API_BASE_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data: YouTubeApiResponse = await response.json();
        
        if (data.items && data.items.length > 0) {
            const video = data.items[0];
            return {
                videoId: video.id.videoId,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.medium.url,
                channelTitle: video.snippet.channelTitle
            };
        }

        return null;
    } catch (error) {
        console.error('Error searching YouTube:', error);
        return null;
    }
} 