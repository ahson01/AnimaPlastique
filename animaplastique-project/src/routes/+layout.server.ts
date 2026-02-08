export const prerender = false;
export const ssr = true;

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    return {
        currency: {
            code: 'INR'
        }
    };
};
