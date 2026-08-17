/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'carbon': '#0D0D0D', // El negro para la tipografía principal
        'rojo-impacto': '#E60000', // El rojo vibrante del escudo
        'blanco-absoluto': '#FFFFFF', // Fondo
        'gris-claro': '#F5F5F5',
        'dorado-campeon': '#E3B23C', // Dorado para medallas
        'tatami-blanco': '#F4F4F9', // Blanco humo
      },
      fontFamily: {
        title: ['Anton', 'sans-serif'], // Tipografía gigante y brutalista
        body: ['Inter', 'sans-serif'], // Tipografía limpia
      },
      keyframes: {
        hit: {
          '0%': { transform: 'translateX(-40px)', opacity: '0' },
          '70%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'hit': 'hit 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'hit-delay': 'hit 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.05s forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.2s ease-out forwards',
      },
      typography: ({ theme }) => ({
        carbon: {
          css: {
            '--tw-prose-body': theme('colors.carbon'),
            '--tw-prose-headings': theme('colors.carbon'),
            '--tw-prose-lead': theme('colors.carbon'),
            '--tw-prose-links': theme('colors.rojo-impacto'),
            '--tw-prose-bold': theme('colors.carbon'),
            '--tw-prose-counters': theme('colors.rojo-impacto'),
            '--tw-prose-bullets': theme('colors.rojo-impacto'),
            '--tw-prose-hr': theme('colors.carbon / 0.1'),
            '--tw-prose-quotes': theme('colors.rojo-impacto'),
            '--tw-prose-quote-borders': theme('colors.rojo-impacto'),
            '--tw-prose-captions': theme('colors.carbon / 0.5'),
            '--tw-prose-code': theme('colors.rojo-impacto'),
            '--tw-prose-pre-code': theme('colors.blanco-absoluto'),
            '--tw-prose-pre-bg': theme('colors.carbon'),
            
            // Custom sizing and spacing for editorial feel
            'h1, h2': {
              fontFamily: theme('fontFamily.body').join(', '),
              fontWeight: '800',
              letterSpacing: '-0.02em',
              fontSize: '2rem',
              lineHeight: '1.3',
              marginTop: '2em',
              marginBottom: '1em',
            },
            'h3, h4': {
              fontFamily: theme('fontFamily.body').join(', '),
              fontWeight: '700',
              color: theme('colors.carbon'),
              fontSize: '1.5rem',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            'a': {
              textDecoration: 'none',
              borderBottom: `2px solid ${theme('colors.rojo-impacto')}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: theme('colors.rojo-impacto'),
                color: theme('colors.blanco-absoluto'),
              }
            },
            'blockquote': {
              backgroundColor: theme('colors.gris-claro'),
              borderLeftWidth: '8px',
              borderLeftColor: theme('colors.rojo-impacto'),
              padding: '1.5rem',
              fontStyle: 'italic',
              color: theme('colors.carbon'),
            },
            'strong': {
              color: theme('colors.carbon'),
              fontWeight: '900',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
