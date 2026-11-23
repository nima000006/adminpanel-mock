import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetDormRequestInformationQuery } from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import {
  DormRequestInformationType,
  GetDormRequestInformationResponse,
} from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/@types/@usersRequestsDetail";
import UsersRequestsDetailApplicantInfo from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailApplicantInfo/UsersRequestsDetailApplicantInfo";
import UsersRequestsDetailRequestsInfo from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailRequestsInfo/UsersRequestsDetailRequestsInfo";

import PendingReviewRelocationResidenceInfo from "../../../../RoomAllocation/helper/sections/Relocation/helper/components/RelocationResidenceInfo/RelocationResidenceInfo";
import PendingReviewRelocationDrawerContent from "../../../../RoomAllocation/helper/sections/Relocation/helper/drawers/PendingReviewRelocationDrawerContent/PendingReviewRelocationDrawerContent";
import PendingReviewRelocationToAnotherRoomDrawerContent from "../../../../RoomAllocation/helper/sections/Relocation/helper/drawers/PendingReviewRelocationToAnotherRoomDrawerContent/PendingReviewRelocationToAnotherRoomDrawerContent";
import RoomAllocationRelocationRejectModalContent from "../../../../RoomAllocation/helper/sections/Relocation/helper/modals/RoomAllocationRelocationRejectModalContent/RoomAllocationRelocationRejectModalContent";
import "./_pendingReviewRelocationRequestInfo.scss";

const PendingReviewRelocationRequestInfo = () => {
  const [requestInformation, setRequestInformation] =
    useState<DormRequestInformationType | null>(null);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRelocationToAnotherRoomModalOpen, setIsRelocationToAnotherRoomModalOpen] =
    useState({
      isOpen: false,
      id: -1,
    });
  const [isRelocationModalOpen, setIsRelocationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [rejectForm] = Form.useForm();

  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getDormRequestInformation, { isFetching: isDormRequestInformationLoading }] =
    useLazyGetDormRequestInformationQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDormRequestInformation(id).unwrap().then(getDormRequestInformationSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const getDormRequestInformationSuccess = (value: GetDormRequestInformationResponse) => {
    if (value?.status === 200) {
      setRequestInformation(value?.data?.[0]);
    }
  };

  // رد درخواست
  const openRejectModalHandler = () => {
    setIsRejectModalOpen(true);
  };
  const closeRejectModalHandler = () => {
    setIsRejectModalOpen(false);
  };

  // جابچایی به یک اتاق دیگر
  const openRelocationToAnotherRoomHandler = () => {
    setIsRelocationToAnotherRoomModalOpen({
      isOpen: true,
      id: -1,
    });
  };
  const closeRelocationToAnotherRoomHandler = () => {
    setIsRelocationToAnotherRoomModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  // جابجایی
  const openRelocationHandler = () => {
    setIsRelocationModalOpen({
      isOpen: true,
      id: -1,
    });
  };
  const closeRelocationHandler = () => {
    setIsRelocationModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  return (
    <>
      {/* REJECT MODAL */}
      {isRejectModalOpen && (
        <ConfirmationModalWithContent
          title="رد درخواست"
          backBtnText="انصراف"
          confirmBtnText="رد درخواست"
          isModalOpen={isRejectModalOpen}
          isDangerous
          onConfirmClickHandler={() => {}}
          closeModalHandler={closeRejectModalHandler}
          content={<RoomAllocationRelocationRejectModalContent form={rejectForm} />}
        />
      )}

      {/* BED ALLOCATION DRAWER */}
      {isRelocationModalOpen?.isOpen && (
        <CustomDrawer
          onClose={closeRelocationHandler}
          open={isRelocationModalOpen?.isOpen}
          content={
            <PendingReviewRelocationDrawerContent
              closeDrawerHandler={closeRelocationHandler}
            />
          }
        />
      )}

      {/* RELOCATION TO ANOTHER ROOM DRAWER */}
      {isRelocationToAnotherRoomModalOpen?.isOpen && (
        <CustomDrawer
          onClose={closeRelocationToAnotherRoomHandler}
          open={isRelocationToAnotherRoomModalOpen?.isOpen}
          content={
            <PendingReviewRelocationToAnotherRoomDrawerContent
              closeDrawerHandler={closeRelocationToAnotherRoomHandler}
            />
          }
        />
      )}

      <div className="pending-review-relocation-requests-info-container">
        <Div loading={isDormRequestInformationLoading} className="alert-container">
          <CustomAlert
            type="warning"
            showIcon
            description={`این درخواست از تاریخ ${dataPlaceHolder({ data: requestInformation?.createDate, isDate: true })} در مرحله “در انتظار بررسی” است.`}
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

        <PendingReviewRelocationResidenceInfo title="مشخصات اقامتگاه فعلی" />
        <PendingReviewRelocationResidenceInfo title="مشخصات اقامتگاه درخواستی" />
        <div className="action-btns-container">
          <CustomButton type="primary" ghost danger onClick={openRejectModalHandler}>
            رد درخواست
          </CustomButton>
          <div className="relocation-btns-container">
            <CustomButton
              type="primary"
              ghost
              onClick={openRelocationToAnotherRoomHandler}
            >
              جابجایی به یک اتاق دیگر
            </CustomButton>
            <CustomButton type="primary" onClick={openRelocationHandler}>
              جابجایی
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingReviewRelocationRequestInfo;
