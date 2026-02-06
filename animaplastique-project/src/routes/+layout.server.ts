export const prerender = false;

import { getCountryFromIp, getCurrencyForCountry } from '$lib/server/geolocation';
import { getExchangeRate } from '$lib/server/currency';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ getClientAddress, request }) => {
    let ip = '127.0.0.1';
    try {
        ip = getClientAddress();
    } catch (e) {
        // getClientAddress fails during prerendering
        console.log('Using default IP during prerender: ' + ip);
    }

    const country = getCountryFromIp(ip);
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
