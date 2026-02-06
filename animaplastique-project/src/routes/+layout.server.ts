import { getCountryFromIp, getCurrencyForCountry } from '$lib/server/geolocation';
import { getExchangeRate } from '$lib/server/currency';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ getClientAddress }) => {
    const ip = getClientAddress();
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
