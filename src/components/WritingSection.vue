<script setup lang="ts">
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import Tag from 'primevue/tag'

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

    <!-- Skeletons mirror the shape of a loaded post so the section doesn't jump. -->
    <div v-if="state === 'loading'" class="posts">
      <div v-for="n in 2" :key="n" class="post-link skeleton-row">
        <Skeleton width="5rem" height="1.1rem" />
        <Skeleton width="min(24rem, 80%)" height="1.4rem" />
        <Skeleton width="min(38rem, 100%)" height="1rem" />
      </div>
    </div>

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
          <Tag v-if="post.tag" :value="post.tag" severity="primary" class="tag" />
          <span v-if="post.date" class="date">{{ post.date }}</span>
        </span>
        <span class="post-title">{{ post.title }}</span>
        <span v-if="post.snippet" class="post-snippet">{{ post.snippet }}</span>
      </a>
    </div>

    <!-- Fallback so the section is never broken if the feed can't be reached. -->
    <Message v-else severity="info" :closable="false" class="fallback">
      <a class="fallback-link" :href="BLOG_URL" target="_blank" rel="noopener">
        <span class="fallback-kicker">learn.tech-everyday.com</span>
        <span class="post-title">The Tech Everyday blog</span>
        <span class="post-snippet">Read the latest posts over on the blog.</span>
        <span class="date">Visit the blog &#8599;</span>
      </a>
    </Message>
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

.posts {
  display: grid;
  gap: 0;
}

.skeleton-row {
  cursor: default;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tag {
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
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
  margin-top: 6px;
  border: 1px solid var(--t-line);
}

.fallback-link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--color-text);
}

.fallback-kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}
</style>
