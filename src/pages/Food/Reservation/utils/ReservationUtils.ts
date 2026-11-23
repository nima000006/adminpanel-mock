export const foodDeliveryOptionsList = [
  { id: 1, title: "تحویل نشده", name: "NOT_DELIVERED" },
  { id: 2, title: "تحویل شده", name: "DELIVERED" },
  { id: 3, title: "عدم مراجعه", name: "NO_SHOW" },
];

export const foodDeliveryStatus = {
  notDelivered: foodDeliveryOptionsList[0]?.id,
  delivered: foodDeliveryOptionsList[1]?.id,
  noShow: foodDeliveryOptionsList[2]?.id,
};

export const FOOD_ORDER_DELIVERY_MESSAGE = {
  DELIVERY_ISSUE: "مشکلی در تحویل غذا پیش آمده",
  DELIVERY_SUCCESS: "غذا با موفقیت تحویل شد",
};
