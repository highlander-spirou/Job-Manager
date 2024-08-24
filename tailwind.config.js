/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'merriweather': ["Merriweather", 'serif'],
      'mono': ["Space Mono", "monospace"],
      'sans': ["Reddit Sans", "sans-serif"]
    },
    extend: {
      colors: {
        "primary": "#d4d4d8",
        "primary-content": "#52525b",
        "secondary": "#173b45",
        "secondary-content": "#fff",
        "accent": "#2563eb",
        "accent-content": "#f3f4f6",
        "neutral": "#e7e5e4",
        "neutral-content": "#160016",
        "base-100": "#f5f5f4",
        "base-200": "#e7e5e4",
        "base-300": "#d6d3d1",
        "base-content": "#141415",
        "info": "#38bdf8",
        "info-content": "#010d15",
        "success": "#10b981",
        "success-content": "#000d06",
        "warning": "#f59e0b",
        "warning-content": "#150900",
        "error": "#ef4444",
        "error-content": "#140202",
        "error-alert": "#FFAD60",
        "warning-alert": "#FFEEAD",
        "default-alert": "#96CEB4",
        "alert-content": "#3f3f46"
      },
    },
  },
  plugins: [],
}