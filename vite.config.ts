/// <reference types="vitest" />
/// <reference types="@vitest/browser/matchers" />
import strip from "@rollup/plugin-strip";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption } from "vite";
import { compression } from "vite-plugin-compression2";
// import viteSentry from "vite-plugin-sentry";

export default defineConfig(({ mode }) => {
  const isBuildOptimizedMode = mode !== "development" && mode !== "dev";
  const isAnalyzeMode = process.env.ANALYZE === "true";

  return {
    plugins: [
      tailwindcss(),
      react({
        jsxRuntime: "automatic",
        // Include only necessary files for React Fast Refresh
        include: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"],
        // Exclude test files and node_modules
        exclude: [/node_modules/, /\.test\.(ts|tsx|js|jsx)$/, /\.spec\.(ts|tsx|js|jsx)$/],
      }),
      ...(isBuildOptimizedMode
        ? [
            ...(isAnalyzeMode
              ? [
                  visualizer({
                    open: false,
                    filename: "stats.html",
                    gzipSize: true,
                    brotliSize: true,
                    template: "treemap",
                  }) as PluginOption,
                ]
              : []),

            strip({
              include: ["src/**/*.{ts,tsx}"],
              functions: ["console.*"],
              debugger: true,
            }) as unknown as PluginOption,
          ]
        : []),
      compression({
        algorithms: ["brotliCompress", "gzip"],
        threshold: 1024, // Only compress files larger than 1KB
        skipIfLargerOrEqual: true, // Skip if compressed version is larger
        exclude: [/\.(br)$/, /\.(gz)$/, /\.(jpg|jpeg|png|gif|webp|svg|ico)$/], // Skip already compressed files
        deleteOriginalAssets: false, // Keep original files for dev tools
      }),
      // compression({
      //   algorithm: "gzip",
      //   threshold: 1024,
      //   exclude: [/\.(br)$/, /\.(gz)$/],
      // }),
    ],
    build: {
      target: "es2022",
      sourcemap: false,
      cssMinify: true,
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      reportCompressedSize: true,
      assetsInlineLimit: 4096,
      manifest: true,
      rolldownOptions: isBuildOptimizedMode
        ? {
            output: {
              manualChunks(id) {
                if (!id.includes("node_modules")) {
                  return undefined;
                }

                if (id.includes("react-qr-code")) {
                  return "qr-vendor";
                }

                if (id.includes("/@ant-design/icons")) {
                  return "antd-icons-vendor";
                }

                const antdMatch = id.match(/\/antd\/(?:es|lib)\/([^/]+)/);
                if (antdMatch?.[1]) {
                  return `antd-${antdMatch[1]}-vendor`;
                }

                if (id.includes("/rc-") || id.includes("/@rc-component/")) {
                  return "antd-rc-vendor";
                }

                if (id.includes("/@reduxjs/") || id.includes("/react-redux/")) {
                  return "state-vendor";
                }

                if (id.includes("/react-router") || id.includes("/@remix-run/")) {
                  return "router-vendor";
                }

                if (id.includes("leaflet")) {
                  return "leaflet-vendor";
                }

                if (id.includes("jalali-moment") || id.includes("/moment/")) {
                  return "moment-vendor";
                }

                if (id.includes("chart.js")) {
                  return "chart-vendor";
                }

                return undefined;
              },
            },
          }
        : undefined,
    },
    resolve: {
      tsconfigPaths: true,
    },
    server: { host: true, strictPort: true, port: 3002 },
    preview: { host: true, strictPort: true, port: 3002, allowedHosts: true },
    test: {
      include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
      exclude: [
        "node_modules",
        "**/node_modules/**",
        "dist",
        "coverage",
        "**/*.d.ts",
        "**/setup.{js,ts}",
        "dev-dist",
        ".cache",
      ],
      globals: true,

      projects: [
        {
          test: {
            name: "unit",
            include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
            exclude: ["**/*.browser.{test,spec}.ts(x)", "node_modules/**"],
            environment: "jsdom",
            setupFiles: "./src/__tests__/setup.ts",
          },
        },
        {
          test: {
            name: "browser",
            include: ["**/*.browser.{test,spec}.ts(x)"],
            exclude: ["node_modules/**"],
            browser: {
              enabled: true,
              provider: "playwright",
              instances: [{ browser: "chromium" }],
              headless: true,
            },
          },
        },
      ],
    },
  };
});
