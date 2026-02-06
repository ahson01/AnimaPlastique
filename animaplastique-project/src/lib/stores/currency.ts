import { writable, type Writable } from 'svelte/store';
import { page } from '$app/stores';

type CurrencyState = {
    code: string;
    rate: number;
    country: string;
};

export const currency: Writable<CurrencyState> = writable({
    code: 'INR',
    rate: 1,
    country: 'IN'
});

export const formatPrice = (amountInINR: number, state: CurrencyState) => {
    if (state.code === 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amountInINR);
    }

    // Round up to nearest integer to avoid small fluctuations
    const converted = Math.ceil(amountInINR * state.rate);
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: state.code,
        maximumFractionDigits: 0
    }).format(converted);
};
