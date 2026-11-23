import { UploadFile } from "antd";

import { ADMISSION_DETAIL_MOCK_DATA } from "@pages/Dormitory/Admission/_shared/helper/mock/admissionDetailMockData";
import { RESERVABLE_CAPACITY_TYPE } from "@pages/Dormitory/Admission/_shared/util";
import {
  AllAdmissionStepsEditDetailRuleCategoryKey,
  AllAdmissionStepsEditDetailRuleDescriptionFieldName,
  AllAdmissionStepsEditDetailRuleSelectedFieldName,
  AllAdmissionStepsEditDetailRulesFormType,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailRulesContent/@types/@allAdmissionStepsEditDetailRulesContent";

export const rulesContentData = ADMISSION_DETAIL_MOCK_DATA;

const isMixedGenderAllowed =
  rulesContentData.reservableCapacity === RESERVABLE_CAPACITY_TYPE.unit ||
  rulesContentData.reservableCapacity === RESERVABLE_CAPACITY_TYPE.building;

export const GENDER_OPTIONS = [
  { id: "خانم‌ها", title: "خانم‌ها" },
  { id: "آقایان", title: "آقایان" },
  {
    id: "آقایان و بانوان",
    title: "آقایان و بانوان",
    disabled: !isMixedGenderAllowed,
  },
];

export const resolveAdmissionGender = (gender: string) => {
  if (gender === "بانوان") return "خانم‌ها";
  return gender;
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

export const hasInitialAdditionalRestrictions = Boolean(
  rulesContentData.userGroup ||
  rulesContentData.nationality ||
  rulesContentData.educationLevels.length > 0 ||
  rulesContentData.majors.length > 0
);

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
  key: AllAdmissionStepsEditDetailRuleCategoryKey;
  title: string;
}[] = [
  { key: "financial", title: "قوانین و مقررات مالی" },
  { key: "disciplinary", title: "قوانین و مقررات انضباطی" },
  { key: "general", title: "قوانین و مقررات عمومی" },
  { key: "cancellation", title: "قوانین و مقررات کنسلی" },
  { key: "installment", title: "قوانین و مقررات اقساط" },
];

export const RULE_OPTIONS = [
  {
    id: "عنوان وارد شده برای قانون در اطلاعات پایه",
    title: "عنوان وارد شده برای قانون در اطلاعات پایه",
    description: "توضیحات وارد شده در اطلاعات پایه مربوط به قانون انتخاب شده",
  },
];

export const getRuleSelectedFieldName = (
  sectionKey: AllAdmissionStepsEditDetailRuleCategoryKey
): AllAdmissionStepsEditDetailRuleSelectedFieldName => `${sectionKey}SelectedRule`;

export const getRuleDescriptionFieldName = (
  sectionKey: AllAdmissionStepsEditDetailRuleCategoryKey
): AllAdmissionStepsEditDetailRuleDescriptionFieldName => `${sectionKey}Description`;

export const buildRulesAndRegulationsInitialValues = () => {
  return RULE_SECTIONS.reduce(
    (acc, section) => {
      const existingRule = rulesContentData.rulesAndRegulations.find(
        (rule) => rule.title === section.title
      );

      acc[getRuleSelectedFieldName(section.key)] = existingRule?.selectedRuleTitle;
      acc[getRuleDescriptionFieldName(section.key)] = existingRule?.ruleDescription;

      return acc;
    },
    {} as Pick<
      AllAdmissionStepsEditDetailRulesFormType,
      | AllAdmissionStepsEditDetailRuleSelectedFieldName
      | AllAdmissionStepsEditDetailRuleDescriptionFieldName
    >
  );
};

export const hasSelectedRuleValue = (value: unknown) => {
  if (!value) return false;
  if (typeof value === "string") return value.length > 0;
  if (typeof value === "object" && value !== null && "value" in value) {
    return Boolean((value as { value?: string }).value);
  }
  return false;
};
