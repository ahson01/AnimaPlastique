export const prerender = false;

import { getCurrencyForCountry } from '$lib/server/geolocation';
import { getExchangeRate } from '$lib/server/currency';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
    // Vercel Geolocation: https://vercel.com/docs/edge-network/headers#x-vercel-ip-country
    const country = request.headers.get('x-vercel-ip-country') ?? 'IN';
    console.log(`[GEO] Vercel Country: ${country}`);

    const currencyCode = getCurrencyForCountry(country);
    const exchangeRate = await getExchangeRate(currencyCode);

    return {
        currency: {
            code: currencyCode,
            rate: exchangeRate,
            country
        }
    };
};
