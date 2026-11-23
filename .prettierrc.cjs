module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  // Code style
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "always",
  printWidth: 90,

  // Line endings - auto for cross-platform compatibility
  endOfLine: "auto", // Changed from "crlf" - better for git and cross-platform teams

  // Formatting options
  bracketSpacing: true,
  bracketSameLine: false,
  quoteProps: "as-needed",

  // JSX specific
  jsxSingleQuote: false,

  // Prettier 3.x improvements
  experimentalTernaries: false, // Set to true when stable
};
