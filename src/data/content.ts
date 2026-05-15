export const siteConfig = {
  name: "Vishnu Sangadala",
  title: "Vishnu Sangadala — Backend & Distributed Systems Engineer",
  description:
    "Backend systems engineer building at the edge of multi-agent AI. Java, Kafka, Kubernetes by day. LangGraph and LLaMA by night.",
  tagline: "Backend systems engineer building at the edge of multi-agent AI.",
  taglineAlt: "I ship distributed systems. I research multi-agent AI. Sometimes both at once.",
  email: "vishnusangadala1321@gmail.com",
  phone: "(934) 263-2403",
  location: "Stony Brook, NY",
  links: {
    linkedin: "https://www.linkedin.com/in/vishnu-sangadala/",
    github: "https://github.com/vishnusangadala",
    leetcode: "#leetcode",
    resume: "/resume.pdf",
  },
  ogImage: "/og-image.png",
};

export const aboutParagraphs = [
  "I'm a software engineer with two years of production backend experience — shipping distributed microservices at Infor that process thousands of B2B transactions daily, reducing API latency by 30% with Redis, and scaling Kafka pipelines to handle enterprise-grade throughput. I know what it means to build systems that run in the real world, with real SLAs, and real consequences.",
  "Now I'm at Stony Brook University completing an M.S. in Computer Science, where I work as a Graduate Research Assistant under Prof. I.V. Ramakrishnan. My research sits at the intersection of multi-agent AI and real-world workflow automation — building systems where LLMs don't just answer questions but plan, act, verify, and collaborate to accomplish complex tasks. We're targeting conference publication.",
  "My dual identity — production systems engineer and AI researcher — is what makes me different. I can design a Kafka-backed microservices architecture and build the LangGraph orchestration layer on top of it. I'm equally comfortable reading a JVM GC log and a transformer attention map. If you're building serious AI infrastructure or scaling backend systems that need to think, I want to talk.",
];

export const experiences = [
  {
    id: "grad-ra",
    role: "Graduate Research Assistant",
    company: "Stony Brook University",
    location: "Stony Brook, NY",
    period: "July 2025 – Present",
    type: "Research",
    bullets: [
      "Built a multi-agent AI workflow automation system converting voice commands into desktop actions across 20+ command types and 5+ applications using ASR, LLMs, and pywinauto-based UI automation.",
      "Redesigned the pipeline from vision-only to a hybrid UI-tree + screenshot architecture — dramatically improved reliability and reduced ambiguity in complex workflows.",
      "Developed orchestration pipelines for planning, execution, and verification agents using LangGraph.",
    ],
    technologies: ["LangGraph", "LangChain", "LLaMA", "Python", "LoRA/PEFT", "ASR"],
    metrics: [],
  },
  {
    id: "infor-sde",
    role: "Software Development Engineer",
    company: "Infor",
    location: "Hyderabad, India",
    period: "Aug 2022 – Aug 2024",
    type: "Full-time",
    bullets: [
      "Accelerated release cycles by 60% by migrating a legacy monolith to distributed microservices on AWS.",
      "Delivered a Transformation Service handling 1,000+ daily B2B transactions across VDA, X12, and EDIFACT formats.",
      "Reduced API latency by 30% with a Redis caching layer.",
      "Increased Kafka pipeline throughput by 25% through high-volume stream tuning.",
      "Cut dashboard load times by 20% via React + REST API optimization.",
      "Optimized MS SQL / PostgreSQL queries using indexing and native SQL in JPA/Hibernate.",
    ],
    technologies: ["Java", "Spring Boot", "Kafka", "Redis", "Docker", "Kubernetes", "Jenkins", "AWS", "PostgreSQL"],
    metrics: [
      { label: "Faster release cycles", value: "60%", prefix: "" },
      { label: "Daily B2B transactions", value: "1000", prefix: "1,000+" },
      { label: "API latency reduced", value: "30%", prefix: "" },
      { label: "Kafka throughput gain", value: "25%", prefix: "" },
    ],
  },
  {
    id: "infor-intern",
    role: "SDE Intern",
    company: "Infor",
    location: "Hyderabad, India",
    period: "April 2022 – July 2022",
    type: "Internship",
    bullets: [
      "Built Spring Boot REST APIs expanding the Automotive Exchange platform serving 10,000+ users.",
      "Fixed 10+ critical backend defects, cutting API error rates by 15%.",
      "Boosted test coverage by 25% via TDD with JUnit + Mockito.",
    ],
    technologies: ["Java", "Spring Boot", "JUnit", "Mockito", "REST APIs"],
    metrics: [
      { label: "Users served", value: "10000", prefix: "10K+" },
      { label: "Error rate reduced", value: "15%", prefix: "" },
      { label: "Test coverage increase", value: "25%", prefix: "" },
    ],
  },
];

export const projects = [
  {
    id: "olla",
    slug: "olla",
    title: "OLLA",
    subtitle: "Real-time Multi-Agent LLM System",
    period: "2025 – Present",
    status: "Research / Conference submission",
    description:
      "A Solver-Reviewer architecture with LangGraph-based orchestration. OLLA uses iterative agent collaboration to produce higher-quality responses — the Solver generates, the Reviewer critiques, and the loop continues until convergence. Targeting academic conference submission under Prof. I.V. Ramakrishnan.",
    highlights: [
      "LangGraph state machine orchestrating Solver → Reviewer feedback loops",
      "Streaming agent outputs for real-time observability",
      "Conference-track research under Prof. I.V. Ramakrishnan",
    ],
    technologies: ["LangGraph", "LangChain", "LLaMA", "Python", "LoRA", "PEFT"],
    architectureType: "olla",
    featured: true,
  },
  {
    id: "code-reviewer",
    slug: "multi-agent-code-reviewer",
    title: "Multi-Agent Code Review & Doc Assistant",
    subtitle: "LangGraph ReAct Architecture",
    period: "Jan 2026 – April 2026",
    status: "Completed",
    description:
      "A four-agent pipeline — Analyzer, Reviewer, Documenter, Verifier — built on LangGraph's ReAct architecture. Reduced manual code review effort by 40% and improved documentation accuracy by 35% as measured by BLEU, ROUGE, and LLM-as-a-judge scoring pipelines.",
    highlights: [
      "40% reduction in manual review effort",
      "35% improvement in documentation accuracy",
      "BLEU, ROUGE, and LLM-as-a-judge evaluation pipelines",
    ],
    technologies: ["LangGraph", "LangChain", "Python", "Claude API", "BLEU/ROUGE"],
    architectureType: "code-reviewer",
    featured: true,
  },
  {
    id: "social-platform",
    slug: "distributed-social-platform",
    title: "Distributed Social Networking Platform",
    subtitle: "Spring Boot + Kafka + Neo4j",
    period: "May 2025 – Aug 2025",
    status: "Completed",
    description:
      "A production-grade distributed social network built on microservices. Doubled graph query speed using Neo4j for relationship traversal. Full observability stack with Zipkin for distributed tracing, ELK for logs, and Prometheus/Grafana for metrics.",
    highlights: [
      "2× graph query speed with Neo4j",
      "Full observability: Zipkin, ELK, Prometheus/Grafana",
      "Kafka Streams for real-time event processing",
    ],
    technologies: ["Spring Boot", "Kafka", "Neo4j", "Docker", "Kubernetes", "Zipkin", "ELK", "Prometheus"],
    architectureType: "social-platform",
    featured: true,
  },
  {
    id: "job-pipeline",
    slug: "automated-job-pipeline",
    title: "Automated Job Application Pipeline",
    subtitle: "Claude Code + Playwright + Anthropic API",
    period: "2025",
    status: "Personal project",
    description:
      "A personal AI automation system that scrapes career pages, tailors resumes to job descriptions using the Anthropic API, and deduplicates applications via SQLite. Built with Claude Code and Playwright for browser automation. Demonstrates applied AI instincts: real workflow, real automation, real results.",
    highlights: [
      "End-to-end JD scraping with Playwright",
      "LLM-powered resume tailoring per job description",
      "SQLite deduplication to avoid repeat applications",
    ],
    technologies: ["Claude API", "Playwright", "Python", "SQLite", "Anthropic SDK"],
    architectureType: "job-pipeline",
    featured: true,
  },
];

export const skills = [
  {
    category: "Languages",
    icon: "Code2",
    items: ["Java", "Python", "C++", "SQL", "TypeScript"],
  },
  {
    category: "Backend & Systems",
    icon: "Server",
    items: ["Spring Boot", "REST APIs", "Microservices", "Kafka", "Redis", "gRPC", "Design Patterns", "OOD"],
  },
  {
    category: "Data",
    icon: "Database",
    items: ["PostgreSQL", "MySQL", "Neo4j", "NoSQL", "MS SQL"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    items: ["AWS (EC2, S3, RDS, CloudWatch)", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Linux"],
  },
  {
    category: "AI / ML",
    icon: "Brain",
    items: ["LangChain", "LangGraph", "LLaMA fine-tuning", "LoRA/PEFT", "Multi-Agent Systems", "RAG", "Claude API"],
  },
  {
    category: "Testing",
    icon: "TestTube2",
    items: ["JUnit", "Mockito", "TDD"],
  },
];

export const education = [
  {
    degree: "M.S. Computer Science and AMS (Data Science)",
    institution: "Stony Brook University (SUNY)",
    period: "Aug 2024 – May 2026",
    gpa: "3.62",
    highlights: ["Graduate Research Assistant under Prof. I.V. Ramakrishnan", "Multi-Agent LLM Systems Research"],
  },
  {
    degree: "B.Tech. Computer Science",
    institution: "Sathyabama Institute of Science and Technology",
    period: "Aug 2018 – May 2022",
    gpa: "3.65",
    highlights: ["Vice President, Coding Club", "500+ LeetCode problems solved"],
  },
];

export const achievements = [
  { label: "LeetCode Problems Solved", value: "500+", icon: "Trophy" },
  { label: "Daily B2B Transactions at Infor", value: "1,000+", icon: "Zap" },
  { label: "Release Cycle Acceleration", value: "60%", icon: "Rocket" },
  { label: "API Latency Reduction", value: "30%", icon: "TrendingDown" },
];

export const terminalCommands = {
  whoami: `Vishnu Sangadala — Backend & Distributed Systems Engineer
Location: Stony Brook, NY
Email: vishnusangadala1321@gmail.com
Status: Actively seeking full-time roles (May 2026)
Thesis: Multi-agent LLM orchestration with LangGraph`,
  experience: `[1] Graduate Research Assistant — Stony Brook University (July 2025–Present)
[2] Software Development Engineer — Infor (Aug 2022–Aug 2024)
[3] SDE Intern — Infor (April 2022–July 2022)`,
  "skills --json": JSON.stringify(
    {
      languages: ["Java", "Python", "C++", "SQL", "TypeScript"],
      backend: ["Spring Boot", "Kafka", "Redis", "gRPC", "Microservices"],
      cloud: ["AWS", "Docker", "Kubernetes", "Jenkins"],
      ai: ["LangGraph", "LangChain", "LLaMA", "LoRA/PEFT", "RAG"],
      data: ["PostgreSQL", "Neo4j", "MySQL"],
    },
    null,
    2
  ),
  contact: "Opening contact section...",
  resume: "Downloading resume...",
  "goto projects": "Navigating to projects...",
  "goto about": "Navigating to about...",
  "goto experience": "Navigating to experience...",
  "goto skills": "Navigating to skills...",
  "goto contact": "Navigating to contact...",
  "theme toggle": "Toggling theme...",
  "sudo hire-me": `sudo: password for recruiter: ********
Access granted.
Initiating hire sequence...
✓ Resume reviewed
✓ Tech skills validated
✓ Culture fit: strong
✓ Offer letter generated: offer.pdf
All systems nominal. Vishnu ships.`,
  "cat ~/.coffee_preferences": `# ~/.coffee_preferences
BREW_METHOD=pour-over
GRIND=medium-fine
RATIO=1:15
TEMP=93C
# consumed during: LangGraph debugging sessions
# side effects: 3x commit velocity`,
  help: `Available commands:
  whoami              — print summary
  experience          — list roles
  skills --json       — structured skill data
  contact             — open contact section
  resume              — download PDF
  goto <section>      — scroll navigation
  theme toggle        — switch dark/light
  sudo hire-me        — 👀
  cat ~/.coffee_preferences — important config
  help                — show this message`,
};
