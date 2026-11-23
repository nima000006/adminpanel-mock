export const ModeTag = (ModeTagType: number) => {
  switch (ModeTagType) {
    case 1:
      return "تعریف شده";
    case 2:
      return "تعریف نشده";
  }
};

export const basicInfoRecordStatus = {
  1: "فعال",
  3: "غیرفعال",
};
