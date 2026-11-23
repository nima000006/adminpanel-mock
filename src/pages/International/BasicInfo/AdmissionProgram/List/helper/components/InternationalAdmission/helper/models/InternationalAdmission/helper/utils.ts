export const citizenshipStatusColor: Record<number, string> = {
  0: "success", // ایرانی
  1: "error", // غیرایرانی
};

export const trainingStatusColor: Record<number, string> = {
  0: "processing", // تمام وقت
  1: "warning", // پاره وقت
};

export const internationalGenderStatusColor: Record<number, string> = {
  1: "processing", // آقا
  2: "magenta", // بانو
};

export const internationalHasStatusColor: Record<string, string> = {
  true: "success", // دارد
  false: "error", // ندارد
};

export const internationalEducationalWayColor: Record<string, string> = {
  1: "default", // ترکیبی
  2: "error", // حضوری
  3: "processing", //  آنلاین
};
