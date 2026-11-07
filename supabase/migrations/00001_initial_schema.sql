-- ============================================================================
-- PRINTZY - NEON POSTGRES SCHEMA
-- Access model: the database is only ever reached from server-side code
-- (Netlify Functions) using DATABASE_URL. No RLS, no Supabase auth schema.
-- ============================================================================

-- ============================================================================
-- 1. ENUMS
-- ============================================================================

CREATE TYPE quote_status AS ENUM (
  'pending', 'in_review', 'quoted', 'fulfilled', 'cancelled'
);

-- ============================================================================
-- 2. TABLES
-- ============================================================================

CREATE TABLE products (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         VARCHAR(100) NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]+$'),
  title        VARCHAR(200) NOT NULL CHECK (char_length(trim(title)) > 0),
  description  TEXT NOT NULL,
  min_quantity INT NOT NULL DEFAULT 100 CHECK (min_quantity > 0),
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE quote_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(100) NOT NULL CHECK (char_length(trim(customer_name)) > 0),
  business_name VARCHAR(100),
  phone         VARCHAR(30) NOT NULL CHECK (phone ~ '^[0-9 +()-]{7,30}$'),
  email         VARCHAR(255) CHECK (
                  email IS NULL
                  OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
                ),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity      INT NOT NULL DEFAULT 1000 CHECK (quantity > 0),
  details       TEXT CHECK (char_length(details) <= 2000),
  status        quote_status NOT NULL DEFAULT 'pending',
  admin_notes   TEXT CHECK (char_length(admin_notes) <= 5000),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. INDEXES
-- (products.slug already has an index from its UNIQUE constraint)
-- ============================================================================

CREATE INDEX idx_quotes_product_id     ON quote_requests (product_id);
CREATE INDEX idx_quotes_status_created ON quote_requests (status, created_at DESC);
CREATE INDEX idx_quotes_created_desc   ON quote_requests (created_at DESC);
CREATE INDEX idx_products_active       ON products (is_active) WHERE is_active;

-- ============================================================================
-- 4. AUTO updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_quotes_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================================
-- 5. SAMPLE PRODUCT (edit or delete; add your real products here)
-- ============================================================================

-- INSERT INTO products (slug, title, description, min_quantity)
-- VALUES ('custom-boxes', 'Custom Boxes', 'Printed custom packaging boxes.', 100);
