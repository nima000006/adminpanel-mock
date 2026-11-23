export const findObjectWithKey = <T = any>(obj: any, targetKey: string): T | null => {
  if (obj == null) return null;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = findObjectWithKey<T>(item, targetKey);
      if (found) return found;
    }
    return null;
  }

  if (typeof obj === "object") {
    // ✅ Correct condition
    if (obj.key === targetKey) return obj as T;

    for (const value of Object.values(obj)) {
      const found = findObjectWithKey<T>(value, targetKey);
      if (found) return found;
    }
  }

  return null;
};
