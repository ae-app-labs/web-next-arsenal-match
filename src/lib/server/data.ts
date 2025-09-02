import { env } from '$env/dynamic/private'
import fs from 'fs';
import path from 'path';

const API_TOKEN = env.API_TOKEN;
const MATCHES_URL = env.API_URL_ARSENAL_MATCHES;
const MATCH_LIMIT = 10;

const cache = new Map<string, any>();
const mockDataPath = path.resolve('src/lib/server/match-data-02.json');

// Format as YYYY-MM-DD
const formatDate = (date: Date) => date.toISOString().split('T')[0];

export async function getApiData(url: string) {
    const options: RequestInit = {
        headers: {  'X-Auth-Token': API_TOKEN }
    };
    const response = await fetch(url, options);
    return await response.json();
}

export async function getMockData() {
    try {
        const data = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));
        return data;
    } catch (error) {
        console.error('Error reading mock data:', error);
        return { error: 'Failed to load mock data' };
    }
}

export async function getRecentMatchesData(daysAgo: number = 7, daysAhead: number = 7) {

    const today = new Date();
    
    // Get one week before today
    const oneWeekBefore = new Date();
    oneWeekBefore.setDate(today.getDate() - daysAgo);
    
    // Get one week ahead of today
    const oneWeekAhead = new Date();
    oneWeekAhead.setDate(today.getDate() + daysAhead);

    const dateFrom = formatDate(oneWeekBefore);
    const dateTo = formatDate(oneWeekAhead);

    const url = `${MATCHES_URL}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    console.log(`Fetching data from ${url}`);

    const cachedData = cache.get(url);
    if (cachedData) {
        console.log("Returning cached data");
        return cachedData;
    }

    console.log("Fetching data from API");
    const data = await getApiData(url);

    cache.set(MATCHES_URL, data);
    return {
        summary: data.resultSet,
        matches: data.matches,
    };
}

export async function getMatchesData() {
    const matchesUrl = `${MATCHES_URL}?limit=${MATCH_LIMIT}`;

    const cachedData = cache.get(matchesUrl);
    if (cachedData) {
        return cachedData;
    }

    const data = await getApiData(matchesUrl);

    cache.set(matchesUrl, data);
    return {
        summary: data.resultSet,
        matches: data.matches,
    };
}
