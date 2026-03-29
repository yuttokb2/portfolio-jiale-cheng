-- ============================================================
-- Schema: portfolio (profile, skill_groups, experience_jobs)
-- Run AFTER the main schema file (migrate-to-public.sql).
-- ============================================================

-- 1. Profile / bio content (key-value per language)
CREATE TABLE IF NOT EXISTS portfolio.profile (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key        TEXT NOT NULL,
  value      TEXT NOT NULL DEFAULT '',
  lang       TEXT NOT NULL DEFAULT 'en',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (key, lang)
);

-- 2. Skill groups
CREATE TABLE IF NOT EXISTS portfolio.skill_groups (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category      TEXT NOT NULL,
  skills        TEXT[] NOT NULL DEFAULT '{}',
  lang          TEXT NOT NULL DEFAULT 'en',
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Experience / jobs
CREATE TABLE IF NOT EXISTS portfolio.experience_jobs (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date          TEXT NOT NULL,
  title         TEXT NOT NULL,
  company       TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  tags          TEXT[] NOT NULL DEFAULT '{}',
  is_current    BOOLEAN NOT NULL DEFAULT FALSE,
  lang          TEXT NOT NULL DEFAULT 'en',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS
ALTER TABLE portfolio.profile          ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio.skill_groups     ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio.experience_jobs  ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profile_public_read"         ON portfolio.profile;
DROP POLICY IF EXISTS "profile_auth_all"            ON portfolio.profile;
DROP POLICY IF EXISTS "skill_groups_public_read"    ON portfolio.skill_groups;
DROP POLICY IF EXISTS "skill_groups_auth_all"       ON portfolio.skill_groups;
DROP POLICY IF EXISTS "experience_public_read"      ON portfolio.experience_jobs;
DROP POLICY IF EXISTS "experience_auth_all"         ON portfolio.experience_jobs;

CREATE POLICY "profile_public_read"      ON portfolio.profile         FOR SELECT USING (true);
CREATE POLICY "profile_auth_all"         ON portfolio.profile         FOR ALL    USING (auth.role() = 'authenticated');
CREATE POLICY "skill_groups_public_read" ON portfolio.skill_groups    FOR SELECT USING (true);
CREATE POLICY "skill_groups_auth_all"    ON portfolio.skill_groups    FOR ALL    USING (auth.role() = 'authenticated');
CREATE POLICY "experience_public_read"   ON portfolio.experience_jobs FOR SELECT USING (true);
CREATE POLICY "experience_auth_all"      ON portfolio.experience_jobs FOR ALL    USING (auth.role() = 'authenticated');

-- 5. Grants
GRANT SELECT ON portfolio.profile, portfolio.skill_groups, portfolio.experience_jobs TO anon, authenticated;
GRANT ALL    ON portfolio.profile, portfolio.skill_groups, portfolio.experience_jobs TO service_role;

-- 6. Updated_at triggers
CREATE OR REPLACE FUNCTION portfolio.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;

DROP TRIGGER IF EXISTS trg_profile_updated_at ON portfolio.profile;
CREATE TRIGGER trg_profile_updated_at BEFORE UPDATE ON portfolio.profile
  FOR EACH ROW EXECUTE FUNCTION portfolio.set_updated_at();

DROP TRIGGER IF EXISTS trg_skill_groups_updated_at ON portfolio.skill_groups;
CREATE TRIGGER trg_skill_groups_updated_at BEFORE UPDATE ON portfolio.skill_groups
  FOR EACH ROW EXECUTE FUNCTION portfolio.set_updated_at();

DROP TRIGGER IF EXISTS trg_experience_updated_at ON portfolio.experience_jobs;
CREATE TRIGGER trg_experience_updated_at BEFORE UPDATE ON portfolio.experience_jobs
  FOR EACH ROW EXECUTE FUNCTION portfolio.set_updated_at();

-- 7. Seed: profile (EN)
INSERT INTO portfolio.profile (key, value, lang) VALUES
  ('tagline',  'Physicist | Machine Learning Engineer | GenAI Specialist', 'en'),
  ('role',     'Senior Data Scientist & Physicist', 'en'),
  ('bio_p1',   '<span class=''text-cyan-400 font-bold''>M.Sc. in Advanced Physics (Computational Physics).</span> Specialized in Generative AI models for synthetic hadronic particle simulations, exploring diffusion models and invertible neural networks (INNs) for high-energy physics applications.', 'en'),
  ('bio_p2',   'Currently working as a <strong class=''text-white''>Senior Data Scientist at CoverWallet (Aon)</strong>, leveraging large-scale data analysis, LLM-based applications, and machine learning to enhance decision-making and automation in complex environments.', 'en')
ON CONFLICT (key, lang) DO NOTHING;

-- 8. Seed: skill groups (EN)
INSERT INTO portfolio.skill_groups (category, skills, lang, display_order) VALUES
  ('Machine Learning & GenAI', ARRAY['Python','Pandas','NumPy','Scikit-learn','TensorFlow','PyTorch','Diffusion Models','Normalizing Flows','INNs','OpenAI API','Llama','Gemini','Claude','HuggingFace','LangChain','MLFlow','AirFlow'], 'en', 1),
  ('Big Data & Cloud',         ARRAY['PySpark','Distributed Computing','ETL Pipelines','AWS','GCP','Azure','BigQuery','SnowFlake'], 'en', 2),
  ('Programming Languages',    ARRAY['Python','R','C++','JavaScript','Scala'], 'en', 3),
  ('Data Visualization',       ARRAY['SQL','Power BI','Looker','Seaborn','Matplotlib'], 'en', 4)
ON CONFLICT DO NOTHING;

-- 9. Seed: experience jobs (EN)
INSERT INTO portfolio.experience_jobs (date, title, company, description, tags, is_current, lang, display_order) VALUES
  ('Present', 'Senior Data Scientist', 'CoverWallet (Aon)', 'Leveraging large-scale data analysis, LLM-based applications, and machine learning to enhance decision-making and automation in complex environments.', ARRAY['Python','LLMs','MLFlow','LangChain','AWS','GCP','Airflow','Gemini'], true,  'en', 1),
  ('Present', 'Data Science & AI Consultant', 'Freelance', 'Developing custom solutions for international clients, focusing on automation, predictive models, and Generative AI strategies.', ARRAY['Consulting','GenAI Solutions','Full Stack Data'], true,  'en', 2),
  ('Present', 'AI Teacher', 'Ironhack', 'Mentoring the next generation of Data Scientists, teaching Artificial Intelligence, Machine Learning, and Python.', ARRAY['Mentoring','Education','AI'], false, 'en', 3),
  ('Sept 2023 - 2025', 'Lead Data Scientist', 'ThetaRay', 'Led a cross-functional team of 10 professionals. Spearheaded the development of unsupervised ML models to detect financial crimes (AML) for global banks like Santander.', ARRAY['Team Lead','PySpark','AirFlow','AML','Python'], false, 'en', 4),
  ('Sept 2022 - Aug 2023', 'Data Scientist', 'InsudPharma', 'Designed and implemented data-collection pipelines using Selenium and BeautifulSoup. Developed internal web applications for tracking KPIs and analyzing new business opportunities.', ARRAY['Selenium','Power BI','Market Intelligence'], false, 'en', 5),
  ('Sept 2021 - Aug 2022', 'Data Scientist', 'Management Solutions', 'Developed methodologies to measure financed emissions and climate-related risks. Validated models for IFRS9 and risk projections for the 2022 ECB climate stress test.', ARRAY['Risk Modeling','R','Python','Climate Risk'], false, 'en', 6)
ON CONFLICT DO NOTHING;

SELECT
  'portfolio schema — profile/skills/experience ready!' AS status,
  (SELECT COUNT(*) FROM portfolio.profile)              AS profile_rows,
  (SELECT COUNT(*) FROM portfolio.skill_groups)         AS skill_groups,
  (SELECT COUNT(*) FROM portfolio.experience_jobs)      AS experience_jobs;
