import { createAuthClient } from 'better-auth/react';

// authClient contains the methods to login, logout, and check authentication status
export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: 'http://localhost:3000',
});

export type Session = typeof authClient.$Infer.Session.user;