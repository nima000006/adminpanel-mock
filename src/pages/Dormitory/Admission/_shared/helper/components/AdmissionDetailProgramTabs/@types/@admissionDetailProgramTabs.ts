import { MY_ADMISSION_DETAIL_TABS } from "@pages/Dormitory/Admission/_shared/util";

export type AdmissionDetailProgramTabsVariant = "all" | "my" | "active";

export type AdmissionDetailProgramTab =
  (typeof MY_ADMISSION_DETAIL_TABS)[keyof typeof MY_ADMISSION_DETAIL_TABS];

export type AdmissionDetailProgramTabsProps = {
  variant: AdmissionDetailProgramTabsVariant;
  activeTab: AdmissionDetailProgramTab;
  onTabChange: (tab: AdmissionDetailProgramTab) => void;
  onViewResidence?: () => void;
  showStatisticsTab?: boolean;
};
