import type { RequestHandler } from '@sveltejs/kit';

const currencyMap: Record<string, string> = {
    US: 'USD', GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR',
    NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR',
    JP: 'JPY', CN: 'CNY', AU: 'AUD', CA: 'CAD', CH: 'CHF', SE: 'SEK', NO: 'NOK',
    DK: 'DKK', NZ: 'NZD', SG: 'SGD', HK: 'HKD', KR: 'KRW', BR: 'BRL', MX: 'MXN',
    RU: 'RUB', ZA: 'ZAR', AE: 'AED', SA: 'SAR', TH: 'THB', MY: 'MYR', ID: 'IDR',
    PH: 'PHP', VN: 'VND', PL: 'PLN', CZ: 'CZK', HU: 'HUF', TR: 'TRY', IL: 'ILS',
    IN: 'INR', PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR'
};

export const GET: RequestHandler = async ({ getClientAddress }) => {
    const clientIp = getClientAddress();

    try {
        const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`);
        const geoData = await geoRes.json();

        if (geoData.country_code) {
            const country = geoData.country_code;
            const currency = currencyMap[country] ?? 'INR';

            return new Response(JSON.stringify({ country, currency }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'private, max-age=3600'
                }
            });
        }
    } catch (e) {
        console.error('IP geolocation failed:', e);
    }

    return new Response(JSON.stringify({ country: 'IN', currency: 'INR' }), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'private, max-age=3600'
        }
    });
};
