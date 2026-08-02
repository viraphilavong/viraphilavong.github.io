<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <footer class="footer">
    <div>
      <p class="line last">{{ profile.education }}</p>
    </div>
    <p class="line last">
      Champlin, MN &nbsp;&middot;&nbsp; <span class="accent">~</span> vira.philavong
    </p>
  </footer>
</template>

<style scoped>
.footer {
  padding: clamp(32px, 4vw, 52px) 0 clamp(40px, 5vw, 64px);
  border-top: 1px solid var(--t-line);
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  align-items: flex-end;
  justify-content: space-between;
}

.line {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--t-faint);
  margin: 0 0 8px;
}
.line.last {
  margin: 0;
}

.accent {
  color: var(--color-accent);
}
</style>
