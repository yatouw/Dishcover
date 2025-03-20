import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b783260009b3865aa1');

export const account = new Account(client);
export const databases = new Databases(client);

export const DB_ID = '67b78542002085b55fc7';
export const COLLECTION_ID = 'user';

export async function createAccount(email: string, password: string) {
    try {
        const response = await account.create(
            ID.unique(),
            email,
            password
        );

        // Create user document in database
        await databases.createDocument(
            DB_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                userId: response.$id,
                email: email,
                createdAt: new Date().toISOString(),
            }
        );

        return response;
    } catch (error) {
        throw error;
    }
}

export async function login(email: string, password: string) {
    try {
        return await account.createSession(email, password);
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        return await account.deleteSession('current');
    } catch (error) {
        throw error;
    }
}