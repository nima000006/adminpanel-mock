import { openDB, type DBSchema, type IDBPDatabase } from "idb";

// =============================================================================
// Database Schema
// =============================================================================

/**
 * All IndexedDB stores are defined here.
 * To add a new store, extend this interface and bump DB_VERSION.
 */
export interface AppDBSchema extends DBSchema {
  /** Persisted column order for tables with draggable columns */
  "table-column-order": {
    key: string; // tableId
    value: {
      tableId: string;
      /** Ordered array of column dataIndex / key values */
      columnKeys: string[];
      updatedAt: number;
    };
  };

  /** Generic key-value preferences (theme, locale, sidebar state, etc.) */
  preferences: {
    key: string;
    value: {
      key: string;
      data: unknown;
      updatedAt: number;
    };
  };
}

// =============================================================================
// Constants
// =============================================================================

const DB_NAME = "admin-panel";
const DB_VERSION = 1;

// =============================================================================
// Singleton Connection
// =============================================================================

let dbPromise: Promise<IDBPDatabase<AppDBSchema>> | null = null;

/**
 * Returns a singleton Promise that resolves to the open IDB database.
 * Safe to call from anywhere — the upgrade only runs once.
 */
export function getDB(): Promise<IDBPDatabase<AppDBSchema>> {
  if (!dbPromise) {
    dbPromise = openDB<AppDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // table-column-order store
        if (!db.objectStoreNames.contains("table-column-order")) {
          db.createObjectStore("table-column-order", { keyPath: "tableId" });
        }

        // preferences store
        if (!db.objectStoreNames.contains("preferences")) {
          db.createObjectStore("preferences", { keyPath: "key" });
        }
      },
    });
  }
  return dbPromise;
}
