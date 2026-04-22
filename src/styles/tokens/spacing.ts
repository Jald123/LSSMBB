export const spacing = {
  base: 4,
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
  '6xl': '64px',
  '7xl': '80px',
};

export const radii = {
  xs: '4px',    // Tags, badges
  sm: '8px',    // Buttons, inputs
  md: '12px',   // Cards
  lg: '16px',   // Panels
  xl: '24px',   // Feature cards
  '2xl': '32px', // Modal containers
  full: '9999px', // Pills, avatars
};

export const shadows = {
  level0: 'none',
  level1: '0 1px 3px rgba(0,0,0,0.12)',         // Cards
  level2: '0 4px 12px rgba(0,0,0,0.15)',        // Dropdowns, popovers
  level3: '0 8px 30px rgba(0,0,0,0.2)',         // Modals
  level4: '0 16px 48px rgba(0,0,0,0.25)',       // Command palette
  level5: '0 24px 64px rgba(0,0,0,0.3)',        // Fullscreen overlays
};

export const animations = {
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    dramatic: '800ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // CSS-compatible spring
    dramatic: 'cubic-bezier(0.16, 1, 0.3, 1)',
  }
};
