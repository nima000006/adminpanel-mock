export const internationalHasStatusColor: Record<string, string> = {
  true: "green", // دارد
  false: "red", // ندارد
};

export const residenceStatusColor: Record<number, string> = {
  0: "green", // مقیم
  1: "red", // غیرمقیم
};

export const trainingStatusColor: Record<number, string> = {
  0: "blue", // تمام وقت
  1: "gold", // پاره وقت
};

export const trainingTypeStatusColor: Record<number, string> = {
  0: "volcano", // حضوری
  1: "blue", // آنلاین
  2: "default", // ترکیبی
};

export const internationalGenderStatusColor: Record<number, string> = {
  1: "blue", // آقا
  2: "magenta", // بانو
};
