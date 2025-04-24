import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67b783260009b3865aa1"); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client); 