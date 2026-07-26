import type { StackGroup } from '@/types'

export const stack: StackGroup[] = [
  {
    title: 'Frontend',
    items: [
      'Vue 3 · Pinia · Vite',
      'React · Redux (Saga, Thunk)',
      'Angular · Ionic',
      'TypeScript · ES6+',
      'Micro-frontend architecture',
      'Component libraries & design systems',
    ],
  },
  {
    title: 'Backend',
    items: [
      'C# · .NET 7 · Entity Framework',
      'PHP 8 · Node',
      'REST · BFF patterns',
      'Microservice decomposition',
      'WPF',
    ],
  },
  {
    title: 'Data & infra',
    items: [
      'Postgres · MySQL · SQL Server',
      'DynamoDB',
      'Azure · Service Bus · Cosmos DB',
      'AWS · S3 · cost optimization',
      'Docker · Rancher · Fly.io',
      'GitHub Actions CI/CD',
    ],
  },
  {
    title: 'Practice',
    items: [
      'AI-assisted development',
      'Reusable agent skills & scheduled tasks',
      'Sentry · LogRocket triage',
      'Vitest · Cypress · testing standards',
      'Containerized integration testing',
      'Code review & system design',
      'Mentorship & hiring',
      'Agile coaching',
    ],
  },
]
