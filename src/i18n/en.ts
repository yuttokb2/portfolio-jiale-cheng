export const en = {
  nav: {
    about: "About",
    exp: "Experience",
    skills: "Skills",
    lang: "Español", // Texto del botón para cambiar idioma
  },
  hero: {
    tagline: "Physicist | Machine Learning Engineer | GenAI Specialist",
    role: "Senior Data Scientist & Physicist",
    bio_p1: "<span class='text-cyan-400 font-bold'>M.Sc. in Advanced Physics (Computational Physics).</span> Specialized in Generative AI models for synthetic hadronic particle simulations, exploring diffusion models and invertible neural networks (INNs) for high-energy physics applications.",
    bio_p2: "Currently working as a <strong class='text-white'>Senior Data Scientist at CoverWallet (Aon)</strong>, leveraging large-scale data analysis, LLM-based applications, and machine learning to enhance decision-making and automation in complex environments.",
    btn_linkedin: "LinkedIn Profile",
    btn_email: "Contact Me"
  },
  experience: {
    title: "Professional Experience",
    jobs: [
      {
        date: "Present",
        title: "Senior Data Scientist",
        company: "CoverWallet (Aon)",
        description: "Leveraging large-scale data analysis, LLM-based applications, and machine learning to enhance decision-making and automation in complex environments.",
        tags: ["Python", "LLMs", "MLFlow", "LangChain", "AWS", "GCP", "Airflow", "Gemini"],
        current: true,
      },
      {
        date: "Present",
        title: "Data Science & AI Consultant",
        company: "Freelance",
        description: "Developing custom solutions for international clients, focusing on automation, predictive models, and Generative AI strategies.",
        tags: ["Consulting", "GenAI Solutions", "Full Stack Data"],
        current: true,
      },
      {
        date: "Present", 
        title: "AI Teacher",
        company: "Ironhack",
        description: "Mentoring the next generation of Data Scientists, teaching Artificial Intelligence, Machine Learning, and Python.",
        tags: ["Mentoring", "Education", "AI"],
      },
      {
        date: "Sept 2023 - 2025", 
        title: "Lead Data Scientist",
        company: "ThetaRay",
        description: "Led a cross-functional team of 10 professionals. Spearheaded the development of unsupervised ML models to detect financial crimes (AML) for global banks like Santander. Improved detection rates by double-digit percentages.",
        tags: ["Team Lead", "PySpark", "AirFlow", "AML", "Python"],
      },
      {
        date: "Sept 2022 - Aug 2023",
        title: "Data Scientist",
        company: "InsudPharma",
        description: "Designed and implemented data-collection pipelines using Selenium and BeautifulSoup. Developed internal web applications for tracking KPIs, price evolution, and analyzing new business opportunities.",
        tags: ["Selenium", "Power BI", "Market Intelligence"],
      },
      {
        date: "Sept 2021 - Aug 2022",
        title: "Data Scientist",
        company: "Management Solutions",
        description: "Developed methodologies to measure financed emissions and climate-related risks. Validated models for IFRS9 and risk projections (PD, LGD, EAD) for the 2022 ECB climate stress test.",
        tags: ["Risk Modeling", "R", "Python", "Climate Risk"],
      },
    ]
  },
  skills: {
    title: "Core Expertise",
    groups: [
      {
        category: "Machine Learning & GenAI",
        skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Diffusion Models", "Normalizing Flows", "INNs", "OpenAI API", "Llama", "Gemini", "Claude", "HuggingFace", "LangChain", "MLFlow", "AirFlow"]
      },
      {
        category: "Big Data & Cloud",
        skills: ["PySpark", "Distributed Computing", "ETL Pipelines", "AWS", "GCP", "Azure", "BigQuery", "SnowFlake"]
      },
      {
        category: "Programming Languages",
        skills: ["Python", "R", "C++", "JavaScript", "Scala"]
      },
      {
        category: "Data Visualization",
        skills: ["SQL", "Power BI","Looker", "Seaborn", "Matplotlib"]
      }
    ]
  },
  projects: {
    title: "Featured Projects",
    list: [
      {
        title: "AML Detection Platform",
        company: "ThetaRay × Santander",
        period: "2023-2025",
        description: "Led end-to-end implementation of AI-driven Anti-Money Laundering detection platform across 4 international geographies for Banco Santander.",
        impact: [
          "Improved detection rates by double-digit percentages",
          "Reduced processing time by 40% (billions of daily transactions)",
          "Deployed across Uruguay, Portugal, Poland, and Mexico"
        ],
        technologies: ["Python", "PySpark", "AirFlow", "MLFlow", "Unsupervised ML"],
        category: "Financial Crime Detection",
        icon: "🛡️"
      },
      {
        title: "ETL Pipeline Re-engineering",
        company: "ThetaRay",
        period: "2023-2024",
        description: "Re-architected feature calculation pipelines to handle billions of transactions daily with advanced orchestration and distributed computing.",
        impact: [
          "40% reduction in processing time",
          "Scalable to billions of daily transactions",
          "Enhanced model feature engineering capabilities"
        ],
        technologies: ["PySpark", "AirFlow", "SQL", "Feature Engineering"],
        category: "Data Engineering",
        icon: "⚙️"
      },
      {
        title: "Market Intelligence Suite",
        company: "InsudPharma",
        period: "2022-2023",
        description: "Built comprehensive market intelligence platform integrating competitor analysis, price tracking, and patent expiration monitoring for pharmaceutical industry.",
        impact: [
          "Automated data collection from 50+ sources",
          "Real-time KPI tracking dashboard",
          "Strategic decision-making tool for C-level executives"
        ],
        technologies: ["Python", "Selenium", "BeautifulSoup", "Power BI", "Power Apps"],
        category: "Business Intelligence",
        icon: "📊"
      },
      {
        title: "Climate Risk Models",
        company: "Management Solutions",
        period: "2021-2022",
        description: "Developed methodologies to measure financed emissions and climate-related risks for financial institutions, contributing to ECB stress testing.",
        impact: [
          "Contributed to 2022 ECB climate stress test",
          "IFRS9 model validation and compliance",
          "Time-series risk projection models (PD, LGD, EAD)"
        ],
        technologies: ["Python", "R", "Scikit-Learn", "Time-Series Analysis"],
        category: "Risk Analytics",
        icon: "🌍"
      },
      {
        title: "Unsupervised ML Models",
        company: "ThetaRay",
        period: "2023-2025",
        description: "Designed and deployed unsupervised machine learning models to detect money laundering, human trafficking, and terrorism financing patterns.",
        impact: [
          "Pattern detection without labeled data",
          "Reduced false positives significantly",
          "Geographic-specific risk scenario evaluations"
        ],
        technologies: ["Python", "Unsupervised Learning", "Anomaly Detection", "MLFlow"],
        category: "Machine Learning",
        icon: "🤖"
      },
      {
        title: "Web Scraping & Automation",
        company: "InsudPharma",
        period: "2022-2023",
        description: "Developed automated data collection pipelines for market analysis using web scraping, PDF parsing, and data extraction tools.",
        impact: [
          "Automated collection from regulatory databases",
          "Price evolution tracking across competitors",
          "Patent expiration monitoring system"
        ],
        technologies: ["Selenium", "BeautifulSoup", "PDFPlumber", "Power Automate"],
        category: "Data Collection",
        icon: "🕷️"
      }
    ]
  }
};