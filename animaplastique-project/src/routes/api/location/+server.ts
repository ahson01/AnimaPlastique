import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCountryFromRequest   } from '$lib/server/geolocation';

export const GET: RequestHandler = async (event) => {
    const country = getCountryFromRequest(event);

    return json({
        country
    });
};
