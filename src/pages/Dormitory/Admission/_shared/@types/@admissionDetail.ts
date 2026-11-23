import {
  ADMISSION_CAPACITY_OCCUPANCY_STATUS,
  MY_ADMISSION_DETAIL_TABS,
  MY_ADMISSION_STATUS,
  RESERVABLE_CAPACITY_TYPE,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

export type AdmissionDetailStatus =
  (typeof MY_ADMISSION_STATUS)[keyof typeof MY_ADMISSION_STATUS];

export type AdmissionDetailTab =
  (typeof MY_ADMISSION_DETAIL_TABS)[keyof typeof MY_ADMISSION_DETAIL_TABS];

export type ReservableCapacityType =
  (typeof RESERVABLE_CAPACITY_TYPE)[keyof typeof RESERVABLE_CAPACITY_TYPE];

export type ScheduleType = (typeof SCHEDULE_TYPE)[keyof typeof SCHEDULE_TYPE];

export type AdmissionReserveType = keyof typeof RESERVE_TYPE;

export type AdmissionPaymentOption = keyof typeof PAYMENT_OPTION;

export type AdmissionCapacityOccupancyStatus =
  (typeof ADMISSION_CAPACITY_OCCUPANCY_STATUS)[keyof typeof ADMISSION_CAPACITY_OCCUPANCY_STATUS];

export type SchedulePackageSample = {
  title: string;
  dateRange: string;
  durationLabel: string;
};

export type HandoverDocumentItem = {
  title: string;
  sampleFileId: string;
};

export type AdmissionRuleItem = {
  title: string;
  selectedRuleTitle: string;
  ruleDescription: string;
};

export type AdmissionInstallmentItem = {
  title: string;
  percent: string;
  isPrePayment: boolean;
  dueDays: string | null;
};

export type AdmissionCancellationRuleItem = {
  remainingDays: string;
  refundPercent: string;
};

export const RENEWAL_FINANCIAL_SETTING = {
  noFee: "NoFee",
  warehousing: "Warehousing",
  extraStay: "ExtraStay",
} as const;

export type AdmissionRenewalFinancialSettingType =
  (typeof RENEWAL_FINANCIAL_SETTING)[keyof typeof RENEWAL_FINANCIAL_SETTING];

export type AdmissionRenewalSourceItem = {
  id: number;
  sourceProgramTitle: string;
  sourceCapacity: number;
  renewableCapacity: number;
  renewablePercent: number;
  timeInterval: string;
  financialSettingType: AdmissionRenewalFinancialSettingType;
  financialSettingLabel: string;
  warehousingFee: number | null;
  extraStayDailyPercent: number | null;
};

export type AdmissionCapacityBedItem = {
  id: number;
  building: string;
  floor: string;
  unitType: string;
  qualityGrade: string | null;
  unitTitle: string;
  bedPosition: string | null;
  bedType: string;
  bedTitle: string | null;
  bedCode: string;
  deposit: number | null;
  price: number;
  occupancyStatus: AdmissionCapacityOccupancyStatus | null;
  lastActor: string | null;
  lastActionDate: string | null;
};

export type AdmissionCapacityUnitItem = {
  id: number;
  building: string;
  floor: string;
  unitType: string;
  qualityGrade: string | null;
  unitTitle: string;
  deposit: number | null;
  price: number;
  occupancyStatus: AdmissionCapacityOccupancyStatus | null;
  lastActor: string | null;
  lastActionDate: string | null;
};

export type AdmissionCapacityBuildingItem = {
  id: number;
  qualityGrade: string | null;
  building: string;
  deposit: number | null;
  price: number;
  occupancyStatus: AdmissionCapacityOccupancyStatus | null;
  lastActor: string | null;
  lastActionDate: string | null;
};

export type AdmissionDetailStatistics = {
  nominalResidenceCapacity: number;
  totalResidenceCapacities: number;
  admissionProgramCapacities: number;
  occupiedCapacities: number;
  capacitiesWithoutAdmission: number;
  minPrice: number;
  maxPrice: number;
  minDeposit: number;
  maxDeposit: number;
  usedPrices: any[];
};

export type AdmissionDetailMockData = {
  id: number;
  status: AdmissionDetailStatus;
  requestNumber: string;
  createdAt: string;
  lastAction: string | null;
  returnDate: string | null;
  returnReasonTitle: string;
  returnReasonDescription: string;
  rejectDate: string | null;
  rejectReasonTitle: string;
  rejectReasonDescription: string;
  cancelledAt: string | null;
  cancelledBy: string | null;
  requestTypeLabel: string;
  programTitle: string;
  business: string;
  branch: string;
  residence: string;
  managementType: string;
  reservableCapacity: ReservableCapacityType;
  isVisibleToUsers: boolean;
  isStudent: boolean;
  scheduleType: ScheduleType;
  term: string;
  stayDateRange: string;
  stayDateDurationHint: string;
  stayTimeRange: string;
  reserveDateRange: string;
  reserveDateDurationHint: string;
  reserveTimeRange: string;
  remainingStayDays: string;
  hasMinStayLimit: boolean;
  hasMaxStayLimit: boolean;
  minStayDuration: string;
  maxStayDuration: string;
  stayLimitUnit: string;
  packageDuration: string;
  packageSamples: any[];
  admissionGender: string;
  agreementBusiness: string;
  agreementBranches: string[];
  userGroup: string | null;
  educationLevels: string[];
  majors: string[];
  nationality: string | null;
  requiresHandoverDocuments: boolean;
  handoverDocuments: HandoverDocumentItem[];
  requiresRelativesInfo: boolean;
  rulesAndRegulations: AdmissionRuleItem[];
  capacityBeds: AdmissionCapacityBedItem[];
  capacityUnits: AdmissionCapacityUnitItem[];
  capacityBuildings: AdmissionCapacityBuildingItem[];
  reserveType: AdmissionReserveType;
  paymentOption: AdmissionPaymentOption;
  hasPaymentDeadline: boolean;
  paymentDeadlineDays: string | null;
  dailyLatePenaltyPercent: string;
  installmentCount: string;
  interestRatePercent: string;
  installments: AdmissionInstallmentItem[];
  hasCancellationPolicy: boolean;
  cancellationRules: AdmissionCancellationRuleItem[];
  hasEarlyCheckoutRules: boolean;
  earlyCheckoutDefaultRefundPercent: string | undefined;
  earlyCheckoutMinRefundPercent: string | undefined;
  earlyCheckoutMaxRefundPercent: string | undefined;
  hasLateCheckoutPenalty: boolean;
  lateCheckoutDefaultPenaltyPercent: string | undefined;
  lateCheckoutMinPenaltyPercent: string | undefined;
  lateCheckoutMaxPenaltyPercent: string | undefined;
  contractId: string;
  contractStartDate: string;
  contractEndDate: string;
  hasRenewal: boolean;
  renewalAllowedFrom: string;
  renewalAllowedTo: string;
  renewalSources: AdmissionRenewalSourceItem[];
  followUpOfficer: string | null;
  applicantFirstName: string;
  applicantLastName: string;
  applicantNationalCode: string;
  applicantMobile: string;
  statistics: AdmissionDetailStatistics;
  acceptedDate: string | null;
};
