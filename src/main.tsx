import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { Provider as ReduxStoreProvider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";

import { ThemeProvider } from "@infra/context/ThemeContext";
import { initializeSentry } from "@infra/services/Sentry/sentry.config.ts";
import { registerServiceWorker } from "@infra/services/ServiceWorker/registerServiceWorker";
import { store } from "@infra/states/redux/store.ts";

import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
// Load SCSS (Variable consumption)
import "./assets/styles/App.scss";
// Load Tailwind (Utilities)
import "./assets/styles/tailwind.css";

// Preloading critical fonts in production only (avoid HMR slowdown in dev)
// if (import.meta.env.PROD) {
//   const fontPreloads = [
//     { href: "/fonts/DanaFaNum-Regular.woff2", type: "font/woff2" },
//     { href: "/fonts/DanaFaNum-Bold.woff2", type: "font/woff2" },
//   ];

//   fontPreloads.forEach(({ href, type }) => {
//     const link = document.createElement("link");
//     link.rel = "preload";
//     link.as = "font";
//     link.type = type;
//     link.href = href;
//     link.crossOrigin = "anonymous";
//     document.head.appendChild(link);
//   });
// }

// Initialize error tracking using sentry
const { reactErrorHandler } = initializeSentry();

// Caches static assets in production and cleans up stale workers in other modes.
registerServiceWorker();

const container = document.getElementById("root")!;
const root = createRoot(container, {
  // Callback called when an error is thrown and not caught by an ErrorBoundary.
  onUncaughtError: reactErrorHandler((error, errorInfo) => {
    console.warn("Uncaught error", error, errorInfo.componentStack);
  }),
  // Callback called when React catches an error in an ErrorBoundary.
  onCaughtError: reactErrorHandler(),
  // Callback called when React automatically recovers from errors.
  onRecoverableError: reactErrorHandler(),
});
root.render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <ThemeProvider>
        <ToastContainer
          rtl={true}
          position="top-right"
          autoClose={7000}
          pauseOnHover={true}
          hideProgressBar={true}
          transition={Slide}
          closeOnClick
          draggable
          stacked
        />
        <App />
      </ThemeProvider>
    </ReduxStoreProvider>
  </StrictMode>
);
