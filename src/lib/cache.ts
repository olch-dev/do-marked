// Cache duration in seconds (1 hour)
const CACHE_DURATION = 60 * 60;

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

export function getCache(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 1000) {
    return cached.data;
  }
  return null;
}

export function setCache(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
} 