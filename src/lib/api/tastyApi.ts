const RAPID_API_KEY = '4e7d9cf96emshe73d02d8ebd83dfp16df8bjsnb565d1c1dca5';
const RAPID_API_HOST = 'tasty.p.rapidapi.com';

const TASTY_API_BASE_URL = 'https://tasty.p.rapidapi.com';

interface Recipe {
	video_url: string | null;
    id: number;
    name: string;
    description: string;
    thumbnail_url: string;
    total_time_minutes: number;
    user_ratings: {
        score: number;
    };
}

interface TastyApiResponse<T> {
    data: T;
    error?: string;
}

// Rate limiting helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Cache for storing API responses
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function makeRequest(url: string, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': RAPID_API_HOST,
                    'x-rapidapi-key': RAPID_API_KEY,
                },
            });

            if (response.status === 429) {
                // If rate limited, wait and retry
                await delay(1000 * (i + 1)); // Exponential backoff
                continue;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await delay(1000 * (i + 1));
        }
    }
}

export async function getRecipesList(tags: string = 'under_30_minutes', from: number = 0, size: number = 20): Promise<TastyApiResponse<Recipe[]>> {
    try {
        const cacheKey = `recipes-${tags}-${from}-${size}`;
        const cached = cache[cacheKey];
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return { data: cached.data.results };
        }

        const data = await makeRequest(`${TASTY_API_BASE_URL}/recipes/list?from=${from}&size=${size}&tags=${tags}`);
        cache[cacheKey] = { data, timestamp: Date.now() };
        return { data: data.results };
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return {
            data: [],
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

export async function getTrendingRecipes(from: number = 0, size: number = 20): Promise<TastyApiResponse<Recipe[]>> {
    try {
        const cacheKey = `trending-${from}-${size}`;
        const cached = cache[cacheKey];
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return { data: cached.data.results };
        }

        const data = await makeRequest(`${TASTY_API_BASE_URL}/recipes/list?from=${from}&size=${size}&sort=popularity`);
        cache[cacheKey] = { data, timestamp: Date.now() };
        return { data: data.results };
    } catch (error) {
        console.error('Error fetching trending recipes:', error);
        return {
            data: [],
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

export async function getRecipesByCuisine(cuisine: string, from: number = 0, size: number = 20): Promise<TastyApiResponse<Recipe[]>> {
    try {
        const cacheKey = `cuisine-${cuisine}-${from}-${size}`;
        const cached = cache[cacheKey];
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return { data: cached.data.results };
        }

        const data = await makeRequest(`${TASTY_API_BASE_URL}/recipes/list?from=${from}&size=${size}&tags=${cuisine}`);
        cache[cacheKey] = { data, timestamp: Date.now() };
        return { data: data.results };
    } catch (error) {
        console.error('Error fetching recipes by cuisine:', error);
        return {
            data: [],
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

// You can add more API endpoints here as needed, for example:
// export async function getRecipeDetails(id: string) { ... }
// export async function searchRecipes(query: string) { ... } 