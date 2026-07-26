<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { useBlogPosts } from '@/composables/useBlogPosts'
import { BLOG_URL } from '@/data/profile'

const { posts, state } = useBlogPosts()
</script>

<template>
  <section id="writing" class="section">
    <SectionHeading label="04 - Writing" class="tight" />
    <div class="intro">
      <p class="blurb">Notes on the parts of the job that don&rsquo;t fit in a pull request.</p>
      <a class="visit" :href="BLOG_URL" target="_blank" rel="noopener">Visit the blog &#8599;</a>
    </div>

    <p v-if="state === 'loading'" class="status">Loading posts&hellip;</p>

    <div v-else-if="state === 'loaded'" class="posts">
      <a
        v-for="post in posts"
        :key="post.url"
        class="post-link"
        :href="post.url"
        target="_blank"
        rel="noopener"
      >
        <span class="post-meta">
          <span v-if="post.tag" class="tag">{{ post.tag }}</span>
          <span v-if="post.date" class="date">{{ post.date }}</span>
        </span>
        <span class="post-title">{{ post.title }}</span>
        <span v-if="post.snippet" class="post-snippet">{{ post.snippet }}</span>
      </a>
    </div>

    <!-- Fallback so the section is never broken if the feed can't be reached. -->
    <a v-else class="post-link fallback panel" :href="BLOG_URL" target="_blank" rel="noopener">
      <span class="fallback-kicker">learn.tech-everyday.com</span>
      <span class="post-title">The Tech Everyday blog</span>
      <span class="post-snippet">Read the latest posts over on the blog.</span>
      <span class="date">Visit the blog &#8599;</span>
    </a>
  </section>
</template>

<style scoped>
.tight {
  margin-bottom: 12px;
}

.intro {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin: 0 0 18px;
}

.blurb {
  font-family: var(--t-body);
  font-size: 14px;
  color: var(--t-mute);
  margin: 0;
  max-width: 52ch;
}

.visit {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent);
}

.status {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--t-faint);
  margin: 22px 0;
}

.posts {
  display: grid;
  gap: 0;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border: 1px solid var(--t-line);
  border-radius: 999px;
  color: var(--t-mute);
}

.date {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--t-faint);
}

.post-title {
  display: block;
  font-family: var(--font-mono);
  font-size: 19px;
  letter-spacing: -0.025em;
  line-height: 1.25;
}

.post-snippet {
  display: block;
  font-family: var(--t-body);
  font-size: 14px;
  line-height: 1.6;
  color: var(--t-mute);
  max-width: 64ch;
}

.fallback {
  gap: 8px;
  /* Even padding, overriding the taller row padding .post-link carries. */
  padding: var(--t-panel-pad);
  margin-top: 6px;
}

.fallback-kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}
</style>
