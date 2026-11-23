import { SelectOptions } from "../../@types/@buyersList";

export const selectOptions: SelectOptions = {
  customerType: [
    { id: 1, title: "دانشجو", value: "student" },
    { id: 2, title: "پرسنل", value: "staff" },
    { id: 3, title: "میهمان", value: "guest" },
  ],
  location: [
    { id: 1, title: "تهران", value: "tehran" },
    { id: 2, title: "شیراز", value: "shiraz" },
    { id: 3, title: "مشهد", value: "mashhad" },
  ],
  levelOfEducation: [
    { id: 1, title: "کارشناسی", value: "bachelor" },
    { id: 2, title: "کارشناسی ارشد", value: "master" },
    { id: 3, title: "دکتری", value: "phd" },
  ],
  fieldOfEducation: [
    { id: 1, title: "کامپیوتر", value: "computer" },
    { id: 2, title: "برق", value: "electrical" },
    { id: 3, title: "مکانیک", value: "mechanical" },
  ],
  usedServices: [
    { id: 1, title: "کتابخانه", value: "library" },
    { id: 2, title: "خوابگاه", value: "dormitory" },
    { id: 3, title: "سلف سرویس", value: "cafeteria" },
  ],
};
