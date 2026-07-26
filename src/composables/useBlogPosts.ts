import { onMounted, ref } from 'vue'

import { BLOG_URL } from '@/data/profile'
import type { BlogPost } from '@/types'

const FEED_URL = `${BLOG_URL}feeds/posts/default?alt=json-in-script&max-results=4`
const FEED_TIMEOUT_MS = 8000
const SNIPPET_LENGTH = 140

type FeedState = 'loading' | 'loaded' | 'error'

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
  return text.length > SNIPPET_LENGTH ? text.slice(0, SNIPPET_LENGTH).trimEnd() + '…' : text
}

function parseFeed(data: unknown): BlogPost[] {
  const entries: any[] = (data as any)?.feed?.entry ?? []
  return entries.map((e) => {
    const links: any[] = e.link ?? []
    return {
      title: e.title?.$t ?? 'Untitled',
      url: links.find((l) => l.rel === 'alternate')?.href ?? BLOG_URL,
      date: formatDate(e.published?.$t ?? ''),
      tag: (e.category ?? [])[0]?.term,
      snippet: toSnippet(e.summary?.$t ?? e.content?.$t ?? ''),
    }
  })
}

/**
 * Latest posts from the Tech Everyday blog. The Blogger feed ships no CORS
 * headers, so it's loaded via JSONP (json-in-script) — the same approach used
 * on the business site this section moved over from.
 */
export function useBlogPosts() {
  const posts = ref<BlogPost[]>([])
  const state = ref<FeedState>('loading')

  function load() {
    const callbackName = `__blogFeed_${Date.now()}`
    const script = document.createElement('script')
    let settled = false

    const cleanup = () => {
      delete (window as Record<string, any>)[callbackName]
      script.remove()
    }

    ;(window as Record<string, any>)[callbackName] = (data: unknown) => {
      settled = true
      try {
        posts.value = parseFeed(data)
        state.value = posts.value.length ? 'loaded' : 'error'
      } catch {
        state.value = 'error'
      }
      cleanup()
    }

    script.onerror = () => {
      if (!settled) state.value = 'error'
      cleanup()
    }

    script.src = `${FEED_URL}&callback=${callbackName}`
    document.head.appendChild(script)

    // Fall back to the blog link if the feed never calls back.
    window.setTimeout(() => {
      if (!settled) {
        state.value = 'error'
        cleanup()
      }
    }, FEED_TIMEOUT_MS)
  }

  onMounted(load)

  return { posts, state }
}
