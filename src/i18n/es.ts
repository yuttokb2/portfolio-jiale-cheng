export const es = {
  nav: {
    about: "Sobre mí",
    exp: "Experiencia",
    skills: "Habilidades",
    lang: "English", // Texto del botón para cambiar idioma
  },
  hero: {
    tagline: "Physicist | Machine Learning Engineer | GenAI Specialist",
    role: "Senior Data Scientist & Physicist",
    bio_p1: "<span class='text-cyan-400 font-bold'>M.Sc. en Física Avanzada (Física Computacional).</span> Especializado en modelos de Inteligencia Artificial Generativa para simulaciones de física de partículas hadrónicas, explorando la frontera de los <span class='italic text-slate-400'>diffusion models</span> y redes neuronales invertibles (INNs).",
    bio_p2: "Actualmente <strong class='text-white'>Senior Data Scientist en CoverWallet (Aon)</strong>, donde combino el análisis de datos a gran escala con aplicaciones basadas en LLMs y Machine Learning para potenciar la toma de decisiones y la automatización en entornos complejos.",
    btn_linkedin: "Perfil LinkedIn",
    btn_email: "Contactar"
  },
  experience: {
    title: "Trayectoria Profesional",
    jobs: [
      {
        date: "Presente",
        title: "Senior Data Scientist",
        company: "CoverWallet (Aon)",
        description: "Liderando iniciativas de Data Science, aprovechando el análisis de datos a gran escala, aplicaciones basadas en LLM y aprendizaje automático para mejorar la toma de decisiones y la automatización en entornos complejos.",
        tags: ["Python", "LLMs", "InsurTech", "Automation"],
        current: true,
      },
      {
        date: "Presente",
        title: "Consultor Data Science & AI",
        company: "Freelance",
        description: "Desarrollo de soluciones a medida para clientes internacionales, enfocadas en automatización, modelos predictivos y estrategias de IA Generativa.",
        tags: ["Consultoría", "GenAI Solutions", "Full Stack Data"],
        current: true,
      },
      {
        date: "Presente", 
        title: "AI Teacher",
        company: "Ironhack",
        description: "Formación de la próxima generación de Data Scientists, impartiendo conocimientos sobre Inteligencia Artificial, Machine Learning y Python.",
        tags: ["Mentoring", "Education", "AI"],
      },
      {
        date: "Sept 2023 - 2025", 
        title: "Lead Data Scientist",
        company: "ThetaRay",
        description: "Liderazgo de un equipo cross-funcional de 10 profesionales. Desarrollo de modelos no supervisados para la detección de crímenes financieros (AML) para bancos globales como Santander. Mejora de tasas de detección en porcentajes de dos dígitos.",
        tags: ["Team Lead", "PySpark", "AirFlow", "AML", "Python"],
      },
      {
        date: "Sept 2022 - Aug 2023",
        title: "Data Scientist",
        company: "InsudPharma",
        description: "Diseño de pipelines de recolección de datos usando Selenium y BeautifulSoup. Desarrollo de aplicaciones web internas para seguimiento de KPIs, evolución de precios y análisis de nuevas oportunidades de negocio.",
        tags: ["Selenium", "Power BI", "Market Intelligence"],
      },
      {
        date: "Sept 2021 - Aug 2022",
        title: "Data Scientist",
        company: "Management Solutions",
        description: "Desarrollo de metodologías para medir emisiones financiadas y riesgos climáticos. Validación de modelos para IFRS9 y proyecciones de riesgo (PD, LGD, EAD) para el test de estrés climático del BCE 2022.",
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
    title: "Proyectos Destacados",
    list: [
      {
        title: "Plataforma de Detección AML",
        company: "ThetaRay × Santander",
        period: "2023-2025",
        description: "Lideré la implementación end-to-end de plataforma de detección de blanqueo de capitales basada en IA en 4 geografías internacionales para Banco Santander.",
        impact: [
          "Mejora de tasas de detección en porcentajes de dos dígitos",
          "Reducción del tiempo de procesamiento en 40% (miles de millones de transacciones diarias)",
          "Desplegado en Uruguay, Portugal, Polonia y México"
        ],
        technologies: ["Python", "PySpark", "AirFlow", "MLFlow", "ML No Supervisado"],
        category: "Detección de Crímenes Financieros",
        icon: "🛡️"
      },
      {
        title: "Reingeniería de Pipelines ETL",
        company: "ThetaRay",
        period: "2023-2024",
        description: "Rearquitectura de pipelines de cálculo de features para procesar miles de millones de transacciones diarias con orquestación avanzada y computación distribuida.",
        impact: [
          "40% de reducción en tiempo de procesamiento",
          "Escalable a miles de millones de transacciones diarias",
          "Capacidades mejoradas de feature engineering"
        ],
        technologies: ["PySpark", "AirFlow", "SQL", "Feature Engineering"],
        category: "Ingeniería de Datos",
        icon: "⚙️"
      },
      {
        title: "Suite de Inteligencia de Mercado",
        company: "InsudPharma",
        period: "2022-2023",
        description: "Construcción de plataforma integral de inteligencia de mercado integrando análisis de competencia, seguimiento de precios y monitoreo de expiración de patentes para la industria farmacéutica.",
        impact: [
          "Recolección automatizada de más de 50 fuentes",
          "Dashboard de seguimiento de KPIs en tiempo real",
          "Herramienta de decisión estratégica para ejecutivos C-level"
        ],
        technologies: ["Python", "Selenium", "BeautifulSoup", "Power BI", "Power Apps"],
        category: "Business Intelligence",
        icon: "📊"
      },
      {
        title: "Modelos de Riesgo Climático",
        company: "Management Solutions",
        period: "2021-2022",
        description: "Desarrollo de metodologías para medir emisiones financiadas y riesgos relacionados con el clima para instituciones financieras, contribuyendo al test de estrés del BCE.",
        impact: [
          "Contribución al test de estrés climático del BCE 2022",
          "Validación de modelos IFRS9 y cumplimiento normativo",
          "Modelos de proyección de riesgo en series temporales (PD, LGD, EAD)"
        ],
        technologies: ["Python", "R", "Scikit-Learn", "Análisis de Series Temporales"],
        category: "Analítica de Riesgos",
        icon: "🌍"
      },
      {
        title: "Modelos ML No Supervisados",
        company: "ThetaRay",
        period: "2023-2025",
        description: "Diseño y despliegue de modelos de machine learning no supervisados para detectar patrones de lavado de dinero, tráfico de personas y financiación del terrorismo.",
        impact: [
          "Detección de patrones sin datos etiquetados",
          "Reducción significativa de falsos positivos",
          "Evaluaciones de escenarios de riesgo geográficos específicos"
        ],
        technologies: ["Python", "Unsupervised Learning", "Anomaly Detection", "MLFlow"],
        category: "Machine Learning",
        icon: "🤖"
      },
      {
        title: "Web Scraping & Automatización",
        company: "InsudPharma",
        period: "2022-2023",
        description: "Desarrollo de pipelines automatizados de recolección de datos para análisis de mercado usando web scraping, parsing de PDFs y herramientas de extracción de datos.",
        impact: [
          "Recolección automatizada de bases de datos regulatorias",
          "Seguimiento de evolución de precios de competidores",
          "Sistema de monitoreo de expiración de patentes"
        ],
        technologies: ["Selenium", "BeautifulSoup", "PDFPlumber", "Power Automate"],
        category: "Recolección de Datos",
        icon: "🕷️"
      }
    ]
  }
};