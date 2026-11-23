import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { NUMBER_RULE, PERSIAN_LETTERS_RULE } from "@infra/validation/validationSchema";
import {
  BASED_ON_FOLLOW_UP_PRIORITY,
  SUICIDE_STATUS_OPTIONS,
} from "@pages/MyDoctor/Tests/TestsList/AllTestList/utils/testConstant";

const useActionStatusAdvanceFilterForManager = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "نام",
      name: "actionStatusName",
      type: "input",
      placeHolder: "بر اساس نام",
      rules: [PERSIAN_LETTERS_RULE],
    },
    {
      label: "نام خانوادگی",
      name: "actionStatusFamily",
      type: "input",
      placeHolder: "بر اساس نام خانوادگی",
      rules: [PERSIAN_LETTERS_RULE],
    },
    {
      label: "کد ملی / اتباع",
      name: "actionStatusNationalNumber",
      type: "input",
      placeHolder: "بر اساس کد ملی / اتباع",
      rules: [NUMBER_RULE],
    },
    {
      label: "شماره دانشجویی",
      name: "actionStatusStudentNumber",
      type: "input",
      placeHolder: "بر اساس شماره دانشجویی",
      rules: [NUMBER_RULE],
    },
    {
      label: "خطر خودکشی",
      name: "actionStatusSuicideStatus",
      type: "select",
      options: SUICIDE_STATUS_OPTIONS,
    },
    {
      label: "وضعیت پیگیری",
      name: "actionStatusFollowUp",
      type: "select",
      options: BASED_ON_FOLLOW_UP_PRIORITY,
    },
    {
      label: "تاریخ",
      name: "actionStatusDate",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useActionStatusAdvanceFilterForManager;
