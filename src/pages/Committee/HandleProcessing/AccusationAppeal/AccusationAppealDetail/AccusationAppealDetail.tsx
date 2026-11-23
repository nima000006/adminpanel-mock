import { useEffect, useState } from "react";

import { Button, Collapse, Form, Tabs } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import {
  GetAppealReferralRemovalResponse,
  MoveToClarificationCommitteeAppealResponse,
  MoveToReadyMeetingAppealCommitteeResponse,
  RecordOpinionSecretaryAppealResponse,
  RegisterCommentModalFormData,
  SendAppealCancelMoveToReadyMeetingResponse,
  SendAppealReferralRemovalResponse,
} from "./@types/@typesAccusationAppealDetail";
import {
  AccusedInfo,
  ClarificationCommitteeTransferModalContent,
  Items,
  ReadySessionTransferModalContent,
  ReferralRemovalModalContent,
  RegisterCommentModalContent,
} from "./accusationUtils/accusationUtils";
import AccusationCaseReferralAppealModal from "../../../../../components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/AccusationCaseReferralModal";
import AppealAccusationCaseVoteRegistrationModal from "../../../../../components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/AccusationCaseVoteRegistrationModal";
import SessionAllocationModal from "../../../../../components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/AllocationModal";
import { RejectSessionModalContent } from "../../../../../components/Committee/HandleProcessing/AppealAccusation/AppealAccusationUtils/RejectSessionModalContent";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import ConfirmationModalWithContent from "../../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { CheckBoxFormGenerator } from "../../../../../infrastructure/helpers/utils";
import {
  useLazyGetAccusedUserByIdQuery,
  useLazyGetAppealReferralRemovalQuery,
  useLazyGetRegisterCommentQuery,
  useMoveToClarificationAppealCommitteeMutation,
  useMoveToReadyMeetingAppealCommitteeMutation,
  useSendAppealCancelMoveToReadyMeetingMutation,
  useSendAppealReferralRemovalMutation,
  useSendRecordOpinionSecretaryAppealMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  CANCEL_MOVE_TO_READY_SUCCESS_MSG,
  MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG,
  MOVE_TO_READY_MEETING_SUCCESS_MSG,
  REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import "./_accusationAppealDetail.scss";

const AccusationAppealDetail = () => {
  const [isIssuedVoteEdited, setIsIssuedVoteEdited] = useState(false);
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  useTitle({ text: `${"پرونده اتهام"} ${id}` });

  //ارجاع
  const [referralModal, setReferralModal] = useState({ isOpen: false, id: -1 });
  // رفع ارجاع
  const [isReferralRemovalModalOpen, setIsReferralRemovalModalOpen] = useState(false);
  // انتقال به کمیته تفهیم
  const [
    isClarificationCommitteeTransferModalOpen,
    setIsClarificationCommitteeTransferModalOpen,
  ] = useState(false);
  // انتقال به آماده جلسه
  const [isReadySessionTransferModalOpen, setIsReadySessionTransferModalOpen] =
    useState(false);
  //تخصیص جلسه
  const [allocationModal, setAllocationModal] = useState({ isOpen: false, id: -1 });
  //عودت به آماده جلسه
  const [isReturnToSessionModalOpen, setIsReturnToSessionModalOpen] = useState(false);
  //ثبت نظر
  const [isRegisterCommentModalOpen, setIsRegisterCommentModalOpen] = useState(false);
  // ثبت رای
  const [isVoteRegistrationModalOpen, setIsVoteRegistrationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  //! forms
  //ثبت نظر
  const [registerCommentForm] = Form.useForm();
  // انتقال به کمیته تفهیم
  const [clarificationForm] = Form.useForm();
  // رفع ارجاع
  const [referralRemovalForm] = Form.useForm();

  //? ================================  Api Calls ================================
  // get detail data
  const [getAccusedUserById, { data: accusedData, isLoading: isAccusedDataLoading }] =
    useLazyGetAccusedUserByIdQuery();

  //ثبت نظر
  const [getRegisterComment, { data: registerCommentData }] =
    useLazyGetRegisterCommentQuery();

  const [
    sendRecordOpinionSecretaryAppeal,
    { isLoading: isSendRecordOpinionSecretaryAppealLoading },
  ] = useSendRecordOpinionSecretaryAppealMutation();

  //عودت به آماده جلسه
  const [cancelMoveToReadyMeeting, { isLoading: isCancelMoveToReadyMeetingLoading }] =
    useSendAppealCancelMoveToReadyMeetingMutation();

  // انتقال به آماده جلسه
  const [moveToReadyMeeting, { isLoading: isMoveToReadyMeetingLoading }] =
    useMoveToReadyMeetingAppealCommitteeMutation();

  // انتقال به کمیته تفهیم
  const [
    moveToClarificationCommittee,
    { isLoading: isMoveToClarificationCommitteeLoading },
  ] = useMoveToClarificationAppealCommitteeMutation();

  // رفع ارجاع
  const [getReferralRemoval, { isLoading: isGetReferralRemovalLoading }] =
    useLazyGetAppealReferralRemovalQuery();

  const [referralRemovalSubmit, { isLoading: isReferralRemovalSubmitLoading }] =
    useSendAppealReferralRemovalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAccusedUserById({
        maxResults: 1,
        id,
      });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  //عودت به آماده جلسه
  const cancelMoveToReadyMeetingOnSuccess = async (
    value: SendAppealCancelMoveToReadyMeetingResponse
  ) => {
    if (value?.status === 200) {
      setIsReturnToSessionModalOpen(false);
      toast.success(CANCEL_MOVE_TO_READY_SUCCESS_MSG, {
        toastId: CANCEL_MOVE_TO_READY_SUCCESS_MSG,
      });
    }
  };
  // انتقال به آماده جلسه
  const moveToReadyMeetingOnSuccess = async (
    value: MoveToReadyMeetingAppealCommitteeResponse
  ) => {
    if (value?.status === 200) {
      setIsReadySessionTransferModalOpen(false);
      toast.success(MOVE_TO_READY_MEETING_SUCCESS_MSG, {
        toastId: MOVE_TO_READY_MEETING_SUCCESS_MSG,
      });
    }
  };
  // انتقال به کمیته تفهیم
  const moveToClarificationCommitteeOnSuccess = async (
    value: MoveToClarificationCommitteeAppealResponse
  ) => {
    if (value?.status === 200) {
      setIsClarificationCommitteeTransferModalOpen(false);
      toast.success(MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG, {
        toastId: MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG,
      });
      clarificationForm?.resetFields();
    }
  };
  // رفع ارجاع
  const getReferralRemovalOnSuccess = async (value: GetAppealReferralRemovalResponse) => {
    if (value?.status === 200) {
      referralRemovalForm.setFieldsValue({
        referralRemovalItems: [
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_appealReferralToCustody,
            "sentToSecurity"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_appealReferralToStudentVice,
            "sentToStudentVice"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_appealReferralToEducAssistant,
            "sentToEducationalAssistant"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_appealReferralToResearchAssistant,
            "sentToResearchAssistant"
          ),
        ],
      });
    }
  };
  const referralRemovalSubmitOnSuccess = async (
    value: SendAppealReferralRemovalResponse
  ) => {
    if (value?.status === 200) {
      setIsReferralRemovalModalOpen(false);
      toast.success(REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG, {
        toastId: REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG,
      });
    }
  };

  //! Referral Modal ارجاع
  const openReferralReportModalHandler = () => {
    if (id) {
      setReferralModal({ isOpen: true, id: +id });
    }
  };
  const closeReferralModalHandler = () => setReferralModal({ isOpen: false, id: -1 });

  // Removal Referral Modal رفع ارجاع
  const closeReferralRemovalModalHandler = () => {
    setIsReferralRemovalModalOpen(false);
  };
  const openReferralRemovalModalHandler = () => {
    setIsReferralRemovalModalOpen(true);
    if (id) {
      getReferralRemoval(id).unwrap().then(getReferralRemovalOnSuccess);
    }
  };

  const referralRemovalHandler = () => {
    referralRemovalForm.submit();
    referralRemovalForm
      .validateFields()
      .then((value: { referralRemovalItems: string[] }) => {
        referralRemovalSubmit({
          form: "RemovalChargeReference",
          id: "a036b0a734534600913d75875b0475bd",
          _data_: {
            AssociationReferral: {
              appealReferralToCustody:
                value?.referralRemovalItems?.includes("sentToSecurity"),
              appealReferralToEducAssistant: value?.referralRemovalItems?.includes(
                "sentToEducationalAssistant"
              ),
              appealReferralToResearchAssistant: value?.referralRemovalItems?.includes(
                "sentToResearchAssistant"
              ),
              appealReferralToStudentVice:
                value?.referralRemovalItems?.includes("sentToStudentVice"),
            },
            id: +id,
          },
        })
          .unwrap()
          .then(referralRemovalSubmitOnSuccess);
      });
  };

  // Clarification Committee Transfer Modal انتقال به کمیته تفهیم
  const closeClarificationCommitteeTransferModalHandler = () => {
    setIsClarificationCommitteeTransferModalOpen(false);
  };
  const openClarificationCommitteeTransferModalHandler = () => {
    setIsClarificationCommitteeTransferModalOpen(true);
  };
  const clarificationCommitteeTransferHandler = () => {
    clarificationForm?.submit();
    clarificationForm
      ?.validateFields()
      .then((value: { referralRemovalItems: string }) => {
        if (id) {
          moveToClarificationCommittee({
            form: "AppealTransferToUnderstanding",
            id: "899c29d140b949c18a6c34372f7200ab",
            _data_: {
              caseLatestState: +value?.referralRemovalItems,
              appealTypeUnderstanding:
                value?.referralRemovalItems === "4"
                  ? "دعوت به دبیر خانه"
                  : "دریافت سیستمی دفاعیه",
              id: +id,
            },
          })
            .unwrap()
            .then(moveToClarificationCommitteeOnSuccess);
        }
      });
  };

  // Ready Session Transfer Modal انتقال به آماده جلسه
  const closeReadySessionTransferModalHandler = () => {
    setIsReadySessionTransferModalOpen(false);
  };
  const openReadySessionTransferModalHandler = () => {
    setIsReadySessionTransferModalOpen(true);
  };
  const readySessionTransferHandler = () => {
    if (id) {
      moveToReadyMeeting({
        form: "AppealMoveToReadyMeeting",
        id: "c61aecb4b4e048948500fec322db2152",
        _data_: {
          id: +id,
          statusAppealsCommittee: 5,
        },
      })
        .unwrap()
        .then(moveToReadyMeetingOnSuccess);
    }
  };

  // Allocation Modal تخصیص جلسه
  const openAllocationModalHandler = () => {
    if (id) {
      setAllocationModal({ isOpen: true, id: +id });
    }
  };
  const closeAllocationModalHandler = () => setAllocationModal({ isOpen: false, id: -1 });

  // Ready Session Transfer Modal عودت به آماده جلسه
  const closeReturnToSessionModalHandler = () => {
    setIsReturnToSessionModalOpen(false);
  };
  const openReturnToSessionModalHandler = () => {
    setIsReturnToSessionModalOpen(true);
  };
  const returnToSessionHandler = () => {
    if (id) {
      cancelMoveToReadyMeeting({
        form: "AppealCancelMoveToReadyMeeting",
        id: "65384266af3d4670b43187b78eb4bef2",
        _data_: {
          appealMeeting: null,
          id: +id,
          statusAppealsCommittee: "5",
        },
      })
        .unwrap()
        .then(cancelMoveToReadyMeetingOnSuccess);
    }
  };

  // Register Commit Modal ثبت نظر
  const closeRegisterCommentModalHandler = () => {
    setIsRegisterCommentModalOpen(false);
  };
  const openRegisterCommentModalHandler = () => {
    setIsRegisterCommentModalOpen(true);
    getRegisterComment(null);
  };
  const registerCommentHandler = () => {
    registerCommentForm?.submit();
    registerCommentForm?.validateFields().then((value: RegisterCommentModalFormData) => {
      if (id) {
        sendRecordOpinionSecretaryAppeal({
          form: "RecordOpinionSecretaryAppeal",
          id: "54698e8ee80b435d9597711bc73bacb2",
          _data_: {
            AssociationReferral: {
              dateRegistrationSecretaryAppeal: new Date().toISOString(),
              secretaryAppealDesc: value?.registerDescription,
              secretaryAppealOpinion: value?.registerComment?.children,
            },
            id: +id,
          },
        })
          .unwrap()
          .then(sendRecordOpinionSecretaryAppealOnSuccess);
      }
    });
  };
  const sendRecordOpinionSecretaryAppealOnSuccess = async (
    value: RecordOpinionSecretaryAppealResponse
  ) => {
    if (value.status === 200) {
      toast.success("   ثبت نظر درخواست با موفقیت انجام شد.", {
        toastId: "   ثبت نظر درخواست با موفقیت انجام شد.",
      });
      closeRegisterCommentModalHandler();
      registerCommentForm?.resetFields();
    }
  };

  // Vote Registration Modal  ثبت رای
  const closeVoteRegistrationModalHandler = () => {
    setIsVoteRegistrationModalOpen({ isOpen: false, id: -1 });
  };
  const openVoteRegistrationModalHandler = () => {
    setIsVoteRegistrationModalOpen({ isOpen: true, id: +id });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="committee-appeal-accusation-case-page-container">
      {/* انتقال به کمیته تفهیم */}
      {isClarificationCommitteeTransferModalOpen && (
        <ConfirmationModalWithContent
          title="انتقال به کمیته تفهیم"
          isModalOpen={isClarificationCommitteeTransferModalOpen}
          confirmBtnText="انتقال به کمیته تفهیم"
          closeModalHandler={closeClarificationCommitteeTransferModalHandler}
          onConfirmClickHandler={clarificationCommitteeTransferHandler}
          isConfirmButtonLoading={isMoveToClarificationCommitteeLoading}
          width={600}
          content={
            <ClarificationCommitteeTransferModalContent form={clarificationForm} />
          }
          showIcon={false}
        />
      )}

      {/*تخصیص جلسه  */}
      {allocationModal?.isOpen && (
        <SessionAllocationModal
          setIsModalOpen={closeAllocationModalHandler}
          isModalOpen={allocationModal}
        />
      )}

      {/*  عودت به آماده جلسه*/}
      {isReturnToSessionModalOpen && (
        <ConfirmationModalWithContent
          title="عودت به آماده جلسه"
          isModalOpen={isReturnToSessionModalOpen}
          confirmBtnText="عودت به آماده جلسه"
          closeModalHandler={closeReturnToSessionModalHandler}
          onConfirmClickHandler={returnToSessionHandler}
          isDangerous={true}
          isConfirmButtonLoading={isCancelMoveToReadyMeetingLoading}
          content={<RejectSessionModalContent />}
          showIcon={false}
        />
      )}

      {/* انتقال به آماده جلسه */}
      {isReadySessionTransferModalOpen && (
        <ConfirmationModalWithContent
          title="انتقال به آماده جلسه"
          isModalOpen={isReadySessionTransferModalOpen}
          confirmBtnText="انتقال به آماده جلسه"
          closeModalHandler={closeReadySessionTransferModalHandler}
          onConfirmClickHandler={readySessionTransferHandler}
          isConfirmButtonLoading={isMoveToReadyMeetingLoading}
          content={<ReadySessionTransferModalContent />}
          showIcon={false}
        />
      )}

      {/* ثبت نظر */}
      {isRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeRegisterCommentModalHandler}
          onConfirmClickHandler={registerCommentHandler}
          isConfirmButtonLoading={isSendRecordOpinionSecretaryAppealLoading}
          content={
            <RegisterCommentModalContent
              commentList={registerCommentData?.data && registerCommentData?.data}
              form={registerCommentForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* ارجاع */}
      {referralModal?.isOpen && (
        <AccusationCaseReferralAppealModal
          isModalOpen={referralModal}
          closeModalHandler={closeReferralModalHandler}
        />
      )}

      {/* رفع ارجاع */}
      {isReferralRemovalModalOpen && (
        <ConfirmationModalWithContent
          title="رفع ارجاع"
          isModalOpen={isReferralRemovalModalOpen}
          confirmBtnText="رفع ارجاع"
          closeModalHandler={closeReferralRemovalModalHandler}
          onConfirmClickHandler={referralRemovalHandler}
          isConfirmButtonLoading={isReferralRemovalSubmitLoading}
          width={700}
          content={
            <ReferralRemovalModalContent
              form={referralRemovalForm}
              loading={isGetReferralRemovalLoading}
            />
          }
          showIcon={false}
        />
      )}

      {/* ثبت رای */}
      {isVoteRegistrationModalOpen?.isOpen && (
        <AppealAccusationCaseVoteRegistrationModal
          isModalOpen={isVoteRegistrationModalOpen}
          closeModalHandler={closeVoteRegistrationModalHandler}
          setIsIssuedVoteEdited={setIsIssuedVoteEdited}
        />
      )}

      <CustomCard padding={PADDING_20} className="actions">
        <CustomDivider text="اقدام" />
        <div className="actions-button-container">
          <Button
            type="primary"
            className="action-btn"
            onClick={openReferralReportModalHandler}
          >
            ارجاع
          </Button>
          <Button
            type="primary"
            className="action-btn"
            onClick={openReferralRemovalModalHandler}
          >
            رفع ارجاع
          </Button>

          <Button
            type="primary"
            className="action-btn"
            onClick={openClarificationCommitteeTransferModalHandler}
          >
            انتقال به کمیته تفهیم
          </Button>
          <Button
            type="primary"
            className="action-btn"
            onClick={openReadySessionTransferModalHandler}
          >
            انتقال به آماده جلسه
          </Button>
          <Button
            type="primary"
            className="action-btn"
            onClick={openAllocationModalHandler}
          >
            تخصیص جلسه
          </Button>
          <Button
            type="primary"
            className="action-btn"
            onClick={openReturnToSessionModalHandler}
          >
            عودت به آماده جلسه
          </Button>
          <Button
            type="primary"
            className="action-btn"
            onClick={openRegisterCommentModalHandler}
          >
            ثبت نظر
          </Button>
          <Button
            type="primary"
            className="action-btn"
            onClick={openVoteRegistrationModalHandler}
          >
            ثبت رای
          </Button>
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_20} loading={isAccusedDataLoading}>
        <div className="accused-info-container">
          <CustomDivider text="اطلاعات متهم" />
          <Collapse
            expandIcon={({ isActive }) => (
              <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
            )}
            ghost
            items={AccusedInfo(accusedData?.data[0])}
          />
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_20}>
        <div className="accusation-tabs-container">
          <Tabs
            type="card"
            items={Items(id, isIssuedVoteEdited)}
            dir="rtl"
            destroyInactiveTabPane={true}
          />
        </div>
      </CustomCard>
    </Form>
  );
};

export default AccusationAppealDetail;
