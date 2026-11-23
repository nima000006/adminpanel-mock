import { AdvanceFilterItemsListType } from "@components/Modals/AdvanceFilterModal/@types/@advanceFilterModal";
import { NUMBER_RULE, PERSIAN_LETTERS_RULE } from "@infra/validation/validationSchema";
import {
  BASED_ON_ACTION,
  SUICIDE_STATUS_OPTIONS,
} from "@pages/MyDoctor/Tests/TestsList/AllTestList/utils/testConstant";

const useFollowUpAdvanceFilter = () => {
  const filterItemsList: AdvanceFilterItemsListType[] = [
    {
      label: "نام",
      name: "followUpName",
      type: "input",
      placeHolder: "بر اساس نام",
      rules: [PERSIAN_LETTERS_RULE],
    },
    {
      label: "نام خانوادگی",
      name: "followUpFamily",
      type: "input",
      placeHolder: "بر اساس نام خانوادگی",
      rules: [PERSIAN_LETTERS_RULE],
    },
    {
      label: "کد ملی / اتباع",
      name: "followUpNationalNumber",
      type: "input",
      placeHolder: "بر اساس کد ملی / اتباع",
      rules: [NUMBER_RULE],
    },
    {
      label: "شماره دانشجویی",
      name: "followUpStudentNumber",
      type: "input",
      placeHolder: "بر اساس شماره دانشجویی",
      rules: [NUMBER_RULE],
    },
    {
      label: "خطر خودکشی",
      name: "followUpSuicideStatus",
      type: "select",
      options: SUICIDE_STATUS_OPTIONS,
    },
    {
      label: "وضعیت اقدامات",
      name: "followUpActionStatus",
      type: "select",
      options: BASED_ON_ACTION,
    },
    {
      label: "تاریخ",
      name: "followUpDate",
      type: "range",
    },
  ];

  return { filterItemsList };
};

export default useFollowUpAdvanceFilter;
