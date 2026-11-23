import { ComponentType } from "react";

import { IconBaseProps } from "react-icons";
import {
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineInfoCircle,
  AiOutlineSliders,
} from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiCoins } from "react-icons/pi";

import IconTab from "@components/Renderers/IconTab/IconTab";
import {
  AllAdmissionStepsEditTab,
  MY_ADMISSION_DETAIL_TABS,
} from "@pages/Dormitory/Admission/_shared/util";
import { AllAdmissionStepsEditDetailTabsProps } from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionStepsEditDetail/helper/components/AllAdmissionStepsEditDetailTabs/@types/@allAdmissionStepsEditDetailTabs";

const TabIcon = ({
  Icon,
  fillColor,
}: {
  Icon: ComponentType<IconBaseProps>;
  fillColor?: string;
}) => <Icon color={fillColor} size={40} />;

const STEPS_EDIT_TABS: {
  key: AllAdmissionStepsEditTab;
  title: string;
  Icon: ComponentType<IconBaseProps>;
}[] = [
  {
    key: MY_ADMISSION_DETAIL_TABS.programInfo,
    title: "اطلاعات برنامه",
    Icon: AiOutlineInfoCircle,
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.scheduling,
    title: "زمان‌بندی",
    Icon: AiOutlineCalendar,
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.rules,
    title: "قوانین پذیرش",
    Icon: AiOutlineFileText,
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.capacities,
    title: "ظرفیت‌ها",
    Icon: HiOutlineUserGroup,
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.financial,
    title: "شرایط مالی",
    Icon: PiCoins,
  },
  {
    key: MY_ADMISSION_DETAIL_TABS.settings,
    title: "تنظیمات تکمیلی",
    Icon: AiOutlineSliders,
  },
];

const AllAdmissionStepsEditDetailTabs = ({
  activeTab,
  enabledTab,
}: AllAdmissionStepsEditDetailTabsProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {STEPS_EDIT_TABS.map(({ key, title, Icon }) => {
        const isDisabled = key !== enabledTab;

        return (
          <IconTab
            key={key}
            title={title}
            active={activeTab === key}
            disabled={isDisabled}
            Icon={({ fillColor }) => <TabIcon Icon={Icon} fillColor={fillColor} />}
          />
        );
      })}
    </div>
  );
};

export default AllAdmissionStepsEditDetailTabs;
