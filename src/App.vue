<script setup lang="ts">
import { onMounted, ref } from 'vue'

type ThemeName = 'dark' | 'light'

const theme = ref<ThemeName>('dark')

function applyTheme(t: ThemeName) {
  document.documentElement.setAttribute('data-theme', t)
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(theme.value)
}

// — Writing: latest posts pulled live from the Blogger feed. The feed ships no
//   CORS headers, so we load it via JSONP (json-in-script) — the same approach
//   used on the Tech Everyday business site this section moved over from. —
interface BlogPost {
  title: string
  url: string
  date: string
  tag?: string
  snippet: string
}

const posts = ref<BlogPost[]>([])
const postsState = ref<'loading' | 'loaded' | 'error'>('loading')

const blogUrl = 'https://learn.tech-everyday.com/'
const feedUrl =
  'https://learn.tech-everyday.com/feeds/posts/default?alt=json-in-script&max-results=4'

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function toSnippet(html: string): string {
  // DOMParser doesn't run scripts or fetch resources — safe for untrusted feed HTML.
  const text = (new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > 140 ? text.slice(0, 140).trimEnd() + '…' : text
}

function parseFeed(data: unknown): BlogPost[] {
  const entries: any[] = (data as any)?.feed?.entry ?? []
  return entries.map((e) => {
    const links: any[] = e.link ?? []
    return {
      title: e.title?.$t ?? 'Untitled',
      url: links.find((l) => l.rel === 'alternate')?.href ?? blogUrl,
      date: formatDate(e.published?.$t ?? ''),
      tag: (e.category ?? [])[0]?.term,
      snippet: toSnippet(e.summary?.$t ?? e.content?.$t ?? ''),
    }
  })
}

function loadPosts() {
  const cbName = `__blogFeed_${Date.now()}`
  const script = document.createElement('script')
  let done = false

  const cleanup = () => {
    delete (window as Record<string, any>)[cbName]
    script.remove()
  }

  ;(window as Record<string, any>)[cbName] = (data: unknown) => {
    done = true
    try {
      posts.value = parseFeed(data)
      postsState.value = posts.value.length ? 'loaded' : 'error'
    } catch {
      postsState.value = 'error'
    }
    cleanup()
  }

  script.onerror = () => {
    if (!done) postsState.value = 'error'
    cleanup()
  }

  script.src = `${feedUrl}&callback=${cbName}`
  document.head.appendChild(script)

  // Fallback so the section is never stuck if the feed never calls back.
  window.setTimeout(() => {
    if (!done) {
      postsState.value = 'error'
      cleanup()
    }
  }, 8000)
}

onMounted(() => {
  applyTheme(theme.value)
  loadPosts()
})
</script>

<template>
  <div
    id="top"
    style="
      --thm-fg: var(--t-mute);
      min-height: 100vh;
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--t-body);
      font-size: 15px;
      line-height: 1.6;
    "
  >
    <header
      style="
        position: sticky;
        top: 0;
        z-index: 50;
        backdrop-filter: blur(10px);
        background: color-mix(in srgb, var(--color-bg) 86%, transparent);
        border-bottom: 1px solid var(--t-line);
      "
    >
      <div
        style="
          max-width: 1180px;
          margin: 0 auto;
          padding: 12px clamp(18px, 4vw, 56px);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
        "
      >
        <a
          href="#top"
          style="
            font-family: var(--font-mono);
            font-size: 13px;
            letter-spacing: -0.01em;
            color: var(--color-text);
            display: flex;
            align-items: baseline;
            gap: 6px;
            margin-right: auto;
          "
        >
          <span style="color: var(--color-accent)">~/</span><span>vira</span
          ><span style="color: var(--t-faint)">.philavong</span>
        </a>
        <nav
          style="
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
            font-family: var(--font-mono);
            font-size: 12px;
          "
        >
          <a
            class="navlink"
            href="#about"
            style="padding: 5px 9px; border-radius: var(--t-rad); color: var(--t-mute)"
            >about</a
          >
          <a
            class="navlink"
            href="#experience"
            style="padding: 5px 9px; border-radius: var(--t-rad); color: var(--t-mute)"
            >experience</a
          >
          <a
            class="navlink"
            href="#stack"
            style="padding: 5px 9px; border-radius: var(--t-rad); color: var(--t-mute)"
            >stack</a
          >
          <a
            class="navlink"
            href="#writing"
            style="padding: 5px 9px; border-radius: var(--t-rad); color: var(--t-mute)"
            >writing</a
          >
          <a
            class="navlink"
            href="#contact"
            style="padding: 5px 9px; border-radius: var(--t-rad); color: var(--t-mute)"
            >contact</a
          >
        </nav>
        <div style="display: flex; align-items: center; gap: 10px">
          <button
            class="theme-toggle"
            type="button"
            title="Toggle light / dark"
            @click="toggleTheme"
            style="
              cursor: pointer;
              font-family: var(--font-mono);
              font-size: 11px;
              padding: 6px 10px;
              border: 1px solid var(--t-line);
              border-radius: var(--t-rad);
              background: transparent;
              color: var(--thm-fg);
            "
          >
            {{ theme }}
          </button>
        </div>
      </div>
    </header>

    <main style="max-width: 1180px; margin: 0 auto; padding: 0 clamp(18px, 4vw, 56px)">
      <!-- HERO -->
      <section
        style="
          padding: clamp(56px, 9vw, 116px) 0 clamp(40px, 6vw, 72px);
          display: flex;
          flex-wrap: wrap;
          gap: clamp(28px, 5vw, 64px);
          align-items: flex-start;
        "
      >
        <div style="flex: 1 1 460px; min-width: 0">
          <p
            style="
              font-family: var(--font-mono);
              font-size: 12px;
              letter-spacing: 0.14em;
              text-transform: uppercase;
              color: var(--color-accent);
              margin: 0 0 20px;
            "
          >
            Full Stack Software Engineer
          </p>
          <h1
            style="
              font-family: var(--font-mono);
              font-weight: 500;
              font-size: clamp(34px, 5.4vw, 62px);
              line-height: 1.04;
              letter-spacing: -0.035em;
              margin: 0 0 22px;
              text-wrap: balance;
            "
          >
            Alexander Vira<br />Philavong
          </h1>
          <p
            style="
              font-family: var(--t-body);
              font-size: clamp(15px, 1.4vw, 18px);
              line-height: 1.65;
              color: var(--t-mute);
              max-width: 56ch;
              margin: 0 0 28px;
              text-wrap: pretty;
            "
          >
            10+ years building and scaling web and mobile platforms across fintech, legal tech and
            SaaS - now a Senior Engineer at Fleetworthy on React, TypeScript and C# services in
            Azure. I lead frontend standards, mentor engineers, and use AI tooling hard without
            loosening the engineering bar.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center">
            <a
              class="btn-accent"
              href="mailto:alexander@tech-everyday.com"
              style="
                font-family: var(--font-mono);
                font-size: 13px;
                padding: 9px 14px;
                border: 1px solid var(--color-accent);
                border-radius: var(--t-rad);
                color: var(--color-accent);
              "
              >Get in touch</a
            >
            <a
              class="btn-line"
              href="https://github.com/viraphilavong"
              target="_blank"
              rel="noopener"
              style="
                font-family: var(--font-mono);
                font-size: 13px;
                padding: 9px 14px;
                border: 1px solid var(--t-line);
                border-radius: var(--t-rad);
                color: var(--color-text);
              "
              >GitHub &#8599;</a
            >
            <a
              class="btn-line"
              href="https://www.linkedin.com/in/alexander-p-73398610a/"
              target="_blank"
              rel="noopener"
              style="
                font-family: var(--font-mono);
                font-size: 13px;
                padding: 9px 14px;
                border: 1px solid var(--t-line);
                border-radius: var(--t-rad);
                color: var(--color-text);
              "
              >LinkedIn &#8599;</a
            >
            <a
              class="btn-line"
              href="/uploads/resume.pdf"
              target="_blank"
              rel="noopener"
              style="
                font-family: var(--font-mono);
                font-size: 13px;
                padding: 9px 14px;
                border: 1px solid var(--t-line);
                border-radius: var(--t-rad);
                color: var(--color-text);
              "
              >R&eacute;sum&eacute; &#8599;</a
            >
          </div>
        </div>
        <div style="flex: 0 1 260px; min-width: 180px">
          <img
            src="/uploads/headshot.jpeg"
            alt="Alexander Vira Philavong"
            style="
              width: 100%;
              aspect-ratio: 1;
              object-fit: cover;
              border-radius: var(--t-rad);
              border: 1px solid var(--t-line);
              filter: saturate(0.82) contrast(1.04);
            "
          />
          <dl
            style="
              margin: 16px 0 0;
              font-family: var(--font-mono);
              font-size: 12px;
              display: grid;
              gap: 8px;
            "
          >
            <div
              style="
                display: flex;
                justify-content: space-between;
                gap: 12px;
                padding-bottom: 8px;
                border-bottom: 1px solid var(--t-line);
              "
            >
              <dt style="color: var(--t-faint)">location</dt>
              <dd style="margin: 0">Champlin, MN</dd>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                gap: 12px;
                padding-bottom: 8px;
                border-bottom: 1px solid var(--t-line);
              "
            >
              <dt style="color: var(--t-faint)">experience</dt>
              <dd style="margin: 0">10+ years</dd>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 12px">
              <dt style="color: var(--t-faint)">now</dt>
              <dd style="margin: 0; color: var(--color-accent)">Fleetworthy</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- ABOUT -->
      <section
        id="about"
        style="padding: clamp(40px, 6vw, 76px) 0; border-top: 1px solid var(--t-line)"
      >
        <h2
          style="
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--t-faint);
            margin: 0 0 32px;
          "
        >
          01 - About
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: clamp(24px, 4vw, 56px)">
          <div
            style="
              flex: 1 1 440px;
              min-width: 0;
              background: var(--t-panel);
              border-radius: var(--t-rad);
              box-shadow: var(--t-shadow);
              padding: var(--t-panel-pad);
            "
          >
            <p
              style="
                font-family: var(--t-body);
                font-size: clamp(15px, 1.3vw, 17px);
                line-height: 1.7;
                margin: 0 0 16px;
                max-width: 64ch;
                text-wrap: pretty;
              "
            >
              I&rsquo;m a full-stack engineer in the Twin Cities. I&rsquo;ve spent the last ten
              years on products where the hard part isn&rsquo;t the feature - it&rsquo;s the legacy
              system underneath it, the four teams that need to agree, and the deploy pipeline
              nobody trusts yet.
            </p>
            <p
              style="
                font-family: var(--t-body);
                font-size: clamp(15px, 1.3vw, 17px);
                line-height: 1.7;
                margin: 0 0 16px;
                max-width: 64ch;
                color: var(--t-mute);
                text-wrap: pretty;
              "
            >
              I&rsquo;m currently a Senior Engineer at Fleetworthy, building a platform that pulls
              three separate products into one centralized view - composed from micro-frontends so
              each product team owns its own surface instead of duplicating code. Before that I was
              Staff Engineer at Total Expert, architecting the future-state content asset management
              system and breaking a PHP monolith into C# microservices. Before that I led a team of
              three, ran the Frontend Guild, and cut one AWS microservice&rsquo;s costs by 75%. I
              also run <span style="color: var(--color-text)">Tech Everyday LLC</span>, my own
              consultancy.
            </p>
            <p
              style="
                font-family: var(--t-body);
                font-size: clamp(15px, 1.3vw, 17px);
                line-height: 1.7;
                margin: 0;
                max-width: 64ch;
                color: var(--t-mute);
                text-wrap: pretty;
              "
            >
              I&rsquo;m a proponent of AI-assisted development - prototyping, refactoring, test
              generation - paired with strict review and production standards. Looking for an
              AI-forward IC role where I build real systems and help the engineers around me get
              better.
            </p>
          </div>
          <div style="flex: 0 1 280px; min-width: 220px">
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--t-faint);
                margin: 0 0 14px;
              "
            >
              What I&rsquo;m good at
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 12px;
                font-family: var(--font-mono);
                font-size: 13px;
                line-height: 1.5;
              "
            >
              <li style="display: flex; gap: 10px">
                <span style="color: var(--color-accent)">&rarr;</span
                ><span>Breaking monoliths into services that people actually want to own</span>
              </li>
              <li style="display: flex; gap: 10px">
                <span style="color: var(--color-accent)">&rarr;</span
                ><span>Frontend architecture and standards across many teams</span>
              </li>
              <li style="display: flex; gap: 10px">
                <span style="color: var(--color-accent)">&rarr;</span
                ><span>Mentoring engineers into technical leadership</span>
              </li>
              <li style="display: flex; gap: 10px">
                <span style="color: var(--color-accent)">&rarr;</span
                ><span>Putting AI tooling to work for a whole team, not just myself</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- EXPERIENCE -->
      <section
        id="experience"
        style="padding: clamp(40px, 6vw, 76px) 0; border-top: 1px solid var(--t-line)"
      >
        <h2
          style="
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--t-faint);
            margin: 0 0 32px;
          "
        >
          02 - Experience
        </h2>

        <article
          style="
            display: flex;
            flex-wrap: wrap;
            gap: clamp(16px, 3vw, 40px);
            padding: var(--t-panel-pad);
            margin-bottom: 14px;
            background: var(--t-panel);
            border-radius: var(--t-rad);
            box-shadow: var(--t-shadow);
            border-top: 1px solid var(--t-line);
          "
        >
          <div
            style="
              flex: 0 0 150px;
              font-family: var(--font-mono);
              font-size: 12px;
              color: var(--t-faint);
              line-height: 1.5;
            "
          >
            2026 - present
          </div>
          <div style="flex: 1 1 420px; min-width: 0">
            <h3
              style="
                font-family: var(--font-mono);
                font-size: 19px;
                font-weight: 500;
                letter-spacing: -0.02em;
                margin: 0 0 6px;
              "
            >
              Fleetworthy
            </h3>
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                color: var(--t-faint);
                margin: 0 0 14px;
              "
            >
              <span style="color: var(--color-accent)">Senior Software Engineer</span>
              &nbsp;&middot;&nbsp; React &middot; TypeScript &middot; C# &middot; Azure &middot;
              Service Bus &middot; Cosmos DB
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 7px;
                font-family: var(--t-body);
                font-size: 14px;
                line-height: 1.6;
                color: var(--t-mute);
                max-width: 62ch;
              "
            >
              <li>
                Building the platform that unifies three separate products into one centralized
                customer view.
              </li>
              <li>
                Composing it from micro-frontends so each product team ships its own surface instead
                of duplicating code.
              </li>
              <li>React and TypeScript on the front, C# services on Azure behind it.</li>
              <li>Event-driven messaging with Azure Service Bus; data modeling in Cosmos DB.</li>
              <li>
                Stood up the team&rsquo;s first integration tests and the containerized
                infrastructure to run them.
              </li>
              <li>
                Leading AI-driven development on the team - reusable skills and scheduled daily
                tasks the whole team can use.
              </li>
            </ul>
          </div>
        </article>

        <article
          style="
            display: flex;
            flex-wrap: wrap;
            gap: clamp(16px, 3vw, 40px);
            padding: var(--t-panel-pad);
            margin-bottom: 14px;
            background: var(--t-panel);
            border-radius: var(--t-rad);
            box-shadow: var(--t-shadow);
            border-top: 1px solid var(--t-line);
          "
        >
          <div
            style="
              flex: 0 0 150px;
              font-family: var(--font-mono);
              font-size: 12px;
              color: var(--t-faint);
              line-height: 1.5;
            "
          >
            2019 - 2025
          </div>
          <div style="flex: 1 1 420px; min-width: 0">
            <h3
              style="
                font-family: var(--font-mono);
                font-size: 19px;
                font-weight: 500;
                letter-spacing: -0.02em;
                margin: 0 0 6px;
              "
            >
              Total Expert
            </h3>
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                color: var(--t-faint);
                margin: 0 0 18px;
              "
            >
              Vue &middot; PHP &middot; C# &middot; MySQL &middot; Postgres &middot; DynamoDB
            </p>

            <div style="margin-bottom: 20px">
              <p style="font-family: var(--font-mono); font-size: 13px; margin: 0 0 8px">
                <span style="color: var(--color-accent)">Staff Software Engineer</span>
                <span style="color: var(--t-faint)">&nbsp;Mar 2025 &ndash; Dec 2025</span>
              </p>
              <ul
                style="
                  list-style: none;
                  margin: 0;
                  padding: 0;
                  display: grid;
                  gap: 7px;
                  font-family: var(--t-body);
                  font-size: 14px;
                  line-height: 1.6;
                  color: var(--t-mute);
                  max-width: 62ch;
                "
              >
                <li>
                  Architected the future-state content asset management system for a unified
                  end-user experience.
                </li>
                <li>
                  Led a first-class third-party integration enabling scalable content creation
                  workflows.
                </li>
                <li>Decomposed a legacy PHP monolith into C# microservices.</li>
                <li>
                  Drove frontend standards as Lead of the Frontend Guild; used AI coding assistants
                  daily under strict review standards.
                </li>
              </ul>
            </div>

            <div style="margin-bottom: 20px">
              <p style="font-family: var(--font-mono); font-size: 13px; margin: 0 0 8px">
                <span style="color: var(--color-accent)">Lead Software Engineer</span>
                <span style="color: var(--t-faint)">&nbsp;Jan 2024 &ndash; Mar 2025</span>
              </p>
              <ul
                style="
                  list-style: none;
                  margin: 0;
                  padding: 0;
                  display: grid;
                  gap: 7px;
                  font-family: var(--t-body);
                  font-size: 14px;
                  line-height: 1.6;
                  color: var(--t-mute);
                  max-width: 62ch;
                "
              >
                <li>
                  Led and mentored three engineers on technical leadership and project ownership.
                </li>
                <li>
                  Cut a single AWS microservice&rsquo;s costs 75% and its storage costs 92% through
                  architectural optimizations.
                </li>
                <li>
                  Ran a cross-team initiative across four internal teams and a vendor, delivered on
                  schedule.
                </li>
                <li>
                  Shortened on-call rotations and introduced retrospectives, improving morale and
                  delivery consistency.
                </li>
              </ul>
            </div>

            <div style="margin-bottom: 20px">
              <p style="font-family: var(--font-mono); font-size: 13px; margin: 0 0 8px">
                <span style="color: var(--color-accent)">Senior Software Engineer</span>
                <span style="color: var(--t-faint)">&nbsp;Nov 2020 &ndash; Jan 2024</span>
              </p>
              <ul
                style="
                  list-style: none;
                  margin: 0;
                  padding: 0;
                  display: grid;
                  gap: 7px;
                  font-family: var(--t-body);
                  font-size: 14px;
                  line-height: 1.6;
                  color: var(--t-mute);
                  max-width: 62ch;
                "
              >
                <li>
                  Split a frontend monolith into modular apps, cutting build and deploy times 75%.
                </li>
                <li>
                  Supported the PHP 7.4 &rarr; 8 migration; modernized social media integrations.
                </li>
                <li>
                  Led frontend for an org-wide Data Importer tool and built a centralized
                  deduplication service.
                </li>
              </ul>
            </div>

            <div>
              <p style="font-family: var(--font-mono); font-size: 13px; margin: 0 0 8px">
                <span style="color: var(--color-accent)">Software Engineer</span>
                <span style="color: var(--t-faint)">&nbsp;Oct 2019 &ndash; Nov 2020</span>
              </p>
              <ul
                style="
                  list-style: none;
                  margin: 0;
                  padding: 0;
                  display: grid;
                  gap: 7px;
                  font-family: var(--t-body);
                  font-size: 14px;
                  line-height: 1.6;
                  color: var(--t-mute);
                  max-width: 62ch;
                "
              >
                <li>Led backend development for a SKU management tool.</li>
                <li>
                  Improved domain-wide rate limiting and identified engineering productivity wins.
                </li>
                <li>Partnered with Product and stakeholders to deliver SOW-driven features.</li>
              </ul>
            </div>
          </div>
        </article>

        <article
          style="
            display: flex;
            flex-wrap: wrap;
            gap: clamp(16px, 3vw, 40px);
            padding: var(--t-panel-pad);
            margin-bottom: 14px;
            background: var(--t-panel);
            border-radius: var(--t-rad);
            box-shadow: var(--t-shadow);
            border-top: 1px solid var(--t-line);
          "
        >
          <div
            style="
              flex: 0 0 150px;
              font-family: var(--font-mono);
              font-size: 12px;
              color: var(--t-faint);
              line-height: 1.5;
            "
          >
            2023 - present
          </div>
          <div style="flex: 1 1 420px; min-width: 0">
            <h3
              style="
                font-family: var(--font-mono);
                font-size: 19px;
                font-weight: 500;
                letter-spacing: -0.02em;
                margin: 0 0 6px;
              "
            >
              Tech Everyday LLC
            </h3>
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                color: var(--t-faint);
                margin: 0 0 14px;
              "
            >
              <span style="color: var(--color-accent)">Owner / Lead Engineer</span>
              &nbsp;&middot;&nbsp; Angular &middot; Ionic &middot; Node &middot; C# &middot;
              Postgres
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 7px;
                font-family: var(--t-body);
                font-size: 14px;
                line-height: 1.6;
                color: var(--t-mute);
                max-width: 62ch;
              "
            >
              <li>
                Founded and run the consultancy solo today, having previously led a team of four
                engineers and two designers.
              </li>
              <li>Led an iOS courier-management app in Angular, Ionic, Node and TypeScript.</li>
              <li>
                Built a C# backend-for-frontend REST API and an Entity-Attribute-Value API on .NET 7
                and Fly.io.
              </li>
            </ul>
          </div>
        </article>

        <article
          style="
            display: flex;
            flex-wrap: wrap;
            gap: clamp(16px, 3vw, 40px);
            padding: var(--t-panel-pad);
            margin-bottom: 14px;
            background: var(--t-panel);
            border-radius: var(--t-rad);
            box-shadow: var(--t-shadow);
            border-top: 1px solid var(--t-line);
          "
        >
          <div
            style="
              flex: 0 0 150px;
              font-family: var(--font-mono);
              font-size: 12px;
              color: var(--t-faint);
              line-height: 1.5;
            "
          >
            2021 - 2022
          </div>
          <div style="flex: 1 1 420px; min-width: 0">
            <h3
              style="
                font-family: var(--font-mono);
                font-size: 19px;
                font-weight: 500;
                letter-spacing: -0.02em;
                margin: 0 0 6px;
              "
            >
              LegalShield
            </h3>
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                color: var(--t-faint);
                margin: 0 0 14px;
              "
            >
              <span style="color: var(--color-accent)">Senior Software Engineer</span>
              &nbsp;&middot;&nbsp; React &middot; Node &middot; C#
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 7px;
                font-family: var(--t-body);
                font-size: 14px;
                line-height: 1.6;
                color: var(--t-mute);
                max-width: 62ch;
              "
            >
              <li>
                Led four engineers through their first major delivery and moved the team from
                waterfall to Agile.
              </li>
              <li>
                Shipped a critical API modernization in six weeks, significantly reducing initial
                load time.
              </li>
              <li>Launched MFA on schedule; converted frontend services to TypeScript and ES6.</li>
              <li>Contributed to an internal component library used across multiple teams.</li>
            </ul>
          </div>
        </article>

        <article
          style="
            display: flex;
            flex-wrap: wrap;
            gap: clamp(16px, 3vw, 40px);
            padding: var(--t-panel-pad);
            margin-bottom: 14px;
            background: var(--t-panel);
            border-radius: var(--t-rad);
            box-shadow: var(--t-shadow);
            border-top: 1px solid var(--t-line);
          "
        >
          <div
            style="
              flex: 0 0 150px;
              font-family: var(--font-mono);
              font-size: 12px;
              color: var(--t-faint);
              line-height: 1.5;
            "
          >
            2017 - 2019
          </div>
          <div style="flex: 1 1 420px; min-width: 0">
            <h3
              style="
                font-family: var(--font-mono);
                font-size: 19px;
                font-weight: 500;
                letter-spacing: -0.02em;
                margin: 0 0 6px;
              "
            >
              TempWorks Staffing Software
            </h3>
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                color: var(--t-faint);
                margin: 0 0 14px;
              "
            >
              <span style="color: var(--color-accent)">Software Engineer</span> &nbsp;&middot;&nbsp;
              React &middot; C# &middot; SQL
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 7px;
                font-family: var(--t-body);
                font-size: 14px;
                line-height: 1.6;
                color: var(--t-mute);
                max-width: 62ch;
              "
            >
              <li>Built a mobile Time Entry feature with React and Redux Sagas.</li>
              <li>
                Developed RESTful C# .NET APIs with Entity Framework used across multiple products.
              </li>
              <li>
                Mentored a Prime Digital Academy graduate through facial recognition and geofencing
                work.
              </li>
              <li>Built autosave for year-end tax workflows in C# and WPF.</li>
            </ul>
          </div>
        </article>

        <article
          style="
            display: flex;
            flex-wrap: wrap;
            gap: clamp(16px, 3vw, 40px);
            padding: var(--t-panel-pad);
            background: var(--t-panel);
            border-radius: var(--t-rad);
            box-shadow: var(--t-shadow);
            border-top: 1px solid var(--t-line);
          "
        >
          <div
            style="
              flex: 0 0 150px;
              font-family: var(--font-mono);
              font-size: 12px;
              color: var(--t-faint);
              line-height: 1.5;
            "
          >
            2019 - 2020
          </div>
          <div style="flex: 1 1 420px; min-width: 0">
            <h3
              style="
                font-family: var(--font-mono);
                font-size: 19px;
                font-weight: 500;
                letter-spacing: -0.02em;
                margin: 0 0 10px;
              "
            >
              Earlier consulting
            </h3>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 7px;
                font-family: var(--t-body);
                font-size: 14px;
                line-height: 1.6;
                color: var(--t-mute);
                max-width: 62ch;
              "
            >
              <li>
                <span
                  style="color: var(--color-text); font-family: var(--font-mono); font-size: 13px"
                  >Carmmunity</span
                >
                - integrated Twilio Conversations for real-time two-way chat in an Angular mobile
                app.
              </li>
              <li>
                <span
                  style="color: var(--color-text); font-family: var(--font-mono); font-size: 13px"
                  >NovelCath</span
                >
                - stood up remote-work infrastructure and advised on security practices.
              </li>
            </ul>
          </div>
        </article>
      </section>

      <!-- STACK -->
      <section
        id="stack"
        style="padding: clamp(40px, 6vw, 76px) 0; border-top: 1px solid var(--t-line)"
      >
        <h2
          style="
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--t-faint);
            margin: 0 0 32px;
          "
        >
          03 - Skills &amp; tools
        </h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: clamp(20px, 3vw, 40px);
          "
        >
          <div
            style="
              background: var(--t-panel);
              border-radius: var(--t-rad);
              box-shadow: var(--t-shadow);
              padding: var(--t-panel-pad);
              border-top: 1px solid var(--t-line);
            "
          >
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--color-accent);
                margin: 0 0 14px;
              "
            >
              Frontend
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 8px;
                font-family: var(--font-mono);
                font-size: 13px;
                color: var(--t-mute);
              "
            >
              <li>Vue 3 &middot; Pinia &middot; Vite</li>
              <li>React &middot; Redux (Saga, Thunk)</li>
              <li>Angular &middot; Ionic</li>
              <li>TypeScript &middot; ES6+</li>
              <li>Micro-frontend architecture</li>
              <li>Component libraries &amp; design systems</li>
            </ul>
          </div>
          <div
            style="
              background: var(--t-panel);
              border-radius: var(--t-rad);
              box-shadow: var(--t-shadow);
              padding: var(--t-panel-pad);
              border-top: 1px solid var(--t-line);
            "
          >
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--color-accent);
                margin: 0 0 14px;
              "
            >
              Backend
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 8px;
                font-family: var(--font-mono);
                font-size: 13px;
                color: var(--t-mute);
              "
            >
              <li>C# &middot; .NET 7 &middot; Entity Framework</li>
              <li>PHP 8 &middot; Node</li>
              <li>REST &middot; BFF patterns</li>
              <li>Microservice decomposition</li>
              <li>WPF</li>
            </ul>
          </div>
          <div
            style="
              background: var(--t-panel);
              border-radius: var(--t-rad);
              box-shadow: var(--t-shadow);
              padding: var(--t-panel-pad);
              border-top: 1px solid var(--t-line);
            "
          >
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--color-accent);
                margin: 0 0 14px;
              "
            >
              Data &amp; infra
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 8px;
                font-family: var(--font-mono);
                font-size: 13px;
                color: var(--t-mute);
              "
            >
              <li>Postgres &middot; MySQL &middot; SQL Server</li>
              <li>DynamoDB</li>
              <li>Azure &middot; Service Bus &middot; Cosmos DB</li>
              <li>AWS &middot; S3 &middot; cost optimization</li>
              <li>Docker &middot; Rancher &middot; Fly.io</li>
              <li>GitHub Actions CI/CD</li>
            </ul>
          </div>
          <div
            style="
              background: var(--t-panel);
              border-radius: var(--t-rad);
              box-shadow: var(--t-shadow);
              padding: var(--t-panel-pad);
              border-top: 1px solid var(--t-line);
            "
          >
            <p
              style="
                font-family: var(--font-mono);
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--color-accent);
                margin: 0 0 14px;
              "
            >
              Practice
            </p>
            <ul
              style="
                list-style: none;
                margin: 0;
                padding: 0;
                display: grid;
                gap: 8px;
                font-family: var(--font-mono);
                font-size: 13px;
                color: var(--t-mute);
              "
            >
              <li>AI-assisted development</li>
              <li>Reusable agent skills &amp; scheduled tasks</li>
              <li>Sentry &middot; LogRocket triage</li>
              <li>Vitest &middot; Cypress &middot; testing standards</li>
              <li>Containerized integration testing</li>
              <li>Code review &amp; system design</li>
              <li>Mentorship &amp; hiring</li>
              <li>Agile coaching</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- WRITING — latest posts pulled live from the Tech Everyday blog feed -->
      <section
        id="writing"
        style="padding: clamp(40px, 6vw, 76px) 0; border-top: 1px solid var(--t-line)"
      >
        <h2
          style="
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--t-faint);
            margin: 0 0 12px;
          "
        >
          04 - Writing
        </h2>
        <div
          style="
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
            margin: 0 0 18px;
          "
        >
          <p
            style="
              font-family: var(--t-body);
              font-size: 14px;
              color: var(--t-mute);
              margin: 0;
              max-width: 52ch;
            "
          >
            Notes on the parts of the job that don&rsquo;t fit in a pull request.
          </p>
          <a
            :href="blogUrl"
            target="_blank"
            rel="noopener"
            style="font-family: var(--font-mono); font-size: 12px; color: var(--color-accent)"
            >Visit the blog &#8599;</a
          >
        </div>

        <p
          v-if="postsState === 'loading'"
          style="
            font-family: var(--font-mono);
            font-size: 13px;
            color: var(--t-faint);
            margin: 22px 0;
          "
        >
          Loading posts&hellip;
        </p>

        <div v-else-if="postsState === 'loaded'" style="display: grid; gap: 0">
          <a
            v-for="post in posts"
            :key="post.url"
            :href="post.url"
            class="post-link"
            target="_blank"
            rel="noopener"
            style="
              display: flex;
              flex-direction: column;
              gap: 10px;
              padding: 22px var(--t-panel-pad);
              border-top: 1px solid var(--t-line);
              border-radius: var(--t-rad);
              color: var(--color-text);
            "
          >
            <span style="display: flex; align-items: center; gap: 10px">
              <span
                v-if="post.tag"
                style="
                  font-family: var(--font-mono);
                  font-size: 11px;
                  letter-spacing: 0.04em;
                  padding: 3px 8px;
                  border: 1px solid var(--t-line);
                  border-radius: 999px;
                  color: var(--t-mute);
                "
                >{{ post.tag }}</span
              >
              <span
                v-if="post.date"
                style="font-family: var(--font-mono); font-size: 12px; color: var(--t-faint)"
                >{{ post.date }}</span
              >
            </span>
            <span
              style="
                display: block;
                font-family: var(--font-mono);
                font-size: 19px;
                letter-spacing: -0.025em;
                line-height: 1.25;
              "
              >{{ post.title }}</span
            >
            <span
              v-if="post.snippet"
              style="
                display: block;
                font-family: var(--t-body);
                font-size: 14px;
                line-height: 1.6;
                color: var(--t-mute);
                max-width: 64ch;
              "
              >{{ post.snippet }}</span
            >
          </a>
        </div>

        <!-- Fallback so the section is never broken if the feed can't be reached -->
        <a
          v-else
          :href="blogUrl"
          class="post-link"
          target="_blank"
          rel="noopener"
          style="
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: var(--t-panel-pad);
            margin-top: 6px;
            background: var(--t-panel);
            border-radius: var(--t-rad);
            box-shadow: var(--t-shadow);
            border-top: 1px solid var(--t-line);
            color: var(--color-text);
          "
        >
          <span
            style="
              font-family: var(--font-mono);
              font-size: 11px;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: var(--color-accent);
            "
            >learn.tech-everyday.com</span
          >
          <span
            style="
              font-family: var(--font-mono);
              font-size: 19px;
              letter-spacing: -0.025em;
              line-height: 1.25;
            "
            >The Tech Everyday blog</span
          >
          <span
            style="
              font-family: var(--t-body);
              font-size: 14px;
              line-height: 1.6;
              color: var(--t-mute);
            "
            >Read the latest posts over on the blog.</span
          >
          <span style="font-family: var(--font-mono); font-size: 12px; color: var(--t-faint)"
            >Visit the blog &#8599;</span
          >
        </a>
      </section>

      <!-- CONTACT -->
      <section
        id="contact"
        style="padding: clamp(40px, 6vw, 76px) 0; border-top: 1px solid var(--t-line)"
      >
        <h2
          style="
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--t-faint);
            margin: 0 0 32px;
          "
        >
          05 - Elsewhere
        </h2>
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            gap: clamp(24px, 4vw, 56px);
            align-items: flex-start;
          "
        >
          <div style="flex: 1 1 380px; min-width: 0">
            <p
              style="
                font-family: var(--font-mono);
                font-size: clamp(20px, 2.4vw, 30px);
                letter-spacing: -0.025em;
                line-height: 1.3;
                margin: 0 0 24px;
                max-width: 30ch;
              "
            >
              Hiring, collaborating, or just want to compare notes - email is best.
            </p>
            <a
              href="mailto:alexander@tech-everyday.com"
              style="
                font-family: var(--font-mono);
                font-size: clamp(13px, 1.3vw, 16px);
                word-break: break-all;
                border-bottom: 1px solid var(--color-accent);
                padding-bottom: 2px;
              "
              >alexander@tech-everyday.com</a
            >
          </div>
          <div style="flex: 0 1 320px; min-width: 240px; display: grid; gap: 0">
            <a
              class="row-link"
              href="https://github.com/viraphilavong"
              target="_blank"
              rel="noopener"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                padding: 14px 12px;
                border-top: 1px solid var(--t-line);
                border-radius: var(--t-rad);
                font-family: var(--font-mono);
                font-size: 13px;
                color: var(--color-text);
              "
              ><span>GitHub</span
              ><span style="color: var(--t-faint)">@viraphilavong &#8599;</span></a
            >
            <a
              class="row-link"
              href="https://www.linkedin.com/in/alexander-p-73398610a/"
              target="_blank"
              rel="noopener"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                padding: 14px 12px;
                border-top: 1px solid var(--t-line);
                border-radius: var(--t-rad);
                font-family: var(--font-mono);
                font-size: 13px;
                color: var(--color-text);
              "
              ><span>LinkedIn</span
              ><span style="color: var(--t-faint)">alexander-p &#8599;</span></a
            >
            <a
              class="row-link"
              href="https://github.com/viraphilavong/viraphilavong.github.io"
              target="_blank"
              rel="noopener"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                padding: 14px 12px;
                border-top: 1px solid var(--t-line);
                border-radius: var(--t-rad);
                font-family: var(--font-mono);
                font-size: 13px;
                color: var(--color-text);
              "
              ><span>This site</span><span style="color: var(--t-faint)">source &#8599;</span></a
            >
            <a
              class="row-link"
              href="/uploads/resume.pdf"
              target="_blank"
              rel="noopener"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                padding: 14px 12px;
                border-top: 1px solid var(--t-line);
                border-radius: var(--t-rad);
                font-family: var(--font-mono);
                font-size: 13px;
                color: var(--color-text);
              "
              ><span>R&eacute;sum&eacute;</span
              ><span style="color: var(--t-faint)">PDF &#8599;</span></a
            >
          </div>
        </div>
      </section>

      <footer
        style="
          padding: clamp(32px, 4vw, 52px) 0 clamp(40px, 5vw, 64px);
          border-top: 1px solid var(--t-line);
          display: flex;
          flex-wrap: wrap;
          gap: 16px 32px;
          align-items: flex-end;
          justify-content: space-between;
        "
      >
        <div>
          <p
            style="
              font-family: var(--font-mono);
              font-size: 12px;
              color: var(--t-faint);
              margin: 0 0 8px;
            "
          >
            B.S. Computer Science, Metropolitan State University &nbsp;&middot;&nbsp; A.S. Computer
            Science, North Hennepin
          </p>
          <p
            style="font-family: var(--font-mono); font-size: 12px; color: var(--t-faint); margin: 0"
          >
            Assistant coach, CDAA Soccer (Pre-K &ndash; 2nd grade), 2023&ndash;2024
          </p>
        </div>
        <p style="font-family: var(--font-mono); font-size: 12px; color: var(--t-faint); margin: 0">
          Champlin, MN &nbsp;&middot;&nbsp;
          <span style="color: var(--color-accent)">~</span> vira.philavong
        </p>
      </footer>
    </main>
  </div>
</template>
