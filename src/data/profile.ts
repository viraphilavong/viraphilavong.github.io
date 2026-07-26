import type { ActionLink, ElsewhereLink, NavLink } from '@/types'

export const EMAIL = 'alexander@tech-everyday.com'
export const GITHUB_URL = 'https://github.com/viraphilavong'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/alexander-p-73398610a/'
export const REPO_URL = 'https://github.com/viraphilavong/viraphilavong.github.io'
export const RESUME_URL = '/uploads/resume.pdf'
export const HEADSHOT_URL = '/uploads/headshot.jpeg'
export const BLOG_URL = 'https://learn.tech-everyday.com/'

export const profile = {
  name: 'Alexander Vira Philavong',
  role: 'Full Stack Software Engineer',
  intro:
    '10+ years building and scaling web and mobile platforms across fintech, legal tech and SaaS - now a Senior Engineer at Fleetworthy on React, TypeScript and C# services in Azure. I lead frontend standards, mentor engineers, and use AI tooling hard without loosening the engineering bar.',
  facts: [
    { label: 'location', value: 'Champlin, MN' },
    { label: 'experience', value: '10+ years' },
    { label: 'now', value: 'Fleetworthy', accent: true },
  ],
  education:
    'B.S. Computer Science, Metropolitan State University  ·  A.S. Computer Science, North Hennepin',
  volunteering: 'Assistant coach, CDAA Soccer (Pre-K – 2nd grade), 2023–2024',
}

export const navLinks: NavLink[] = [
  { label: 'about', href: '#about' },
  { label: 'experience', href: '#experience' },
  { label: 'stack', href: '#stack' },
  { label: 'writing', href: '#writing' },
  { label: 'contact', href: '#contact' },
]

export const heroActions: ActionLink[] = [
  { label: 'Get in touch', href: `mailto:${EMAIL}`, primary: true },
  { label: 'GitHub ↗', href: GITHUB_URL, external: true },
  { label: 'LinkedIn ↗', href: LINKEDIN_URL, external: true },
  { label: 'Résumé ↗', href: RESUME_URL, external: true },
]

export const strengths = [
  'Breaking monoliths into services that people actually want to own',
  'Frontend architecture and standards across many teams',
  'Mentoring engineers into technical leadership',
  'Putting AI tooling to work for a whole team, not just myself',
]

export const elsewhereLinks: ElsewhereLink[] = [
  { label: 'GitHub', value: '@viraphilavong ↗', href: GITHUB_URL },
  { label: 'LinkedIn', value: 'alexander-p ↗', href: LINKEDIN_URL },
  { label: 'This site', value: 'source ↗', href: REPO_URL },
  { label: 'Résumé', value: 'PDF ↗', href: RESUME_URL },
]
