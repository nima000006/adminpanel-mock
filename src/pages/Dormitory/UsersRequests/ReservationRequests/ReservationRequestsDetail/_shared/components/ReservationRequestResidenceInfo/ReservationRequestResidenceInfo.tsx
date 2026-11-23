import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";

import { CustomButton } from "@components/CustomInputs";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { ReservationRequestResidenceInfoProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/@types/@reservationRequestResidenceInfoTypes";
import ResidenceListDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/_shared/components/ReservationRequestResidenceInfo/helper/drawer/ResidenceListDrawerContent/ResidenceListDrawerContent";

const ReservationRequestResidenceInfo = ({
  title,
  Icon,
  clickHandler,
  desc,
  residenceBtb,
}: ReservationRequestResidenceInfoProps) => {
  const [isResidenceListDrawerOpen, setIsResidenceListDrawerOpen] = useState(false);

  //* ================================ Util Functions ================================
  const ResidenceBtnClickHandler = () => {
    setIsResidenceListDrawerOpen(true);
  };

  const closeResidenceListDrawerHandler = () => {
    setIsResidenceListDrawerOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* دراور لیست ساکنین */}
      {isResidenceListDrawerOpen && (
        <CustomDrawer
          title=""
          onClose={closeResidenceListDrawerHandler}
          open={isResidenceListDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ResidenceListDrawerContent
              closeDrawerHandler={closeResidenceListDrawerHandler}
            />
          }
        />
      )}

      <div
        className="border-neutral-4 bg-neutral-1 text-neutral-7 flex w-full items-center rounded-lg border font-bold"
        onClick={clickHandler}
      >
        <div className="flex gap-2 p-3">
          {Icon ? <Icon /> : null}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <h5 className="text-neutral-7 text-3">{title}</h5>
              {residenceBtb ? (
                <CustomButton
                  type="text"
                  iconPlacement="end"
                  loading={false}
                  icon={<FaArrowLeft />}
                  className="flex items-center"
                  onClick={ResidenceBtnClickHandler}
                >
                  ساکنین
                </CustomButton>
              ) : null}
            </div>
            <h5 className="text-bold text-neutral-12">{desc}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationRequestResidenceInfo;
