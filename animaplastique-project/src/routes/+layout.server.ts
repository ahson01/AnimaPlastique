export const prerender = false;

import { getCountryFromIp, getCurrencyForCountry } from '$lib/server/geolocation';
import { getExchangeRate } from '$lib/server/currency';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ getClientAddress, request }) => {
    let ip = '127.0.0.1';
    try {
        ip = getClientAddress();

        // Fallback for some proxy setups where getClientAddress might default to internal IP
        const forwarded = request.headers.get('x-forwarded-for');
        if (forwarded) {
            ip = forwarded.split(',')[0].trim();
        }
    } catch (e) {
        // getClientAddress fails during prerendering
        console.log('Using default IP during prerender: ' + ip);
    }

    // DEBUG: Log geolocation info
    const country = getCountryFromIp(ip);
    console.log(`[GEO] IP: ${ip}, Country: ${country}`);

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
