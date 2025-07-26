import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/drizzle'; // your drizzle instance
import { schema } from '@/db/schema';
import { nextCookies } from 'better-auth/next-js';
import { sendEmail } from '@/email/send-email';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg', // or "mysql", "sqlite"
		schema: schema, // import your schema from db/schema.ts
	}),
	emailVerification: {
		sendVerificationEmail: async ({ url, user }) => {
			await sendEmail(url, user);
		}
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false, // automatically sign in users after registration
		minPasswordLength: 6, // minimum password length
		maxPasswordLength: 64, // maximum password length
		requireEmailVerification: true, // require email verification for new accounts
		// לחקור עוד אפשרויות שקיימות כגון ריסט פסוורד וכד'
	},
	plugins: [nextCookies()], // make sure this is the last plugin in the array
});
