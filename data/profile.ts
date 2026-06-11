/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH
 *  Everything on the site AND everything the AI terminal knows about you
 *  comes from this file. Edit it once, and both stay in sync.
 *
 *  >>> Replace the placeholder projects/links below with your real ones. <<<
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Project {
  id: string;
  name: string;
  client: string;
  period: string;
  role: string;
  description: string;
  impact: string;
  stack: string[];
}

export const profile = {
  name: 'Noah Blauensteiner',
  title: 'AI & Software Engineering Consultant',
  company: 'Xebia',
  location: 'Europe',
  email: 'noah.blauensteiner@xebia.com',
  tagline: 'I turn ambitious ideas into production-grade software — with AI woven in where it actually matters.',
  availability: 'Open to consulting engagements and interesting conversations.',

  bio: `Noah is a software engineering consultant at Xebia who specialises in building
AI-infused products end to end: from the first whiteboard sketch to systems running
reliably in production. He cares about craftsmanship, fast feedback loops, and using
large language models as practical engineering tools rather than buzzwords. He works
with clients to ship real features, coach their teams, and leave codebases better
than he found them.`,

  passions: [
    {
      title: 'Applied AI & LLM Systems',
      icon: 'sparkles',
      text: 'Designing LLM-powered features that survive contact with production: retrieval pipelines, agentic workflows, evals, and guardrails.',
    },
    {
      title: 'Engineering Craftsmanship',
      icon: 'code',
      text: 'Clean architecture, test automation, and developer experience. Software should be a joy to change, not just to demo.',
    },
    {
      title: 'Cloud-Native Delivery',
      icon: 'cloud',
      text: 'Shipping continuously on modern cloud platforms — infrastructure as code, observability, and pipelines that teams trust.',
    },
    {
      title: 'Teaching & Enablement',
      icon: 'users',
      text: 'Pairing, workshops, and knowledge sharing. The best consulting outcome is a client team that no longer needs you.',
    },
  ],

  // ── Reference projects ─────────────────────────────────────────────────────
  // PLACEHOLDERS — swap these for your real engagements.
  projects: [
    {
      id: 'proj-01',
      name: 'AI Knowledge Assistant',
      client: 'Enterprise client (finance)',
      period: '2025',
      role: 'Lead Engineer',
      description:
        'Built a retrieval-augmented assistant that lets employees query thousands of internal policy documents in natural language, with cited sources and role-based access control.',
      impact: 'Cut average document-lookup time from ~20 minutes to under 30 seconds.',
      stack: ['TypeScript', 'Python', 'Claude API', 'RAG', 'Azure', 'Terraform'],
    },
    {
      id: 'proj-02',
      name: 'Intelligent Document Pipeline',
      client: 'Logistics scale-up',
      period: '2024 – 2025',
      role: 'AI Engineer',
      description:
        'Replaced manual processing of shipping documents with an LLM-driven extraction pipeline including human-in-the-loop review, confidence scoring, and automated evals.',
      impact: 'Automated ~80% of document intake with higher accuracy than the manual baseline.',
      stack: ['Python', 'LLM Extraction', 'Kubernetes', 'PostgreSQL', 'GCP'],
    },
    {
      id: 'proj-03',
      name: 'Developer Platform Modernisation',
      client: 'International retailer',
      period: '2024',
      role: 'Platform Consultant',
      description:
        'Co-designed an internal developer platform with golden-path templates, CI/CD standardisation, and self-service environments for 40+ engineering teams.',
      impact: 'Reduced time-to-first-deploy for new services from days to under an hour.',
      stack: ['Kubernetes', 'GitHub Actions', 'Backstage', 'Go', 'AWS'],
    },
    {
      id: 'proj-04',
      name: 'This Portfolio',
      client: 'Personal project',
      period: '2026',
      role: 'Everything',
      description:
        'An AI-infused portfolio with an interactive terminal where visitors interrogate an LLM about my work — the assistant streams answers grounded in a structured profile, served from a serverless edge function.',
      impact: 'You are looking at it. Try the terminal below.',
      stack: ['React', 'TypeScript', 'Claude API', 'Vite', 'Edge Functions'],
    },
  ] as Project[],

  skills: {
    'Languages': ['TypeScript', 'Python', 'Java', 'Go', 'SQL'],
    'AI / LLM': ['Claude API', 'RAG pipelines', 'Agentic systems', 'Prompt engineering', 'Evals'],
    'Cloud & Platform': ['Azure', 'AWS', 'GCP', 'Kubernetes', 'Terraform', 'CI/CD'],
    'Practices': ['Domain-driven design', 'TDD', 'Pairing & coaching', 'Architecture reviews'],
  } as Record<string, string[]>,

  links: {
    github: 'https://github.com/noahblauensteiner',
    linkedin: 'https://www.linkedin.com/in/noah-blauensteiner',
  },
};

export type Profile = typeof profile;
