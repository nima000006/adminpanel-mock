import { getDB } from "./db";

// =============================================================================
// Table Column Order
// =============================================================================

/**
 * Get saved column order for a table.
 * Returns the ordered array of column keys, or null if none saved.
 */
export async function getColumnOrder(tableId: string): Promise<string[] | null> {
  const db = await getDB();
  const record = await db.get("table-column-order", tableId);
  return record?.columnKeys ?? null;
}

/**
 * Save column order for a table.
 */
export async function setColumnOrder(
  tableId: string,
  columnKeys: string[]
): Promise<void> {
  const db = await getDB();
  await db.put("table-column-order", {
    tableId,
    columnKeys,
    updatedAt: Date.now(),
  });
}

/**
 * Delete saved column order for a table.
 */
export async function deleteColumnOrder(tableId: string): Promise<void> {
  const db = await getDB();
  await db.delete("table-column-order", tableId);
}

/**
 * Get all saved column orders (for debugging / admin).
 */
export async function getAllColumnOrders() {
  const db = await getDB();
  return db.getAll("table-column-order");
}

// =============================================================================
// Bulk Operations (Clear Data)
// =============================================================================

/**
 * Clear all saved column orders.
 */
export async function clearAllColumnOrders() {
  const db = await getDB();
  await db.clear("table-column-order");
}

/**
 * Clear all saved preferences.
 */
export async function clearAllPreferences() {
  const db = await getDB();
  await db.clear("preferences");
}

/**
 * Clear ALL data in the IndexedDB (both columns and preferences).
 */
export async function clearAllIndexedDBData() {
  await Promise.all([clearAllColumnOrders(), clearAllPreferences()]);
}

// =============================================================================
// Preferences (generic key-value)
// =============================================================================

/**
 * Get a preference value by key.
 */
export async function getPreference<T = unknown>(key: string): Promise<T | null> {
  const db = await getDB();
  const record = await db.get("preferences", key);
  return (record?.data as T) ?? null;
}

/**
 * Set a preference value.
 */
export async function setPreference<T = unknown>(key: string, data: T): Promise<void> {
  const db = await getDB();
  await db.put("preferences", {
    key,
    data,
    updatedAt: Date.now(),
  });
}

/**
 * Delete a preference.
 */
export async function deletePreference(key: string): Promise<void> {
  const db = await getDB();
  await db.delete("preferences", key);
}

/**
 * Get all preferences (for debugging / export).
 */
export async function getAllPreferences() {
  const db = await getDB();
  return db.getAll("preferences");
}
