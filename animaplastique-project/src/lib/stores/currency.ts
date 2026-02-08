import { writable, type Writable } from 'svelte/store';
import { page } from '$app/stores';

type CurrencyState = {
    code: string;
    rate: number;
    country: string;
};

export const currency = writable({
    code: 'INR'
});

export const formatPrice = (amountInINR: number, _state: any) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amountInINR);
};
