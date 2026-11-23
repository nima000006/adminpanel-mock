import { ComponentType } from "react";

import { IconBaseProps } from "react-icons";
import {
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineInfoCircle,
  AiOutlineSliders,
} from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiBuildings, PiChartLine, PiCoins } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import IconTab from "@components/Renderers/IconTab/IconTab";
import { AdmissionDetailProgramTabsProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailProgramTabs/@types/@admissionDetailProgramTabs";
import { MY_ADMISSION_DETAIL_TABS } from "@pages/Dormitory/Admission/_shared/util";

const TabIcon = ({
  Icon,
  fillColor,
}: {
  Icon: ComponentType<IconBaseProps>;
  fillColor?: string;
}) => <Icon color={fillColor} size={40} />;

const AdmissionDetailProgramTabs = ({
  variant,
  activeTab,
  onTabChange,
  onViewResidence,
  showStatisticsTab = true,
}: AdmissionDetailProgramTabsProps) => {
  const isAllVariant = variant === "all";
  const isActiveVariant = variant === "active";
  const shouldShowStatisticsTab = (isAllVariant && showStatisticsTab) || isActiveVariant;
  const shouldShowProgramInfoTab = !isActiveVariant;
  const shouldShowDivider = !isActiveVariant;

  const tabsGridClassName = isActiveVariant
    ? "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
    : shouldShowStatisticsTab
      ? "grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7"
      : "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6";

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-6">
      {shouldShowDivider && (
        <CustomDivider
          text="اطلاعات برنامه پذیرش"
          extraContent={
            <CustomButton
              type="link"
              size="small"
              icon={<PiBuildings />}
              onClick={onViewResidence}
            >
              مشاهده اقامتگاه
            </CustomButton>
          }
        />
      )}

      <div className={tabsGridClassName}>
        {shouldShowStatisticsTab && (
          <IconTab
            title="آمار"
            active={activeTab === MY_ADMISSION_DETAIL_TABS.statistics}
            clickHandler={() => onTabChange(MY_ADMISSION_DETAIL_TABS.statistics)}
            Icon={({ fillColor }) => <TabIcon Icon={PiChartLine} fillColor={fillColor} />}
          />
        )}
        {shouldShowProgramInfoTab && (
          <IconTab
            title="اطلاعات برنامه"
            active={activeTab === MY_ADMISSION_DETAIL_TABS.programInfo}
            clickHandler={() => onTabChange(MY_ADMISSION_DETAIL_TABS.programInfo)}
            Icon={({ fillColor }) => (
              <TabIcon Icon={AiOutlineInfoCircle} fillColor={fillColor} />
            )}
          />
        )}
        <IconTab
          title="زمان‌بندی"
          active={activeTab === MY_ADMISSION_DETAIL_TABS.scheduling}
          clickHandler={() => onTabChange(MY_ADMISSION_DETAIL_TABS.scheduling)}
          Icon={({ fillColor }) => (
            <TabIcon Icon={AiOutlineCalendar} fillColor={fillColor} />
          )}
        />
        <IconTab
          title="قوانین پذیرش"
          active={activeTab === MY_ADMISSION_DETAIL_TABS.rules}
          clickHandler={() => onTabChange(MY_ADMISSION_DETAIL_TABS.rules)}
          Icon={({ fillColor }) => (
            <TabIcon Icon={AiOutlineFileText} fillColor={fillColor} />
          )}
        />
        <IconTab
          title="ظرفیت‌ها"
          active={activeTab === MY_ADMISSION_DETAIL_TABS.capacities}
          clickHandler={() => onTabChange(MY_ADMISSION_DETAIL_TABS.capacities)}
          Icon={({ fillColor }) => (
            <TabIcon Icon={HiOutlineUserGroup} fillColor={fillColor} />
          )}
        />
        <IconTab
          title="شرایط مالی"
          active={activeTab === MY_ADMISSION_DETAIL_TABS.financial}
          clickHandler={() => onTabChange(MY_ADMISSION_DETAIL_TABS.financial)}
          Icon={({ fillColor }) => <TabIcon Icon={PiCoins} fillColor={fillColor} />}
        />
        <IconTab
          title="تنظیمات تکمیلی"
          active={activeTab === MY_ADMISSION_DETAIL_TABS.settings}
          clickHandler={() => onTabChange(MY_ADMISSION_DETAIL_TABS.settings)}
          Icon={({ fillColor }) => (
            <TabIcon Icon={AiOutlineSliders} fillColor={fillColor} />
          )}
        />
      </div>
    </div>
  );
};

export default AdmissionDetailProgramTabs;
