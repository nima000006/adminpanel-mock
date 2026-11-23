// وضعیت ساکنین
export const HabitantsStatus = {
  pendingEvacuation: "1", // در انتظار تخلیه
  inResidence: "2", // درحال اسکان
  all: "3", // همه
};

export const HABITANTS_STATUS_TEXT = {
  [HabitantsStatus.pendingEvacuation]: "در انتظار تخلیه",
  [HabitantsStatus.inResidence]: "درحال اسکان",
  [HabitantsStatus.all]: "همه",
};

export const HABITANTS_STATUS_COLOR = {
  [HabitantsStatus.pendingEvacuation]: "--dustred-6",
  [HabitantsStatus.inResidence]: "--green-6",
};

export const getRemainDaysColor = (days: number) => {
  if (days >= 7) return "#52C41A";
  if (days >= 2) return "#FA8C16";
  return "#F5222D";
};

export const getDelayDaysColor = (days: number) => {
  if (days >= 7) return "#F5222D";
  if (days >= 2) return "#FA8C16";
  return "#52C41A";
};
