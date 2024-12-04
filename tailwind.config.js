/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // 可以在这里扩展自定义主题配置
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#1890ff",
          "primary-focus": "#096dd9",
          "primary-content": "#ffffff",
          secondary: "#52c41a",
          accent: "#faad14",
          neutral: "#262626",
          "base-100": "#ffffff",
          "base-200": "#f5f5f5",
          "base-300": "#e5e5e5",
          "base-content": "#262626",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#177ddc",
          "primary-focus": "#1890ff",
          "primary-content": "#ffffff",
          secondary: "#49aa19",
          accent: "#d89614",
          neutral: "#262626",
          "base-100": "#1f1f1f",
          "base-200": "#141414",
          "base-300": "#000000",
          "base-content": "#ffffff",
        },
        green: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#52c41a",
          "primary-focus": "#389e0d",
          "primary-content": "#ffffff",
        },
        purple: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#722ed1",
          "primary-focus": "#531dab",
          "primary-content": "#ffffff",
        },
        orange: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#fa8c16",
          "primary-focus": "#d46b08",
          "primary-content": "#ffffff",
        },
        red: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#f5222d",
          "primary-focus": "#cf1322",
          "primary-content": "#ffffff",
        },
        cyan: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#13c2c2",
          "primary-focus": "#08979c",
          "primary-content": "#ffffff",
        },
        pink: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#eb2f96",
          "primary-focus": "#c41d7f",
          "primary-content": "#ffffff",
        },
        blue: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2f54eb",
          "primary-focus": "#1d39c4",
          "primary-content": "#ffffff",
        }
      }
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    logs: false,
    themeRoot: ":root",
  }
} 