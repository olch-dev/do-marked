import { RateLimiterMemory } from 'rate-limiter-flexible';

// Environment-specific configuration
const config = {
  development: {
    points: 60, // requests
    duration: 60, // per minute
  },
  production: {
    points: 30, // requests
    duration: 60, // per minute
  }
};

// Get environment-specific config
const isDevelopment = process.env.NODE_ENV === 'development';
const { points, duration } = isDevelopment ? config.development : config.production;

// Create rate limiter instance
export const rateLimiter = new RateLimiterMemory({
  points, // Number of points
  duration, // Per duration seconds
});

// Rate limit error class
export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

// Rate limit middleware
export async function rateLimit(key: string): Promise<void> {
  try {
    await rateLimiter.consume(key);
  } catch (error) {
    if (error instanceof Error) {
      throw new RateLimitError('Rate limit exceeded. Please try again later.');
    }
    throw error;
  }
} 