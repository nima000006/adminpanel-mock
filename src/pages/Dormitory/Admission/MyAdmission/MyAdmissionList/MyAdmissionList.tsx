import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  MY_ADMISSION_STATUS_CONFIG,
  MY_ADMISSION_STATUS,
} from "@pages/Dormitory/Admission/_shared/util";
import MyAdmissionActiveList from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionActiveList/MyAdmissionActiveList";
import MyAdmissionCancelledList from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionCancelledList/MyAdmissionCancelledList";
import MyAdmissionDraftList from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionDraftList/MyAdmissionDraftList";
import MyAdmissionRejectedList from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionRejectedList/MyAdmissionRejectedList";
import MyAdmissionReturnedList from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionReturnedList/MyAdmissionReturnedList";
import MyAdmissionWaitingList from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionWaitingList/MyAdmissionWaitingList";

const MY_ADMISSION_TABS_MOCK_COUNT = 10;
const MyAdmissionList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "برنامه های پذیرش",
      },
      { title: "برنامه های پذیرش من" },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();

  const mockBadgeTitle = `(${MY_ADMISSION_TABS_MOCK_COUNT})`;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ status: MY_ADMISSION_STATUS.active });
    }
  }, [setSearchParams, url?.status]);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <DemandCard
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.active].title}
          active={url?.status === MY_ADMISSION_STATUS.active}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.active)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={mockBadgeTitle}
        />
        <DemandCard
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.draft].title}
          active={url?.status === MY_ADMISSION_STATUS.draft}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.draft)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={mockBadgeTitle}
        />
        <DemandCard
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.returned].title}
          active={url?.status === MY_ADMISSION_STATUS.returned}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.returned)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={mockBadgeTitle}
        />
        <DemandCard
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.waiting].title}
          active={url?.status === MY_ADMISSION_STATUS.waiting}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.waiting)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={mockBadgeTitle}
        />
        <DemandCard
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.rejected].title}
          active={url?.status === MY_ADMISSION_STATUS.rejected}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.rejected)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={mockBadgeTitle}
        />
        <DemandCard
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.cancelled].title}
          active={url?.status === MY_ADMISSION_STATUS.cancelled}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.cancelled)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={mockBadgeTitle}
        />
      </div>

      {url?.status === MY_ADMISSION_STATUS.active ? <MyAdmissionActiveList /> : null}
      {url?.status === MY_ADMISSION_STATUS.draft ? <MyAdmissionDraftList /> : null}
      {url?.status === MY_ADMISSION_STATUS.returned ? <MyAdmissionReturnedList /> : null}
      {url?.status === MY_ADMISSION_STATUS.waiting ? <MyAdmissionWaitingList /> : null}
      {url?.status === MY_ADMISSION_STATUS.rejected ? <MyAdmissionRejectedList /> : null}
      {url?.status === MY_ADMISSION_STATUS.cancelled ? (
        <MyAdmissionCancelledList />
      ) : null}
    </div>
  );
};

export default MyAdmissionList;
