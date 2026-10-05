/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH
 *  Everything on the site AND everything the AI terminal knows about you
 *  comes from this file. Edit it once, and both stay in sync.
 *
 *  Derived from Noah's CV (2026) — keep it updated alongside the CV.
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
  url?: string;
}

export interface Workshop {
  id: string;
  name: string;
  host: string;
  period: string;
  description: string;
  tags: string[];
  url?: string;
  cta?: string;
}

export type JourneyKind = 'work' | 'life' | 'learning';

export interface JourneyStop {
  id: string;
  /** Big marker shown on the timeline: a year, or a word for undated stops. */
  label: string;
  kind: JourneyKind;
  title: string;
  place?: string;
  period?: string;
  text: string;
  tags?: string[];
  url?: string;
  cta?: string;
}

export const profile = {
  name: 'Noah Blauensteiner',
  title: 'AI Enablement & Software Engineering Consultant',
  company: 'Xebia',
  location: 'Amsterdam, The Netherlands (Vienna-born)',
  email: 'noah.blauensteiner@xebia.com',
  tagline:
    'Bridging solid engineering fundamentals with modern AI — building AI-powered systems and teams that work effectively and safely.',
  availability: 'Open to consulting engagements and interesting conversations.',

  bio: `Noah is a Vienna-born software engineer who moved to Amsterdam in 2022, chasing new
challenges and a bigger sandbox to play in — following his three core passions: coding, AI,
and beach volleyball. As an AI Enablement & Software Engineering consultant at Xebia, he
bridges a strong foundation in clean code, clean architecture and great UI/UX with modern
AI capabilities: helping teams adopt agentic and generative AI tooling to build faster and
smarter, safely. He is currently deep-diving into scalable Kotlin architecture and the
Anthropic toolchain. Knowledge sharing, effective collaboration and a positive feedback
culture matter most to him. Off the keyboard you'll find him on the sand, coaching and
competing in beach volleyball, or out in Dutch nature.`,

  passions: [
    {
      title: 'AI Enablement & Agentic Systems',
      icon: 'sparkles',
      text: 'Helping teams adopt agentic and generative AI tooling — Anthropic toolchain, MCP, agents — to build faster and smarter, with a culture where engineers work effectively and safely with the tools of tomorrow.',
    },
    {
      title: 'Clean Code & Architecture',
      icon: 'code',
      text: 'Software that makes both the end user and the client happy: clean architecture, scalable Kotlin systems, and UI/UX that is genuinely worth using.',
    },
    {
      title: 'Knowledge Sharing & Feedback Culture',
      icon: 'users',
      text: 'Effective collaboration and a positive feedback culture. Packaging learning into fun, interactive, hands-on experiences — like the game built for KotlinConf.',
    },
    {
      title: 'Beach Volleyball',
      icon: 'volleyball',
      text: 'Coaching and competing on the sand. The same things make a great team on court and in engineering: communication, trust, and fast feedback.',
    },
  ],

  // ── Reference projects (from CV) ───────────────────────────────────────────
  projects: [
    {
      id: 'proj-justice',
      name: 'Court Document Management System',
      client: 'Austrian Chamber of Justice',
      period: 'Mar 2024 – Mar 2025',
      role: 'Technical Architect',
      description:
        'Worked with multiple scrum teams on the document management system used in Austrian courts by lawyers, judges and prosecutors for all case-related documents. Collaborated with technical architects from other teams to integrate new projects into the existing landscape seamlessly while upholding high security standards.',
      impact:
        'Designed a new intake system that lets other geographical entities feed new cases into the existing data structure and workflow.',
      stack: ['Technical architecture', 'Security', 'Cross-team integration', 'Java', 'Angular'],
    },
    {
      id: 'proj-kleinanzeigen',
      name: 'Architecture & Team Enablement',
      client: 'Kleinanzeigen & others',
      period: 'Sep 2022 – Mar 2024',
      role: 'Lead Developer',
      description:
        'After relocating to Amsterdam, project-hopped across teams to prepare their architectures for bigger teams and future requirements. In one project, jumped in to strengthen the team’s frontend knowledge — ironing out rendering issues and embedding that expertise in the team along the way.',
      impact:
        'In the other project, introduced a ports & adapters architecture in the Spring backend, enabling the team to work on it far more efficiently.',
      stack: ['React', 'Kotlin', 'Spring', 'TypeScript', 'Frontend architecture', 'Team enablement'],
    },
    {
      id: 'proj-schachermayer',
      name: 'Enterprise Software Delivery',
      client: 'Schachermayer',
      period: 'Apr 2019 – Sep 2022',
      role: 'Team Lead',
      description:
        'Led a mid-sized hybrid team through two successful project deliveries plus continuous incremental releases. Co-designed the project architecture with the Technical Architect to support the team’s way of working — flexible, yet easy for new joiners and interns to implement features quickly and understand.',
      impact: 'Two successful deliveries with an architecture that made onboarding fast.',
      stack: [
        'Full-stack engineering',
        'Kotlin',
        'Vue',
        'Spring',
        'Elasticsearch',
        'Team leadership',
        'Architecture design',
      ],
    },
    {
      id: 'proj-portfolio',
      name: 'This Portfolio',
      client: 'Personal project',
      period: '2026',
      role: 'Everything',
      description:
        'An AI-infused portfolio with an interactive terminal where visitors interrogate an LLM about my work — the assistant streams answers grounded in a structured profile, served from a serverless function on Netlify.',
      impact: 'You are looking at it. Try the terminal below.',
      stack: ['React', 'TypeScript', 'Claude API', 'Vite', 'Netlify Functions'],
    },
  ] as Project[],

  // ── Workshops & knowledge sharing ──────────────────────────────────────────
  workshops: [
    {
      id: 'ws-kotlinconf',
      name: 'Xebia KotlinConf Game',
      host: 'Xebia @ KotlinConf',
      period: '2026',
      description:
        'An interactive browser game built for the Kotlin conference, designed to show how Xebia packages learning into fun, interactive bits and hands-on experience. Built end-to-end in one week using AI tooling — without hand-writing a single line of code.',
      tags: ['Agent built', 'React', 'Clean architecture', 'Agentic workflows'],
      url: 'https://xebiakotlinconf.netlify.app/',
      cta: 'play the game',
    },
    {
      id: 'ws-htl',
      name: 'Workshop: Software Engineering & Architecture in real life projects',
      host: 'Higher Technical College, Austria',
      period: 'One-day training',
      description:
        'A hands-on training for technical college students: how software engineering actually works in the job field, and how a ports & adapters architecture keeps real-world projects maintainable. Theory grounded in examples from real client work.',
      tags: ['Ports & adapters', 'Software engineering practice', 'Teaching'],
      url: 'https://github.com/micstra/htl-workshop',
      cta: 'view materials',
    },
  ] as Workshop[],

  // ── Journey (the sideways timeline on /journey), told in Noah's own voice ──
  // Undated stops use a word as their label instead of inventing a year.
  journey: [
    {
      id: 'j-vienna',
      label: 'Vienna',
      kind: 'life',
      title: 'Where it all starts',
      place: 'Vienna, Austria',
      text: 'Born and raised in Vienna. This is where it starts — long before the clients, the code reviews and the move north.',
    },
    {
      id: 'j-htl',
      label: '2018',
      kind: 'learning',
      title: 'Higher Technical College — Department of IT',
      place: 'St. Pölten, Austria',
      period: 'Graduated June 2018',
      text: 'Graduated from the IT department with high honors, and served as vice student representative along the way.',
      tags: ['IT', 'High honors'],
    },
    {
      id: 'j-schachermayer',
      label: '2019',
      kind: 'work',
      title: 'Team Lead',
      place: 'Schachermayer',
      period: 'Apr 2019 – Sep 2022',
      text: 'Led a mid-sized hybrid team through two successful project deliveries plus continuous incremental releases, and co-designed an architecture that let new joiners and interns ship features fast.',
      tags: ['Kotlin', 'Vue', 'Spring', 'Elasticsearch'],
    },
    {
      id: 'j-amsterdam',
      label: '2022',
      kind: 'life',
      title: 'A bigger sandbox',
      place: 'Vienna → Amsterdam',
      text: 'Moved from Austria to Amsterdam, chasing new challenges and a bigger sandbox to play in. Picked up Dutch along the way — conversational by now.',
      tags: ['German', 'English', 'Dutch'],
    },
    {
      id: 'j-lead-dev',
      label: '2022',
      kind: 'work',
      title: 'Lead Developer',
      place: 'Kleinanzeigen & others',
      period: 'Sep 2022 – Mar 2024',
      text: 'Project-hopping to get architectures ready for growth: in one team I ironed out frontend rendering issues and left the know-how behind; in another I brought ports & adapters into the Spring backend.',
      tags: ['React', 'Kotlin', 'Spring'],
    },
    {
      id: 'j-sand',
      label: 'Weekends',
      kind: 'life',
      title: 'On the sand',
      place: 'Beach courts & Dutch nature',
      text: 'Coaching and competing in beach volleyball, or out in Dutch nature with my girlfriend. The sand teaches the same things as engineering: communication, trust, fast feedback.',
      tags: ['Beach volleyball', 'Coaching'],
    },
    {
      id: 'j-justice',
      label: '2024',
      kind: 'work',
      title: 'Technical Architect',
      place: 'Austrian Chamber of Justice',
      period: 'Mar 2024 – Mar 2025',
      text: 'Architecture for the document management system used in Austrian courts by lawyers, judges and prosecutors — including a new intake system that lets other regions feed cases into the existing workflow, without bending the security standards.',
      tags: ['Java', 'Angular', 'Security'],
    },
    {
      id: 'j-workshop',
      label: 'Giving back',
      kind: 'learning',
      title: 'Back in the classroom — as the trainer',
      place: 'Technical college, Austria',
      period: 'One-day workshop',
      text: 'A one-day training for technical college students: how software engineering really works on the job, and why ports & adapters keeps real projects maintainable. Full circle, years after my own graduation.',
      tags: ['Ports & adapters', 'Teaching'],
      url: 'https://github.com/micstra/htl-workshop',
      cta: 'workshop materials',
    },
    {
      id: 'j-kotlinconf',
      label: '2026',
      kind: 'learning',
      title: 'The KotlinConf game',
      place: 'Xebia @ KotlinConf',
      text: 'An interactive game showing how Xebia packages learning into fun, hands-on bits. Idea to conference-ready in one week — built entirely with AI, without writing the code myself.',
      tags: ['Agent built', 'React', 'Agentic workflows'],
      url: 'https://xebiakotlinconf.netlify.app/',
      cta: 'play the game',
    },
    {
      id: 'j-now',
      label: 'Now',
      kind: 'work',
      title: 'AI Enablement Consultant',
      place: 'Xebia · Amsterdam',
      text: 'Bridging solid engineering foundations with modern AI: helping teams adopt agentic and generative AI tooling to build faster, smarter and safely. Currently deep-diving into scalable Kotlin architecture and the Anthropic toolchain.',
      tags: ['Anthropic Academy', 'MCP', 'Agents'],
    },
  ] as JourneyStop[],

  skills: {
    'AI Competency': [
      'Anthropic toolchain',
      'Google AI suite',
      'MCP',
      'Agents',
      'GenAI for Code/Design/Audio/Video',
    ],
    'Languages': ['Kotlin', 'Java', 'TypeScript', 'JavaScript', 'Python'],
    'Frontend': ['Vue', 'Angular', 'React', 'Redux'],
    'Backend & Data': ['Spring', 'Grails', 'Postgres', 'MongoDB', 'Elasticsearch', 'Redis'],
    'Tooling & Deployment': ['Docker', 'Testcontainers', 'Git', 'Netlify', 'TeamCity', 'Jenkins'],
    'Spoken Languages': ['German (native)', 'English (fluent)', 'Dutch (conversational)'],
  } as Record<string, string[]>,

  education: [
    'Higher Technical College St. Pölten — Department of IT. Graduated June 2018 with high honors; vice student representative.',
  ],

  certifications: ['Anthropic Academy', 'Cambridge Certificate C1'],

  links: {
    github: 'https://github.com/noahblauensteiner',
    linkedin: 'https://www.linkedin.com/in/noah-blauensteiner',
    kotlinConfGame: 'https://xebiakotlinconf.netlify.app/',
  },
};

export type Profile = typeof profile;
