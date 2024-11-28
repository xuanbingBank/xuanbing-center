module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  endOfLine: 'auto',
  embeddedLanguageFormatting: 'auto',
  overrides: [
    {
      files: '*.md',
      options: {
        tabWidth: 2,
        proseWrap: 'always'
      }
    },
    {
      files: '*.json',
      options: {
        tabWidth: 2
      }
    },
    {
      files: '*.less',
      options: {
        singleQuote: false
      }
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false
      }
    }
  ]
}
