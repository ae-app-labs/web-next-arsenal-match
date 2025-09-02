const cache = new Map<string, {timestamp: number, data: any}>();
const CACHE_EXPIRATION_TIME = 1000 * 60 * 5; // 5 minutes

export function getFromCache(key: string) {
    const cachedItem = cache.get(key);
    if (cachedItem) {
        const { timestamp, data } = cachedItem;
        if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
            return data;
        } else {
            cache.delete(key); // Remove expired item
        }
    }
    return null;
}

export function setToCache(key: string, data: any) {
    cache.set(key, { timestamp: Date.now(), data });
}

export function clearCache() {
    cache.clear();
}
