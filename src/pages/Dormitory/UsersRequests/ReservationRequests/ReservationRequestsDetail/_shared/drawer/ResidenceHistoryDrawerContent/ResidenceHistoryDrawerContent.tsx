import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTimeline from "@components/Renderers/CustomTimeline/CustomTimeline";
import { ResidenceHistoryDrawerContentProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ResidenceHistoryDrawerContent/@types/@residenceHistoryDrawerContentType";
import ResidenceHistoryCard from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ResidenceHistoryDrawerContent/helper/components/ResidenceHistoryCard/ResidenceHistoryCard";
import { MOCK_RESIDENCE_HISTORY } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ResidenceHistoryDrawerContent/helper/mock/mockResidenceHistory";

const ResidenceHistoryDrawerContent = ({
  closeDrawerHandler,
}: ResidenceHistoryDrawerContentProps) => {
  const timelineItems = MOCK_RESIDENCE_HISTORY.map((item) => ({
    key: item.id,
    color: "blue",
    children: <ResidenceHistoryCard item={item} />,
  }));

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="flex flex-col gap-4">
      <CustomDrawerHeader title="سوابق اقامتی" closeDrawerHandler={closeDrawerHandler} />
      {MOCK_RESIDENCE_HISTORY?.length >= 0 ? (
        <CustomTimeline items={timelineItems} />
      ) : (
        <CustomEmpty description="تاکنون کاربر تجربه اقامت در این اقامتگاه را نداشته است." />
      )}
    </div>
  );
};

export default ResidenceHistoryDrawerContent;
