<script setup lang="ts">
import { onMounted } from 'vue'

import AboutSection from '@/components/AboutSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import StackSection from '@/components/StackSection.vue'
import WritingSection from '@/components/WritingSection.vue'
import { useTheme } from '@/composables/useTheme'

const { syncTheme } = useTheme()

onMounted(syncTheme)
</script>

<template>
  <div id="top" class="site">
    <SiteHeader />
    <main class="wrap">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <StackSection />
      <WritingSection />
      <ContactSection />
      <SiteFooter />
    </main>
  </div>
</template>
