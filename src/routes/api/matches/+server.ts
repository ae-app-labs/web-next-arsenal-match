import { json } from '@sveltejs/kit';
import { getMockData, getRecentMatchesData } from '$lib/server/data';
import { getFromCache, setToCache } from '$lib/cache';
import { rateLimit } from '$lib/ratelimiter.js';
import { env } from "$env/dynamic/private";

const KEY = 'recentMatchesData';

export async function GET( {url, request}) {
    // Check if the request is coming from a browser or a bot
    const devMode = url.searchParams.get('devMode') === 'true';
    const cacheKey = KEY + `+devMode=${devMode}`;
    
    // Read from config/environment
    const daysAgo = Number(env.DAYS_AGO) || 7;
    const daysAhead = Number(env.DAYS_AHEAD) || 7;

    // Rate limit check
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    if(!rateLimit(ip)) {
        return json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    // Check if the request is coming from a browser or a bot
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
        console.log('Cache hit:', cacheKey);
        return json(cachedData);
    } else {
        console.log('Cache miss:', cacheKey);
    }
    
    const matchesData = devMode ? await getMockData() : await getRecentMatchesData(daysAgo, daysAhead);
    console.log(matchesData);

    // Add the result to cache
    setToCache(cacheKey, matchesData);
    
    return json(matchesData);
}
