module.exports = {
  // TypeScript/JavaScript files
  "*.{ts,tsx,js,jsx}": [
    "eslint --fix", // Lint and auto-fix (warnings allowed)
    "prettier --write", // Format code
  ],

  // JSON files
  "*.json": ["prettier --write"],

  // CSS/SCSS files
  "*.{css,scss}": ["prettier --write"],

  // Markdown files
  "*.md": ["prettier --write"],

  // Type check for TypeScript files (runs on entire project, not individual files)
  // Commented out by default for faster commits - uncomment if you want strict type checking
  // "*.{ts,tsx}": () => "tsc --noEmit",
};
