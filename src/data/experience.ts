import type { ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    period: '2026 - present',
    company: 'Fleetworthy',
    title: 'Senior Software Engineer',
    tech: 'React · TypeScript · C# · Azure · Service Bus · Cosmos DB',
    bullets: [
      'Building the platform that unifies three separate products into one centralized customer view.',
      'Composing it from micro-frontends so each product team ships its own surface instead of duplicating code.',
      'React and TypeScript on the front, C# services on Azure behind it.',
      'Event-driven messaging with Azure Service Bus; data modeling in Cosmos DB.',
      'Stood up the team’s first integration tests and the containerized infrastructure to run them.',
      'Leading AI-driven development on the team - reusable skills and scheduled daily tasks the whole team can use.',
    ],
  },
  {
    period: '2019 - 2025',
    company: 'Total Expert',
    tech: 'Vue · PHP · C# · MySQL · Postgres · DynamoDB',
    roles: [
      {
        title: 'Staff Software Engineer',
        period: 'Mar 2025 – Dec 2025',
        bullets: [
          'Architected the future-state content asset management system for a unified end-user experience.',
          'Led a first-class third-party integration enabling scalable content creation workflows.',
          'Decomposed a legacy PHP monolith into C# microservices.',
          'Drove frontend standards as Lead of the Frontend Guild; used AI coding assistants daily under strict review standards.',
        ],
      },
      {
        title: 'Lead Software Engineer',
        period: 'Jan 2024 – Mar 2025',
        bullets: [
          'Led and mentored three engineers on technical leadership and project ownership.',
          'Cut a single AWS microservice’s costs 75% and its storage costs 92% through architectural optimizations.',
          'Ran a cross-team initiative across four internal teams and a vendor, delivered on schedule.',
          'Shortened on-call rotations and introduced retrospectives, improving morale and delivery consistency.',
        ],
      },
      {
        title: 'Senior Software Engineer',
        period: 'Nov 2020 – Jan 2024',
        bullets: [
          'Split a frontend monolith into modular apps, cutting build and deploy times 75%.',
          'Supported the PHP 7.4 → 8 migration; modernized social media integrations.',
          'Led frontend for an org-wide Data Importer tool and built a centralized deduplication service.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Oct 2019 – Nov 2020',
        bullets: [
          'Led backend development for a SKU management tool.',
          'Improved domain-wide rate limiting and identified engineering productivity wins.',
          'Partnered with Product and stakeholders to deliver SOW-driven features.',
        ],
      },
    ],
  },
  {
    period: '2023 - present',
    company: 'Tech Everyday LLC',
    title: 'Owner / Lead Engineer',
    tech: 'Angular · Ionic · Node · C# · Postgres',
    bullets: [
      'Founded and run the consultancy solo today, having previously led a team of four engineers and two designers.',
      'Led an iOS courier-management app in Angular, Ionic, Node and TypeScript.',
      'Built a C# backend-for-frontend REST API and an Entity-Attribute-Value API on .NET 7 and Fly.io.',
    ],
  },
  {
    period: '2021 - 2022',
    company: 'LegalShield',
    title: 'Senior Software Engineer',
    tech: 'React · Node · C#',
    bullets: [
      'Led four engineers through their first major delivery and moved the team from waterfall to Agile.',
      'Shipped a critical API modernization in six weeks, significantly reducing initial load time.',
      'Launched MFA on schedule; converted frontend services to TypeScript and ES6.',
      'Contributed to an internal component library used across multiple teams.',
    ],
  },
  {
    period: '2017 - 2019',
    company: 'TempWorks Staffing Software',
    title: 'Software Engineer',
    tech: 'React · C# · SQL',
    bullets: [
      'Built a mobile Time Entry feature with React and Redux Sagas.',
      'Developed RESTful C# .NET APIs with Entity Framework used across multiple products.',
      'Mentored a Prime Digital Academy graduate through facial recognition and geofencing work.',
      'Built autosave for year-end tax workflows in C# and WPF.',
    ],
  },
  {
    period: '2019 - 2020',
    company: 'Earlier consulting',
    bullets: [
      {
        lead: 'Carmmunity',
        text: 'integrated Twilio Conversations for real-time two-way chat in an Angular mobile app.',
      },
      {
        lead: 'NovelCath',
        text: 'stood up remote-work infrastructure and advised on security practices.',
      },
    ],
  },
]
