const RAPID_API_KEY = 'b23ae22e0fmshc06734d3fddfe83p123b23jsn9f16744bd526';
const RAPID_API_HOST = 'tasty-api1.p.rapidapi.com';

const TASTY_API_BASE_URL = 'https://tasty-api1.p.rapidapi.com';

interface TastyApiResponse<T> {
    data: T;
    error?: string;
}

export async function getFeaturedSection(): Promise<TastyApiResponse<any>> {
    try {
        const response = await fetch(`${TASTY_API_BASE_URL}/featured-section`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': RAPID_API_HOST,
                'x-rapidapi-key': RAPID_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Error fetching featured section:', error);
        return {
            data: null,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
}

// You can add more API endpoints here as needed, for example:
// export async function getRecipeDetails(id: string) { ... }
// export async function searchRecipes(query: string) { ... } 