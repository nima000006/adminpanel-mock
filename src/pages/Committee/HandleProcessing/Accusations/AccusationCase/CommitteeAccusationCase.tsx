import { useEffect, useState } from "react";

import { Button, Collapse, Form, Tabs } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import EducationChancellorReferralModal from "@pages/Committee/_shared/modals/EducationChancellorReferralModal/EducationChancellorReferralModal";

import {
  ReasonsRejectionChargeResponse,
  RecordOpinionSecretaryPreliminaryResponse,
  RegisterCommentType,
  RejectionDataType,
  SendAccusationResearchChancellorRegisterCommentModalResponse,
  SendAccusationWardingRegisterCommentModalResponse,
  SendReportStudentChancellorRegisterCommentModalResponse,
  WardingRegisterCommentType,
} from "./@types/@typesCommitteeAccusationCase";
import {
  AccusedInfo,
  ClarificationCommitteeTransferModalContent,
  Items,
  ReadySessionTransferModalContent,
  ReferralRemovalModalContent,
  RegisterCommentModalContent,
  RejectReportModalContent,
  ReturnToSessionModalContent,
} from "./accusationUtils/accusationUtils";
import AccusationCaseResearchChancellorReferralModal from "../../../../../components/Committee/Committee/AdditionalResearch/ResearchChancellor/Modals/ResearchChancellorReferralModal/ResearchChancellorReferralModal";
import AccusationCaseStudentChancellorReferralModal from "../../../../../components/Committee/Committee/AdditionalResearch/StudentChancellor/Modals/StudentChancellorReferralModal/StudentChancellorReferralModal";
import WardingReferralModal from "../../../../../components/Committee/Committee/AdditionalResearch/Warding/Modal/WardingReferralModal/WardingReferralModal";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import AccusationCaseReferralModal from "../../../../../components/Modals/Committee/AccusationCase/AccusationCaseReferralModal/AccusationCaseReferralModal";
import AccusationCaseSessionAllocationModal from "../../../../../components/Modals/Committee/AccusationCase/AccusationCaseSessionAllocationModal/AccusationCaseSessionAllocationModal";
import AccusationCaseVoteRegistrationModal from "../../../../../components/Modals/Committee/AccusationCase/AccusationCaseVoteRegistrationModal/AccusationCaseVoteRegistrationModal";
import EditAccusationModal from "../../../../../components/Modals/Committee/AccusationCase/EditAccusationModal/EditAccusationModal";
import ConfirmationModalWithContent from "../../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { CheckBoxFormGenerator } from "../../../../../infrastructure/helpers/utils";
import {
  useSendAccusationEducationChancellorRegisterCommentModalMutation,
  useSendAccusationResearchChancellorRegisterCommentModalMutation,
  useSendAccusationStudentChancellorRegisterCommentModalMutation,
  useSendAccusationWardingRegisterCommentModalMutation,
  useSendRejectingEducationChancellorMutation,
  useSendRejectingResearchChancellorMutation,
  useSendRejectingStudentChancellorMutation,
  useSendRejectingWardingMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useCancelMoveToReadyMeetingMutation,
  useLazyGetAccusedUserByIdQuery,
  useLazyGetReasonsRejectionChargeQuery,
  useLazyGetReferralRemovalQuery,
  useLazyGetRegisterCommentQuery,
  useMoveToClarificationCommitteeMutation,
  useMoveToReadyMeetingMutation,
  useReferralRemovalMutation,
  useSendReasonsRejectionChargeMutation,
  useSendRecordOpinionSecretaryPreliminaryMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { SEND_REASON_REJECTION_SUCCESS_MSG } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import {
  SendRejectingEducationChancellorResponse,
  SendRejectingResearchChancellorResponse,
  SendRejectingStudentChancellorResponse,
  SendRejectingWardingResponse,
} from "../../Reports/ReportDetail/@types/@typesCommitteeReportDetail";
import {
  RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
  SEND_REJECT_CHARGE_SUCCESS_MSG,
} from "../../Reports/ReportDetail/consts";

import "./_committeeAccusationCase.scss";

const CANCEL_MOVE_TO_READY_SUCCESS_MSG = "اتهام با موفقیت به آماده جلسه عودت یافت.";
const MOVE_TO_READY_MEETING_SUCCESS_MSG = "اتهام با موفقیت به آماده جلسه انتقال یافت.";
const MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG =
  "اتهام با موفقیت به کمیته تفهیم انتقال یافت.";
const REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG = "رفع ارجاع با موفقیت انجام شد.";

const CommitteeAccusationCase = () => {
  const [isIssuedVoteEdited, setIsIssuedVoteEdited] = useState(false);
  const [searchParams] = useSearchParams();
  const { id, isFromWarding, isResearchChancellor, isStudentChancellor, isEducation } =
    Object.fromEntries([...searchParams]);

  useTitle({ text: `${"پرونده اتهام"} ${id}` });

  // ثبت اصلاحیه
  const [isEditAccusationModalOpen, setIsEditAccusationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  //ارجاع
  const [referralModal, setReferralModal] = useState({ isOpen: false, id: -1 });
  // ارجاع حراست
  const [isWardingReferralModal, setIsWardingReferralModal] = useState({
    isOpen: false,
    id: -1,
  });
  //ارجاع معاونت پژوهشی
  const [researchChancellorReferralModal, setResearchChancellorReferralModal] = useState({
    isOpen: false,
    id: -1,
  });
  //ارجاع معاونت دانشجویی
  const [studentChancellorReferralModal, setStudentChancellorReferralModal] = useState({
    isOpen: false,
    id: -1,
  });
  //ارجاع معاونت آموزشی
  const [educationChancellorReferralModal, setEducationChancellorReferralModal] =
    useState({
      isOpen: false,
      id: -1,
    });
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
  const [
    isAccusationWardingRegisterCommentModalOpen,
    setIsAccusationWardingRegisterCommentModalOpen,
  ] = useState(false);
  const [
    isAccusationResearchChanRegisterCommentModalOpen,
    setIsAccusationResearchChanRegisterCommentModalOpen,
  ] = useState(false);
  const [
    isAccusationStudentChanRegisterCommentModalOpen,
    setIsAccusationStudentChanRegisterCommentModalOpen,
  ] = useState(false);
  const [
    isAccusationEducationChancellorRegisterCommentModalOpen,
    setIsAccusationEducationChancellorRegisterCommentModalOpen,
  ] = useState(false);
  // ثبت رای
  const [isVoteRegistrationModalOpen, setIsVoteRegistrationModalOpen] = useState({
    isOpen: false,
    id: -1,
  });
  // رد کردن
  const [isRejectReportModalOpen, setIsRejectReportModalOpen] = useState(false);
  const [isWardingRejectModalOpen, setIsWardingRejectModalOpen] = useState({
    isOpen: false,
  });
  const [isRejectResearchChancellorModalOpen, setIsRejectResearchChancellorModalOpen] =
    useState({
      isOpen: false,
    });
  const [isStudentChancellorRejectModalOpen, setIsRejectStudentChancellorModalOpen] =
    useState({
      isOpen: false,
    });
  const [isEducationChancellorRejectModalOpen, setIsEducationChancellorRejectModalOpen] =
    useState({
      isOpen: false,
    });

  //! forms
  //ثبت نظر
  const [registerCommentForm] = Form.useForm();
  // انتقال به کمیته تفهیم
  const [clarificationForm] = Form.useForm();
  // رفع ارجاع
  const [referralRemovalForm] = Form.useForm();
  // رد کردن
  const [rejectionForm] = Form.useForm();

  //? ================================  Api Calls ================================
  // get detail data
  const [getAccusedUserById, { data: accusedData, isLoading: isAccusedDataLoading }] =
    useLazyGetAccusedUserByIdQuery();

  //ثبت نظر
  const [getRegisterComment, { data: registerCommentData }] =
    useLazyGetRegisterCommentQuery();

  const [
    sendRecordOpinionSecretaryPreliminary,
    { isLoading: isSendRecordOpinionSecretaryPreliminaryLoading },
  ] = useSendRecordOpinionSecretaryPreliminaryMutation();

  // ثبت نظر حراست
  const [
    sendAccusationWardingRegisterCommentModal,
    { isLoading: isSendAccusationWardingRegisterCommentModalLoading },
  ] = useSendAccusationWardingRegisterCommentModalMutation();

  // ثبت نظر معاونت پژوهشی
  const [
    sendAccusationResearchChancellorRegisterCommentModal,
    { isLoading: isSendAccusationResearchChancellorRegisterCommentModalLoading },
  ] = useSendAccusationResearchChancellorRegisterCommentModalMutation();

  // ثبت نظر معاونت دانشجویی
  const [
    sendAccusationStudentChancellorRegisterCommentModal,
    { isLoading: isSendAccusationStudentChancellorRegisterCommentModalLoading },
  ] = useSendAccusationStudentChancellorRegisterCommentModalMutation();

  // ثبت نظر معاونت آموزشی
  const [
    sendAccusationEducationChancellorRegisterCommentModal,
    { isLoading: isSendAccusationEducationChancellorRegisterCommentModalLoading },
  ] = useSendAccusationEducationChancellorRegisterCommentModalMutation();

  //عودت به آماده جلسه
  const [cancelMoveToReadyMeeting, { isLoading: isCancelMoveToReadyMeetingLoading }] =
    useCancelMoveToReadyMeetingMutation();

  // انتقال به آماده جلسه
  const [moveToReadyMeeting, { isLoading: isMoveToReadyMeetingLoading }] =
    useMoveToReadyMeetingMutation();

  // انتقال به کمیته تفهیم
  const [
    moveToClarificationCommittee,
    { isLoading: isMoveToClarificationCommitteeLoading },
  ] = useMoveToClarificationCommitteeMutation();

  // رفع ارجاع
  const [getReferralRemoval, { isLoading: isGetReferralRemovalLoading }] =
    useLazyGetReferralRemovalQuery();

  const [referralRemovalSubmit, { isLoading: isReferralRemovalSubmitLoading }] =
    useReferralRemovalMutation();

  // دریافت دلیل مودال رد کردن
  const [
    getReasonsRejectionCharge,
    {
      data: getReasonsRejectionChargeData,
      isLoading: isGetReasonsRejectionChargeLoading,
    },
  ] = useLazyGetReasonsRejectionChargeQuery();

  // رد کردن
  const [sendReasonsRejectionCharge, { isLoading: isSendReasonsRejectionChargeLoading }] =
    useSendReasonsRejectionChargeMutation();

  // رد کردن حراست
  const [sendRejectingWarding, { isLoading: isSendRejectingWardingLoading }] =
    useSendRejectingWardingMutation();

  // رد کردن معاونت پژوهشی
  const [
    sendRejectingResearchChancellor,
    { isLoading: isSendRejectingResearchChancellorLoading },
  ] = useSendRejectingResearchChancellorMutation();

  // رد کردن معاونت دانشجویی
  const [
    sendRejectingStudentChancellor,
    { isLoading: isSendRejectingStudentChancellorLoading },
  ] = useSendRejectingStudentChancellorMutation();

  // رد کردن معاونت آموزشی
  const [
    sendRejectingEducationChancellor,
    { isLoading: isSendRejectingEducationChancellorLoading },
  ] = useSendRejectingEducationChancellorMutation();

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
  const cancelMoveToReadyMeetingOnSuccess = async (value: any) => {
    if (value?.status === 200) {
      setIsReturnToSessionModalOpen(false);
      toast.success(CANCEL_MOVE_TO_READY_SUCCESS_MSG, {
        toastId: CANCEL_MOVE_TO_READY_SUCCESS_MSG,
      });
    }
  };
  // انتقال به آماده جلسه
  const moveToReadyMeetingOnSuccess = async (value: any) => {
    if (value?.status === 200) {
      setIsReadySessionTransferModalOpen(false);
      toast.success(MOVE_TO_READY_MEETING_SUCCESS_MSG, {
        toastId: MOVE_TO_READY_MEETING_SUCCESS_MSG,
      });
    }
  };
  // انتقال به کمیته تفهیم
  const moveToClarificationCommitteeOnSuccess = async (value: any) => {
    if (value?.status === 200) {
      setIsClarificationCommitteeTransferModalOpen(false);
      toast.success(MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG, {
        toastId: MOVE_TO_CLARIFICATION_COMMITTEE_SUCCESS_MSG,
      });
    }
  };
  // رفع ارجاع
  const getReferralRemovalOnSuccess = async (value: any) => {
    if (value?.status === 200) {
      referralRemovalForm.setFieldsValue({
        referralRemovalItems: [
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_sentToSecurity,
            "sentToSecurity"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_sentToStudentVice,
            "sentToStudentVice"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_sentToEducationalAssistant,
            "sentToEducationalAssistant"
          ),
          CheckBoxFormGenerator(
            value?.data[0]?.AssociationReferral_sentToResearchAssistant,
            "sentToResearchAssistant"
          ),
        ],
      });
    }
  };
  const referralRemovalSubmitOnSuccess = async (value: any) => {
    if (value?.status === 200) {
      setIsReferralRemovalModalOpen(false);
      toast.success(REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG, {
        toastId: REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG,
      });
    }
  };

  // Edit Accusation Modal ثبت اصلاحیه
  const closeEditAccusationModalHandler = () => {
    setIsEditAccusationModalOpen({ isOpen: false, id: -1 });
  };
  const openEditAccusationModalHandler = () => {
    setIsEditAccusationModalOpen({ isOpen: true, id: +id });
  };

  // Referral Modal ارجاع
  const openReferralReportModalHandler = () => {
    if (id) {
      if (isResearchChancellor) {
        setResearchChancellorReferralModal({ isOpen: true, id: +id });
      } else if (isFromWarding) {
        setIsWardingReferralModal({ isOpen: true, id: +id });
      } else if (isStudentChancellor) {
        setStudentChancellorReferralModal({ isOpen: true, id: +id });
      } else if (isEducation) {
        setEducationChancellorReferralModal({ isOpen: true, id: +id });
      } else {
        setReferralModal({ isOpen: true, id: +id });
      }
    }
  };
  const closeReferralModalHandler = () => setReferralModal({ isOpen: false, id: -1 });

  // ارجاع حراست
  const closeWardingReferralModalHandler = () => {
    setIsWardingReferralModal({ isOpen: false, id: -1 });
  };

  // ارجاع معاونت پژوهشی
  const closeResearchChancellorReferralModalHandler = () => {
    setResearchChancellorReferralModal({ isOpen: false, id: -1 });
  };
  // ارجاع معاونت آموزشی
  const closeEducationChancellorReferralModalHandler = () => {
    setEducationChancellorReferralModal({ isOpen: false, id: -1 });
  };
  // ارجاع معاونت دانشجویی
  const closeStudentChancellorReferralModalHandler = () => {
    setStudentChancellorReferralModal({ isOpen: false, id: -1 });
  };

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
    const { referralRemovalItems } = referralRemovalForm.getFieldsValue();

    referralRemovalSubmit({
      form: "RemovalChargeReference",
      id: "a036b0a734534600913d75875b0475bd",
      _data_: {
        AssociationReferral: {
          sentToSecurity: referralRemovalItems?.includes("sentToSecurity"),
          sentToResearchAssistant: referralRemovalItems?.includes(
            "sentToResearchAssistant"
          ),
          sentToEducationalAssistant: referralRemovalItems?.includes(
            "sentToEducationalAssistant"
          ),
          sentToStudentVice: referralRemovalItems?.includes("sentToStudentVice"),
        },
        id: +id,
      },
    })
      .unwrap()
      .then(referralRemovalSubmitOnSuccess);
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
    const { referralRemovalItems } = clarificationForm.getFieldsValue();

    if (id && referralRemovalItems) {
      moveToClarificationCommittee({
        form: "TransferToUnderstanding",
        id: "83639abb705942ff92cb98426793d9a7",
        _data_: {
          caseLatestState: +referralRemovalItems,
          violationStatus: "10",
          id: +id,
          AssociationViolationStatus_title: null,
        },
      })
        .unwrap()
        .then(moveToClarificationCommitteeOnSuccess);
    }
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
        form: "MoveToReadyMeeting",
        id: "4b2db2af0e5742d2811d469d36a481ef",
        _data_: {
          violationStatus: "11",
          id: +id,
          AssociationViolationStatus_title: null,
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
        form: "CancelMoveToReadyMeeting",
        id: "1527c664c5784124836fe1a91b652b45",
        _data_: {
          violationStatus: "8",
          id: +id,
          AssociationViolationStatus_title: null,
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
    if (isResearchChancellor) {
      setIsAccusationResearchChanRegisterCommentModalOpen(true);
    } else if (isFromWarding) {
      setIsAccusationWardingRegisterCommentModalOpen(true);
    } else if (isStudentChancellor) {
      setIsAccusationStudentChanRegisterCommentModalOpen(true);
    } else if (isEducation) {
      setIsAccusationEducationChancellorRegisterCommentModalOpen(true);
    } else {
      setIsRegisterCommentModalOpen(true);
    }
    getRegisterComment(null);
  };
  const registerCommentHandler = () => {
    const { registerComment, registerDescription } = registerCommentForm.getFieldsValue();
    if (id) {
      sendRecordOpinionSecretaryPreliminary({
        form: "RecordOpinionSecretaryPreliminary",
        id: "85cc99e2566f41cfb1d34ef5b74074ed",
        _data_: {
          AssociationReferral: {
            secretaryPrimaryOpinion: registerComment?.children,
            dateRegistrationSecretaryPrimary: new Date().toISOString(),
            secretaryPrimaryDesc: registerDescription,
            id: +id,
          },
        },
      })
        .unwrap()
        .then(sendRecordOpinionSecretaryPreliminaryOnSuccess);
    }
  };
  const sendRecordOpinionSecretaryPreliminaryOnSuccess = async (
    value: RecordOpinionSecretaryPreliminaryResponse
  ) => {
    if (value.status === 200) {
      toast.success("   ثبت نظر درخواست با موفقیت انجام شد.", {
        toastId: "   ثبت نظر درخواست با موفقیت انجام شد.",
      });
      closeRegisterCommentModalHandler();
    }
  };

  // (اتهام) ثبت نظر حراست
  const closeAccusationWardingRegisterCommentModalHandler = () => {
    setIsAccusationWardingRegisterCommentModalOpen(false);
  };
  const AccusationWardingRegisterCommentHandler = () => {
    registerCommentForm?.submit();
    registerCommentForm?.validateFields().then((formData: RegisterCommentType) => {
      sendAccusationWardingRegisterCommentModal({
        form: "RegistrationProtectionOpinion",
        id: "51f4e12d52b744d8bc7c8696ebacc927",
        _data_: {
          id: +id,
          AssociationReferral: {
            registerComment: formData?.registerComment?.value,
            descSecurity: formData?.registerDescription,
            dateResponseSecurity: new Date().toISOString(),
          },
        },
      })
        .unwrap()
        .then(onSendWardingReferralSuccess);
    });
  };
  const onSendWardingReferralSuccess = async (
    value?: SendAccusationWardingRegisterCommentModalResponse
  ) => {
    if (value?.status === 200) {
      toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
        toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
      });
      closeAccusationWardingRegisterCommentModalHandler();
      registerCommentForm?.resetFields();
    }
  };

  // (اتهام)ثبت نظر معاونت پژوهشی
  const closeAccusationResearchChancellorRegisterCommentModalHandler = () => {
    setIsAccusationResearchChanRegisterCommentModalOpen(false);
  };

  const AccusationResearchChancellorRegisterCommentHandler = () => {
    const { registerComment, registerDescription } = registerCommentForm.getFieldsValue();

    sendAccusationResearchChancellorRegisterCommentModal({
      form: "RegisteringOpinionResearchAssistant",
      id: "f7ba80c282ae4542b185393e20e383441",
      _data_: {
        AssociationReferral: {
          registerCommentResrchAssis: registerComment?.children,
          dateResponseResearchAssistant: new Date().toISOString(),
          CommentRegistrResrchAssis: registerDescription,
        },
        id: +id,
      },
    })
      .unwrap()
      .then(sendAccusationResearchChancellorRegisterCommentOnSuccess);
  };

  const sendAccusationResearchChancellorRegisterCommentOnSuccess = async (
    value: SendAccusationResearchChancellorRegisterCommentModalResponse
  ) => {
    if (value.status === 200) {
      toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
        toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
      });
      registerCommentForm?.resetFields();
      closeAccusationResearchChancellorRegisterCommentModalHandler();
    }
  };

  // (اتهام)ثبت نظر معاونت دانشجویی
  const closeAccusationStudentChancellorRegisterCommentModalHandler = () => {
    setIsAccusationStudentChanRegisterCommentModalOpen(false);
  };

  const accusationStudentChancellorRegisterCommentHandler = () => {
    const { registerComment, registerDescription } = registerCommentForm.getFieldsValue();

    sendAccusationStudentChancellorRegisterCommentModal({
      form: "RegisteringOpinionStudentDeputy",
      id: "d71cfe15263d408dbbfc7d0a28e66cbc",
      _data_: {
        AssociationReferral: {
          registerCommentStudentVice: registerComment?.children,
          dateResponseStudentVice: new Date().toISOString(),
          CommentRegistrStudentVice: registerDescription,
        },
        id: +id,
      },
    })
      .unwrap()
      .then(sendAccusationStudentChancellorRegisterCommentOnSuccess);
  };

  const sendAccusationStudentChancellorRegisterCommentOnSuccess = async (
    value: SendReportStudentChancellorRegisterCommentModalResponse
  ) => {
    if (value.status === 200) {
      toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
        toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
      });
      registerCommentForm?.resetFields();
      closeAccusationStudentChancellorRegisterCommentModalHandler();
    }
  };
  // (اتهام)ثبت نظر معاونت آموزشی
  const closeAccusationEducationChancellorRegisterCommentModalHandler = () => {
    setIsAccusationEducationChancellorRegisterCommentModalOpen(false);
  };

  const accusationEducationChancellorRegisterCommentHandler = () => {
    const { registerComment, registerDescription } = registerCommentForm.getFieldsValue();

    sendAccusationEducationChancellorRegisterCommentModal({
      form: "RegisterOpinionViceChancellor",
      id: "fcaea2b5097e459b99c9b26eb2aaf372",
      _data_: {
        AssociationReferral: {
          registerCommentEduAssistant: registerComment?.children,
          dateResponseEducationalAssistant: new Date().toISOString(),
          CommentRegistrEduAssistant: registerDescription,
        },
        id: +id,
      },
    })
      .unwrap()
      .then(sendAccusationEducationChancellorRegisterCommentOnSuccess);
  };

  const sendAccusationEducationChancellorRegisterCommentOnSuccess = async (
    value: SendReportStudentChancellorRegisterCommentModalResponse
  ) => {
    if (value.status === 200) {
      toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
        toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
      });
      registerCommentForm?.resetFields();
      closeAccusationEducationChancellorRegisterCommentModalHandler();
    }
  };

  // Vote Registration Modal  ثبت رای
  const closeVoteRegistrationModalHandler = () => {
    setIsVoteRegistrationModalOpen({ isOpen: false, id: -1 });
  };
  const openVoteRegistrationModalHandler = () => {
    setIsVoteRegistrationModalOpen({ isOpen: true, id: +id });
  };

  // Reject Modal رد کردن
  const closeRejectReportModalHandler = () => {
    setIsRejectReportModalOpen(false);
  };

  const openRejectReportModalHandler = () => {
    if (isResearchChancellor) {
      setIsRejectResearchChancellorModalOpen({ isOpen: true });
    } else if (isFromWarding) {
      setIsWardingRejectModalOpen({ isOpen: true });
    } else if (isStudentChancellor) {
      setIsRejectStudentChancellorModalOpen({ isOpen: true });
    } else if (isEducation) {
      setIsEducationChancellorRejectModalOpen({ isOpen: true });
    } else {
      setIsRejectReportModalOpen(true);
    }
    getReasonsRejectionCharge();
  };

  // رد کردن حراست
  const closeWardingRejectModalHandler = () => {
    setIsWardingRejectModalOpen({ isOpen: false });
  };

  const rejectWardingHandler = () => {
    rejectionForm
      .validateFields({ validateOnly: true })
      .then((rejectionData: WardingRegisterCommentType) => {
        if (id) {
          sendRejectingWarding({
            form: "ClosingSecurity",
            id: "3903aad7c60d46a9b05dc3efe37280c8",
            _data_: {
              id: +id,
              AssociationReferral: {
                dateClosingSecurity: new Date().toISOString(),
                descClosingSecurity: rejectionData?.rejectDescription,
                reasonClosingSecurity: rejectionData?.rejectReason?.value,
              },
            },
          })
            .unwrap()
            .then(sendRejectionWardingOnSuccess);
        }
      });
  };
  const sendRejectionWardingOnSuccess = async (value: SendRejectingWardingResponse) => {
    if (value?.status === 200) {
      closeWardingRejectModalHandler();
      toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
        toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
      });
      rejectionForm?.resetFields();
    }
  };

  // رد کرد ن معاونت پژوهشی
  const closeRejectResearchChancellorModalHandler = () => {
    setIsRejectResearchChancellorModalOpen({ isOpen: false });
  };

  // رد کردن معاونت دانشجویی
  const closeRejectStudentChancellorModalHandler = () => {
    setIsRejectStudentChancellorModalOpen({ isOpen: false });
  };

  // رد کردن معاونت آموزشی
  const closeRejectEducationChancellorModalHandler = () => {
    setIsEducationChancellorRejectModalOpen({ isOpen: false });
  };

  const rejectResearchChancellorHandler = () => {
    rejectionForm
      .validateFields({ validateOnly: true })
      .then((rejectionData: RejectionDataType) => {
        if (id) {
          sendRejectingResearchChancellor({
            form: "ClosingResearchAssistant",
            id: "d318d3c2a41f40bf9bd375f9dae99748",
            _data_: {
              id: +id,
              AssociationReferral: {
                dateClosingResearchAssistant: new Date().toISOString(),
                descClosingResearchAssistant: rejectionData?.rejectReportDescription,
                reasonClosingResearchAssistant: rejectionData?.rejectReportReason?.label,
              },
            },
          })
            .unwrap()
            .then(sendRejectingResearchChancellorOnSuccess);
        }
      });
  };
  const sendRejectingResearchChancellorOnSuccess = async (
    value: SendRejectingResearchChancellorResponse
  ) => {
    if (value?.status === 200) {
      closeRejectResearchChancellorModalHandler();
      toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
        toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
      });
      rejectionForm?.resetFields();
    }
  };

  //!  رد کردن معاونت دانشجویی
  const rejectStudentChancellorHandler = () => {
    rejectionForm
      .validateFields({ validateOnly: true })
      .then((rejectionData: RejectionDataType) => {
        if (id) {
          sendRejectingStudentChancellor({
            form: "ClosingStudentVice",
            id: "5d6bb116a7784da4a15c35d571ff3c0c",
            _data_: {
              id: +id,
              AssociationReferral: {
                dateClosingStudentVice: new Date().toISOString(),
                descClosingStudentVice: rejectionData?.rejectReportDescription,
                reasonClosingStudentVice: rejectionData?.rejectReportReason?.label,
              },
            },
          })
            .unwrap()
            .then(sendRejectingStudentChancellorOnSuccess);
        }
      });
  };
  const sendRejectingStudentChancellorOnSuccess = async (
    value: SendRejectingStudentChancellorResponse
  ) => {
    if (value?.status === 200) {
      closeRejectStudentChancellorModalHandler();
      toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
        toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
      });
      rejectionForm?.resetFields();
    }
  };

  // رد کردن معاونت آموزشی
  const rejectEducationChancellorHandler = () => {
    rejectionForm
      .validateFields({ validateOnly: true })
      .then((rejectionData: RejectionDataType) => {
        if (id) {
          sendRejectingEducationChancellor({
            form: "ClosingEducationalAssistant",
            id: "703b98a908444a258a44285736b99694",
            _data_: {
              id: +id,
              AssociationReferral: {
                dateClosingEducationalAssistant: new Date().toISOString(),
                descClosingEducationalAssistant: rejectionData?.rejectReportDescription,
                reasonClosingEducationalAssistant:
                  rejectionData?.rejectReportReason?.label,
              },
            },
          })
            .unwrap()
            .then(sendRejectingEducationChancellorOnSuccess);
        }
      });
  };
  const sendRejectingEducationChancellorOnSuccess = async (
    value: SendRejectingEducationChancellorResponse
  ) => {
    if (value?.status === 200) {
      closeRejectEducationChancellorModalHandler();
      toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
        toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
      });
      rejectionForm?.resetFields();
    }
  };

  // رد کردن
  const rejectReportHandler = () => {
    const { rejectReportDescription, rejectReportReason } =
      rejectionForm.getFieldsValue();
    if (id) {
      sendReasonsRejectionCharge({
        form: "RejectingCharge",
        id: "339ce5755dc942eba4f8ad99f64eadfe",
        _data_: {
          reasonRejectingCharge: rejectReportReason?.children,
          descRejectingCharge: rejectReportDescription,
          id: +id,
        },
      })
        .unwrap()
        .then(sendReasonsRejectionChargeOnSuccess);
    }
  };
  const sendReasonsRejectionChargeOnSuccess = async (
    value: ReasonsRejectionChargeResponse
  ) => {
    if (value.status === 200) {
      toast.success(SEND_REASON_REJECTION_SUCCESS_MSG, {
        toastId: SEND_REASON_REJECTION_SUCCESS_MSG,
      });
      closeRejectReportModalHandler();
      rejectionForm?.resetFields();
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="committee-accusation-case-page-container">
      {/* ثبت اصلاحیه */}
      {isEditAccusationModalOpen?.isOpen && (
        <EditAccusationModal
          isModalOpen={isEditAccusationModalOpen}
          closeModalHandler={closeEditAccusationModalHandler}
        />
      )}

      {/* ارجاع */}
      {referralModal?.isOpen && (
        <AccusationCaseReferralModal
          isModalOpen={referralModal}
          closeModalHandler={closeReferralModalHandler}
        />
      )}

      {/* ارجاع حراست */}
      {isWardingReferralModal?.isOpen && (
        <WardingReferralModal
          isModalOpen={isWardingReferralModal}
          closeModalHandler={closeWardingReferralModalHandler}
        />
      )}

      {/* مودال ارجاع معاونت پژوهشی */}
      {researchChancellorReferralModal?.isOpen && (
        <AccusationCaseResearchChancellorReferralModal
          isModalOpen={researchChancellorReferralModal}
          closeModalHandler={closeResearchChancellorReferralModalHandler}
        />
      )}

      {/* مودال ارجاع معاونت دانشجویی */}
      {studentChancellorReferralModal?.isOpen && (
        <AccusationCaseStudentChancellorReferralModal
          isModalOpen={studentChancellorReferralModal}
          closeModalHandler={closeStudentChancellorReferralModalHandler}
        />
      )}

      {/* مودال ارجاع معاونت آموزشی */}
      {educationChancellorReferralModal?.isOpen && (
        <EducationChancellorReferralModal
          isModalOpen={educationChancellorReferralModal}
          closeModalHandler={closeEducationChancellorReferralModalHandler}
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
      {allocationModal?.isOpen && (
        <AccusationCaseSessionAllocationModal
          isModalOpen={allocationModal}
          closeModalHandler={closeAllocationModalHandler}
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
          isConfirmButtonLoading={isSendRecordOpinionSecretaryPreliminaryLoading}
          content={
            <RegisterCommentModalContent
              commentList={registerCommentData?.data && registerCommentData?.data}
              form={registerCommentForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* (اتهام) ثبت نظر  حراست */}
      {isAccusationWardingRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isAccusationWardingRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeAccusationWardingRegisterCommentModalHandler}
          onConfirmClickHandler={AccusationWardingRegisterCommentHandler}
          isConfirmButtonLoading={isSendAccusationWardingRegisterCommentModalLoading}
          content={
            <RegisterCommentModalContent
              commentList={registerCommentData?.data && registerCommentData?.data}
              form={registerCommentForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* (اتهام) ثبت نظر معاونت پژوهشی */}
      {isAccusationResearchChanRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isAccusationResearchChanRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeAccusationResearchChancellorRegisterCommentModalHandler}
          onConfirmClickHandler={AccusationResearchChancellorRegisterCommentHandler}
          isConfirmButtonLoading={
            isSendAccusationResearchChancellorRegisterCommentModalLoading
          }
          content={
            <RegisterCommentModalContent
              commentList={registerCommentData?.data && registerCommentData?.data}
              form={registerCommentForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* (اتهام) ثبت نظر معاونت دانشجویی */}
      {isAccusationStudentChanRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isAccusationStudentChanRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeAccusationStudentChancellorRegisterCommentModalHandler}
          onConfirmClickHandler={accusationStudentChancellorRegisterCommentHandler}
          isConfirmButtonLoading={
            isSendAccusationStudentChancellorRegisterCommentModalLoading
          }
          content={
            <RegisterCommentModalContent
              commentList={registerCommentData?.data && registerCommentData?.data}
              form={registerCommentForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* (اتهام) ثبت نظر معاونت آموزشی */}
      {isAccusationEducationChancellorRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isAccusationEducationChancellorRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={
            closeAccusationEducationChancellorRegisterCommentModalHandler
          }
          onConfirmClickHandler={accusationEducationChancellorRegisterCommentHandler}
          isConfirmButtonLoading={
            isSendAccusationEducationChancellorRegisterCommentModalLoading
          }
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
        <AccusationCaseVoteRegistrationModal
          isModalOpen={isVoteRegistrationModalOpen}
          closeModalHandler={closeVoteRegistrationModalHandler}
          setIsIssuedVoteEdited={setIsIssuedVoteEdited}
        />
      )}

      {/* رد کردن */}
      {isRejectReportModalOpen && (
        <ConfirmationModalWithContent
          title="رد کردن"
          isModalOpen={isRejectReportModalOpen}
          confirmBtnText="رد کردن"
          isDangerous={true}
          closeModalHandler={closeRejectReportModalHandler}
          onConfirmClickHandler={rejectReportHandler}
          isConfirmButtonLoading={isSendReasonsRejectionChargeLoading}
          content={
            <RejectReportModalContent
              isLoading={isGetReasonsRejectionChargeLoading}
              commentList={
                getReasonsRejectionChargeData?.data && getReasonsRejectionChargeData?.data
              }
              form={rejectionForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* رد کردن حراست */}
      {isWardingRejectModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="رد کردن"
          isModalOpen={isWardingRejectModalOpen?.isOpen}
          confirmBtnText="رد کردن"
          isDangerous={true}
          closeModalHandler={closeWardingRejectModalHandler}
          onConfirmClickHandler={rejectWardingHandler}
          isConfirmButtonLoading={isSendRejectingWardingLoading}
          content={
            <RejectReportModalContent
              isLoading={isGetReasonsRejectionChargeLoading}
              commentList={
                getReasonsRejectionChargeData?.data && getReasonsRejectionChargeData?.data
              }
              form={rejectionForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* رد کردن معاونت پژوهشی  */}
      {isRejectResearchChancellorModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="رد کردن"
          isModalOpen={isRejectResearchChancellorModalOpen?.isOpen}
          confirmBtnText="رد کردن"
          isDangerous={true}
          closeModalHandler={closeRejectResearchChancellorModalHandler}
          onConfirmClickHandler={rejectResearchChancellorHandler}
          isConfirmButtonLoading={isSendRejectingResearchChancellorLoading}
          content={
            <RejectReportModalContent
              isLoading={isGetReasonsRejectionChargeLoading}
              commentList={
                getReasonsRejectionChargeData?.data && getReasonsRejectionChargeData?.data
              }
              form={rejectionForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* رد کردن معاونت دانشجویی  */}
      {isStudentChancellorRejectModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="رد کردن"
          isModalOpen={isStudentChancellorRejectModalOpen?.isOpen}
          confirmBtnText="رد کردن"
          isDangerous={true}
          closeModalHandler={closeRejectStudentChancellorModalHandler}
          onConfirmClickHandler={rejectStudentChancellorHandler}
          isConfirmButtonLoading={isSendRejectingStudentChancellorLoading}
          content={
            <RejectReportModalContent
              isLoading={isGetReasonsRejectionChargeLoading}
              commentList={
                getReasonsRejectionChargeData?.data && getReasonsRejectionChargeData?.data
              }
              form={rejectionForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* رد کردن معاونت آموزشی  */}
      {isEducationChancellorRejectModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="رد کردن"
          isModalOpen={isEducationChancellorRejectModalOpen?.isOpen}
          confirmBtnText="رد کردن"
          isDangerous={true}
          closeModalHandler={closeRejectEducationChancellorModalHandler}
          onConfirmClickHandler={rejectEducationChancellorHandler}
          isConfirmButtonLoading={isSendRejectingEducationChancellorLoading}
          content={
            <RejectReportModalContent
              isLoading={isGetReasonsRejectionChargeLoading}
              commentList={
                getReasonsRejectionChargeData?.data && getReasonsRejectionChargeData?.data
              }
              form={rejectionForm}
            />
          }
          showIcon={false}
        />
      )}

      <CustomCard padding={PADDING_20} className="actions">
        <CustomDivider text="اقدام" />
        <div className="actions-button-container">
          {!isFromWarding &&
          !isResearchChancellor &&
          !isStudentChancellor &&
          !isEducation ? (
            <Button
              type="primary"
              className="action-btn"
              onClick={openEditAccusationModalHandler}
            >
              ثبت اصلاحیه
            </Button>
          ) : null}

          <Button
            type="primary"
            className="action-btn"
            onClick={openReferralReportModalHandler}
          >
            ارجاع
          </Button>
          {!isFromWarding &&
          !isResearchChancellor &&
          !isStudentChancellor &&
          !isEducation ? (
            <>
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
            </>
          ) : null}

          <Button
            type="primary"
            className="action-btn"
            onClick={openRegisterCommentModalHandler}
          >
            ثبت نظر
          </Button>
          {!isFromWarding &&
          !isResearchChancellor &&
          !isStudentChancellor &&
          !isEducation ? (
            <Button
              type="primary"
              className="action-btn"
              onClick={openVoteRegistrationModalHandler}
            >
              ثبت رای
            </Button>
          ) : null}

          <Button
            type="primary"
            danger
            className="action-btn"
            onClick={openRejectReportModalHandler}
          >
            رد کردن
          </Button>
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_20} loading={isAccusedDataLoading}>
        <div className="accused-info-container">
          <CustomDivider text="اطلاعات متهم" />
          <Collapse
            expandIcon={({ isActive }) => {
              return (
                <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
              );
            }}
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

export default CommitteeAccusationCase;
