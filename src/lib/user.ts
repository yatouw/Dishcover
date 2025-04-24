import { writable } from 'svelte/store';
import { ID } from 'appwrite';
import { goto } from '$app/navigation';
import { account, databases } from '$lib/appwrite';

// Avoid auth calls in server-side, so that a user is not shared between requests
const isBrowser = typeof window !== 'undefined';

interface User {
  $id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

const createUser = () => {
  const store = writable<User | null>(null);

  async function init() {
    if (!isBrowser) return;
    try {
      console.log('Initializing user session...');
      const user = await account.get();
      console.log('User session initialized:', user);
      store.set(user as User);
      return user;
    } catch (e) {
      console.log('No active user session');
      store.set(null);
      return null;
    }
  }

  init();

  async function register(email: string, password: string, name: string) {
    if (!isBrowser) return;
    
    try {
      console.log('Creating Appwrite account...');
      
      // First try to login to check if account exists
      try {
        await account.createEmailPasswordSession(email, password);
        throw new Error('An account with this email already exists. Please login instead.');
      } catch (loginError: any) {
        // If login fails, it means the account doesn't exist, so we can proceed with registration
        if (loginError.message.includes('Invalid credentials')) {
          // Create the account
          const user = await account.create(ID.unique(), email, password, name);
          console.log('Appwrite account created:', user);
          
          console.log('Creating user document in database...');
          // Create user document in the database
          await databases.createDocument(
            '67b7847f0037066e1836', // Database ID
            'users', // Collection ID
            ID.unique(), // Document ID
            {
              name,
              email,
              userId: user.$id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          );
          console.log('User document created successfully');

          // Redirect to login page instead of auto-login
          goto('/auth/login');
        } else {
          throw loginError;
        }
      }
    } catch (error) {
      console.error('Registration error details:', error);
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          throw new Error('An account with this email already exists. Please login instead.');
        }
      }
      throw error;
    }
  }

  async function login(email: string, password: string) {
    if (!isBrowser) return;
    try {
      // Check if user is already logged in
      const currentUser = await init();
      if (currentUser) {
        console.log('User already logged in, redirecting...');
        goto('/auth/user/home');
        return;
      }

      console.log('Creating email/password session...');
      await account.createEmailPasswordSession(email, password);
      console.log('Session created, initializing user...');
      await init();
      console.log('Redirecting to user page...');
      goto('/auth/user/home');
    } catch (error) {
      console.error('Login error details:', error);
      if (error instanceof Error) {
        if (error.message.includes('Invalid credentials')) {
          throw new Error('Invalid email or password. Please try again.');
        }
        if (error.message.includes('session is active')) {
          goto('/auth/user/home');
          return;
        }
      }
      throw error;
    }
  }

  async function logout() {
    try {
      console.log('Logging out user...');
      await account.deleteSession('current');
      goto('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  return {
    subscribe: store.subscribe,
    register,
    login,
    logout,
    init
  };
};

export const user = createUser();