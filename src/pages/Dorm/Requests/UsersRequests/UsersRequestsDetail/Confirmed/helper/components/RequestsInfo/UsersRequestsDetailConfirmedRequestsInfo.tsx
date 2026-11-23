import { useEffect, useState } from "react";

import { Form, Row } from "antd";
import { FaCaretLeft } from "react-icons/fa";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  useDormRequestsDeliverRoomMutation,
  useLazyGetDormRequestInformationQuery,
  useLazyGetDormRequestResidenceInfoQuery,
} from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { ConfirmedRequestBedDeliverModalFormType } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsList/helper/components/Confirmed/@types/@usersRequestsListConfirmed";

import RoomDeliverModalContent from "./helper/modals/RoomDeliverModalContent/RoomDeliverModalContent";
import {
  DormRequestInformationType,
  DormRequestResidenceInfo,
  DormRequestsDeliverRoomResponse,
  GetDormRequestInformationResponse,
  GetDormRequestResidenceInfoResponse,
} from "../../../../@types/@usersRequestsDetail";
import UsersRequestsDetailApplicantInfo from "../../../../_shared/components/UsersRequestsDetailApplicantInfo/UsersRequestsDetailApplicantInfo";
import UsersRequestsDetailRequestsInfo from "../../../../_shared/components/UsersRequestsDetailRequestsInfo/UsersRequestsDetailRequestsInfo";
import UserRequestRoomMoreInfoDrawerContent from "../../../../_shared/drawers/UserRequestRoomMoreInfoDrawerContent/UserRequestRoomMoreInfoDrawerContent";
import "./_usersRequestsDetailConfirmedRequestsInfo.scss";

const DELIVER_ROOM_SUCCESS_MSG = "اتاق مورد نظر با موفقیت به کاربر تحویل داده شد.";
const DOCUMENT_NECESSARY_MSG = "آپلود تصویر فرم ها الزامی می باشد.";

const UsersRequestsDetailConfirmedRequestsInfo = () => {
  const [requestInformation, setRequestInformation] =
    useState<DormRequestInformationType | null>(null);
  const [residenceInfo, setResidenceInfo] = useState<DormRequestResidenceInfo | null>(
    null
  );

  const [confirmedModal, setConfirmedModal] = useState(false);
  const [moreDetail, setMoreDetail] = useState(false);

  const [deliverBedModalStep, setDeliverBedModalStep] = useState(0);

  const { params } = useQueryParams();

  const [confirmedForm] = Form.useForm<ConfirmedRequestBedDeliverModalFormType>();
  const [firstImageName, setFirstImageName] = useState("");
  const [secondImageName, setSecondImageName] = useState("");

  //? ================================  Api Calls ================================
  const [getDormRequestInformation, { isFetching: isDormRequestInformationLoading }] =
    useLazyGetDormRequestInformationQuery();

  const [deliverRoom, { isLoading: isDeliverRoomLoading }] =
    useDormRequestsDeliverRoomMutation();

  const [getDormRequestResidenceInfo, { isFetching: isDormRequestResidenceInfoLoading }] =
    useLazyGetDormRequestResidenceInfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.id) {
      getDormRequestInformation(params?.id)
        .unwrap()
        .then(getDormRequestInformationSuccess);

      getDormRequestResidenceInfo(params?.id)
        .unwrap()
        .then(getDormRequestResidenceInfoSuccess);
    }
  }, [params?.id]);

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

  const closeConfirmedModalHandler = () => {
    setConfirmedModal(false);

    setFirstImageName("");
    setSecondImageName("");
    confirmedForm.resetFields();
  };
  const openConfirmedModalHandler = () => setConfirmedModal(true);

  const modalBackStepHandler = () => {
    setDeliverBedModalStep(0);
  };

  const uploadDocumentHandler = () => {
    if (firstImageName && secondImageName) {
      setDeliverBedModalStep(1);
    } else {
      toast.warning(DOCUMENT_NECESSARY_MSG, { toastId: DOCUMENT_NECESSARY_MSG });
    }
  };

  const deliverBedHandler = () => {
    confirmedForm.submit();

    confirmedForm.validateFields().then((value) => {
      deliverRoom({
        form: "BedDelivery",
        data: {
          id: +params?.id,
          fatherName: value?.fatherName,
          fatherFamily: value?.fatherFamily,
          fatherPhone: value?.fatherPhone,
          motherName: value?.motherName,
          motherFamily: value?.motherFamily,
          motherPhone: value?.motherPhone,
          wifeName: value?.spouseName,
          wifeFamily: value?.spouseFamily,
          wifePhone: value?.spousePhone,
          relativesName: value?.relativeName,
          relativesFamily: value?.relativeFamily,
          relativesPhone: value?.relativePhone,
          homePhone: value?.essentialPhoneNumber,
          maritalStatus: value?.maritalStatus?.code?.toString(),
          descDeliveryRoom: value?.description,
          kinship: value?.relativeRelative,
          AssociationfileRequest: [
            {
              uploadFileId: firstImageName,
            },
            {
              uploadFileId: secondImageName,
            },
          ],
        },
      })
        .unwrap()
        .then(deliverRoomSuccess);
    });
  };

  const deliverRoomSuccess = async (value: DormRequestsDeliverRoomResponse) => {
    if (value?.status === 204) {
      closeConfirmedModalHandler();
      toast.success(DELIVER_ROOM_SUCCESS_MSG, { toastId: DELIVER_ROOM_SUCCESS_MSG });
    }
  };

  //modals
  const openMoreDetailHandler = () => setMoreDetail(true);
  const closeMoreDetailHandler = () => setMoreDetail(false);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* ROOM DELIVER MODAL */}
      {confirmedModal && (
        <ConfirmationModalWithContent
          title="تحویل تخت"
          isModalOpen={confirmedModal}
          confirmBtnText={
            deliverBedModalStep === 0
              ? "بارگذاری مدارک و ادامه"
              : "تایید اطلاعات و تحویل خوابگاه"
          }
          closeModalHandler={
            deliverBedModalStep === 0 ? closeConfirmedModalHandler : modalBackStepHandler
          }
          onConfirmClickHandler={
            deliverBedModalStep === 0 ? uploadDocumentHandler : deliverBedHandler
          }
          backBtnText={deliverBedModalStep === 0 ? "انصراف" : "بازگشت"}
          content={
            <RoomDeliverModalContent
              form={confirmedForm}
              current={deliverBedModalStep}
              setFirstImageName={setFirstImageName}
              setSecondImageName={setSecondImageName}
            />
          }
          isConfirmButtonLoading={isDeliverRoomLoading}
          width={800}
        />
      )}
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
      <div className="users-requests-detail-confirmed-requests-info-container">
        <Div loading={isDormRequestInformationLoading} className="request-info">
          <CustomAlert
            type="success"
            showIcon
            description={`اتاق در تاریخ ${dataPlaceHolder({ data: requestInformation?.paymentDate, isDate: true })} به کاربر تحویل شده است..`}
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
        <div className="action-btn-container">
          <CustomButton type="primary" onClick={openConfirmedModalHandler}>
            تحویل داده شد
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default UsersRequestsDetailConfirmedRequestsInfo;
