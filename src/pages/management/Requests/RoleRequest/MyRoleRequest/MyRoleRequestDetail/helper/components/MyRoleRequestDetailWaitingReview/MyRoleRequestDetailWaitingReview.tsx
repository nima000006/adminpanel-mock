import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";

import MyRoleRequestConfirmedDrawerContent from "./helper/drawers/MyRoleRequestConfirmed/MyRoleRequestConfirmedDrawerContent";
import MyRoleRequestRejectDrawerContent from "./helper/drawers/MyRoleRequestReject/MyRoleRequestRejectDrawerContent";
import "./_myRoleRequestDetailWaitingReview.scss";

const MyRoleRequestDetailWaitingReview = ({
  adminStaffId,
}: {
  adminStaffId: number | undefined;
}) => {
  const [isRejectDrawerOpen, setIsRejectDrawerOpen] = useState(false);
  const [isConfirmedDrawerOpen, setIsConfirmedDrawerOpen] = useState(false);

  // ================================ Util Functions ================================
  const openRejectDrawerHandler = () => setIsRejectDrawerOpen(true);
  const closeRejectDrawerHandler = () => setIsRejectDrawerOpen(false);

  const openConfirmedDrawerHandler = () => setIsConfirmedDrawerOpen(true);
  const closeConfirmedDrawerHandler = () => setIsConfirmedDrawerOpen(false);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {isRejectDrawerOpen && (
        <CustomDrawer
          onClose={closeRejectDrawerHandler}
          open={isRejectDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyRoleRequestRejectDrawerContent
              closeDrawerHandler={closeRejectDrawerHandler}
            />
          }
        />
      )}
      {isConfirmedDrawerOpen && (
        <CustomDrawer
          onClose={closeConfirmedDrawerHandler}
          open={isConfirmedDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <MyRoleRequestConfirmedDrawerContent
              closeDrawerHandler={closeConfirmedDrawerHandler}
              adminStaffId={adminStaffId}
            />
          }
        />
      )}
      <div className="my-role-request-detail-waiting-review">
        <CustomButton type="primary" danger onClick={openRejectDrawerHandler}>
          رد درخواست
        </CustomButton>
        <CustomButton type="primary" onClick={openConfirmedDrawerHandler}>
          تایید درخواست
        </CustomButton>
      </div>
    </>
  );
};

export default MyRoleRequestDetailWaitingReview;
