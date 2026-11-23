import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { FaRegCalendar, FaRegCalendarPlus, FaRegClock } from "react-icons/fa6";
import { PiArrowsHorizontal } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import ResidenceHistoryDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ResidenceHistoryDrawerContent/ResidenceHistoryDrawerContent";
import { ReservationCompletedRequestsActionHeaderProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationCompletedRequestsDetail/helper/components/ReservationCompletedRequestsActionHeader/@types/@reservationCompletedRequestsActionHeaderTypes";
import { ReservationCompletedRequestsStatusColor } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationCompletedRequestsDetail/helper/utils/utils";

// حالتهای سکونتی

// CompletedResidence: "اتمام اسکان",
// Relocation: "جابجایی",
// Renewal: "تمدید",

const mockData = {
  residenceStatus: "CompletedResidence",
};

const ReservationCompletedRequestsActionHeader = ({
  status,
  tagTitle,
}: ReservationCompletedRequestsActionHeaderProps) => {
  const [isHistoryResidenceDrawerOpen, setIsHistoryResidenceDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  //* ================================ Util Functions ================================

  // دراور سوابق اقامتی
  const closeHistoryResidenceDrawerHandler = () => {
    setIsHistoryResidenceDrawerOpen({
      isOpen: false,
      id: -1,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* دراور سوابق اقامتی */}
      {isHistoryResidenceDrawerOpen?.isOpen && (
        <CustomDrawer
          title=""
          onClose={closeHistoryResidenceDrawerHandler}
          open={isHistoryResidenceDrawerOpen?.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ResidenceHistoryDrawerContent
              closeDrawerHandler={closeHistoryResidenceDrawerHandler}
              id={isHistoryResidenceDrawerOpen?.id}
            />
          }
        />
      )}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span>
                {/* در حالت اتمام اسکان */}
                {mockData.residenceStatus === "CompletedResidence" ? (
                  <FaRegCalendar />
                ) : // در حالت جابجایی
                mockData.residenceStatus === "Relocation" ? (
                  <PiArrowsHorizontal />
                ) : // در حالت تمدید
                mockData.residenceStatus === "Renewal" ? (
                  <FaRegCalendarPlus />
                ) : null}{" "}
              </span>
              <span>
                {mockData.residenceStatus === "CompletedResidence"
                  ? " رزرو |"
                  : mockData.residenceStatus === "Relocation"
                    ? " جابجایی |"
                    : mockData.residenceStatus === "Renewal"
                      ? " تمدید |"
                      : "-"}
              </span>
            </div>

            <span>شماره درخواست: </span>
            <span>{23213455}</span>
            <CustomTag color={ReservationCompletedRequestsStatusColor[status]}>
              {dataPlaceHolder({ data: tagTitle })}
            </CustomTag>
          </div>

          {/* اگر در حالت تمدید یا جابجایی بود باید این مورد اضافه شود */}
          {mockData.residenceStatus !== "CompletedResidence" ? (
            <div>
              <span> درخواست اقامت قبلی: </span>
              <span className="text-primary-6">{15341554545454}</span>
            </div>
          ) : null}
        </div>

        <CustomButton
          type="text"
          iconPlacement="start"
          icon={<FaRegClock />}
          onClick={() => setIsHistoryResidenceDrawerOpen({ isOpen: true, id: -1 })}
        >
          سوابق اقامتی
        </CustomButton>
      </div>
    </>
  );
};
export default ReservationCompletedRequestsActionHeader;
