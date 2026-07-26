<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { strengths } from '@/data/profile'
</script>

<template>
  <section id="about" class="section">
    <SectionHeading label="01 - About" />
    <div class="columns">
      <div class="panel">
        <p class="para">
          I&rsquo;m a full-stack engineer in the Twin Cities. I&rsquo;ve spent the last ten years on
          products where the hard part isn&rsquo;t the feature - it&rsquo;s the legacy system
          underneath it, the four teams that need to agree, and the deploy pipeline nobody trusts
          yet.
        </p>
        <p class="para muted">
          I&rsquo;m currently a Senior Engineer at Fleetworthy, building a platform that pulls three
          separate products into one centralized view - composed from micro-frontends so each
          product team owns its own surface instead of duplicating code. Before that I was Staff
          Engineer at Total Expert, architecting the future-state content asset management system
          and breaking a PHP monolith into C# microservices. Before that I led a team of three, ran
          the Frontend Guild, and cut one AWS microservice&rsquo;s costs by 75%. I also run
          <span class="strong">Tech Everyday LLC</span>, my own consultancy.
        </p>
        <p class="para muted last">
          I&rsquo;m a proponent of AI-assisted development - prototyping, refactoring, test
          generation - paired with strict review and production standards. Looking for an AI-forward
          IC role where I build real systems and help the engineers around me get better.
        </p>
      </div>

      <div class="strengths">
        <p class="label">What I&rsquo;m good at</p>
        <ul class="list">
          <li v-for="strength in strengths" :key="strength">
            <span class="arrow">&rarr;</span><span>{{ strength }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.columns {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(24px, 4vw, 56px);
}

.panel {
  flex: 1 1 440px;
  min-width: 0;
}

.para {
  font-family: var(--t-body);
  font-size: clamp(15px, 1.3vw, 17px);
  line-height: 1.7;
  margin: 0 0 16px;
  max-width: 64ch;
  text-wrap: pretty;
}
.para.muted {
  color: var(--t-mute);
}
.para.last {
  margin-bottom: 0;
}

.strong {
  color: var(--color-text);
}

.strengths {
  flex: 0 1 280px;
  min-width: 220px;
}

.label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--t-faint);
  margin: 0 0 14px;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
}
.list li {
  display: flex;
  gap: 10px;
}

.arrow {
  color: var(--color-accent);
}
</style>
