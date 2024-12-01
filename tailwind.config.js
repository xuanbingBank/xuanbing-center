/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 扩展主题颜色
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
        error: 'var(--error-color)',
        info: 'var(--info-color)',
      },
      spacing: {
        // 扩展间距
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      fontSize: {
        // 扩展字体大小
        sm: '12px',
        base: '14px',
        lg: '16px',
        xl: '18px',
        '2xl': '20px',
      },
      borderWidth: {
        // 扩展边框宽度
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        4: '4px',
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  // daisyUI 配置
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#1890ff',
          'primary-focus': '#096dd9',
          'base-100': '#ffffff',
          'base-200': '#f5f5f5',
          'base-300': '#e8e8e8',
          'base-content': '#1f2937',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#1890ff',
          'primary-focus': '#096dd9',
          'base-100': '#1f1f1f',
          'base-200': '#141414',
          'base-300': '#000000',
          'base-content': '#ffffff',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
  // 与 Element Plus 集成
  important: true,  // 确保 Tailwind 类优先级高于 Element Plus
  corePlugins: {
    preflight: false,  // 禁用 preflight 以避免与 Element Plus 样式冲突
  },
} 