import { useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";

import { CustomButton } from "@components/CustomInputs";
import CustomSteps from "@components/Renderers/CustomSteps/CustomSteps";
import { stepStatusCreator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import ConfirmRequestBedReservation from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBedReservation/ConfirmRequestBedReservation";
import ConfirmRequestBuildingReservation from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestBuildingReservation/ConfirmRequestBuildingReservation";
import ConfirmRequestResidenceReservation from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestResidenceReservation/ConfirmRequestResidenceReservation";
import ConfirmRequestSecondStepReservation from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestSecondStepReservation/ConfirmRequestSecondStepReservation";

const ConfirmRequestReservation = () => {
  const { params: url } = useQueryParams();
  const [current, setCurrent] = useState(0);

  //* ================================ Util Functions ================================
  // btn handler
  const nextBtnHandler = () => {
    setCurrent(1);
  };
  const backBtnHandler = () => {
    setCurrent(0);
  };

  //* ================================ Steps ================================
  const stepsItem = [
    {
      id: "1",
      children:
        url?.base === "bed" ? (
          <ConfirmRequestBedReservation />
        ) : url?.base === "residence" ? (
          <ConfirmRequestResidenceReservation />
        ) : url?.base === "building" ? (
          <ConfirmRequestBuildingReservation />
        ) : null,
    },
    {
      id: "2",
      children: <ConfirmRequestSecondStepReservation />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
  return (
    <div className="flex flex-col gap-10">
      <CustomSteps
        current={current}
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "تخصیص اقامت",
            description: "انتخاب نشده",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "پیش فاکتور",
            description: "انتخاب نشده",
          },
        ]}
      />
      {stepsItem[current].children}

      {/* footer */}
      <div className="flex justify-end gap-4">
        <CustomButton onClick={backBtnHandler}>بازگشت</CustomButton>
        <CustomButton
          type="primary"
          onClick={nextBtnHandler}
          icon={<FaArrowLeft />}
          iconPlacement="end"
        >
          {current === 0 ? " ثبت و ادامه" : "ثبت و تایید نهایی"}
        </CustomButton>
      </div>
    </div>
  );
};

export default ConfirmRequestReservation;
