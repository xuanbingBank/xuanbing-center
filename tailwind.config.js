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
    // 只使用指定的主题
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
        }
      }
    ],
    darkTheme: "dark", // 系统暗色模式使用的主题
    base: true, // 应用基础样式
    styled: true, // 使用 daisyUI 的组件样式
    utils: true, // 启用工具类
    logs: false, // 关闭日志输出
    themeRoot: ":root", // 主题 CSS 变量的根元素
  }
} 