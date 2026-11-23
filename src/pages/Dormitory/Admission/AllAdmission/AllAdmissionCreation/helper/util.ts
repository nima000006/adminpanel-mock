import {
  AllAdmissionCreationContractTemplate,
  ContractPersonType,
} from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionCreation/@types/@allAdmissionCreation";

export const CONTRACT_PERSON_TYPE = {
  legal: "legal",
  natural: "natural",
} as const satisfies Record<string, ContractPersonType>;

export const CONTRACT_PERSON_TYPE_LABEL: Record<ContractPersonType, string> = {
  legal: "حقوقی",
  natural: "حقیقی",
};

export const CONTRACT_PERSON_TYPE_COLOR: Record<ContractPersonType, string> = {
  legal: "blue",
  natural: "orange",
};

export const UNSPECIFIED_BENEFICIARY_LABEL = "مشخص نشده";

export const CONTRACT_TEMPLATE_OPTIONS: AllAdmissionCreationContractTemplate[] = [
  {
    id: "template-1",
    title: "عنوان قالب ۱",
    servicesCount: 3,
    services: [
      {
        id: "1",
        title: "عنوان خدمت ۱",
        beneficiaries: [
          {
            id: "1",
            business: "دانشگاه آزاد",
            businessId: "business-1",
            branch: "شعبه مرکزی",
            branchId: "branch-1",
            isSeller: false,
            sharePercent: 10,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "2",
            business: "صمیم",
            businessId: "business-2",
            branch: "شعبه مرکزی",
            branchId: "branch-1",
            isSeller: false,
            sharePercent: 10,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "3",
            business: "دانشگاه آزاد",
            businessId: "business-1",
            branch: "تهران جنوب",
            branchId: "branch-2",
            isSeller: true,
            sharePercent: 50,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "4",
            business: null,
            businessId: null,
            branch: null,
            branchId: null,
            isSeller: false,
            sharePercent: 30,
            personType: CONTRACT_PERSON_TYPE.natural,
          },
        ],
      },
      {
        id: "2",
        title: "عنوان خدمت ۲",
        beneficiaries: [
          {
            id: "1",
            business: "دانشگاه آزاد",
            businessId: "business-1",
            branch: "شعبه مرکزی",
            branchId: "branch-1",
            isSeller: false,
            sharePercent: 10,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "2",
            business: "صمیم",
            businessId: "business-2",
            branch: "شعبه مرکزی",
            branchId: "branch-1",
            isSeller: false,
            sharePercent: 10,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "3",
            business: "دانشگاه آزاد",
            businessId: "business-1",
            branch: "تهران جنوب",
            branchId: "branch-2",
            isSeller: true,
            sharePercent: 50,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "4",
            business: null,
            businessId: null,
            branch: null,
            branchId: null,
            isSeller: false,
            sharePercent: 30,
            personType: CONTRACT_PERSON_TYPE.natural,
          },
        ],
      },
      {
        id: "3",
        title: "عنوان خدمت ۳",
        beneficiaries: [
          {
            id: "1",
            business: "دانشگاه آزاد",
            businessId: "business-1",
            branch: "شعبه مرکزی",
            branchId: "branch-1",
            isSeller: false,
            sharePercent: 10,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "2",
            business: "صمیم",
            businessId: "business-2",
            branch: "شعبه مرکزی",
            branchId: "branch-1",
            isSeller: false,
            sharePercent: 10,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "3",
            business: "دانشگاه آزاد",
            businessId: "business-1",
            branch: "تهران جنوب",
            branchId: "branch-2",
            isSeller: true,
            sharePercent: 50,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "4",
            business: null,
            businessId: null,
            branch: null,
            branchId: null,
            isSeller: false,
            sharePercent: 30,
            personType: CONTRACT_PERSON_TYPE.natural,
          },
        ],
      },
    ],
  },
  {
    id: "template-2",
    title: "عنوان قالب ۲",
    servicesCount: 2,
    services: [
      {
        id: "service-2-1",
        title: "عنوان خدمت ۱",
        beneficiaries: [
          {
            id: "b-21-1",
            business: "صمیم",
            businessId: "business-2",
            branch: "شعبه مرکزی",
            branchId: "branch-1",
            isSeller: true,
            sharePercent: 60,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
          {
            id: "b-21-2",
            business: null,
            businessId: null,
            branch: null,
            branchId: null,
            isSeller: false,
            sharePercent: 40,
            personType: CONTRACT_PERSON_TYPE.natural,
          },
        ],
      },
      {
        id: "service-2-2",
        title: "عنوان خدمت ۲",
        beneficiaries: [
          {
            id: "b-22-1",
            business: "دانشگاه آزاد",
            businessId: "business-1",
            branch: "تهران جنوب",
            branchId: "branch-2",
            isSeller: false,
            sharePercent: 100,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
        ],
      },
    ],
  },
  {
    id: "template-3",
    title: "عنوان قالب ۳",
    servicesCount: 1,
    services: [
      {
        id: "service-3-1",
        title: "عنوان خدمت ۱",
        beneficiaries: [
          {
            id: "b-31-1",
            business: null,
            businessId: null,
            branch: null,
            branchId: null,
            isSeller: false,
            sharePercent: 100,
            personType: CONTRACT_PERSON_TYPE.legal,
          },
        ],
      },
    ],
  },
];

export const CONTRACT_BUSINESS_OPTIONS = [
  { id: "business-1", title: "دانشگاه آزاد اسلامی" },
  { id: "business-2", title: "صمیم" },
];

export const CONTRACT_BRANCH_OPTIONS_BY_BUSINESS: Record<
  string,
  { id: string; title: string }[]
> = {
  "business-1": [
    { id: "branch-1", title: "شعبه مرکزی" },
    { id: "branch-2", title: "تهران جنوب" },
  ],
  "business-2": [{ id: "branch-1", title: "شعبه مرکزی" }],
};

export const getContractServicesCountLabel = (count: number) => `${count} خدمت`;
