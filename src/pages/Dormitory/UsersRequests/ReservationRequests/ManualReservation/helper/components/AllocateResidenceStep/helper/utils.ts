import { AllocateResidenceCardItem } from "../@types/@allocateResidenceStep";

export const filterAllocationItems = (
  items: AllocateResidenceCardItem[],
  searchValue?: string
) => {
  const normalized = String(searchValue ?? "")
    .trim()
    .toLowerCase();

  if (!normalized) return items;

  return items.filter((item) => {
    const haystack = [
      item.title,
      item.subtitle,
      item.tagLabel,
      ...item.metaItems.map((m) => m.value),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
};

export const sortAllocationItemsByPrice = (
  items: AllocateResidenceCardItem[],
  direction: "asc" | "desc"
) => {
  const multiplier = direction === "asc" ? 1 : -1;

  return [...items].sort(
    (a, b) => multiplier * (a.residenceFee + a.deposit - (b.residenceFee + b.deposit))
  );
};
