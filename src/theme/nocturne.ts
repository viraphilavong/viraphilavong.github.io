import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

/**
 * PrimeVue preset built on the Nocturne design system.
 *
 * Colors resolve to the CSS variables in `assets/main.css` rather than fixed
 * hexes, so PrimeVue components follow the `data-theme` switch for free — the
 * light and dark color schemes below are deliberately identical.
 * The `primary` ramp is Nocturne's own accent ramp, which PrimeVue needs as
 * literal values for the steps it mixes internally.
 */
const accent = {
  50: '#f5f4ff',
  100: '#f5f4ff',
  200: '#e7e5fe',
  300: '#d2cefd',
  400: '#b5abfc',
  500: '#968ae0',
  600: '#796cbf',
  700: '#5d5294',
  800: '#423a6a',
  900: '#2b2741',
  950: '#2b2741',
}

const colorScheme = {
  primary: {
    color: 'var(--color-accent)',
    contrastColor: 'var(--color-bg)',
    hoverColor: 'var(--color-accent-hover)',
    activeColor: 'var(--color-accent-hover)',
  },
  highlight: {
    background: 'color-mix(in srgb, var(--color-accent) 16%, transparent)',
    focusBackground: 'color-mix(in srgb, var(--color-accent) 24%, transparent)',
    color: 'var(--color-text)',
    focusColor: 'var(--color-text)',
  },
  text: {
    color: 'var(--color-text)',
    hoverColor: 'var(--color-text)',
    mutedColor: 'var(--t-mute)',
    hoverMutedColor: 'var(--color-text)',
  },
  content: {
    background: 'var(--t-panel)',
    hoverBackground: 'color-mix(in srgb, var(--color-text) 6%, transparent)',
    borderColor: 'var(--t-line)',
    color: 'var(--color-text)',
    hoverColor: 'var(--color-text)',
  },
  overlay: {
    select: {
      background: 'var(--t-panel)',
      borderColor: 'var(--t-line)',
      color: 'var(--color-text)',
    },
    popover: {
      background: 'var(--t-panel)',
      borderColor: 'var(--t-line)',
      color: 'var(--color-text)',
    },
    modal: {
      background: 'var(--t-panel)',
      borderColor: 'var(--t-line)',
      color: 'var(--color-text)',
    },
  },
  formField: {
    background: 'var(--color-bg)',
    borderColor: 'var(--t-line)',
    hoverBorderColor: 'var(--color-accent)',
    focusBorderColor: 'var(--color-accent)',
    color: 'var(--color-text)',
    placeholderColor: 'var(--t-faint)',
  },
  // Nocturne's neutral ramp, darkest last.
  surface: {
    0: 'var(--color-bg)',
    50: '#f3f5fe',
    100: '#e4e7f5',
    200: '#cfd3e5',
    300: '#b2b6ca',
    400: '#9397ab',
    500: '#75798c',
    600: '#595d6c',
    700: '#3f424d',
    800: '#292b31',
    900: '#232532',
    950: '#161826',
  },
}

export const Nocturne = definePreset(Aura, {
  semantic: {
    primary: accent,
    // Density 0.70x and 8px radii are baked into the Nocturne scales.
    borderRadius: {
      none: '0',
      xs: '4px',
      sm: '4px',
      md: '8px',
      lg: '14px',
      xl: '14px',
    },
    focusRing: {
      width: '2px',
      style: 'solid',
      color: 'var(--color-accent)',
      offset: '2px',
      shadow: 'none',
    },
    colorScheme: { light: colorScheme, dark: colorScheme },
  },
  components: {
    menubar: {
      background: 'transparent',
      borderColor: 'transparent',
      borderRadius: '0',
      color: 'var(--color-text)',
      padding: '0',
      gap: '2px',
      baseItem: { borderRadius: 'var(--t-rad)', padding: '5px 9px' },
      item: {
        focusBackground: 'color-mix(in srgb, var(--color-text) 8%, transparent)',
        activeBackground: 'color-mix(in srgb, var(--color-text) 8%, transparent)',
        color: 'var(--t-mute)',
        focusColor: 'var(--color-text)',
        activeColor: 'var(--color-text)',
        borderRadius: 'var(--t-rad)',
        padding: '5px 9px',
      },
      submenu: {
        background: 'var(--t-panel)',
        borderColor: 'var(--t-line)',
        borderRadius: 'var(--t-rad)',
        shadow: 'var(--t-shadow)',
      },
      mobileButton: {
        borderRadius: 'var(--t-rad)',
        color: 'var(--t-mute)',
        hoverColor: 'var(--color-text)',
        hoverBackground: 'color-mix(in srgb, var(--color-text) 8%, transparent)',
      },
    },
    timeline: {
      eventMarker: {
        size: '12px',
        borderRadius: '50%',
        borderWidth: '1px',
        background: 'var(--color-bg)',
        borderColor: 'var(--color-accent)',
        content: {
          size: '4px',
          background: 'var(--color-accent)',
          borderRadius: '50%',
        },
      },
      eventConnector: {
        color: 'var(--t-line)',
        size: '1px',
      },
    },
    card: {
      background: 'var(--t-panel)',
      borderRadius: 'var(--t-rad)',
      color: 'var(--color-text)',
      shadow: 'var(--t-shadow)',
      body: { padding: 'var(--t-panel-pad)', gap: '0' },
    },
    tag: {
      fontSize: '11px',
      fontWeight: '400',
      padding: '3px 8px',
      borderRadius: '999px',
      primary: {
        background: 'color-mix(in srgb, var(--color-accent) 14%, transparent)',
        color: 'var(--color-accent)',
      },
      secondary: {
        background: 'transparent',
        color: 'var(--t-mute)',
      },
    },
    skeleton: {
      borderRadius: 'var(--t-rad)',
      background: 'color-mix(in srgb, var(--color-text) 8%, transparent)',
      animationBackground: 'var(--t-shimmer)',
    },
    message: {
      borderRadius: 'var(--t-rad)',
      content: { padding: 'var(--t-panel-pad)' },
      info: {
        background: 'var(--t-panel)',
        borderColor: 'var(--t-line)',
        color: 'var(--color-text)',
        shadow: 'var(--t-shadow)',
      },
    },
    button: {
      borderRadius: 'var(--t-rad)',
      paddingX: '14px',
      paddingY: '9px',
      gap: '6px',
      label: { fontWeight: '400' },
    },
  },
})
