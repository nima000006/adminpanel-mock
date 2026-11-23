export const businessListStatusColor: Record<number, string> = {
  1: "default", //در انتظار بررسی
  3: "blue", // نهایی شده
  2: "red", //رد شده
  4: "gold", //عودت شده
};

export const businessStatusModeTag = (StatusModeType: number) => {
  switch (StatusModeType) {
    case 1:
      return "در انتظار بررسی";
    case 3:
      return "تایید درخواست";
    case 2:
      return "رد درخواست";
    case 4:
      return "عودت داده شده";
  }
};

export const businessTypeColor: Record<string, string> = {
  حقوقی: "blue", // حقوقی
  حقیقی: "gold", // حقیقی
};

// export const businessTypeTag = (businessTypeTag: number) => {
//   switch (businessTypeTag) {
//     case 1:
//       return "حقوقی";
//     case 2:
//       return " حقیقی ";
//   }
// };
