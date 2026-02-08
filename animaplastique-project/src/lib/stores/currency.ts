import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type CurrencyState = {
    code: string;
    rate: number;
    country: string;
    loading: boolean;
};

export const currency = writable<CurrencyState>({
    code: 'INR',
    rate: 1,
    country: 'IN',
    loading: false
});

const localeMap: Record<string, string> = {
    USD: 'en-US', GBP: 'en-GB', EUR: 'de-DE', JPY: 'ja-JP', CNY: 'zh-CN',
    AUD: 'en-AU', CAD: 'en-CA', CHF: 'de-CH', INR: 'en-IN', KRW: 'ko-KR',
    BRL: 'pt-BR', MXN: 'es-MX', SGD: 'en-SG', HKD: 'zh-HK', SEK: 'sv-SE',
    NOK: 'nb-NO', DKK: 'da-DK', NZD: 'en-NZ', ZAR: 'en-ZA', AED: 'ar-AE',
    SAR: 'ar-SA', THB: 'th-TH', MYR: 'ms-MY', IDR: 'id-ID', PHP: 'fil-PH',
    VND: 'vi-VN', PLN: 'pl-PL', CZK: 'cs-CZ', HUF: 'hu-HU', TRY: 'tr-TR',
    ILS: 'he-IL', PKR: 'ur-PK', BDT: 'bn-BD', LKR: 'si-LK', NPR: 'ne-NP',
    RUB: 'ru-RU'
};

export async function initializeCurrency(): Promise<void> {
    if (!browser) return;

    currency.update(s => ({ ...s, loading: true }));

    try {
        const geoRes = await fetch('/api/geo');
        const geoData = await geoRes.json();
        const { country, currency: currencyCode } = geoData;

        if (currencyCode === 'INR') {
            currency.set({ code: 'INR', rate: 1, country, loading: false });
            return;
        }

        const rateRes = await fetch(`/api/rates?currency=${currencyCode}`);
        const rateData = await rateRes.json();

        currency.set({
            code: currencyCode,
            rate: rateData.rate,
            country,
            loading: false
        });
    } catch (e) {
        console.error('Currency initialization failed:', e);
        currency.update(s => ({ ...s, loading: false }));
    }
}

export function formatPrice(amountInINR: number, state: CurrencyState): string {
    const convertedAmount = amountInINR * state.rate;
    const locale = localeMap[state.code] ?? 'en-US';

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: state.code,
        maximumFractionDigits: 0
    }).format(convertedAmount);
}
