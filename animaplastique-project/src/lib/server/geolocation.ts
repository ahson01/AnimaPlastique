import geoip from 'geoip-lite';

export const getCountryFromIp = (ip: string) => {
    // geoip-lite doesn't work well with localhost/private IPs, so we handle that case.
    // For dev, you might want to return a default or mock.
    const geo = geoip.lookup(ip);
    return geo?.country || 'IN'; // Default to India if lookup fails
};

export const getCurrencyForCountry = (countryCode: string) => {
    const currencyMap: Record<string, string> = {
        IN: 'INR',
        US: 'USD',
        GB: 'GBP',
        EU: 'EUR',
        CA: 'CAD',
        // Add more mappings as needed
    };

    // Default to USD for unknown countries outside India
    // But since our default country is IN, it will be INR for unknown IPs.
    return currencyMap[countryCode] || (countryCode === 'IN' ? 'INR' : 'USD');
};
