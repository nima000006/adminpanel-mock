type SortOption = "1" | "2" | "3" | "4";
export const sortByOption = <
  T extends { id: number; indebtedness: string; creditor: string },
>(
  data: T[],
  sortOption?: SortOption
): T[] => {
  const arr = [...data];
  if (!sortOption) return arr;

  switch (sortOption) {
    case "1": // بیشترین بدهکاری
      arr.sort((a, b) => Number(b.indebtedness) - Number(a.indebtedness));
      break;
    case "2": // کمترین بدهکاری
      arr.sort((a, b) => Number(a.indebtedness) - Number(b.indebtedness));
      break;
    case "3": // بیشترین بستانکاری
      arr.sort((a, b) => Number(b.creditor) - Number(a.creditor));
      break;
    case "4": // کمترین بستانکاری
      arr.sort((a, b) => Number(a.creditor) - Number(b.creditor));
      break;
  }

  return arr;
};
