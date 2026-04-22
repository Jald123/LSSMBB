export const typography = {
  fonts: {
    display: 'var(--font-orbitron), sans-serif',
    body: 'var(--font-inter), sans-serif',
    code: 'var(--font-jetbrains-mono), monospace',
  },
  sizes: {
    display: { fontSize: '48px', lineHeight: '56px', fontWeight: 900 },
    h1: { fontSize: '32px', lineHeight: '40px', fontWeight: 700 },
    h2: { fontSize: '24px', lineHeight: '32px', fontWeight: 600 },
    h3: { fontSize: '20px', lineHeight: '28px', fontWeight: 600 },
    h4: { fontSize: '16px', lineHeight: '24px', fontWeight: 500 },
    body: { fontSize: '14px', lineHeight: '22px', fontWeight: 400 },
    bodySmall: { fontSize: '13px', lineHeight: '20px', fontWeight: 400 },
    caption: { fontSize: '11px', lineHeight: '16px', fontWeight: 500 },
    micro: { fontSize: '9px', lineHeight: '12px', fontWeight: 900, letterSpacing: '0.1em' },
    code: { fontSize: '13px', lineHeight: '20px', fontWeight: 400 },
  }
};

export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape / Small laptop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Wide desktop
};
