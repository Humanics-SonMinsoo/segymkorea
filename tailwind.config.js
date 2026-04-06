/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /** HUMANICS 로고 시그니처 퍼플 */
        primary: {
          DEFAULT: '#4B149B',
          dark: '#3a0f78',
          light: '#6B2FBE',
          muted: '#EDE8F5',
        },
        /** 로고 손 하트 틸 — 보조 포인트, 그라데이션 믹스 */
        brand: {
          teal: '#39A67C',
          'teal-dark': '#2d8560',
          'teal-muted': '#E6F5EF',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 12px 40px -12px rgba(75, 20, 155, 0.25)',
        'brand-lg': '0 20px 50px -15px rgba(75, 20, 155, 0.3)',
      },
    },
  },
  plugins: [],
}
