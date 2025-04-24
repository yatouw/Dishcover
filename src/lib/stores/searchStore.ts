import { writable } from 'svelte/store';

export const searchQuery = writable('');
export const searchResults = writable<any[]>([]);
export const isSearching = writable(false);
export const searchError = writable<string | null>(null);

export function clearSearch() {
    searchQuery.set('');
    searchResults.set([]);
    isSearching.set(false);
    searchError.set(null);
} 