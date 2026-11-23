export function hasActiveKey(params: Record<string, string>, keys: string[]): boolean {
  return keys.some((key) => key in params);
}
