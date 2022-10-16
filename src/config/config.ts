export const config = {
  PORT: process.env.APP_PORT || 8050,

  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:8000',

  JWT_SECRET: process.env.JWT_SECRET || 'uf7e^WaiUGFSA7fd8&^dadh',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '20m',

  serverRateLimits: {
    period: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000
  }
};

