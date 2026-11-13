/**
 * Neon Lakebase Postgres Client & Server Actions
 * Using @neondatabase/serverless for serverless and edge environments
 */
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

/**
 * Retrieves environment variables across Node, Vite, and Cloudflare Pages/Workers runtime contexts.
 */
export function getServerEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof globalThis !== "undefined" && (globalThis as Record<string, unknown>)[key]) {
    const val = (globalThis as Record<string, unknown>)[key];
    if (typeof val === "string") return val;
  }
  if (
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    (import.meta.env as Record<string, unknown>)[key]
  ) {
    const val = (import.meta.env as Record<string, unknown>)[key];
    if (typeof val === "string") return val;
  }
  return undefined;
}

/**
 * Returns the active database connection string.
 * Strictly prioritizes DATABASE_URL_POOLED for serverless application traffic.
 */
export function getDatabaseUrl(): string {
  const pooled = getServerEnv("DATABASE_URL_POOLED");
  if (pooled) return pooled;

  const direct = getServerEnv("DATABASE_URL");
  if (direct) return direct;

  return "";
}

let cachedSql: ReturnType<typeof neon> | null = null;
let cachedUrl = "";

export function getSql() {
  const url = getDatabaseUrl();
  if (!url) {
    console.error("[getSql] Neither DATABASE_URL_POOLED nor DATABASE_URL found in environment.");
    throw new Error("Database service is currently unavailable. Please try again later.");
  }
  if (!cachedSql || cachedUrl !== url) {
    cachedSql = neon(url);
    cachedUrl = url;
  }
  return cachedSql;
}

export interface DbProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  min_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbQuoteRequest {
  id: string;
  customer_name: string;
  business_name: string | null;
  phone: string;
  email: string | null;
  product_id: string;
  quantity: number;
  details: string | null;
  status: "pending" | "in_review" | "quoted" | "fulfilled" | "cancelled";
  created_at: string;
  updated_at: string;
}

/**
 * Server Zod schema for Quote creation.
 * Strict rules:
 * - Trims strings
 * - Strictly excludes status, admin_notes, and id
 * - Phone & email regex (phone matches Postgres ^[0-9 +()-]{7,30}$)
 * - Quantity integer between 1 and 10,000,000
 * - Turnstile token non-empty
 */
export const serverQuoteSchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must be under 100 characters."),
  business_name: z
    .string()
    .trim()
    .max(100, "Business name must be under 100 characters.")
    .nullish()
    .transform((val) => (val && val.length > 0 ? val : null)),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 characters.")
    .max(30, "Phone number must be under 30 characters.")
    .regex(/^[0-9 +()-]{7,30}$/, "Invalid phone number format."),
  email: z
    .string()
    .trim()
    .max(255, "Email must be under 255 characters.")
    .nullish()
    .transform((val) => (val && val.length > 0 ? val : null))
    .refine(
      (val) => !val || /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val),
      "Invalid email address format.",
    ),
  product_id: z.string().trim().min(1, "Product selection is required."),
  quantity: z
    .number({ error: "Quantity must be a valid number." })
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1.")
    .max(10000000, "Quantity cannot exceed 10,000,000."),
  details: z
    .string()
    .trim()
    .max(2000, "Details must be under 2000 characters.")
    .nullish()
    .transform((val) => (val && val.length > 0 ? val : null)),
  turnstileToken: z.string().trim().min(1, "Security verification token is required."),
});

export type CreateQuoteInput = z.infer<typeof serverQuoteSchema>;

/**
 * Verifies Cloudflare Turnstile token server-side.
 * Strictly fails closed if TURNSTILE_SECRET_KEY is missing.
 * No demo secrets, no demo-token bypass.
 */
export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secretKey = getServerEnv("TURNSTILE_SECRET_KEY");

  // Fail closed: If secret key is not set, reject immediately
  if (!secretKey || secretKey.trim() === "") {
    console.error(
      "[verifyTurnstileToken] Critical: TURNSTILE_SECRET_KEY is not configured in server environment.",
    );
    return false;
  }

  if (!token || typeof token !== "string" || token.trim() === "") {
    console.warn("[verifyTurnstileToken] Empty or missing token provided.");
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey.trim());
    formData.append("response", token.trim());
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error(
        `[verifyTurnstileToken] Cloudflare siteverify HTTP status error: ${res.status}`,
      );
      return false;
    }

    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) {
      console.warn("[verifyTurnstileToken] Cloudflare rejected verification:", data["error-codes"]);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[verifyTurnstileToken] Unexpected verification network error:", err);
    return false;
  }
}

/**
 * Creates a new quote request in Neon Lakebase Postgres.
 */
export async function createQuoteRequest(
  rawInput: unknown,
  clientIp?: string,
): Promise<DbQuoteRequest> {
  // 1. Server-side Zod validation
  const validation = serverQuoteSchema.safeParse(rawInput);
  if (!validation.success) {
    console.error(
      "[createQuoteRequest] Validation failure:",
      JSON.stringify(validation.error.flatten()),
    );
    const firstMsg = validation.error.issues[0]?.message || "Invalid input parameters.";
    throw new Error(firstMsg);
  }

  const input = validation.data;

  // Resolve client IP from request helper if not provided directly
  let resolvedIp = clientIp;
  if (!resolvedIp) {
    try {
      const { getRequestHeader } = await import("@tanstack/react-start/server");
      resolvedIp =
        getRequestHeader("cf-connecting-ip") ||
        getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim();
    } catch {
      // Outside active request context or testing environment
    }
  }

  // 2. Server-side Turnstile verification (fails closed)
  const isHuman = await verifyTurnstileToken(input.turnstileToken, resolvedIp);
  if (!isHuman) {
    console.warn("[createQuoteRequest] Security verification failed for quote submission.");
    throw new Error("Security verification failed. Please complete the CAPTCHA and try again.");
  }

  const sql = getSql();

  // 3. Look up product in database to check existence, active status, and min_quantity
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    input.product_id,
  );

  let products: DbProduct[];
  try {
    if (isUuid) {
      products = (await sql`
        SELECT id, slug, title, min_quantity, is_active FROM products 
        WHERE id = ${input.product_id}
        LIMIT 1;
      `) as DbProduct[];
    } else {
      products = (await sql`
        SELECT id, slug, title, min_quantity, is_active FROM products 
        WHERE slug = ${input.product_id}
        LIMIT 1;
      `) as DbProduct[];
    }
  } catch (dbErr) {
    console.error("[createQuoteRequest] Database query failure:", dbErr);
    throw new Error("Failed to process product lookup. Please try again later.");
  }

  if (!products || products.length === 0) {
    console.warn("[createQuoteRequest] Product not found for id/slug:", input.product_id);
    throw new Error("The selected product could not be found.");
  }

  const product = products[0];
  if (!product) {
    console.warn("[createQuoteRequest] Product row is undefined for id/slug:", input.product_id);
    throw new Error("The selected product could not be found.");
  }

  if (!product.is_active) {
    throw new Error(`The product "${product.title}" is currently not available.`);
  }

  // 4. Enforce quantity >= products.min_quantity
  if (input.quantity < product.min_quantity) {
    throw new Error(
      `Minimum order quantity for ${product.title} is ${product.min_quantity.toLocaleString()}. You requested ${input.quantity.toLocaleString()}.`,
    );
  }

  // 5. Insert quote request row into Neon Postgres
  // 'status' is omitted so DB defaults to 'pending'
  // 'id' is omitted so DB generates gen_random_uuid()
  // 'admin_notes' is omitted
  try {
    const rows = (await sql`
      INSERT INTO quote_requests (
        customer_name,
        business_name,
        phone,
        email,
        product_id,
        quantity,
        details
      ) VALUES (
        ${input.customer_name},
        ${input.business_name},
        ${input.phone},
        ${input.email},
        ${product.id},
        ${input.quantity},
        ${input.details}
      )
      RETURNING id, customer_name, business_name, phone, email, product_id, quantity, details, status, created_at, updated_at;
    `) as DbQuoteRequest[];

    const firstRow = rows[0];
    if (!firstRow) {
      throw new Error("No record returned after insert.");
    }

    return firstRow;
  } catch (insertErr) {
    console.error("[createQuoteRequest] Failed to insert quote request:", insertErr);
    throw new Error("Unable to save quote request. Please try again later.");
  }
}
