import { useEffect, useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetDormRequestResidenceInfoQuery } from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";

import ReservationMoreDetailDrawerContent from "./helper/drawers/ReservationMoreDetailDrawerContent/ReservationMoreDetailDrawerContent";
import {
  DormRequestResidenceInfo,
  GetDormRequestResidenceInfoResponse,
} from "../../../@types/@usersRequestsDetail";
import "./_usersRequestsDetailAssignedRoom.scss";

const UsersRequestsDetailAssignedRoom = () => {
  const [residenceInfo, setResidenceInfo] = useState<DormRequestResidenceInfo | null>(
    null
  );
  const [moreDetailDrawer, setMoreDetailDrawer] = useState(false);

  const { params: url } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getDormRequestResidenceInfo, { isFetching: isDormRequestResidenceInfoLoading }] =
    useLazyGetDormRequestResidenceInfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (url?.id) {
      getDormRequestResidenceInfo(url?.id)
        .unwrap()
        .then(getDormRequestResidenceInfoSuccess);
    }
  }, [url?.id]);

  //* ================================ Util Functions ================================
  const getDormRequestResidenceInfoSuccess = (
    value: GetDormRequestResidenceInfoResponse
  ) => {
    if (value?.status === 200) {
      setResidenceInfo(value?.data?.[0]);
    }
  };

  const openMoreDetailDrawerHandler = () => setMoreDetailDrawer(true);
  const closeMoreDetailDrawerHandler = () => setMoreDetailDrawer(false);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* MORE DETAIL DRAWER */}
      {moreDetailDrawer && (
        <CustomDrawer
          onClose={closeMoreDetailDrawerHandler}
          open={moreDetailDrawer}
          closeIcon={<AiOutlineClose />}
          content={
            <ReservationMoreDetailDrawerContent
              closeDrawerHandler={closeMoreDetailDrawerHandler}
              id={residenceInfo?.AssociationBed_roomId}
            />
          }
        />
      )}
      <Div
        loading={isDormRequestResidenceInfoLoading}
        className="users-requests-detail-assigned-room-container"
      >
        <CustomDivider
          text="اتاق تخصیص داده شده"
          extraContent={
            <CustomButton
              type="link"
              className="more-detail-btn"
              onClick={openMoreDetailDrawerHandler}
              icon={<FaCaretLeft />}
              iconPlacement="end"
            >
              جزئیات بیشتر
            </CustomButton>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="نام اقامتگاه"
            value={
              residenceInfo?.AssociationCategoryDeliverPlan_AssociationDormitory_title
            }
          />
          <SingleVerticalWithCol
            label="نام ساختمان"
            value={residenceInfo?.AssociationBed_AssociationCategoryBuliding_title}
          />
          <SingleVerticalWithCol
            label="نام طبقه"
            value={residenceInfo?.AssociationBed_AssociationCategoryFloor_title}
          />
          <SingleVerticalWithCol
            label="نام اتاق"
            value={residenceInfo?.AssociationBed_AssociationCategorRoom_title}
          />
          <SingleVerticalWithCol
            label="جنسیت"
            value={
              residenceInfo?.AssociationBed_AssociationCategorRoom_AssociationGender_title
            }
          />
          <SingleVerticalWithCol
            label="تعداد استاندارد تخت در اتاق"
            value={residenceInfo?.AssociationBed_AssociationCategorRoom_numberStandardBedInRoom?.toString()}
          />
          <SingleVerticalWithCol
            label="تخت‌های فعال"
            value={residenceInfo?.CountActiveBeds?.toString()}
          />
          <SingleVerticalWithCol
            label="ظرفیت قابل رزرو"
            value={residenceInfo?.CountOpenBeds?.toString()}
          />
        </Row>
      </Div>
    </>
  );
};

export default UsersRequestsDetailAssignedRoom;
