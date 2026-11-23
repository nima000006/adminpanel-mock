/** Meal types — backend enum **/
export const CATERING_ORDER_MEAL_TYPES = {
  BREAKFAST: 0,
  LUNCH: 1,
  DINNER: 2,
  IFTAR: 3,
  SUHOOR: 4,
} as const;

export const CATERING_ORDER_MEAL_TYPES_LABELS: Record<number, string> = {
  [CATERING_ORDER_MEAL_TYPES.BREAKFAST]: "صبحانه",
  [CATERING_ORDER_MEAL_TYPES.LUNCH]: "ناهار",
  [CATERING_ORDER_MEAL_TYPES.DINNER]: "شام",
  [CATERING_ORDER_MEAL_TYPES.IFTAR]: "افطاری",
  [CATERING_ORDER_MEAL_TYPES.SUHOOR]: "سحری",
};

export const CATERING_ORDER_MEAL_TYPES_COLORS: Record<number, string> = {
  [CATERING_ORDER_MEAL_TYPES.BREAKFAST]: "geekblue",
  [CATERING_ORDER_MEAL_TYPES.LUNCH]: "green",
  [CATERING_ORDER_MEAL_TYPES.DINNER]: "red",
  [CATERING_ORDER_MEAL_TYPES.IFTAR]: "gold",
  [CATERING_ORDER_MEAL_TYPES.SUHOOR]: "magenta",
};

export const getCateringOrderMealTagColor = (mealType?: number) =>
  mealType == null ? undefined : CATERING_ORDER_MEAL_TYPES_COLORS[mealType];

/** Food program types / RequestType — backend enum **/
export const CATERING_ORDER_FOOD_PROGRAM_TYPES = {
  STUDENT: 0, // SUBSIDIZED
  FREE: 1, // NO_LIMIT
  SALES_DAY: 2, // DAILY
} as const;

export const CATERING_ORDER_FOOD_PROGRAM_TYPES_LABELS: Record<number, string> = {
  [CATERING_ORDER_FOOD_PROGRAM_TYPES.STUDENT]: "دانشجویی",
  [CATERING_ORDER_FOOD_PROGRAM_TYPES.FREE]: "آزاد",
  [CATERING_ORDER_FOOD_PROGRAM_TYPES.SALES_DAY]: "روز فروش",
};

export const CATERING_ORDER_FOOD_PROGRAM_TYPES_COLORS: Record<number, string> = {
  [CATERING_ORDER_FOOD_PROGRAM_TYPES.STUDENT]: "green",
  [CATERING_ORDER_FOOD_PROGRAM_TYPES.FREE]: "geekblue",
  [CATERING_ORDER_FOOD_PROGRAM_TYPES.SALES_DAY]: "purple",
};

export const getCateringOrderFoodProgramTypeTagColor = (foodProgramType?: number) =>
  foodProgramType == null
    ? undefined
    : CATERING_ORDER_FOOD_PROGRAM_TYPES_COLORS[foodProgramType];

/** Education levels — backend enum **/
export const CATERING_ORDER_EDUCATION_LEVELS = {
  ASSOCIATE: 0,
  BACHELOR_CONTINUOUS: 1,
  MASTER_DISCONTINUOUS: 2,
  PHD: 3,
  POST_DOC: 4,
} as const;

export const CATERING_ORDER_EDUCATION_LEVELS_LABELS: Record<number, string> = {
  [CATERING_ORDER_EDUCATION_LEVELS.ASSOCIATE]: "کاردانی",
  [CATERING_ORDER_EDUCATION_LEVELS.BACHELOR_CONTINUOUS]: "کارشناسی - پیوسته",
  [CATERING_ORDER_EDUCATION_LEVELS.MASTER_DISCONTINUOUS]: "کارشناسی ارشد - ناپیوسته",
  [CATERING_ORDER_EDUCATION_LEVELS.PHD]: "دکتری تخصصی",
  [CATERING_ORDER_EDUCATION_LEVELS.POST_DOC]: "فوق دکترا",
};

export const CATERING_ORDER_EDUCATION_LEVELS_COLORS: Record<number, string> = {
  [CATERING_ORDER_EDUCATION_LEVELS.ASSOCIATE]: "default",
  [CATERING_ORDER_EDUCATION_LEVELS.BACHELOR_CONTINUOUS]: "blue",
  [CATERING_ORDER_EDUCATION_LEVELS.MASTER_DISCONTINUOUS]: "orange",
  [CATERING_ORDER_EDUCATION_LEVELS.PHD]: "purple",
  [CATERING_ORDER_EDUCATION_LEVELS.POST_DOC]: "magenta",
};

export const getCateringOrderEducationLevelTagColor = (educationLevel?: number) =>
  educationLevel == null
    ? undefined
    : CATERING_ORDER_EDUCATION_LEVELS_COLORS[educationLevel];

/** Delivery status — backend enum **/
export const CATERING_ORDER_DELIVERY_STATUS = {
  NONE: 0, // No delivery status assigned
  NOT_DELIVERED: 1, // Order is still waiting to be delivered
  DELIVERED: 2, // Order has been delivered to the user
  NO_SHOW: 3, // User did not show up to receive the order
} as const;

export const CATERING_ORDER_DELIVERY_STATUS_LABELS: Record<number, string> = {
  [CATERING_ORDER_DELIVERY_STATUS.NONE]: "هیچکدام",
  [CATERING_ORDER_DELIVERY_STATUS.NOT_DELIVERED]: "در انتظار تحویل",
  [CATERING_ORDER_DELIVERY_STATUS.DELIVERED]: "تحویل شده",
  [CATERING_ORDER_DELIVERY_STATUS.NO_SHOW]: "عدم مراجعه",
};

export const CATERING_ORDER_DELIVERY_STATUS_COLORS: Record<number, string> = {
  [CATERING_ORDER_DELIVERY_STATUS.NONE]: "default",
  [CATERING_ORDER_DELIVERY_STATUS.NOT_DELIVERED]: "warning",
  [CATERING_ORDER_DELIVERY_STATUS.DELIVERED]: "success",
  [CATERING_ORDER_DELIVERY_STATUS.NO_SHOW]: "error",
};

export const getCateringOrderDeliveryStatusTagColor = (deliveryStatus?: number) =>
  deliveryStatus == null
    ? undefined
    : CATERING_ORDER_DELIVERY_STATUS_COLORS[deliveryStatus];

export const getCateringOrderDeliveryStatusLabel = (deliveryStatus?: number) =>
  deliveryStatus == null
    ? undefined
    : CATERING_ORDER_DELIVERY_STATUS_LABELS[deliveryStatus];

/** Cancel status — backend enum **/
export const CATERING_ORDER_CANCEL_STATUS = {
  NOT_REQUESTED: 0, // No cancel request has been submitted
  ACCEPTED_WAITING_PAID: 1, // Cancel accepted; refund payment is still pending
  ACCEPTED_PAID: 2, // Cancel accepted and refund has been paid
  REJECTED: 3, // Cancel request was rejected
  REQUESTED: 4, // Cancel request submitted and awaiting review
} as const;

export const CATERING_ORDER_CANCEL_STATUS_LABELS: Record<number, string> = {
  [CATERING_ORDER_CANCEL_STATUS.NOT_REQUESTED]: "عدم درخواست",
  [CATERING_ORDER_CANCEL_STATUS.ACCEPTED_WAITING_PAID]: "تایید شده در انتظار پرداخت",
  [CATERING_ORDER_CANCEL_STATUS.ACCEPTED_PAID]: "پرداخت",
  [CATERING_ORDER_CANCEL_STATUS.REJECTED]: "رد درخواست",
  [CATERING_ORDER_CANCEL_STATUS.REQUESTED]: "درخواست شده",
};

/** Cancelled-orders list filter */
export const CATERING_ORDER_CANCEL_STATUS_FILTER: number[] = [
  CATERING_ORDER_CANCEL_STATUS.ACCEPTED_WAITING_PAID,
  CATERING_ORDER_CANCEL_STATUS.ACCEPTED_PAID,
  CATERING_ORDER_CANCEL_STATUS.REQUESTED,
];

/** orders list filter */
export const CATERING_ORDER_STATUS_FILTER: number[] = [
  CATERING_ORDER_CANCEL_STATUS.NOT_REQUESTED,
  CATERING_ORDER_CANCEL_STATUS.REJECTED,
];
