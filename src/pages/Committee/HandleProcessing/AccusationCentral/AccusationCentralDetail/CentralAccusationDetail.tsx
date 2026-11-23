import { useEffect, useState } from "react";

import { Button, Collapse, Form, Tabs } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import ReferralModal from "@pages/Committee/_shared/modals/ReferralModal/ReferralModal";

import {
  CentralAccusationSendCancelMoveToReadyMeetingResponse,
  CentralAccusationSendMoveToClarificationCommitteeResponse,
  CentralAccusationSendMoveToReadyMeetingResponse,
  CentralAccusationSendRecordOpinionResponse,
  CentralAccusationSendReferralRemovalResponse,
  CentralAccusationSendRegisterVoteResponse,
  CentralAccusationSendSessionAllocationResponse,
  getCentralAccusationReferralRemovalResponse,
} from "./@types/@centralAccusationDetail";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import ConfirmationModalWithContent from "../../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { CheckBoxFormGenerator } from "../../../../../infrastructure/helpers/utils";
import {
  ConfirmRegisterVoteValuesType,
  RegisterCommentValuesType,
  clarificationCommitteeTransferValuesType,
} from "../../../../../infrastructure/models/modules/committee/handleProcessing/accusationCenteral/accusationCenteral";
import { useLazyGetNoticesQuery } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useCentralAccusationSendCancelMoveToReadyMeetingMutation,
  useCentralAccusationSendMoveToClarificationCommitteeMutation,
  useCentralAccusationSendMoveToReadyMeetingMutation,
  useCentralAccusationSendRecordOpinionMutation,
  useCentralAccusationSendReferralRemovalMutation,
  useCentralAccusationSendRegisterVoteMutation,
  useCentralAccusationSendSessionAllocationMutation,
  useLazyGetAccusedUserByIdQuery,
  useLazyGetCentralAccusationReferralRemovalQuery,
  useLazyGetOtherFilesQuery,
  useLazyGetPreliminaryMeetingQuery,
  useLazyGetPrimaryProviderQuery,
  useLazyGetRegisterCommentQuery,
  useLazyGetSessionDurationQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import {
  CANCEL_MOVE_TO_READY_SUCCESS_MSG,
  MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG,
  MOVE_TO_READY_MEETING_SUCCESS_MSG,
  REGISTER_ALLOCATION_MEETING_SUCCESS_MSG,
  REGISTER_COMMENT_SUCCESS_MSG,
  VOTE_SUBMIT_MSG,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import { sessionAllocationValuesType } from "../../Accusations/AccusationCase/@types/@typesCommitteeAccusationCase";
import {
  AccusationCaseSessionAllocationModal,
  AccusedInfo,
  CentralAccusationVoteRegistrationModal,
  ClarificationCommitteeTransferModalContent,
  Items,
  ReadySessionTransferModalContent,
  ReferralRemovalModalContent,
  RegisterCommentModalContent,
  ReturnToSessionModalContent,
} from "../../Accusations/AccusationCase/accusationUtils/accusationUtils";
import { REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG } from "../../Reports/ReportDetail/consts";
import "./_centralAccusationDetail.scss";

const CentralAccusationDetail = () => {
  const [isIssuedVoteEdited, setIsIssuedVoteEdited] = useState(false);
  const [searchParams] = useSearchParams();
  const { id, isFromWarding } = Object.fromEntries([...searchParams]);
  //  ارجاع
  // رفع ارجاع
  const [referralRemovalForm] = Form.useForm();
  // انتقال به کمیته تفهیم
  const [clarificationForm] = Form.useForm();
  // تخصیص جلسه
  const [allocationForm] = Form.useForm();
  //ثبت نظر
  const [registerCommentForm] = Form.useForm();
  //ثبت رای
  const [registerVoteForm] = Form.useForm();

  useTitle({ text: `${"پرونده اتهام"} ${id}` });

  //ارجاع
  const [isReferralModal, setReferralModal] = useState({ isOpen: false, id: -1 });
  //رفع ارجاع
  const [isReferralRemovalModalOpen, setIsReferralRemovalModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  // انتقال به کمیته تفهیم
  const [
    isClarificationCommitteeTransferModalOpen,
    setIsClarificationCommitteeTransferModalOpen,
  ] = useState({ isOpen: false, id: -1 });

  // انتقال به آماده جلسه
  const [isReadySessionTransferModalOpen, setIsReadySessionTransferModalOpen] =
    useState(false);
  // تخصیص جلسه
  const [isAllocationModal, setAllocationModal] = useState({ isOpen: false, id: -1 });
  // عودت به آماده جلسه
  const [isReturnToSessionModalOpen, setIsReturnToSessionModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  //ثبت نظر
  const [isRegisterCommentModalOpen, setIsRegisterCommentModalOpen] = useState(false);
  // ثبت رای
  const [isVoteRegistrationModalOpen, setIsVoteRegistrationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [selectionSession, setSelectionSession] = useState<number>();

  // get detail data
  const [getAccusedUserById, { data: accusedData, isLoading: isAccusedDataLoading }] =
    useLazyGetAccusedUserByIdQuery();

  //? ================================  Api Calls ================================
  // ارجاع
  // get reasons list
  // const [getReasonsReferral, { data: reasonsReferralData }] =
  //   useLazyGetReasonsReferralQuery();

  // // send referral
  // const [sendReferral, { isLoading: isSendReferralLoading }] =
  //   useCentralAccusationSendReferralModalMutation();

  // رفع ارجاع
  // get referral removal
  const [getReferralRemoval, { isLoading: isGetReferralRemovalLoading }] =
    useLazyGetCentralAccusationReferralRemovalQuery();

  // send referral removal
  const [sendReferralRemoval, { isLoading: isReferralRemovalSubmitLoading }] =
    useCentralAccusationSendReferralRemovalMutation();

  // send clarification committee انتقال به کمیته تفهیم
  const [
    moveToClarificationCommittee,
    { isLoading: isMoveToClarificationCommitteeLoading },
  ] = useCentralAccusationSendMoveToClarificationCommitteeMutation();

  //انتقال به آماده جلسه
  const [moveToReadyMeeting, { isLoading: isMoveToReadyMeetingLoading }] =
    useCentralAccusationSendMoveToReadyMeetingMutation();

  // تخصیص جلسه
  // جلسه انتخابی
  const [getPreliminaryMeeting, { data: preliminaryMeetingData }] =
    useLazyGetPreliminaryMeetingQuery();
  // زمان
  const [getSessionDuration, { data: sessionDurationData }] =
    useLazyGetSessionDurationQuery();
  // ارائه دهنده
  const [getPrimaryProvider, { data: primaryProviderData }] =
    useLazyGetPrimaryProviderQuery();
  // نوع
  const [getNoticesType, { data: noticesTypeData }] = useLazyGetNoticesQuery();

  // جلسه های دیگر
  const [
    getOtherSessions,
    { data: otherSessionsData, isLoading: isOtherSessionsLoading },
  ] = useLazyGetOtherFilesQuery();

  // ارسال تخصیص جلسه
  const [sendSessionAllocationModal, { isLoading: isAllocationMeetingLoading }] =
    useCentralAccusationSendSessionAllocationMutation();

  // عودت به آماده جلسه
  const [cancelMoveToReadyMeeting, { isLoading: isCancelMoveToReadyMeetingLoading }] =
    useCentralAccusationSendCancelMoveToReadyMeetingMutation();

  // ثبت نظر
  // دریافت لیست نظرات
  const [getRegisterComment, { data: registerCommentData }] =
    useLazyGetRegisterCommentQuery();

  // ارسال نظر
  const [sendRecordOpinion, { isLoading: isSendRecordOpinionLoading }] =
    useCentralAccusationSendRecordOpinionMutation();

  // ثبت رای
  const [registerPrimaryVote, { isLoading: isRegisterPrimaryVoteLoading }] =
    useCentralAccusationSendRegisterVoteMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getAccusedUserById({
        maxResults: 1,
        id,
      });
    }
  }, [id]);

  // مودال تخصیص جلسه
  useEffect(() => {
    if (isAllocationModal?.isOpen) {
      getPreliminaryMeeting();
      getSessionDuration({ firstResult: 0, maxResults: 8 });
      getPrimaryProvider();
      getNoticesType({ firstResult: 0, maxResults: 8 });
    }
  }, [isAllocationModal?.isOpen]);

  // جلسه های دیگر
  useEffect(() => {
    if (selectionSession) {
      getOtherSessions({ maxResults: 8, AssociationMeeting_id_EQ: selectionSession });
    }
  }, [selectionSession]);

  //* ================================ Util Functions ================================
  // Referral Modal ارجاع
  const openReferralReportModalHandler = () => {
    if (id) {
      setReferralModal({ isOpen: true, id: +id });
    }
  };
  const closeReferralModalHandler = () => setReferralModal({ isOpen: false, id: +id });

  // const sendReferralOnSuccess = async (
  //   value?: CentralAccusationSendReferralModalResponse
  // ) => {
  //   if (value?.status === 200) {
  //     closeReferralModalHandler();
  //     toast.success(SEND_REFERRAL_SUCCESS_MSG, {
  //       toastId: SEND_REFERRAL_SUCCESS_MSG,
  //     });
  //     referralForm?.resetFields();
  //   }
  // };

  // const referralHandler = () => {
  //   referralForm?.submit();
  //   referralForm.validateFields().then((values: ReferralHandlerValuesType) => {
  //     sendReferral({
  //       form: "CentrulReferralCharges",
  //       id: "6d6b95b5dca34c888d190505f281b28c",
  //       _data_: {
  //         AssociationReferral: {
  //           CentralReferralToCustody: values?.CentralReferralToCustody,
  //           CentralDescReferralToCustody: values?.description,
  //           CentralReasonReferralToCustody: values?.reason?.children,
  //         },
  //         id: +id,
  //       },
  //     })
  //       .unwrap()
  //       .then(sendReferralOnSuccess);
  //   });
  // };

  // Removal Referral Modal رفع ارجاع
  const closeReferralRemovalModalHandler = () => {
    setIsReferralRemovalModalOpen({ isOpen: false, id: -1 });
  };
  const openReferralRemovalModalHandler = () => {
    setIsReferralRemovalModalOpen({ isOpen: true, id: -1 });
    if (id) {
      getReferralRemoval(+id).unwrap().then(getReferralRemovalOnSuccess);
    }
  };

  const getReferralRemovalOnSuccess = async (
    value: getCentralAccusationReferralRemovalResponse
  ) => {
    if (value?.status === 200) {
      referralRemovalForm.setFieldsValue({
        referralRemovalItems: [
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_CentralReferralToCustody,
            "sentToSecurity"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_CentralReferralToStudentVice,
            "sentToStudentVice"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_CentralReferralToEducAssistant,
            "sentToEducationalAssistant"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_CentralReferralToResearchAssistant,
            "sentToResearchAssistant"
          ),
        ],
      });
    }
  };

  // ثبت رفع ارجاع
  const referralRemovalSubmitOnSuccess = async (
    value: CentralAccusationSendReferralRemovalResponse
  ) => {
    if (value?.status === 200) {
      setIsReferralRemovalModalOpen({ isOpen: false, id: -1 });
      toast.success(REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG, {
        toastId: REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG,
      });
    }
  };

  const referralRemovalHandler = () => {
    referralRemovalForm?.submit();
    referralRemovalForm.validateFields().then((values) => {
      sendReferralRemoval({
        form: "CentrulRemovalChargeReference",
        id: "a325f230559e41ca9b6dfe2c7bc22d50",
        _data_: {
          AssociationReferral: {
            CentralReferralToCustody:
              values?.referralRemovalItems?.includes("sentToSecurity"),
            CentralReferralToResearchAssistant: values?.referralRemovalItems?.includes(
              "sentToResearchAssistant"
            ),
            CentralReferralToEducAssistant: values?.referralRemovalItems?.includes(
              "sentToEducationalAssistant"
            ),
            CentralReferralToStudentVice:
              values?.referralRemovalItems?.includes("sentToStudentVice"),
          },
          id: +id,
        },
      })
        .unwrap()
        .then(referralRemovalSubmitOnSuccess);
    });
  };

  // انتقال به کمیته تفهیم
  const closeClarificationCommitteeTransferModalHandler = () => {
    setIsClarificationCommitteeTransferModalOpen({ isOpen: false, id: -1 });
  };
  const openClarificationCommitteeTransferModalHandler = () => {
    setIsClarificationCommitteeTransferModalOpen({ isOpen: true, id: -1 });
  };
  const moveToClarificationCommitteeOnSuccess = async (
    value: CentralAccusationSendMoveToClarificationCommitteeResponse
  ) => {
    if (value?.status === 200) {
      setIsClarificationCommitteeTransferModalOpen({ isOpen: false, id: -1 });
      toast.success(MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG, {
        toastId: MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG,
      });
      clarificationForm?.resetFields();
    }
  };

  const clarificationCommitteeTransferHandler = () => {
    clarificationForm?.submit();
    clarificationForm
      .validateFields()
      .then((values: clarificationCommitteeTransferValuesType) => {
        if (id && values.referralRemovalItems) {
          moveToClarificationCommittee({
            form: "CentrulTransferToUnderstanding",
            id: "bdedfb5107cf47319d9cd842a172ed08",
            _data_: {
              caseLatestState: +values?.referralRemovalItems,
              statusCentralCommittee: "3",
              id: +id,
              AssociationStatusCentrulCommittee_title: null,
            },
          })
            .unwrap()
            .then(moveToClarificationCommitteeOnSuccess);
        }
      });
  };

  // انتقال به آماده جلسه
  const closeReadySessionTransferModalHandler = () => {
    setIsReadySessionTransferModalOpen(false);
  };
  const openReadySessionTransferModalHandler = () => {
    setIsReadySessionTransferModalOpen(true);
  };

  const moveToReadyMeetingOnSuccess = async (
    value: CentralAccusationSendMoveToReadyMeetingResponse
  ) => {
    if (value?.status === 200) {
      setIsReadySessionTransferModalOpen(false);
      toast.success(MOVE_TO_READY_MEETING_SUCCESS_MSG, {
        toastId: MOVE_TO_READY_MEETING_SUCCESS_MSG,
      });
    }
  };

  const readySessionTransferHandler = () => {
    if (id) {
      moveToReadyMeeting({
        form: "CentrulMoveToReadyMeeting",
        id: "840068e66b0f487c96a8c2d11cc5574d",
        _data_: {
          statusCentralCommittee: 5,
          id: +id,
          AssociationViolationStatus_title: null,
        },
      })
        .unwrap()
        .then(moveToReadyMeetingOnSuccess);
    }
  };

  // تخصیص جلسه
  const openAllocationModalHandler = () => {
    if (id) {
      setAllocationModal({ isOpen: true, id: +id });
    }
  };
  const closeAllocationModalHandler = () => setAllocationModal({ isOpen: false, id: -1 });

  const sendSessionAllocationOnSuccess = async (
    value: CentralAccusationSendSessionAllocationResponse
  ) => {
    if (value?.status === 200) {
      toast.success(REGISTER_ALLOCATION_MEETING_SUCCESS_MSG, {
        toastId: REGISTER_ALLOCATION_MEETING_SUCCESS_MSG,
      });
      closeAllocationModalHandler();
      allocationForm?.resetFields();
    }
  };

  const sessionAllocationHandler = () => {
    allocationForm.submit();
    allocationForm.validateFields().then((values: sessionAllocationValuesType) => {
      if (isAllocationModal.id && +isAllocationModal.id > 0) {
        sendSessionAllocationModal({
          form: "AllocationCentrulMeeting",
          id: "e726b299999e47d3835ff6fcc1c15486",
          _data_: {
            centrulNeedToBePresent: values?.needToBePresent ? true : false,
            centrulMeeting: values?.selectSession?.value,
            centrulReviewPeriod: values?.reviewPeriod?.children,
            centrulProvider: values?.provider?.children,
            primaryNotificationType: values?.notificationType,
            primaryNotificationMessage: values?.notificationMessage,
            id: +isAllocationModal?.id,
          },
        })
          .unwrap()
          .then(sendSessionAllocationOnSuccess);
      }
    });
  };

  // عودت به اماده جلسه
  const closeReturnToSessionModalHandler = () => {
    setIsReturnToSessionModalOpen({ isOpen: false, id: -1 });
  };
  const openReturnToSessionModalHandler = () => {
    setIsReturnToSessionModalOpen({ isOpen: true, id: -1 });
  };
  const returnToSessionHandler = () => {
    if (id) {
      cancelMoveToReadyMeeting({
        form: "CentrulCancelMoveToReadyMeeting",
        id: "31dcf2640a1343d89e3cf73b9169a70a",
        _data_: {
          statusCentralCommittee: "5",
          id: +id,
          centrulMeeting: null,
        },
      })
        .unwrap()
        .then(cancelMoveToReadyMeetingOnSuccess);
    }
  };

  const cancelMoveToReadyMeetingOnSuccess = async (
    value: CentralAccusationSendCancelMoveToReadyMeetingResponse
  ) => {
    if (value?.status === 200) {
      setIsReturnToSessionModalOpen({ isOpen: false, id: -1 });
      toast.success(CANCEL_MOVE_TO_READY_SUCCESS_MSG, {
        toastId: CANCEL_MOVE_TO_READY_SUCCESS_MSG,
      });
    }
  };

  // ثبت نظر
  const closeRegisterCommentModalHandler = () => {
    setIsRegisterCommentModalOpen(false);
  };
  const openRegisterCommentModalHandler = () => {
    setIsRegisterCommentModalOpen(true);
    getRegisterComment(null);
  };
  const registerCommentHandler = () => {
    registerCommentForm?.submit();
    registerCommentForm.validateFields().then((values: RegisterCommentValuesType) => {
      if (id) {
        sendRecordOpinion({
          form: "RecordOpinionSecretaryCentrul",
          id: "435b909a499d4c288ad305432d7c682a",
          _data_: {
            AssociationReferral: {
              secretaryCentralOpinion: values?.registerComment?.children,
              dateRegistrationSecretaryCentral: new Date().toISOString(),
              secretaryCentralDesc: values?.registerDescription,
            },
            id: +id,
          },
        })
          .unwrap()
          .then(sendRecordOpinionSecretaryPreliminaryOnSuccess);
      }
    });
  };
  const sendRecordOpinionSecretaryPreliminaryOnSuccess = async (
    value: CentralAccusationSendRecordOpinionResponse
  ) => {
    if (value.status === 200) {
      toast.success(REGISTER_COMMENT_SUCCESS_MSG, {
        toastId: REGISTER_COMMENT_SUCCESS_MSG,
      });
      closeRegisterCommentModalHandler();
      registerCommentForm?.resetFields();
    }
  };

  // ثبت رای
  const closeVoteRegistrationModalHandler = () => {
    setIsVoteRegistrationModalOpen({ isOpen: false, id: -1 });
  };
  const openVoteRegistrationModalHandler = () => {
    setIsVoteRegistrationModalOpen({ isOpen: true, id: +id });
  };

  const voteRecordsGenerator = (vote: any) => {
    return Array.from(
      { length: vote?.numberPreliminaryPunishments?.value },
      (_, index) => {
        return {
          AssociationCentralRulings:
            vote?.[`disciplinaryPunishmentIssued_${index + 1}`]?.item,
          certainty: vote?.[`certainty_${index + 1}`]?.title,
          executionStatus: vote?.[`sentenceExecutionStatus_${index + 1}`]?.title,
          executionDate: vote?.[`sentenceExecutionDate_${index + 1}`],
          legalArticle: vote?.[`articleRelativeLaw_${index + 1}`]?.title,
          reasonAggravation: vote?.[`sentenceIntensificationReason_${index + 1}`]?.title,
          AssociationCentralPunish: vote?.[`primitiveSentence_${index + 1}`]?.item,
          descAggravation: vote?.[`sentenceIntensificationDescription_${index + 1}`],
        };
      }
    );
  };

  const registerPrimaryVoteOnSuccess = async (
    value: CentralAccusationSendRegisterVoteResponse
  ) => {
    if (value.status === 200) {
      toast.success(VOTE_SUBMIT_MSG, {
        toastId: VOTE_SUBMIT_MSG,
      });
      closeVoteRegistrationModalHandler();
      //for re-rendering IssuedVoteTab component when new comment registered
      setIsIssuedVoteEdited((prev) => !prev);
    }
  };

  const onConfirmRegisterVoteClickHandler = () => {
    registerVoteForm.submit();
    registerVoteForm
      .validateFields({ validateOnly: true })
      .then((info: ConfirmRegisterVoteValuesType) => {
        registerPrimaryVote({
          form: "RegistrationCentrulVote",
          id: "234e85c9fd0c4cbe9721e8d411e66ad5",
          _data_: {
            numberCentralPunishments: info?.numberPreliminaryPunishments?.value,
            numberVotesFavorCentrul: info?.numberVotesFavorpPrimitive?.value,
            centralVoteDesc: info?.sentenceIntensificationDescription
              ? info?.sentenceIntensificationDescription
              : "-",
            AssociationCentralCommitteeRecords: voteRecordsGenerator(info),
            id: +isVoteRegistrationModalOpen?.id,
          },
        })
          .unwrap()
          .then(registerPrimaryVoteOnSuccess);
      });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="committee-accusation-case-page-container">
      {/* ارجاع */}
      {isReferralModal?.isOpen && (
        <ReferralModal
          isModalOpen={isReferralModal}
          closeModalHandler={closeReferralModalHandler}
        />
      )}

      {/* رفع ارجاع */}
      {isReferralRemovalModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="رفع ارجاع"
          isModalOpen={isReferralRemovalModalOpen?.isOpen}
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

      {/* انتقال به کمیته تفهیم */}
      {isClarificationCommitteeTransferModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="انتقال به کمیته تفهیم"
          isModalOpen={isClarificationCommitteeTransferModalOpen?.isOpen}
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

      {/*تخصیص جلسه  */}
      {isAllocationModal?.isOpen && (
        <ConfirmationModalWithContent
          title="تخصیص جلسه"
          isModalOpen={isAllocationModal?.isOpen}
          confirmBtnText="تخصیص جلسه"
          closeModalHandler={closeAllocationModalHandler}
          onConfirmClickHandler={sessionAllocationHandler}
          isConfirmButtonLoading={isAllocationMeetingLoading}
          width={900}
          content={
            <AccusationCaseSessionAllocationModal
              form={allocationForm}
              selectSessionReason={
                preliminaryMeetingData?.data ? preliminaryMeetingData?.data : []
              }
              durationReason={sessionDurationData?.data ? sessionDurationData?.data : []}
              presentationReason={
                primaryProviderData?.data ? primaryProviderData?.data : []
              }
              radioType={noticesTypeData?.data ? noticesTypeData?.data : []}
              otherFiles={otherSessionsData?.data ? otherSessionsData?.data : []}
              selectionSetter={setSelectionSession}
              loading={isOtherSessionsLoading}
            />
          }
          showIcon={false}
        />
      )}

      {/* عودت به آماده جلسه*/}
      {isReturnToSessionModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="عودت به آماده جلسه"
          isModalOpen={isReturnToSessionModalOpen?.isOpen}
          confirmBtnText="عودت به آماده جلسه"
          closeModalHandler={closeReturnToSessionModalHandler}
          onConfirmClickHandler={returnToSessionHandler}
          isConfirmButtonLoading={isCancelMoveToReadyMeetingLoading}
          isDangerous={true}
          content={<ReturnToSessionModalContent />}
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
          isConfirmButtonLoading={isSendRecordOpinionLoading}
          content={
            <RegisterCommentModalContent
              commentList={registerCommentData?.data && registerCommentData?.data}
              form={registerCommentForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* ثبت رای */}
      {isVoteRegistrationModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="ثبت رای"
          isModalOpen={isVoteRegistrationModalOpen?.isOpen}
          confirmBtnText="ثبت رای"
          closeModalHandler={closeVoteRegistrationModalHandler}
          onConfirmClickHandler={onConfirmRegisterVoteClickHandler}
          isConfirmButtonLoading={isRegisterPrimaryVoteLoading}
          width={900}
          content={
            <CentralAccusationVoteRegistrationModal
              form={registerVoteForm}
              isModalOpen={isVoteRegistrationModalOpen}
            />
          }
          showIcon={false}
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
          <CustomDivider text={"اطلاعات متهم"} />
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
            items={Items(id, isIssuedVoteEdited, Boolean(isFromWarding))}
            dir="rtl"
            destroyInactiveTabPane={true}
          />
        </div>
      </CustomCard>
    </Form>
  );
};

export default CentralAccusationDetail;
