import type { RequestHandler } from '@sveltejs/kit';

const rateCache: Record<string, { rate: number; timestamp: number }> = {};
const CACHE_TTL = 60 * 60 * 1000;

export const GET: RequestHandler = async ({ url }) => {
    const targetCurrency = url.searchParams.get('currency') ?? 'INR';

    if (targetCurrency === 'INR') {
        return new Response(JSON.stringify({ rate: 1, currency: 'INR' }), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600'
            }
        });
    }

    const now = Date.now();
    const cached = rateCache[targetCurrency];

    if (cached && now - cached.timestamp < CACHE_TTL) {
        return new Response(JSON.stringify({ rate: cached.rate, currency: targetCurrency }), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600'
            }
        });
    }

    try {
        const res = await fetch('https://open.er-api.com/v6/latest/INR');
        const data = await res.json();

        if (data?.rates?.[targetCurrency]) {
            const rate = data.rates[targetCurrency];
            rateCache[targetCurrency] = { rate, timestamp: now };

            return new Response(JSON.stringify({ rate, currency: targetCurrency }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=3600, s-maxage=3600'
                }
            });
        }
    } catch (e) {
        console.error('Failed to fetch exchange rate:', e);
    }

    if (cached) {
        return new Response(JSON.stringify({ rate: cached.rate, currency: targetCurrency }), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600'
            }
        });
    }

    return new Response(JSON.stringify({ rate: 1, currency: 'INR' }), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600'
        }
    });
};
