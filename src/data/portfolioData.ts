export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  category: 'AI & Systems' | 'Cloud & Backend' | 'Full Stack';
  githubUrl?: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
  featured: boolean;
  architectureNotes?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Internship';
  points: string[];
  technologies: string[];
  metrics: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean; tag?: string }[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  badgeColor: string;
  skills: string[];
  credentialUrl?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Prem Manchina',
    role: 'Product Engineer & Systems Architect',
    tagline: 'Scaling Event-Driven Cloud Architectures & Autonomous AI Systems',
    bio: 'Product Engineer specializing in scalable enterprise notification microservices, event-driven AWS cloud pipelines (SNS → Lambda → SQS/SES), high-speed Fastify v5 APIs, type-safe database architectures with Drizzle ORM + Aurora PostgreSQL, and self-healing autonomous AI agents.',
    location: 'Bangalore / Rajahmundry, India',
    email: 'premmanchina33@gmail.com',
    phone: '+91 9441513653',
    github: 'https://github.com/Manchina',
    linkedin: 'https://www.linkedin.com/in/prem-manchina-a699b9242/',
    leetcode: 'https://leetcode.com/u/Manchina/',
    availability: 'Open for high-impact Engineering & Architecture Roles',
    stats: [
      { label: 'Workflows Scaled', value: '150+', change: 'across 12 HR modules' },
      { label: 'API Latency Reduction', value: '~80%', change: 'Event-driven decoupling' },
      { label: 'Lambda Cold Start Drop', value: '-40%', change: 'Memory & runtime tuning' },
      { label: 'Compute Cost Savings', value: '~35%', change: 'Optimized execution patterns' },
      { label: 'Production Uptime', value: '99.9%', change: 'AWS Lambda + Fastify v5' },
      { label: 'MTTR Improvement', value: '-60%', change: 'Automated failure alerting' },
    ],
  },

  projects: [
    {
      id: 'docmarks',
      title: 'DocMarks',
      subtitle: 'Autonomous AI Doc Crawler & Vector RAG Engine with MCP',
      description: 'Self-healing documentation indexing engine with pgvector hybrid search, cryptographic line diffs, and Model Context Protocol (MCP) server for Claude Code & Cursor.',
      longDescription: 'DocMarks eliminates documentation staleness, broken code snippets, and hallucinated API signatures for developer teams. It features autonomous recursive crawling via Bright Data Web Unlocker, in-process ONNX MiniLM 384d vector embeddings, an active DOM mutation anomaly detector with auto-healing selector synthesis, and a live Model Context Protocol (MCP) stdio & HTTP server.',
      highlights: [
        'Model Context Protocol (MCP) integration with 9 tools for Claude Code and Cursor IDEs',
        'Hybrid Dense (pgvector) + Lexical vector retrieval engine with citation verification',
        'Active DOM anomaly detector that repairs broken scraping selectors automatically',
        'Cryptographic SHA-256 line diffs and plain-English changelog synthesis',
      ],
      techStack: ['TypeScript', 'Fastify', 'Neon PostgreSQL', 'pgvector', 'ONNX Embeddings', 'React 18', 'MCP Protocol', 'Bright Data SDK', 'Gemini 1.5'],
      category: 'AI & Systems',
      githubUrl: 'https://github.com/Manchina/Docmarks',
      metrics: [
        { label: 'MCP Tools', value: '9 Tools' },
        { label: 'Type Safety', value: '100% Strict' },
        { label: 'Self-Healing', value: 'Real-time' },
      ],
      featured: true,
      architectureNotes: 'Fastify + Neon pgvector + HuggingFace ONNX MiniLM + MCP Stdio/HTTP Server + React Router v7 UI canvas',
    },
    {
      id: 'autonomous-compliance-engine',
      title: 'Autonomous Compliance Engine',
      subtitle: 'Self-Correcting Multi-Agent Underwriting & RBI Audit Platform',
      description: 'Razorpay-modeled autonomous merchant onboarding & continuous audit engine that replaces 3–7 day review queues with real-time AI agents and a visual control plane.',
      longDescription: 'Built for high-velocity Payment Aggregators (modeled on Razorpay and RBI Master Directions / CERT-In 6-hour incident guidelines). Features a visual no-code control plane where rule thresholds hot-reload in running workers via WebSockets, a 5-stage KYX onboarding agent with interactive SMS self-correction, and real-time transaction velocity monitors.',
      highlights: [
        'Zero-downtime hot-reloading rule engine via WebSocket control plane',
        '5-stage verification pipeline (Document OCR, Registry checks, Web scraping, GPT-4o risk analysis)',
        'Continuous audit agent with automated print-ready RBI & CERT-In PDF generation',
        'Multi-tiered Enterprise RBAC (Admin, Compliance Officer, Viewer)',
      ],
      techStack: ['TypeScript', 'Node.js', 'Express', 'React', 'Socket.io', 'Neon PostgreSQL', 'OpenAI GPT-4o', 'Puppeteer', 'Tailwind CSS'],
      category: 'AI & Systems',
      githubUrl: 'https://github.com/Manchina/autonomous-compliance-engine',
      metrics: [
        { label: 'Queue Reduction', value: '3-7d → Mins' },
        { label: 'Verification Stages', value: '5-Step' },
        { label: 'Hot Reload', value: '0ms Downtime' },
      ],
      featured: true,
      architectureNotes: 'Distributed multi-worker architecture with WebSocket Gateway, Neon DB, and Headless Agent workers',
    },
    {
      id: 'wysbryx-notification-engine',
      title: 'Enterprise Notification Microservice',
      subtitle: 'High-Throughput AWS Event-Driven Notification & Routing Engine',
      description: 'Core microservice powering 150+ critical notification workflows across 12 enterprise HR modules with multi-region delivery and dynamic recipient resolution.',
      longDescription: 'Architected and scaled at Wysbryx Technologies. Transitioned legacy synchronous execution into an asynchronous AWS event bus (SNS → Lambda → SQS/SES), achieving an 80% drop in latency and isolating downstream failure cascades. Integrated Fastify v5 with Drizzle ORM on Aurora PostgreSQL for sub-10ms query times.',
      highlights: [
        'Re-architected synchronous API flows into SNS → Lambda → SQS/SES event pipelines',
        'Engineered multi-region routing across North America, India, and UK',
        'Optimized Lambda execution patterns to slash cold starts by ~40% and compute cost by ~35%',
        'S3-based programmatic PDF document generation, escalations, and automated CloudWatch alarms',
      ],
      techStack: ['Node.js', 'TypeScript', 'Fastify v5', 'AWS Lambda', 'AWS SNS', 'AWS SQS', 'AWS SES', 'Drizzle ORM', 'Aurora PostgreSQL', 'Pino', 'Vitest'],
      category: 'Cloud & Backend',
      metrics: [
        { label: 'Latency Cut', value: '~80%' },
        { label: 'Workflows', value: '150+' },
        { label: 'Uptime', value: '99.9%' },
        { label: 'Cold Starts', value: '-40%' },
      ],
      featured: true,
      architectureNotes: 'Decoupled SNS Fan-out -> Dedicated Worker SQS Queues -> Multi-Region SES Dispatchers + Aurora PostgreSQL',
    },
    {
      id: 'assetops',
      title: 'AssetOps',
      subtitle: 'Enterprise Resource Tracking & Real-Time Audit Platform',
      description: 'Centralized corporate asset lifecycle management system with Fastify REST APIs, JWT security, and real-time utilization telemetry dashboards.',
      longDescription: 'Engineered an end-to-end asset lifecycle management system that centralizes resource allocation, tracking, and deprecation. Developed optimized PostgreSQL relational schemas with strict audit logging, increasing organizational transparency by 40%.',
      highlights: [
        'High-performance Fastify REST API backend with type-safe schema validation',
        'Interactive real-time asset utilization dashboards in React',
        'Granular maintenance audit trails with automated lifecycle status transitions',
        'Secure stateless JWT authentication and role-based resource permissions',
      ],
      techStack: ['TypeScript', 'Fastify', 'React', 'PostgreSQL', 'JWT', 'Drizzle ORM', 'Tailwind CSS'],
      category: 'Full Stack',
      githubUrl: 'https://github.com/Manchina/Asset-Ops',
      metrics: [
        { label: 'Transparency', value: '+40%' },
        { label: 'Auth System', value: 'JWT RBAC' },
        { label: 'API Framework', value: 'Fastify' },
      ],
      featured: false,
    },
    {
      id: 'tanstack-recall',
      title: 'TanStack Recall',
      subtitle: 'Full-Stack Modern SSR & Server Functions Framework',
      description: 'High-performance TanStack Start & TanStack Router full-stack web application with type-safe server functions, Nitro server engine, and Vitest suite.',
      longDescription: 'Exploration and production implementation of bleeding-edge React architecture utilizing TanStack Start, file-based routing, type-safe RPC server functions, and universal Nitro engine deployment.',
      highlights: [
        'Zero-waterfall data fetching with TanStack Router loaders and cache invalidation',
        'Type-safe server RPC functions seamlessly connecting frontend to backend logic',
        'Configured for multi-target serverless Nitro deployment (Cloudflare, AWS, Vercel)',
        'Full test coverage with Vitest and strict TypeScript configuration',
      ],
      techStack: ['TypeScript', 'TanStack Start', 'TanStack Router', 'React 19', 'Nitro', 'Vitest', 'Tailwind CSS'],
      category: 'Full Stack',
      githubUrl: 'https://github.com/Manchina/tanstack-recall',
      metrics: [
        { label: 'Architecture', value: 'TanStack Start' },
        { label: 'Type Safety', value: '100% RPC' },
      ],
      featured: false,
    },
    {
      id: 'yelpcamp',
      title: 'YelpCamp',
      subtitle: 'Full-Stack Geolocation & Camping Exploration Platform',
      description: 'Scalable social campground platform featuring interactive MapTiler mapping, Cloudinary asset pipelines, and granular authorization layers.',
      longDescription: 'Comprehensive full-stack web application designed for outdoor enthusiasts. Features full CRUD operations on campgrounds and reviews, secure image upload pipelines with Cloudinary transformations, interactive MapTiler vector cluster maps, and hardened Passport.js authentication.',
      highlights: [
        'Interactive MapTiler cluster maps with reverse geocoding and location search',
        'Secure multi-asset image pipeline with Cloudinary auto-optimization',
        'Session security with Passport.js, helmet HTTP headers, and Mongo sanitize',
        'Robust MVC architecture with Express middleware and MongoDB schemas',
      ],
      techStack: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'MapTiler API', 'Cloudinary', 'Bootstrap', 'Passport.js'],
      category: 'Full Stack',
      githubUrl: 'https://github.com/Manchina/YelpCamp',
      metrics: [
        { label: 'Assets Managed', value: '1,000+' },
        { label: 'Security', value: 'Passport.js' },
      ],
      featured: false,
    },
  ] as ProjectItem[],

  experience: [
    {
      id: 'wysbryx-product-engineer',
      role: 'Product Engineer',
      company: 'Wysbryx Technologies',
      location: 'Bangalore, India',
      period: 'Sep 2025 - Present',
      type: 'Full-time',
      points: [
        'Owned and scaled an enterprise notification microservice supporting 150+ workflows across 12 HR modules, constructed using Node.js, TypeScript, Fastify, and AWS.',
        'Re-architected synchronous notification flows into an event-driven AWS architecture (SNS → Lambda → SQS/SES), reducing API latency by ~80% and isolating downstream failures.',
        'Designed multi-region notification routing across NA, India, and UK, supporting region-specific business rules and dynamic recipient resolution.',
        'Optimized AWS Lambda execution patterns, reducing cold starts by ~40% and compute costs by ~35% through runtime and memory optimization.',
        'Engineered Fastify v5 APIs on AWS Lambda with 99.9% uptime, and integrated Drizzle ORM + Aurora PostgreSQL for type-safe, low-latency data access.',
        'Developed programmatic escalation, reminder, document-generation, and integration-monitoring workflows, including S3-based PDF delivery and failure alerting, reducing MTTR by ~60%.',
        'Implemented non-production email safeguards, structured Pino/CloudWatch logging, and Vitest unit/integration tests to improve security, observability, and release reliability.',
      ],
      technologies: ['TypeScript', 'Fastify v5', 'Node.js', 'AWS Lambda', 'AWS SNS', 'AWS SQS', 'AWS SES', 'Drizzle ORM', 'Aurora PostgreSQL', 'Vitest', 'CloudWatch', 'Pino'],
      metrics: ['150+ Workflows', '~80% Latency Cut', '99.9% Uptime', '-40% Cold Starts', '-60% MTTR'],
    },
    {
      id: 'wysbryx-intern',
      role: 'Full Stack Engineer Intern',
      company: 'Wysbryx Technologies',
      location: 'Bangalore, India',
      period: 'July 2025 - Aug 2025',
      type: 'Internship',
      points: [
        'Engineered a centralized farming management platform for an NGO using NestJS, React, and PostgreSQL, digitizing operations for 500+ farmers.',
        'Architected type-safe REST APIs and database schemas using Drizzle ORM, improving data entry speed and accuracy by 30% through systemized validation.',
        'Spearheaded role-based access control (RBAC) implementation, ensuring secure and audited data management across multi-tiered operational workflows.',
      ],
      technologies: ['NestJS', 'React', 'PostgreSQL', 'Drizzle ORM', 'TypeScript', 'Tailwind CSS', 'RBAC'],
      metrics: ['500+ Farmers Digitized', '+30% Data Speed & Accuracy', 'Enterprise RBAC'],
    },
  ] as ExperienceItem[],

  skillCategories: [
    {
      title: 'Backend & Distributed Systems',
      iconName: 'Server',
      skills: [
        { name: 'Node.js / TypeScript', level: 95, highlight: true, tag: 'Primary' },
        { name: 'Fastify v5 / Express.js', level: 95, highlight: true, tag: 'High-Performance' },
        { name: 'Event-Driven Architectures', level: 92, highlight: true, tag: 'Core' },
        { name: 'NestJS', level: 85 },
        { name: 'Python / Java / C', level: 82 },
        { name: 'Model Context Protocol (MCP)', level: 90, highlight: true, tag: 'AI Native' },
        { name: 'REST & WebSockets', level: 92 },
      ],
    },
    {
      title: 'Cloud, Serverless & DevOps',
      iconName: 'Cloud',
      skills: [
        { name: 'AWS Lambda / Serverless', level: 95, highlight: true, tag: 'Production' },
        { name: 'AWS SNS / SQS / SES / S3', level: 94, highlight: true, tag: 'Event Bus' },
        { name: 'Google Cloud Platform (GCP)', level: 88, highlight: true, tag: 'Certified' },
        { name: 'Microsoft Azure AI', level: 85, tag: 'Certified' },
        { name: 'Docker & Containerization', level: 86 },
        { name: 'Kubernetes (K8s)', level: 78 },
        { name: 'GitHub Actions & CI/CD', level: 88 },
        { name: 'CloudWatch / Pino Observability', level: 90 },
      ],
    },
    {
      title: 'Databases & Vector Storage',
      iconName: 'Database',
      skills: [
        { name: 'PostgreSQL / Aurora Serverless', level: 94, highlight: true, tag: 'Deep Expertise' },
        { name: 'Drizzle ORM', level: 95, highlight: true, tag: 'Type-Safe' },
        { name: 'pgvector / Vector Search', level: 88, highlight: true, tag: 'RAG' },
        { name: 'MongoDB', level: 86 },
        { name: 'Clickhouse', level: 78 },
        { name: 'Database Indexing & Tuning', level: 90 },
      ],
    },
    {
      title: 'Frontend & UI Engineering',
      iconName: 'Layout',
      skills: [
        { name: 'React 18 / 19', level: 92, highlight: true },
        { name: 'Tailwind CSS', level: 95, highlight: true },
        { name: 'Vite & Modern Tooling', level: 92 },
        { name: 'TanStack Router & Query', level: 88 },
        { name: 'Three.js & WebGL Visuals', level: 82, tag: '3D' },
        { name: 'Vitest / Jest Testing', level: 90 },
      ],
    },
  ] as SkillCategory[],

  certifications: [
    {
      name: 'Google Cloud Certified Associate Cloud Engineer',
      issuer: 'Google Cloud',
      badgeColor: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-300',
      skills: ['Cloud Architecture', 'IAM Security', 'GCP Compute & Storage', 'Networking', 'Kubernetes'],
    },
    {
      name: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      badgeColor: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300',
      skills: ['AI Workloads', 'Computer Vision', 'NLP', 'Generative AI Principles', 'Azure ML'],
    },
  ] as CertificationItem[],

  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science and Engineering (IOT)',
    institution: 'Aditya College of Engineering and Technology',
    location: 'Surampalem, Andhra Pradesh, India',
    period: 'Nov 2021 - April 2025',
    highlights: ['Core focus in Distributed Systems, Internet of Things, Cloud Computing & Data Structures'],
  },
};
