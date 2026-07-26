/** A list item that may lead with a highlighted name, e.g. "Carmmunity - integrated…". */
export type Bullet = string | { lead: string; text: string }

/** One title held at a company, for entries that span several (e.g. Total Expert). */
export interface Role {
  title: string
  period: string
  bullets: Bullet[]
}

/**
 * A company in the experience timeline. An entry either lists `bullets`
 * directly (one title) or breaks into `roles` (several titles over time).
 */
export interface ExperienceEntry {
  period: string
  company: string
  /** Accent-colored current title. Omitted when the entry breaks into `roles`. */
  title?: string
  /** The tech line shown beside the title. */
  tech?: string
  bullets?: Bullet[]
  roles?: Role[]
}

export interface StackGroup {
  title: string
  items: string[]
}

export interface NavLink {
  label: string
  href: string
}

export interface ActionLink {
  label: string
  href: string
  /** Outlined in the accent rather than the neutral line. */
  primary?: boolean
  external?: boolean
}

export interface ElsewhereLink {
  label: string
  value: string
  href: string
}

/** A post from the blog feed. */
export interface BlogPost {
  title: string
  url: string
  date: string
  tag?: string
  snippet: string
}
