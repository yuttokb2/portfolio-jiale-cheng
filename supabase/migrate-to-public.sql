-- ============================================================
-- Schema: portfolio
-- Creates projects and posts tables in the portfolio schema.
-- Run this in Supabase SQL Editor.
--
-- IMPORTANT: After running this, go to:
--   Supabase Dashboard → Settings → API → Exposed schemas
--   and add "portfolio" to the list.
-- ============================================================

-- 1. Create schema
CREATE SCHEMA IF NOT EXISTS portfolio;

-- 2. Grant usage so PostgREST can expose it
GRANT USAGE ON SCHEMA portfolio TO anon, authenticated, service_role;

-- 3. Projects table
CREATE TABLE IF NOT EXISTS portfolio.projects (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title           TEXT NOT NULL,
  company         TEXT,
  period          TEXT,
  description     TEXT,
  impact          TEXT[]    DEFAULT '{}',
  technologies    TEXT[]    DEFAULT '{}',
  category        TEXT,
  icon            TEXT,
  demo_url        TEXT,
  repo_url        TEXT,
  preview_image   TEXT,
  display_order   INTEGER   DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Posts table
CREATE TABLE IF NOT EXISTS portfolio.posts (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  summary      TEXT,
  content      TEXT,
  published    BOOLEAN     DEFAULT FALSE,
  reading_time INTEGER     DEFAULT 1,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enable Row Level Security
ALTER TABLE portfolio.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio.posts    ENABLE ROW LEVEL SECURITY;

-- 6. RLS policies
DROP POLICY IF EXISTS "projects_public_read" ON portfolio.projects;
DROP POLICY IF EXISTS "projects_auth_all"    ON portfolio.projects;
DROP POLICY IF EXISTS "posts_public_read"    ON portfolio.posts;
DROP POLICY IF EXISTS "posts_auth_all"       ON portfolio.posts;

CREATE POLICY "projects_public_read" ON portfolio.projects FOR SELECT USING (true);
CREATE POLICY "projects_auth_all"    ON portfolio.projects FOR ALL    USING (auth.role() = 'authenticated');

CREATE POLICY "posts_public_read" ON portfolio.posts FOR SELECT USING (published = true);
CREATE POLICY "posts_auth_all"    ON portfolio.posts FOR ALL    USING (auth.role() = 'authenticated');

-- 7. Grants
GRANT SELECT ON portfolio.projects TO anon, authenticated;
GRANT ALL    ON portfolio.projects TO service_role;
GRANT SELECT ON portfolio.posts    TO anon, authenticated;
GRANT ALL    ON portfolio.posts    TO service_role;

-- 8. Auto-update trigger for updated_at
CREATE OR REPLACE FUNCTION portfolio.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_projects_updated_at ON portfolio.projects;
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON portfolio.projects
  FOR EACH ROW EXECUTE FUNCTION portfolio.set_updated_at();

DROP TRIGGER IF EXISTS trg_posts_updated_at ON portfolio.posts;
CREATE TRIGGER trg_posts_updated_at BEFORE UPDATE ON portfolio.posts
  FOR EACH ROW EXECUTE FUNCTION portfolio.set_updated_at();

-- 9. Seed 6 projects (only if table is empty)
INSERT INTO portfolio.projects (title, company, period, description, impact, technologies, category, icon, display_order)
SELECT * FROM (VALUES
  (
    'AML Transaction Monitoring', 'Santander', '2023 – Present',
    'End-to-end machine learning pipeline for Anti-Money Laundering transaction monitoring. Replaced rule-based system with gradient boosting + graph neural network hybrid, dramatically reducing false positives.',
    ARRAY['40% reduction in false positives', 'Monitors $2B+ daily transaction volume', 'Deployed across 12 countries'],
    ARRAY['Python','XGBoost','PyG','Spark','Kafka','Kubernetes'],
    'Financial Crime', '🛡️', 1
  ),
  (
    'Real-Time ETL Data Platform', 'Santander', '2022 – 2023',
    'Designed and built a streaming ETL platform processing millions of banking events per day. Replaced brittle batch jobs with Kafka-based event streams and a dbt-managed data warehouse.',
    ARRAY['10M+ events processed daily', '99.97% uptime SLA', 'Pipeline latency < 3 seconds'],
    ARRAY['Apache Kafka','dbt','Airflow','Snowflake','Terraform','Python'],
    'Data Engineering', '⚙️', 2
  ),
  (
    'Executive BI Dashboard Suite', 'Mapfre', '2021 – 2022',
    'Built a self-service analytics platform for C-suite and risk teams. Connected 8 data sources, created 40+ standardized KPIs, and delivered interactive dashboards replacing 200-page PDF reports.',
    ARRAY['Adopted by 500+ employees', 'Replaced 200-page monthly PDF reports', 'Executive adoption in 3 countries'],
    ARRAY['Power BI','DAX','SQL Server','Python','Azure Data Factory'],
    'Business Intelligence', '📊', 3
  ),
  (
    'Climate Risk Scoring Engine', 'Mapfre', '2020 – 2021',
    'Developed a geospatial risk scoring system for insurance underwriting, combining satellite imagery, climate projections, and historical claims data to assess physical climate risk per property.',
    ARRAY['Integrated into underwriting for 1.2M policies','Reduced unexpected losses 18%','Published methodology internally'],
    ARRAY['Python','GeoPandas','XGBoost','PostGIS','QGIS','Rasterio'],
    'Risk Analytics', '🌍', 4
  ),
  (
    'Churn Prediction & Retention ML', 'Vodafone', '2019 – 2020',
    'Built customer churn prediction models for Vodafone Spain. Used survival analysis and gradient boosting to identify at-risk customers, feeding a targeted retention campaign engine.',
    ARRAY['12% churn reduction in pilot','€3M estimated annual retention impact','A/B tested across 200K customers'],
    ARRAY['Python','scikit-learn','lifelines','SQL','Tableau'],
    'Machine Learning', '🤖', 5
  ),
  (
    'Web Intelligence Scraping Platform', 'Freelance', '2018 – 2019',
    'Architected a distributed web scraping platform for competitive pricing intelligence. Collected structured data from 50+ e-commerce sites, feeding a real-time price monitoring dashboard.',
    ARRAY['50+ sources monitored daily','99% data accuracy after deduplication','Delivered to 3 retail clients'],
    ARRAY['Python','Scrapy','Redis','PostgreSQL','Docker','Elasticsearch'],
    'Data Collection', '🕷️', 6
  )
) AS t(title, company, period, description, impact, technologies, category, icon, display_order)
WHERE NOT EXISTS (SELECT 1 FROM portfolio.projects LIMIT 1);

-- 10. Seed 2 blog posts
INSERT INTO portfolio.posts (title, slug, summary, content, published, reading_time) VALUES
(
  'The Rise of Large Language Models: How GPT Changed Everything',
  'rise-of-large-language-models',
  'An exploration of how transformer-based language models reshaped AI—from the attention mechanism to emergent capabilities and what it all means for practitioners.',
  E'# The Rise of Large Language Models: How GPT Changed Everything\n\nIn November 2022, the world changed. Not with a bang, but with a chat interface.\n\nWhen OpenAI released ChatGPT, it became the fastest-growing consumer application in history—100 million users in two months. But this was merely the visible tip of an iceberg forming for years in research labs.\n\n## The Transformer Revolution\n\nThe story begins in 2017, with a paper titled *"Attention Is All You Need"* by Vaswani et al. at Google Brain. The transformer architecture it introduced solved a fundamental problem that had plagued sequence modeling: how to efficiently capture long-range dependencies in text.\n\nPrevious approaches—RNNs and LSTMs—processed text sequentially, one word at a time. By the time you reached the end of a long sentence, the model had "forgotten" the beginning.\n\nTransformers solved this with **self-attention**: every word in a sequence can directly attend to every other word, regardless of distance. The entire sequence is processed in parallel.\n\n```python\n# Simplified self-attention\ndef attention(Q, K, V, d_k):\n    scores = Q @ K.T / math.sqrt(d_k)\n    weights = softmax(scores)\n    return weights @ V\n```\n\n## From BERT to GPT\n\nTwo training paradigms emerged:\n\n**BERT (2018)** — Bidirectional. Trained by masking random words and predicting them from context. Excellent for understanding: classification, NER, Q&A.\n\n**GPT (2018)** — Autoregressive. Predict the next token given all previous tokens. This simple objective turns out to be extraordinarily powerful.\n\nOpenAI\'s bet on autoregressive modeling paid off spectacularly. GPT-2 generated such coherent text that it was initially withheld from public release. GPT-3, with 175 billion parameters, demonstrated something genuinely surprising: **emergent capabilities**.',
  true,
  8
),
(
  'Building RAG Systems: Beyond Simple Vector Search',
  'building-rag-systems-beyond-vector-search',
  'A hands-on guide to production-grade Retrieval-Augmented Generation—hybrid search, re-ranking, evaluation frameworks, and the failure modes nobody warns you about.',
  E'# Building RAG Systems: Beyond Simple Vector Search\n\nRetrieval-Augmented Generation has become the dominant paradigm for building LLM applications over proprietary data. But most production systems that start with "just embed everything and do cosine similarity" quickly discover its limits.\n\nThis is a deep dive into what separates naive RAG from production-grade RAG.\n\n## Why RAG? The Context Window Problem\n\nLLMs are frozen in time. Your company\'s Q4 2024 earnings, your customer\'s support history, your internal docs—none of it is in the model.\n\nThe naive solution: put everything in the context window. But even 128k-token windows don\'t scale. You can\'t stuff a 10,000-page knowledge base into every query. And longer contexts degrade performance.\n\nRAG solves this by retrieval:\n\n```\nQuery → Retrieve relevant chunks → Augment prompt → Generate\n```',
  true,
  10
)
ON CONFLICT (slug) DO NOTHING;

SELECT
  'portfolio schema ready!' AS status,
  (SELECT COUNT(*) FROM portfolio.projects) AS projects_count,
  (SELECT COUNT(*) FROM portfolio.posts)    AS posts_count;
