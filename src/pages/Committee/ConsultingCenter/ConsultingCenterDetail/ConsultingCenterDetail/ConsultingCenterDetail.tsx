import { useEffect, useState } from "react";

import { Button, Form } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { SendConsultingRegisterCommentResponse } from "./@types/@consultingCenterDetail";
import {
  NORMAL_SESSION,
  SESSION_CHANGE,
} from "./ConsultingCenterDetailHelpers/ConsultingCenterDetailHelpers";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import ConfirmationModalWithContent from "../../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "../../../../../components/Renderers/SingleVerticalItem/SingleVerticalItem";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "../../../../../infrastructure/helpers/utils";
import {
  useLazyGetConsultingCenterDetailReferralInfoQuery,
  useSendConsultingRegisterCommentMutation,
  useSendConsultingRejectSessionMutation,
  useSendConsultingSessionAllocationModalMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/consultingCenter/consultingCenterApi";
import { CONFIRMATION_MODAL_WIDTH_700 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  GENERAL_ERROR_MESSAGE,
  GENERAL_SUBMIT_SUCCESS,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import {
  ConsultingCenterSessionAllocationType,
  SendConsultingSessionAllocationModalResponse,
} from "../../ConsultingCenterDocuments/helper/components/DocumentsTable/@types/@documentsTable";
import { SendConsultingRejectSessionResponse } from "../../ConsultingCenterSessionList/helper/components/ConsultingCenterSessionListTable/@types/@ConsultingCenterSessionListTable";
import RejectSessionModalContent from "../RejectSessionModalContent/RejectSessionModalContent";
import SessionAllocationModalContent from "../SessionAllocationModalContent/SessionAllocationModalContent";
import SubmitCommentModalContent from "../SubmitCommentModalContent/SubmitCommentModalContent";
import "./_consultingCenterDetail.scss";

const ConsultingCenterDetail = () => {
  // const id = Number(new URLSearchParams(location.search).get("id"));
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  useTitle({ text: ` جزئیات پرونده ${id}` });
  const [assignForm] = Form.useForm();
  const [rejectForm] = Form.useForm();
  const [opinionForm] = Form.useForm();
  const [isSessionAllocationModalOpen, setIsSessionAllocationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isRejectSessionModalOpen, setIsRejectSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isChangeSessionModalOpen, setIsChangeSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [isSubmitCommentModalOpen, setIsSubmitCommentModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  //? ================================  Api Calls ================================
  // دریافت اطلاعات ارجاع
  const [
    getReferralInfo,
    { data: getReferralInfoData, isFetching: isGetReferralInfoLoading },
  ] = useLazyGetConsultingCenterDetailReferralInfoQuery();

  // ارسال اطلاعات مودال تخصیص جلسه
  const [sendSessionAllocation, { isLoading: isSessionAllocationLoading }] =
    useSendConsultingSessionAllocationModalMutation();

  // ارسال اطلاعات مودال لغو جلسه
  const [sendConsultingRejectSession, { isLoading: isConsultingRejectSessionLoading }] =
    useSendConsultingRejectSessionMutation();

  // ارسال اطلاعات مودال ثبت نظر
  const [
    sendConsultingRegisterComment,
    { isLoading: isConsultingRegisterCommentLoading },
  ] = useSendConsultingRegisterCommentMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getReferralInfo(+id);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  //تخصیص جلسه
  const closeSessionAllocationHandler = () => {
    setIsSessionAllocationModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  // این فانکشن زمانی اجرا میشود که ریکوئست ثبت مودال تخصیص جلسه موفقیت امیز باشد
  const onSendSessionAllocationSuccess = async (
    value: SendConsultingSessionAllocationModalResponse
  ) => {
    if (value?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      assignForm.resetFields();
      setIsSessionAllocationModalOpen({ isOpen: false, id: -1 });
      setIsChangeSessionModalOpen({ isOpen: false, id: -1 });
    }
  };
  // دکمه ثبت نهایی مودال تخصیص جلسه
  const sessionAllocationHandler = () => {
    assignForm.submit();
    assignForm
      ?.validateFields()
      .then((values: ConsultingCenterSessionAllocationType) => {
        sendSessionAllocation({
          form: "AllocationCounselingSessions",
          id: "2e85823f54b34b809e13997d1dd63a4d",
          _data_: {
            meetingType: values?.sessionType?.code,
            meetingStartTime: values?.startTime,
            placeMeeting: values?.sessionLocation?.code,
            meetingDate: values?.datePicker,
            meetingEndTime: values?.endTime,
            Consultant: values?.consultant?.code,
            desc: values?.description,
            notificationType: values?.notification?.code,
            fatherName: values?.fatherName,
            motherName: values?.motherName,
            fatherPhoneNumber: values?.fatherPhone,
            motherPhoneNumber: values?.motherPhone,
            sentMessage: values?.sendMessage,
            meetingStatus: 2,
            id: isChangeSessionModalOpen?.id >= 1 ? isChangeSessionModalOpen?.id : null,
          },
        })
          .unwrap()
          .then(onSendSessionAllocationSuccess);
      })
      .catch(() =>
        toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE })
      );
  };

  //لغو جلسه
  const closeRejectSessionHandler = () => {
    setIsRejectSessionModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  // این فانکشن زمانی اجرا میشود که ریکوئست لغو جلسه موفقیت آمیز باشد
  const onRejectSessionConfirmSuccess = async (
    value: SendConsultingRejectSessionResponse
  ) => {
    if (value?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      rejectForm.resetFields();
      setIsRejectSessionModalOpen({ isOpen: false, id: -1 });
    }
  };
  // دکمه ثبت لغو جلسه
  const rejectSessionConfirmHandler = () => {
    rejectForm?.submit();
    rejectForm
      .validateFields()
      .then((values: { description: string; reason: { children: string } }) => {
        sendConsultingRejectSession({
          form: "CancelCounselingSession",
          id: "72c23f36c7084c5d978e93f549736533",
          _data_: {
            descCancellation: values?.description,
            meetingStatus: 4,
            reasonCanceling: values?.reason?.children,
            id: isRejectSessionModalOpen?.id >= 1 ? isRejectSessionModalOpen?.id : null,
          },
        })
          .unwrap()
          .then(onRejectSessionConfirmSuccess);
      })
      .catch(() =>
        toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE })
      );
  };

  //تغییر جلسه
  const closeChangeSessionHandler = () => {
    setIsChangeSessionModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  //ثبت نظر
  const closeRegisterOpinionHandler = () => {
    setIsSubmitCommentModalOpen({
      isOpen: false,
      id: -1,
    });
  };

  // این فانکشن زمانی اجرا میشود که ریکوئست ثبت نظر موفقیت آمیز باشد
  const onSendConsultingRegisterCommentSuccess = async (
    value: SendConsultingRegisterCommentResponse
  ) => {
    if (value?.status === 200) {
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      opinionForm.resetFields();
      setIsSubmitCommentModalOpen({ isOpen: false, id: -1 });
    }
  };

  const registerOpinionHandler = () => {
    opinionForm?.submit();
    opinionForm
      .validateFields()
      .then((values: { comment: { children: string }; description: string }) => {
        sendConsultingRegisterComment({
          form: "RegisteringOpinionConsultant",
          id: "cfcf2a7b3c7e4778970a042cdc9fd070",
          _data_: {
            AssociationReferral: {
              recordOpinionCounseling: values?.comment?.children,
              descCounseling: values?.description,
              dateResponseCounseling: new Date().toISOString(),
              id: isSubmitCommentModalOpen?.id >= 1 ? isSubmitCommentModalOpen?.id : null,
            },
          },
        })
          .unwrap()
          .then(onSendConsultingRegisterCommentSuccess);
      })
      .catch(() =>
        toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE })
      );
  };
  // todo[shirin]: not ready api.
  //ارجاع
  // const [isCaseReferralModalOpen, setIsCaseReferralModalOpen] = useState(false);
  // const closeCaseReferralHandler = () => {
  //   setIsCaseReferralModalOpen(false);
  // };
  // const caseReferralConfirmHandler = () => {
  //   setIsCaseReferralModalOpen(false);
  // };

  // btn handler
  const sessionAllocationBtnHandler = (id: number) => {
    setIsSessionAllocationModalOpen({
      isOpen: true,
      id: id,
    });
  };
  const submitCommentHandler = (id: number) => {
    setIsSubmitCommentModalOpen({
      isOpen: true,
      id: id,
    });
  };

  const rejectSessionHandler = (id: number) => {
    setIsRejectSessionModalOpen({
      isOpen: true,
      id: id,
    });
  };

  const changeSessionHandler = (id: number) => {
    setIsChangeSessionModalOpen({
      isOpen: true,
      id: id,
    });
  };

  // todo[shirin]: not ready api.
  // const caseReferralHandler = () => {
  //   setIsCaseReferralModalOpen(true);
  // };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="committee-consulting-center-detail-container">
      {/* ---------------------------------- session allocation modal ---------------------------------- */}
      {isSessionAllocationModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تخصیص جلسه"
          isModalOpen={isSessionAllocationModalOpen?.isOpen}
          confirmBtnText="ثبت نهایی"
          closeModalHandler={closeSessionAllocationHandler}
          onConfirmClickHandler={sessionAllocationHandler}
          content={
            <SessionAllocationModalContent
              id={isSessionAllocationModalOpen?.id}
              assignForm={assignForm}
              from={NORMAL_SESSION}
            />
          }
          width={CONFIRMATION_MODAL_WIDTH_700}
          isConfirmButtonLoading={isSessionAllocationLoading}
          showIcon={false}
        />
      )}

      {/* ---------------------------------- submit comment modal ---------------------------------- */}
      {isSubmitCommentModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isSubmitCommentModalOpen?.isOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeRegisterOpinionHandler}
          onConfirmClickHandler={registerOpinionHandler}
          content={<SubmitCommentModalContent opinionForm={opinionForm} />}
          width={CONFIRMATION_MODAL_WIDTH_700}
          isConfirmButtonLoading={isConsultingRegisterCommentLoading}
          showIcon={false}
        />
      )}

      {/* ---------------------------------- reject session modal ---------------------------------- */}
      {isRejectSessionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="لغو جلسه"
          isModalOpen={isRejectSessionModalOpen?.isOpen}
          confirmBtnText="لغو جلسه"
          isDangerous={true}
          closeModalHandler={closeRejectSessionHandler}
          onConfirmClickHandler={rejectSessionConfirmHandler}
          content={
            <RejectSessionModalContent
              id={isRejectSessionModalOpen?.id}
              rejectForm={rejectForm}
            />
          }
          showIcon={false}
          width={CONFIRMATION_MODAL_WIDTH_700}
          isConfirmButtonLoading={isConsultingRejectSessionLoading}
        />
      )}

      {/* todo[shirin]: not ready api. */}
      {/* case referral modal */}
      {/* <ConfirmationModalWithContent
        title="ارجاع پرونده"
        isModalOpen={isCaseReferralModalOpen}
        confirmBtnText="ارجاع"
        closeModalHandler={closeCaseReferralHandler}
        onConfirmClickHandler={caseReferralConfirmHandler}
        content={<CaseReferralModalContent />}
        width={CONFIRMATION_MODAL_WIDTH_700}
      /> */}

      {/* ---------------------------------- change session ---------------------------------- */}
      {isChangeSessionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تغییر جلسه"
          isModalOpen={isChangeSessionModalOpen?.isOpen}
          confirmBtnText="ثبت نهایی"
          closeModalHandler={closeChangeSessionHandler}
          onConfirmClickHandler={sessionAllocationHandler}
          content={
            <SessionAllocationModalContent
              id={isChangeSessionModalOpen?.id}
              assignForm={assignForm}
              from={SESSION_CHANGE}
            />
          }
          width={CONFIRMATION_MODAL_WIDTH_700}
          showIcon={false}
        />
      )}

      <CustomCard>
        <CustomDivider text="اقدام" />
        <div className="btn-wrapper">
          <Button
            type="primary"
            className="btn"
            onClick={() => sessionAllocationBtnHandler(+id)}
          >
            تخصیص جلسه
          </Button>
          <Button
            type="primary"
            className="btn"
            onClick={() => submitCommentHandler(+id)}
          >
            ثبت نظر
          </Button>
          {/* <Button type="primary" className="btn" onClick={caseReferralHandler}>
            ارجاع
          </Button> */}
          <Button
            type="primary"
            danger
            className="btn"
            onClick={() => rejectSessionHandler(+id)}
          >
            لغو جلسه
          </Button>
          <Button
            type="primary"
            danger
            className="btn"
            onClick={() => changeSessionHandler(+id)}
          >
            تغییر جلسه
          </Button>
        </div>
      </CustomCard>
      <CustomCard loading={isGetReferralInfoLoading}>
        <CustomDivider text="اطلاعات ارجاع" />
        <div className="input-wrapper">
          <SingleVerticalItem
            label="ارجاع دهنده"
            value={dataPlaceHolder({
              data: getReferralInfoData?.data?.[0]
                ?.AssociationReferral_reasonSendToConsultant,
            })}
          />
          <SingleVerticalItem
            label="تاریخ ارجاع"
            value={dataPlaceHolder({
              data: getReferralInfoData?.data?.[0]
                ?.AssociationReferral_dateReportSendToConsultant,
              isDate: true,
            })}
          />
        </div>
        <SingleVerticalItem
          label="توضیحات پرونده"
          value={dataPlaceHolder({
            data: getReferralInfoData?.data?.[0]
              ?.AssociationReferral_descSendToConsultant,
          })}
        />
      </CustomCard>
    </div>
  );
};
export default ConsultingCenterDetail;
