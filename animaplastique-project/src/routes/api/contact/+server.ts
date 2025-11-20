// src/routes/api/contact/+server.ts
import type { RequestHandler } from './$types';
import { DISCORD_WEBHOOK_URL } from '$env/static/private';

// Very simple in-memory rate limiter (per IP)
type RateEntry = { count: number; last: number };
const rateMap = new Map<string, RateEntry>();

const WINDOW_MS = 60_000;       // 1 minute
const MAX_PER_WINDOW = 5;       // max 5 requests per IP per minute

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = rateMap.get(ip);

	if (!entry) {
		rateMap.set(ip, { count: 1, last: now });
		return false;
	}

	if (now - entry.last > WINDOW_MS) {
		// new window
		entry.count = 1;
		entry.last = now;
		return false;
	}

	entry.count++;
	entry.last = now;

	return entry.count > MAX_PER_WINDOW;
}

const ALLOWED_ORIGINS = [
	'https://animaplastique.xyz',
	'https://www.animaplastique.xyz',
	'http://localhost:5173',
	'http://localhost:4173'
];

export const POST: RequestHandler = async (event) => {
	const { request, getClientAddress } = event;

	const ip = getClientAddress();
	if (isRateLimited(ip)) {
		return new Response(
			JSON.stringify({ success: false, error: 'Too many submissions. Please try again later.' }),
			{ status: 429 }
		);
	}

	// Basic origin check – helps against cross-site scripts.
	const origin = request.headers.get('origin');
	if (origin && !ALLOWED_ORIGINS.includes(origin)) {
		return new Response(
			JSON.stringify({ success: false, error: 'Forbidden origin.' }),
			{ status: 403 }
		);
	}

	try {
		const data = await request.json();

		const {
			name = '',
			email = '',
			project_type = '',
			timeline = '',
			budget = '',
			details = '',
			honeypot = ''
		} = data ?? {};

		// Honeypot: if filled, silently "succeed" but do nothing
		if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
			// Pretend success so bots don't tune against this
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		}

		if (!name.trim() || !email.trim() || !details.trim()) {
			return new Response(
				JSON.stringify({ success: false, error: 'Missing required fields.' }),
				{ status: 400 }
			);
		}

		const content = [
			'📨 **New AnimaPlastique inquiry**',
			`**IP:** ${ip}`,
			`**Name:** ${name}`,
			`**Email:** ${email}`,
			`**Project type:** ${project_type}`,
			`**Timeline:** ${timeline}`,
			`**Budget:** ${budget}`,
			'',
			'**Details:**',
			'```',
			details,
			'```'
		].join('\n');

		const res = await fetch(DISCORD_WEBHOOK_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content })
		});

		if (!res.ok) {
			const text = await res.text().catch(() => '');
			console.error('Discord webhook error:', res.status, text);
			return new Response(
				JSON.stringify({ success: false, error: 'Failed to send to Discord.' }),
				{ status: 502 }
			);
		}

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error('Contact API error:', err);
		return new Response(
			JSON.stringify({ success: false, error: 'Server error.' }),
			{ status: 500 }
		);
	}
};

// OPTIONAL: reject non-POST methods cleanly
export const GET: RequestHandler = () =>
	new Response(JSON.stringify({ success: false, error: 'Method not allowed.' }), {
		status: 405
	});
