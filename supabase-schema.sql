-- ============================================================
-- 5 Star Movers — Admin Panel Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id          UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT          NOT NULL,
  slug        TEXT          NOT NULL UNIQUE,
  description TEXT,
  content     TEXT,
  image_url   TEXT,
  tags        TEXT[]        DEFAULT '{}',
  status      TEXT          DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ   DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- SEO settings table (extended)
CREATE TABLE IF NOT EXISTS seo_settings (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path        TEXT        NOT NULL UNIQUE,
  meta_title       TEXT,
  meta_description TEXT,
  og_title         TEXT,
  og_description   TEXT,
  og_image         TEXT,
  canonical_url    TEXT,
  noindex          BOOLEAN     DEFAULT false,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Robots.txt table (single row)
CREATE TABLE IF NOT EXISTS robots_settings (
  id         UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  content    TEXT  NOT NULL DEFAULT 'User-agent: *\nAllow: /',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE posts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE robots_settings  ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Published posts are public"              ON posts;
DROP POLICY IF EXISTS "Admins have full access to posts"        ON posts;
DROP POLICY IF EXISTS "SEO settings are public"                 ON seo_settings;
DROP POLICY IF EXISTS "Admins have full access to SEO settings" ON seo_settings;
DROP POLICY IF EXISTS "Robots settings are public"              ON robots_settings;
DROP POLICY IF EXISTS "Admins have full access to robots"       ON robots_settings;

-- Posts
CREATE POLICY "Published posts are public"
  ON posts FOR SELECT USING (status = 'published');

CREATE POLICY "Admins have full access to posts"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- SEO settings
CREATE POLICY "SEO settings are public"
  ON seo_settings FOR SELECT USING (true);

CREATE POLICY "Admins have full access to SEO settings"
  ON seo_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Robots
CREATE POLICY "Robots settings are public"
  ON robots_settings FOR SELECT USING (true);

CREATE POLICY "Admins have full access to robots"
  ON robots_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- Add new columns to seo_settings if upgrading from v1
-- ============================================================

ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS og_title       TEXT;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS og_description TEXT;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS canonical_url  TEXT;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS noindex        BOOLEAN DEFAULT false;

-- ============================================================
-- Auto-update updated_at triggers
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at           ON posts;
DROP TRIGGER IF EXISTS seo_settings_updated_at    ON seo_settings;
DROP TRIGGER IF EXISTS robots_settings_updated_at ON robots_settings;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER seo_settings_updated_at
  BEFORE UPDATE ON seo_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER robots_settings_updated_at
  BEFORE UPDATE ON robots_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
