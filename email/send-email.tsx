import { Session } from '@/lib/auth-client';
import VerificationEmailTemplate from '@/mail/verification-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (url: string, user: Session) => {
	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: ['delivered@resend.dev'],
		subject: 'Verify your email',
		react: VerificationEmailTemplate({ url, name: user.name }),
	});
};
