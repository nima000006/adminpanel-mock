export const degreeColorMap: Record<string, string> = {
  "کارشناسی - نا پیوسته": "blue",
  "کارشناسی ارشد - پیوسته": "purple",
  "فوق دکترا": "magenta",
  "دکتری تخصصی": "volcano",
};

export const statusMap: Record<string, { color: string; label: string }> = {
  ACCEPTED: {
    color: "success",
    label: "تایید شده",
  },
  REQUESTED: {
    color: "orange",
    label: "در انتظار تایید",
  },
  REJECTED: {
    color: "error",
    label: "رد شده",
  },
  SENT_TO_BANK: {
    color: "blue",
    label: "ارسال شده به بانک",
  },
};
