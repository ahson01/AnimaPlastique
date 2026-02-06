const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
let rateCache: { [key: string]: { rate: number; timestamp: number } } = {};

export const getExchangeRate = async (targetCurrency: string): Promise<number> => {
    if (targetCurrency === 'INR') return 1;

    const now = Date.now();
    const cached = rateCache[targetCurrency];

    if (cached && now - cached.timestamp < CACHE_TTL) {
        return cached.rate;
    }

    try {
        // Using open.er-api.com which is free and doesn't require a key
        const res = await fetch(`https://open.er-api.com/v6/latest/INR`);
        const data = await res.json();

        if (data && data.rates && data.rates[targetCurrency]) {
            const rate = data.rates[targetCurrency];
            rateCache[targetCurrency] = { rate, timestamp: now };
            return rate;
        }
    } catch (e) {
        console.error('Failed to fetch exchange rate:', e);
    }

    // Fallback to cache if available even if stale
    if (cached) return cached.rate;

    return 1; // Fallback to 1:1 if everything fails (should probably handle UI gracefully)
};
