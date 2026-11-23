export const multiSelectGenerator = (data: { title: string; id: number }[]) => {
  if (!data || data.length === 0) return "-";
  return data.map((item) => item.title).join(" - ");
};

export const selectNotFoundContent = "در حال دریافت اطلاعات...";
