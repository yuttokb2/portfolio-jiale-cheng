-- =============================================
-- Portfolio Jiale Cheng — Supabase Init SQL
-- Run this in the Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- SCHEMA
-- =============================================
CREATE SCHEMA IF NOT EXISTS portfolio;

-- =============================================
-- PROJECTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS portfolio.projects (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title          TEXT        NOT NULL,
  company        TEXT        NOT NULL DEFAULT '',
  period         TEXT        NOT NULL DEFAULT '',
  description    TEXT        NOT NULL DEFAULT '',
  impact         TEXT[]      NOT NULL DEFAULT '{}',
  technologies   TEXT[]      NOT NULL DEFAULT '{}',
  category       TEXT        NOT NULL DEFAULT '',
  icon           TEXT        NOT NULL DEFAULT '🚀',
  demo_url       TEXT,
  repo_url       TEXT,
  preview_image  TEXT,
  display_order  INTEGER     NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- POSTS (BLOG) TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS portfolio.posts (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  summary      TEXT        NOT NULL DEFAULT '',
  content      TEXT        NOT NULL DEFAULT '',
  published    BOOLEAN     NOT NULL DEFAULT FALSE,
  reading_time INTEGER     NOT NULL DEFAULT 1,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- AUTO-UPDATE updated_at TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION portfolio.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_projects_updated_at ON portfolio.projects;
CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON portfolio.projects
  FOR EACH ROW EXECUTE FUNCTION portfolio.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_posts_updated_at ON portfolio.posts;
CREATE TRIGGER trg_posts_updated_at
  BEFORE UPDATE ON portfolio.posts
  FOR EACH ROW EXECUTE FUNCTION portfolio.update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE portfolio.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio.posts    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_projects" ON portfolio.projects;
CREATE POLICY "public_read_projects" ON portfolio.projects
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_published_posts" ON portfolio.posts;
CREATE POLICY "public_read_published_posts" ON portfolio.posts
  FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "auth_manage_projects" ON portfolio.projects;
CREATE POLICY "auth_manage_projects" ON portfolio.projects
  FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_manage_posts" ON portfolio.posts;
CREATE POLICY "auth_manage_posts" ON portfolio.posts
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- EXPOSE SCHEMA TO POSTGREST
-- (Supabase dashboard > API Settings > Extra Search Path)
-- Add "portfolio" there — this SQL alone is not enough.
-- =============================================
GRANT USAGE ON SCHEMA portfolio TO anon, authenticated, service_role;
GRANT ALL   ON ALL TABLES    IN SCHEMA portfolio TO anon, authenticated, service_role;
GRANT ALL   ON ALL SEQUENCES IN SCHEMA portfolio TO anon, authenticated, service_role;
GRANT ALL   ON ALL ROUTINES  IN SCHEMA portfolio TO anon, authenticated, service_role;

-- =============================================
-- SEED DATA — Initial projects
-- =============================================
INSERT INTO portfolio.projects (title, company, period, description, impact, technologies, category, icon, display_order) VALUES
(
  'AML Detection Platform',
  'ThetaRay × Santander',
  '2023-2025',
  'Led end-to-end implementation of AI-driven Anti-Money Laundering detection platform across 4 international geographies for Banco Santander.',
  ARRAY['Improved detection rates by double-digit percentages', 'Reduced processing time by 40% (billions of daily transactions)', 'Deployed across Uruguay, Portugal, Poland, and Mexico'],
  ARRAY['Python', 'PySpark', 'AirFlow', 'MLFlow', 'Unsupervised ML'],
  'Financial Crime Detection', '🛡️', 1
),
(
  'ETL Pipeline Re-engineering',
  'ThetaRay',
  '2023-2024',
  'Re-architected feature calculation pipelines to handle billions of transactions daily with advanced orchestration and distributed computing.',
  ARRAY['40% reduction in processing time', 'Scalable to billions of daily transactions', 'Enhanced model feature engineering capabilities'],
  ARRAY['PySpark', 'AirFlow', 'SQL', 'Feature Engineering'],
  'Data Engineering', '⚙️', 2
),
(
  'Market Intelligence Suite',
  'InsudPharma',
  '2022-2023',
  'Built comprehensive market intelligence platform integrating competitor analysis, price tracking, and patent expiration monitoring for pharmaceutical industry.',
  ARRAY['Automated data collection from 50+ sources', 'Real-time KPI tracking dashboard', 'Strategic decision-making tool for C-level executives'],
  ARRAY['Python', 'Selenium', 'BeautifulSoup', 'Power BI', 'Power Apps'],
  'Business Intelligence', '📊', 3
),
(
  'Climate Risk Models',
  'Management Solutions',
  '2021-2022',
  'Developed methodologies to measure financed emissions and climate-related risks for financial institutions, contributing to ECB stress testing.',
  ARRAY['Contributed to 2022 ECB climate stress test', 'IFRS9 model validation and compliance', 'Time-series risk projection models (PD, LGD, EAD)'],
  ARRAY['Python', 'R', 'Scikit-Learn', 'Time-Series Analysis'],
  'Risk Analytics', '🌍', 4
),
(
  'Unsupervised ML Models',
  'ThetaRay',
  '2023-2025',
  'Designed and deployed unsupervised machine learning models to detect money laundering, human trafficking, and terrorism financing patterns.',
  ARRAY['Pattern detection without labeled data', 'Reduced false positives significantly', 'Geographic-specific risk scenario evaluations'],
  ARRAY['Python', 'Unsupervised Learning', 'Anomaly Detection', 'MLFlow'],
  'Machine Learning', '🤖', 5
),
(
  'Web Scraping & Automation',
  'InsudPharma',
  '2022-2023',
  'Developed automated data collection pipelines for market analysis using web scraping, PDF parsing, and data extraction tools.',
  ARRAY['Automated collection from regulatory databases', 'Price evolution tracking across competitors', 'Patent expiration monitoring system'],
  ARRAY['Selenium', 'BeautifulSoup', 'PDFPlumber', 'Power Automate'],
  'Data Collection', '🕷️', 6
)
ON CONFLICT DO NOTHING;
