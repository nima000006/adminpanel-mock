export const getGenderLabel = (gender?: number) => {
  switch (gender) {
    case 1:
      return "آقا";
    case 2:
      return "خانم";
    default:
      return "-";
  }
};
