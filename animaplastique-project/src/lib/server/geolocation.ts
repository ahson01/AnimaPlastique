import geoip from 'geoip-lite';

export const getCountryFromIp = (ip: string) => {
    // geoip-lite doesn't work well with localhost/private IPs, so we handle that case.
    // For dev, you might want to return a default or mock.
    const geo = geoip.lookup(ip);
    return geo?.country || 'IN'; // Default to India if lookup fails
};

export const getCurrencyForCountry = (countryCode: string) => {
    // Default to USD for unknown countries outside India
    // But since our default country is IN, it will be INR for unknown IPs.
    return currencyMap[countryCode] || (countryCode === 'IN' ? 'INR' : 'USD');
};

const currencyMap: Record<string, string> = {
    // North America
    US: 'USD', CA: 'CAD', MX: 'MXN',
    // Europe
    EU: 'EUR', GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR',
    AT: 'EUR', PT: 'EUR', GR: 'EUR', FI: 'EUR', IE: 'EUR', LU: 'EUR', CY: 'EUR', EE: 'EUR',
    LV: 'EUR', LT: 'EUR', MT: 'EUR', SK: 'EUR', SI: 'EUR', BG: 'BGN', HR: 'HRK', CZ: 'CZK',
    DK: 'DKK', HU: 'HUF', PL: 'PLN', RO: 'RON', SE: 'SEK', CH: 'CHF', NO: 'NOK', IS: 'ISK',
    LI: 'CHF', RS: 'RSD', BA: 'BAM', MK: 'MKD', AL: 'ALL',
    // Asia
    JP: 'JPY', CN: 'CNY', IN: 'INR', HK: 'HKD', TW: 'TWD', KR: 'KRW', SG: 'SGD', ID: 'IDR',
    MY: 'MYR', TH: 'THB', VN: 'VND', PH: 'PHP', PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR',
    AE: 'AED', SA: 'SAR', QA: 'QAR', KW: 'KWD', OM: 'OMR', BH: 'BHD', IL: 'ILS', TR: 'TRY',
    RU: 'RUB', KZ: 'KZT', UZ: 'UZS',
    // Oceania
    AU: 'AUD', NZ: 'NZD',
    // South America
    BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', UY: 'UYU',
    // Africa
    ZA: 'ZAR', EG: 'EGP', NG: 'NGN', KE: 'KES', MA: 'MAD',
};
