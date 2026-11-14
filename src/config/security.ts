export const QUOTE_TURNSTILE_ACTION = "quote_submit";

export const QUOTE_EMAIL_RATE_LIMIT = {
  maxRequests: 3,
  periodSeconds: 60 * 60,
} as const;
