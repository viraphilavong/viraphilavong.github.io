import { readonly, ref } from 'vue'

export type ThemeName = 'dark' | 'light'

// Module-scoped so every caller shares one theme, no prop threading.
// Keep in step with the data-theme attribute in index.html.
const theme = ref<ThemeName>('light')

function apply(next: ThemeName) {
  document.documentElement.setAttribute('data-theme', next)
}

export function useTheme() {
  return {
    theme: readonly(theme),
    /** Push the current value to the DOM — call once on mount. */
    syncTheme: () => apply(theme.value),
    toggleTheme: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      apply(theme.value)
    },
  }
}
