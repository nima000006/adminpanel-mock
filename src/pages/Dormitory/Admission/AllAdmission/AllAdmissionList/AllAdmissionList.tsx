import { useEffect } from "react";

import DemandCard from "@components/Renderers/DemandCard/DemandCard";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  MY_ADMISSION_STATUS_CONFIG,
  MY_ADMISSION_STATUS,
} from "@pages/Dormitory/Admission/_shared/util";
import AllAdmissionAcceptedList from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionAcceptedList/AllAdmissionAcceptedList";
import AllAdmissionActiveList from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionActiveList/AllAdmissionActiveList";
import AllAdmissionCancelledList from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionCancelledList/AllAdmissionCancelledList";
import AllAdmissionDraftList from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionDraftList/AllAdmissionDraftList";
import AllAdmissionRejectedList from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionRejectedList/AllAdmissionRejectedList";
import AllAdmissionReturnedList from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionReturnedList/AllAdmissionReturnedList";
import AllAdmissionWaitingList from "@pages/Dormitory/Admission/AllAdmission/AllAdmissionList/helper/components/AllAdmissionWaitingList/AllAdmissionWaitingList";

const ALL_ADMISSION_TABS_MOCK_COUNT = 10;

const AllAdmissionList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "برنامه های پذیرش",
      },
      { title: "برنامه های پذیرش همه" },
    ],
  });

  const { params: url, setSearchParams } = useQueryParams();

  const mockBadgeTitle = `(${ALL_ADMISSION_TABS_MOCK_COUNT})`;

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ status: MY_ADMISSION_STATUS.waiting });
    }
  }, [setSearchParams, url?.status]);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    setSearchParams({ status: status });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
        <DemandCard
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.waiting].title}
          active={url?.status === MY_ADMISSION_STATUS.waiting}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.waiting)}
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
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.accepted].title}
          active={url?.status === MY_ADMISSION_STATUS.accepted}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.accepted)}
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
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.draft].title}
          active={url?.status === MY_ADMISSION_STATUS.draft}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.draft)}
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
        <DemandCard
          title={MY_ADMISSION_STATUS_CONFIG[MY_ADMISSION_STATUS.active].title}
          active={url?.status === MY_ADMISSION_STATUS.active}
          clickHandler={() => changeCardHandler(MY_ADMISSION_STATUS.active)}
          badgeColor="transparent"
          badge={false}
          badgeTitle={mockBadgeTitle}
        />
      </div>

      {url?.status === MY_ADMISSION_STATUS.active ? <AllAdmissionActiveList /> : null}
      {url?.status === MY_ADMISSION_STATUS.draft ? <AllAdmissionDraftList /> : null}
      {url?.status === MY_ADMISSION_STATUS.returned ? <AllAdmissionReturnedList /> : null}
      {url?.status === MY_ADMISSION_STATUS.waiting ? <AllAdmissionWaitingList /> : null}
      {url?.status === MY_ADMISSION_STATUS.accepted ? <AllAdmissionAcceptedList /> : null}
      {url?.status === MY_ADMISSION_STATUS.rejected ? <AllAdmissionRejectedList /> : null}
      {url?.status === MY_ADMISSION_STATUS.cancelled ? (
        <AllAdmissionCancelledList />
      ) : null}
    </div>
  );
};

export default AllAdmissionList;
