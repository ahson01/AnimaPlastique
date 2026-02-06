export const prerender = false;
export const ssr = true;

export const config = {
    runtime: 'edge'
};


import { getCountryFromRequest, getCurrencyForCountry } from '$lib/server/geolocation';
import { getExchangeRate } from '$lib/server/currency';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
    // Vercel Geolocation: https://vercel.com/docs/edge-network/headers#x-vercel-ip-country
    const country = getCountryFromRequest(event);
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
