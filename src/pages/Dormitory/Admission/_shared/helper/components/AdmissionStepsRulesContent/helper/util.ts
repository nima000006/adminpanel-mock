import { UploadFile } from "antd";

import {
  AdmissionStepsRuleCategoryKey,
  AdmissionStepsRuleDescriptionFieldName,
  AdmissionStepsRulesFormType,
} from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";
import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import { RESERVABLE_CAPACITY_TYPE } from "@pages/Dormitory/Admission/_shared/util";

export const rulesContentData = ADMISSION_DETAIL_MOCK_DATA;

// پذیرش مختلط فقط برای ظرفیت دربستی (واحد اقامتی / ساختمان) مجاز است
export const getGenderOptions = (reservableCapacity?: string) => {
  const isMixedGenderAllowed =
    reservableCapacity === RESERVABLE_CAPACITY_TYPE.unit ||
    reservableCapacity === RESERVABLE_CAPACITY_TYPE.building;

  return [
    { id: "خانم‌ها", title: "خانم‌ها" },
    { id: "آقایان", title: "آقایان" },
    {
      id: "آقایان و بانوان",
      title: "آقایان و بانوان",
      disabled: !isMixedGenderAllowed,
    },
  ];
};

export const BRANCH_OPTIONS = rulesContentData.agreementBranches.map((branch) => ({
  id: branch,
  title: branch,
}));

export const BUSINESS_OPTIONS = [
  { id: rulesContentData.agreementBusiness, title: rulesContentData.agreementBusiness },
];

export const USER_GROUP_OPTIONS = rulesContentData.userGroup
  ? [{ id: rulesContentData.userGroup, title: rulesContentData.userGroup }]
  : [];

export const NATIONALITY_OPTIONS = [
  { id: "ایرانی", title: "ایرانی" },
  { id: "غیر ایرانی", title: "غیر ایرانی" },
];

export const EDUCATION_LEVEL_OPTIONS = rulesContentData.educationLevels.map((level) => ({
  id: level,
  title: level,
}));

export const MAJOR_OPTIONS = rulesContentData.majors.map((major) => ({
  id: major,
  title: major,
}));

export const toFileList = (sampleFileId: string): UploadFile[] => {
  if (!sampleFileId) return [];

  return [
    {
      uid: sampleFileId,
      name: sampleFileId,
      status: "done",
      url: sampleFileId,
    },
  ];
};

export const RULE_SECTIONS: {
  key: AdmissionStepsRuleCategoryKey;
  title: string;
}[] = [
  { key: "FINANCIAL", title: "قوانین و مقررات مالی" },
  { key: "DISCIPLINARY", title: "قوانین و مقررات انضباطی" },
  { key: "GENERAL", title: "قوانین و مقررات عمومی" },
  { key: "CANCELLATION", title: "قوانین و مقررات کنسلی" },
  { key: "INSTALLMENT", title: "قوانین و مقررات اقساط" },
];

export const RULE_OPTIONS = [
  {
    id: "عنوان وارد شده برای قانون در اطلاعات پایه",
    title: "عنوان وارد شده برای قانون در اطلاعات پایه",
    description: "توضیحات وارد شده در اطلاعات پایه مربوط به قانون انتخاب شده",
  },
];

export const getRuleDescriptionFieldName = (
  sectionKey: AdmissionStepsRuleCategoryKey
): AdmissionStepsRuleDescriptionFieldName => `${sectionKey}Description`;

export const buildRulesAndRegulationsInitialValues = () => {
  return RULE_SECTIONS.reduce(
    (acc, section) => {
      acc[section.key] = undefined;
      acc[getRuleDescriptionFieldName(section.key)] = undefined;
      return acc;
    },
    {} as Pick<
      AdmissionStepsRulesFormType,
      AdmissionStepsRuleCategoryKey | AdmissionStepsRuleDescriptionFieldName
    >
  );
};
