import { useState } from "react";

import { PiCalendarBlankThin, PiCaretDown, PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomCollapse, {
  CustomCollapseItem,
} from "@components/Renderers/CustomCollapse/CustomCollapse";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import { makeSearchParams } from "@infra/helpers/utils";
import { DORMITORY_USER_REQUESTS_RESERVATION_IN_RESIDENCE_REQUESTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { ResidenceListDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/@types/@reservationRequestResidenceInfoTypes";
import ResidenceInfoCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/helper/drawer/ResidenceListDrawerContent/helper/components/residenceInfoCard/ResidenceInfoCard";
import { MOCK_RESIDENCE_LIST } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/helper/drawer/ResidenceListDrawerContent/helper/mock/mockResidenceList";

import "./_residenceListDrawerContent.scss";

export const mockData: any[] = [
  {
    id: 1,
    collapseTitle: "۱. آرمان نیک‌روش",
    stayPeriod: "۰۱ مهر ۱۴۰۵ تا ۳۰ خرداد ۱۴۰۵",
    fullName: "محمد محمدی",
    nationalCode: "۰۰۲۱۱۱۶۰۹۰",
    userGroup: "student",
    personnelCode: "۱۲۵۶۳",
    branchUnit: "تهران شمال",
    extraInfoPrimary: "کارشناسی ارشد",
    extraInfoSecondary: "مدیریت بازرگانی",
    phone: "۰۹۱۲ ۴۴۸ ۷۹۶۸",
    progressStatus: "inResidence",
    progressPercent: 55,
    remainingText: "۳۰ روز مانده از اسکان",
    admissionProgram: "نیم ترم دوم ۱۴۰۵",
    acceptanceProgramType: "monthly",
    entryDate: "۰۵ مهر ۱۴۰۵",
  },
  {
    id: 2,
    collapseTitle: "۲. محمد محمدی",
    stayPeriod: "۰۱ مهر ۱۴۰۵ تا ۳۰ خرداد ۱۴۰۵",
    fullName: "محمد محمدی",
    nationalCode: "۰۰۲۱۱۱۶۰۹۰",
    userGroup: "employee",
    personnelCode: "۵۶۵۶۴۱۵۳۴۵",
    branchUnit: "تهران شمال",
    extraInfoPrimary: "هیئت علمی",
    phone: "۰۹۱۲ ۴۴۸ ۷۹۶۸",
    progressStatus: "inResidence",
    progressPercent: 60,
    remainingText: "۲۰ روز مانده از اسکان",
    admissionProgram: "نیم ترم دوم ۱۴۰۵",
    acceptanceProgramType: "monthly",
    entryDate: "۰۵ مهر ۱۴۰۵",
  },
  {
    id: 3,
    collapseTitle: "۳. نیما کاویانی",
    stayPeriod: "۰۱ مهر ۱۴۰۵ تا ۳۰ خرداد ۱۴۰۵",
    fullName: "نیما کاویانی",
    nationalCode: "۰۰۲۱۱۱۶۰۹۰",
    userGroup: "employee",
    personnelCode: "۵۶۵۶۴۱۵۳۴۵",
    branchUnit: "تهران شمال",
    extraInfoPrimary: "هیئت علمی",
    phone: "۰۹۱۲ ۴۴۸ ۷۹۶۸",
    progressStatus: "overdue",
    progressPercent: 100,
    remainingText: "۱۰ روز از موعد تخلیه گذشته",
    admissionProgram: "نیم ترم دوم ۱۴۰۵",
    acceptanceProgramType: "monthly",
    entryDate: "۰۵ مهر ۱۴۰۵",
  },
  {
    id: 4,
    collapseTitle: "۴. امیر بهرامی",
    stayPeriod: "۰۱ مهر ۱۴۰۵ تا ۳۰ خرداد ۱۴۰۵",
    fullName: "امیر بهرامی",
    nationalCode: "۰۰۲۱۱۱۶۰۹۰",
    userGroup: "employee",
    personnelCode: "۵۶۵۶۴۱۵۳۴۵",
    branchUnit: "تهران شمال",
    extraInfoPrimary: "هیئت علمی",
    phone: "۰۹۱۲ ۴۴۸ ۷۹۶۸",
    progressStatus: "dueToday",
    progressPercent: 98,
    remainingText: "۴ ساعت مانده از اسکان",
    admissionProgram: "نیم ترم دوم ۱۴۰۵",
    acceptanceProgramType: "monthly",
    entryDate: "۰۵ مهر ۱۴۰۵",
  },
  {
    id: 5,
    collapseTitle: "۵. امیرحسین راد",
    stayPeriod: "۰۱ مهر ۱۴۰۵ تا ۳۰ خرداد ۱۴۰۵",
    fullName: "امیرحسین راد",
    nationalCode: "۰۰۲۱۱۱۶۰۹۰",
    userGroup: "student",
    personnelCode: "۱۲۵۶۳",
    branchUnit: "تهران شمال",
    extraInfoPrimary: "کارشناسی ارشد",
    extraInfoSecondary: "مدیریت بازرگانی",
    phone: "۰۹۱۲ ۴۴۸ ۷۹۶۸",
    progressStatus: "inResidence",
    progressPercent: 40,
    remainingText: "۱۲۰ روز مانده از اسکان",
    admissionProgram: "نیم ترم دوم ۱۴۰۵",
    acceptanceProgramType: "monthly",
    entryDate: "۰۵ مهر ۱۴۰۵",
  },
  {
    id: 6,
    collapseTitle: "۶. علیرضا دهقانی",
    stayPeriod: "۰۱ مهر ۱۴۰۵ تا ۳۰ خرداد ۱۴۰۵",
    fullName: "علیرضا دهقانی",
    nationalCode: "۰۰۲۱۱۱۶۰۹۰",
    userGroup: "employee",
    personnelCode: "۵۶۵۶۴۱۵۳۴۵",
    branchUnit: "تهران شمال",
    extraInfoPrimary: "هیئت علمی",
    phone: "۰۹۱۲ ۴۴۸ ۷۹۶۸",
    progressStatus: "inResidence",
    progressPercent: 70,
    remainingText: "۴۵ روز مانده از اسکان",
    admissionProgram: "نیم ترم دوم ۱۴۰۵",
    acceptanceProgramType: "monthly",
    entryDate: "۰۵ مهر ۱۴۰۵",
  },
];

const ResidenceListDrawerContent = ({
  closeDrawerHandler,
}: ResidenceListDrawerContentProps) => {
  const [activeKey, setActiveKey] = useState<string | string[]>(
    mockData.length ? String(mockData[0].id) : []
  );

  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  const moreDetailsHandler = () => {
    navigate({
      pathname:
        DORMITORY_USER_REQUESTS_RESERVATION_IN_RESIDENCE_REQUESTS_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id: mockData?.map((item) => item.id) }),
    });
  };

  const collapseItems: CustomCollapseItem[] = mockData.map((residence) => ({
    key: String(residence.id),
    label: <span className="text-neutral-11 text-sm">{residence.collapseTitle}</span>,
    extra: (
      <div className="text-neutral-7 flex flex-col gap-1 text-xs">
        <div className="flex items-center gap-1">
          <PiCalendarBlankThin size={16} />
          <span>بازه اسکان</span>
        </div>
        <span className="text-neutral-10">{residence.stayPeriod}</span>
      </div>
    ),
    children: <ResidenceInfoCard item={residence} onMoreClick={moreDetailsHandler} />,
  }));

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="residence-list-drawer-content flex flex-col gap-4">
      <CustomDrawerHeader
        title="ساکنین واحد اقامتی"
        closeDrawerHandler={closeDrawerHandler}
      />

      {MOCK_RESIDENCE_LIST.length ? (
        <CustomCollapse
          accordion
          variant="card"
          bordered
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          items={collapseItems}
          expandIconPosition="start"
          customExpandIcon={({ isActive }) =>
            isActive ? (
              <PiCaretDown className="text-neutral-7" size={14} />
            ) : (
              <PiCaretLeft className="text-neutral-7" size={14} />
            )
          }
          className="residence-list-drawer-collapse"
        />
      ) : (
        <CustomEmpty description="ساکنی برای این واحد اقامتی ثبت نشده است." />
      )}
    </div>
  );
};

export default ResidenceListDrawerContent;
