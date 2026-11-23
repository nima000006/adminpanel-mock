import { useState } from "react";

import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { FaRegCalendar, FaRegCalendarPlus, FaRegClock } from "react-icons/fa6";
import { PiArrowsHorizontal, PiRepeat } from "react-icons/pi";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  DORMITORY_USER_REQUESTS_RESERVATION_EVACUATION_PAGE_ROUTE,
  DORMITORY_USER_REQUESTS_RESERVATION_MOVING_PAGE_ROUTE,
} from "@infra/router/routes/dormitory";
import ResidenceHistoryDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/drawer/ResidenceHistoryDrawerContent/ResidenceHistoryDrawerContent";

// حالتهای سکونتی
// CurrentlyOccupied: "در حال سکونت",
// Relocation: "جابجایی",
// Renewal: "تمدید",

const mockData = {
  residenceStatus: "Relocation",
};

const ReservationInResidenceRequestActionHeader = () => {
  const [isHistoryResidenceDrawerOpen, setIsHistoryResidenceDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  // دراور سوابق اقامتی
  const closeHistoryResidenceDrawerHandler = () => {
    setIsHistoryResidenceDrawerOpen({
      isOpen: false,
      id: -1,
    });
  };

  //  تخلیه اسکان
  const evacuationClickHandler = () => {
    navigate({
      pathname: DORMITORY_USER_REQUESTS_RESERVATION_EVACUATION_PAGE_ROUTE,
    });
  };

  // جابجایی
  const movingClickHandler = () => {
    navigate({
      pathname: DORMITORY_USER_REQUESTS_RESERVATION_MOVING_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
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
                {/* در حالت سکونت */}
                {mockData.residenceStatus === "CurrentlyOccupied" ? (
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
                {mockData.residenceStatus === "CurrentlyOccupied"
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
            <CustomTag color={"green"}>
              {dataPlaceHolder({ data: "در حال سکونت" })}
            </CustomTag>
          </div>

          {/* اگر در حالت تمدید یا جابجایی بود باید این مورد اضافه شود */}
          {mockData.residenceStatus !== "CurrentlyOccupied" ? (
            <div>
              <span> درخواست اقامت قبلی: </span>
              <span className="text-primary-6">{15341554545454}</span>
            </div>
          ) : null}
        </div>

        <div className="flex gap-2">
          <CustomButton
            type="text"
            iconPlacement="start"
            loading={false}
            icon={<FaRegClock />}
            onClick={() => setIsHistoryResidenceDrawerOpen({ isOpen: true, id: -1 })}
          >
            سوابق اقامتی
          </CustomButton>

          <CustomButton
            iconPlacement="start"
            htmlType="submit"
            loading={false}
            icon={<PiRepeat />}
            onClick={movingClickHandler}
          >
            جابجایی
          </CustomButton>

          <CustomButton
            danger
            iconPlacement="start"
            icon={<AiOutlineLogout />}
            onClick={evacuationClickHandler}
          >
            ثبت تخلیه اسکان
          </CustomButton>
        </div>
      </div>
    </>
  );
};
export default ReservationInResidenceRequestActionHeader;
