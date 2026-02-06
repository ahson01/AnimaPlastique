import type { RequestEvent } from '@sveltejs/kit';
import geoip from 'geoip-lite';



export const getCountryFromRequest = (event: RequestEvent): string => {
    // Vercel provides this header reliably
    return event.request.headers.get('x-vercel-ip-country') ?? 'IN';
};

export const getCurrencyForCountry = (countryCode: string): string => {
    return currencyMap[countryCode] ?? (countryCode === 'IN' ? 'INR' : 'USD');
};

const currencyMap: Record<string, string> = {
    // North America
    US: 'USD', CA: 'CAD', MX: 'MXN',

    // Europe
    GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR',
    AT: 'EUR', PT: 'EUR', GR: 'EUR', FI: 'EUR', IE: 'EUR', LU: 'EUR',
    EE: 'EUR', LV: 'EUR', LT: 'EUR', MT: 'EUR', SK: 'EUR', SI: 'EUR',
    BG: 'BGN', CZ: 'CZK', DK: 'DKK', HU: 'HUF', PL: 'PLN', RO: 'RON',
    SE: 'SEK', CH: 'CHF', NO: 'NOK',

    // Asia
    IN: 'INR', JP: 'JPY', CN: 'CNY', KR: 'KRW', SG: 'SGD', ID: 'IDR',
    MY: 'MYR', TH: 'THB', VN: 'VND', PH: 'PHP', PK: 'PKR',
    AE: 'AED', SA: 'SAR', IL: 'ILS', TR: 'TRY',

    // Oceania
    AU: 'AUD', NZ: 'NZD',

    // South America
    BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN',

    // Africa
    ZA: 'ZAR', EG: 'EGP', NG: 'NGN', KE: 'KES', MA: 'MAD'
};
