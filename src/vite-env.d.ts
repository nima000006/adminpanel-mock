/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_URL_NAME: string;
  readonly VITE_URL_AUTH: string;
  readonly VITE_URL_STUDENT: string;
  readonly VITE_URL_ROOM: string;
  readonly VITE_URL_TICKETING: string;
  readonly VITE_URL_TICKET_BASE: string;
  readonly VITE_URL_COMMITTEE: string;
  readonly VITE_ENCRYPTION_KEY: string;
  readonly VITE_URL_FINANCIAL_URL: string;
  readonly VITE_URL_NOTIFICATION_URL: string;
  readonly VITE_URL_BUSINESS: string;
  readonly VITE_URL_PWA_MAIN: string;
  readonly VITE_URL_INSURANCE: string;
  readonly VITE_SENTRY_AUTH_TOKEN: string;
  readonly VITE_URL_BASIC_INFORMATION: string;
  readonly VITE_URL_ACCOUNTING: string;
  readonly VITE_URL_WALLET: string;
  readonly VITE_URL_AUTHENTICATION: string;
  readonly VITE_EMPTY_STRING: string;
  readonly VITE_URL_DORMITORY: string;
  readonly VITE_URL_CATERING: string;
  readonly VITE_URL_SHOP: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  _paq?: any[];
}
