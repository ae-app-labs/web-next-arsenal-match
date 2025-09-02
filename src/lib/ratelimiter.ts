const ipMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT = 5; // Number of requests allowed per minute
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

export function rateLimit(ip:string, limit = RATE_LIMIT, windowMs = RATE_LIMIT_WINDOW_MS): boolean {
    const currentTime = Date.now();
    const requestData = ipMap.get(ip) || { count: 0, lastRequest: currentTime };

    // Reset the count if the time window has passed
    if (currentTime - requestData.lastRequest > windowMs) {
        requestData.count = 0;
        requestData.lastRequest = currentTime;
    }

    // Increment the count and check against the limit
    requestData.count++;
    ipMap.set(ip, requestData);

    return requestData.count <= limit;
}
