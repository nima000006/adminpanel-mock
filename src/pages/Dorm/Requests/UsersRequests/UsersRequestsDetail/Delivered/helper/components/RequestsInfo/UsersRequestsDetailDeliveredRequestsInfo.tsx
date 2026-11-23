import { useEffect, useState } from "react";

import { Row } from "antd";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useLazyGetDormRequestInformationQuery,
  useLazyGetDormRequestResidenceInfoQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";

import {
  DormRequestInformationType,
  DormRequestResidenceInfo,
  GetDormRequestInformationResponse,
  GetDormRequestResidenceInfoResponse,
} from "../../../../@types/@usersRequestsDetail";
import UsersRequestsDetailApplicantInfo from "../../../../_shared/components/UsersRequestsDetailApplicantInfo/UsersRequestsDetailApplicantInfo";
import UsersRequestsDetailRequestsInfo from "../../../../_shared/components/UsersRequestsDetailRequestsInfo/UsersRequestsDetailRequestsInfo";
import UserRequestRoomMoreInfoDrawerContent from "../../../../_shared/drawers/UserRequestRoomMoreInfoDrawerContent/UserRequestRoomMoreInfoDrawerContent";
import "./_usersRequestsDetailDeliveredRequestsInfo.scss";

const UsersRequestsDetailDeliveredRequestsInfo = () => {
  const [requestInformation, setRequestInformation] =
    useState<DormRequestInformationType | null>(null);

  const [residenceInfo, setResidenceInfo] = useState<DormRequestResidenceInfo | null>(
    null
  );

  const [moreDetail, setMoreDetail] = useState(false);
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getDormRequestInformation, { isFetching: isDormRequestInformationLoading }] =
    useLazyGetDormRequestInformationQuery();

  const [getDormRequestResidenceInfo, { isFetching: isDormRequestResidenceInfoLoading }] =
    useLazyGetDormRequestResidenceInfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDormRequestInformation(id).unwrap().then(getDormRequestInformationSuccess);
      getDormRequestResidenceInfo(id).unwrap().then(getDormRequestResidenceInfoSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDormRequestInformationSuccess = async (
    value: GetDormRequestInformationResponse
  ) => {
    if (value?.status === 200) {
      setRequestInformation(value?.data?.[0]);
    }
  };

  const getDormRequestResidenceInfoSuccess = async (
    value: GetDormRequestResidenceInfoResponse
  ) => {
    if (value?.status === 200) {
      setResidenceInfo(value?.data?.[0]);
    }
  };

  //modals
  const openMoreDetailHandler = () => setMoreDetail(true);
  const closeMoreDetailHandler = () => setMoreDetail(false);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* MORE DETAIL DRAWER */}
      {moreDetail && (
        <CustomDrawer
          onClose={closeMoreDetailHandler}
          open={moreDetail}
          content={
            <UserRequestRoomMoreInfoDrawerContent
              closeDrawerHandler={closeMoreDetailHandler}
              id={residenceInfo?.AssociationBed_roomId}
            />
          }
        />
      )}
      <div className="users-requests-detail-delivered-requests-info-container">
        <Div loading={isDormRequestInformationLoading} className="request-info">
          <CustomAlert
            type="success"
            showIcon
            description={`این اتاق در تاریخ ${dataPlaceHolder({ data: requestInformation?.deliveryDate, isDate: true })} به کاربر تحویل داده شد.`}
            className="alert"
            closable
          />
          {requestInformation && (
            <>
              <UsersRequestsDetailApplicantInfo data={requestInformation} />
              <UsersRequestsDetailRequestsInfo data={requestInformation} />
            </>
          )}
        </Div>
        <Div loading={isDormRequestResidenceInfoLoading}>
          <CustomDivider
            text="اتاق تخصیص داده شده"
            extraContent={
              <CustomButton
                onClick={openMoreDetailHandler}
                icon={<FaCaretLeft />}
                iconPlacement="end"
                type="text"
                className="extra-content-divider-btn"
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
      </div>
    </>
  );
};

export default UsersRequestsDetailDeliveredRequestsInfo;
