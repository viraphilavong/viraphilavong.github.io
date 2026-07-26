<script setup lang="ts">
import type { Bullet, ExperienceEntry } from '@/types'

defineProps<{ entry: ExperienceEntry }>()

function isLed(bullet: Bullet): bullet is { lead: string; text: string } {
  return typeof bullet !== 'string'
}
</script>

<template>
  <article class="entry panel">
    <div class="period">{{ entry.period }}</div>

    <div class="body">
      <h3 class="company" :class="{ bare: !entry.title && !entry.tech }">{{ entry.company }}</h3>

      <p v-if="entry.title || entry.tech" class="meta" :class="{ roomy: entry.roles }">
        <span v-if="entry.title" class="accent">{{ entry.title }}</span>
        <template v-if="entry.title && entry.tech">&nbsp;&middot;&nbsp;</template>
        <template v-if="entry.tech">{{ entry.tech }}</template>
      </p>

      <!-- One title: bullets hang straight off the entry. -->
      <ul v-if="entry.bullets" class="bullets">
        <li v-for="(bullet, i) in entry.bullets" :key="i">
          <template v-if="isLed(bullet)">
            <span class="lead">{{ bullet.lead }}</span> - {{ bullet.text }}
          </template>
          <template v-else>{{ bullet }}</template>
        </li>
      </ul>

      <!-- Several titles over time: each gets its own stanza. -->
      <div
        v-for="(role, i) in entry.roles"
        :key="role.title"
        class="role"
        :class="{ last: i === (entry.roles?.length ?? 0) - 1 }"
      >
        <p class="role-title">
          <span class="accent">{{ role.title }}</span>
          <span class="role-period">&nbsp;{{ role.period }}</span>
        </p>
        <ul class="bullets">
          <li v-for="(bullet, j) in role.bullets" :key="j">{{ bullet }}</li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped>
.entry {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(16px, 3vw, 40px);
  border-top: 1px solid var(--t-line);
}

.period {
  flex: 0 0 150px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--t-faint);
  line-height: 1.5;
}

.body {
  flex: 1 1 420px;
  min-width: 0;
}

.company {
  font-family: var(--font-mono);
  font-size: 19px;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
}
.company.bare {
  margin-bottom: 10px;
}

.meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--t-faint);
  margin: 0 0 14px;
}
.meta.roomy {
  margin-bottom: 18px;
}

.accent {
  color: var(--color-accent);
}

.role {
  margin-bottom: 20px;
}
.role.last {
  margin-bottom: 0;
}

.role-title {
  font-family: var(--font-mono);
  font-size: 13px;
  margin: 0 0 8px;
}

.role-period {
  color: var(--t-faint);
}

.lead {
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 13px;
}
</style>
