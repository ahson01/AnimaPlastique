import type { RequestHandler } from '@sveltejs/kit';

const currencyMap: Record<string, string> = {
    US: 'USD', GB: 'GBP', EU: 'EUR', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR',
    NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR',
    JP: 'JPY', CN: 'CNY', AU: 'AUD', CA: 'CAD', CH: 'CHF', SE: 'SEK', NO: 'NOK',
    DK: 'DKK', NZ: 'NZD', SG: 'SGD', HK: 'HKD', KR: 'KRW', BR: 'BRL', MX: 'MXN',
    RU: 'RUB', ZA: 'ZAR', AE: 'AED', SA: 'SAR', TH: 'THB', MY: 'MYR', ID: 'IDR',
    PH: 'PHP', VN: 'VND', PL: 'PLN', CZ: 'CZK', HU: 'HUF', TR: 'TRY', IL: 'ILS',
    IN: 'INR', PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR'
};

export const GET: RequestHandler = async ({ request }) => {
    const country = request.headers.get('x-vercel-ip-country') ?? 'IN';
    const currency = currencyMap[country] ?? 'INR';

    return new Response(JSON.stringify({ country, currency }), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        }
    });
};
