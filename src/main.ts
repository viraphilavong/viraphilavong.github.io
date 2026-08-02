import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import { Nocturne } from './theme/nocturne'

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Nocturne,
      options: {
        darkModeSelector: ':root[data-theme="dark"]',
        // Keeping PrimeVue in a cascade layer lets the unlayered site styles
        // win without an !important anywhere.
        cssLayer: { name: 'primevue', order: 'primevue' },
      },
    },
    ripple: false,
  })
  .mount('#app')
