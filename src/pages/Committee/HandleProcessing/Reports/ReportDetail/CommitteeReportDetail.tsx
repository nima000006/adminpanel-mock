import { useEffect, useState } from "react";

import { Button, Collapse, Form, Steps, Tabs, Upload } from "antd";
import moment from "jalali-moment";
import { AiOutlineUpload } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

import { SendEducationChancellorReferralModalResponse } from "@pages/Committee/_shared/modals/EducationChancellorReferralModal/@types/@educationChancellorReferralModal";
import EducationChancellorReferralModal from "@pages/Committee/_shared/modals/EducationChancellorReferralModal/EducationChancellorReferralModal";

import {
  GetRemovalReportReferenceResponse,
  RegisterCommentType,
  RejectionDataType,
  SendConfirmModalResponse,
  SendEducationChancellorConfirmModalResponse,
  SendRegisteringOpinionReportSecretaryResponse,
  SendRejectingChargeResponse,
  SendRejectingEducationChancellorResponse,
  SendRejectingResearchChancellorResponse,
  SendRejectingStudentChancellorResponse,
  SendRejectingWardingResponse,
  SendRemovalReportReferenceResponse,
  SendReportResearchChancellorRegisterCommentModalResponse,
  SendReportWardingRegisterCommentModalResponse,
  SendResearchChancellorConfirmModalResponse,
  SendStudentChancellorConfirmModalResponse,
  WardingRegisterCommentType,
} from "./@types/@typesCommitteeReportDetail";
import {
  RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
  REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG,
  SEND_CONFIRM_SUCCESS_MSG,
  SEND_REJECT_CHARGE_SUCCESS_MSG,
} from "./consts";
import BasicReportDetail from "./helper/components/BasicReportDetail/BasicReportDetail";
import ReporterInfo, {
  ReferralRemovalModalContent,
  RegisterCommentModalContent,
  RejectReportModalContent,
} from "./reportUtils/reportUtils";
import AccusationCaseResearchChancellorReferralModal from "../../../../../components/Committee/Committee/AdditionalResearch/ResearchChancellor/Modals/ResearchChancellorReferralModal/ResearchChancellorReferralModal";
import AccusationCaseStudentChancellorReferralModal from "../../../../../components/Committee/Committee/AdditionalResearch/StudentChancellor/Modals/StudentChancellorReferralModal/StudentChancellorReferralModal";
import WardingReferralModal from "../../../../../components/Committee/Committee/AdditionalResearch/Warding/Modal/WardingReferralModal/WardingReferralModal";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import EditReportModal from "../../../../../components/Modals/Committee/ReportDetail/EditReportModal/EditReportModal";
import ReferralReportModal from "../../../../../components/Modals/Committee/ReportDetail/ReferralReportModal/ReferralReportModal";
import ConfirmationModalWithContent from "../../../../../components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  CheckBoxFormGenerator,
  makeSearchParams,
} from "../../../../../infrastructure/helpers/utils";
import { COMMITTEE_SUBMIT_INFRINGEMENT_PAGE_ROUTE } from "../../../../../infrastructure/router/routes/committee";
import {
  useSendConfirmModalMutation,
  useSendEducationChancellorConfirmModalMutation,
  useSendRejectingEducationChancellorMutation,
  useSendRejectingResearchChancellorMutation,
  useSendRejectingStudentChancellorMutation,
  useSendRejectingWardingMutation,
  useSendReportEducationChancellorRegisterCommentModalMutation,
  useSendReportResearchChancellorRegisterCommentModalMutation,
  useSendReportStudentChancellorRegisterCommentModalMutation,
  useSendReportWardingRegisterCommentModalMutation,
  useSendResearchChancellorConfirmModalMutation,
  useSendStudentChancellorConfirmModalMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useGetRemovalReportReferenceMutation,
  useLazyGetReasonsRejectionChargeQuery,
  useLazyGetRegisterCommentQuery,
  useLazyGetReportDetailQuery,
  useSendRegisteringOpinionReportSecretaryMutation,
  useSendRejectingChargeMutation,
  useSendRemovalReportReferenceMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { ARE_YOU_SURE } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import { User } from "../../../History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
import { SendReportStudentChancellorRegisterCommentModalResponse } from "../../Accusations/AccusationCase/@types/@typesCommitteeAccusationCase";

import "./_committeeReportDetail.scss";

const ReportDetail = () => {
  const [isEditReportModalOpen, setIsEditReportModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [isReferralRemovalModalOpen, setIsReferralRemovalModalOpen] = useState(false);
  const [isRegisterCommentModalOpen, setIsRegisterCommentModalOpen] = useState(false);
  const [
    isReportWardingRegisterCommentModalOpen,
    setIsReportWardingRegisterCommentModalOpen,
  ] = useState(false);

  const [
    isReportResearchChanRegisterCommentModalOpen,
    setIsReportResearchChanRegisterCommentModalOpen,
  ] = useState(false);

  const [
    isReportStudentChanRegisterCommentModalOpen,
    setIsReportStudentChanRegisterCommentModalOpen,
  ] = useState(false);

  const [
    isReportEducationChanRegisterCommentModalOpen,
    setIsReportEducationChanRegisterCommentModalOpen,
  ] = useState(false);

  const [isRejectReportModalOpen, setIsRejectReportModalOpen] = useState({
    isOpen: false,
  });
  const [isWardingRejectModalOpen, setIsWardingRejectModalOpen] = useState({
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
  const [isRejectResearchChancellorModalOpen, setIsRejectResearchChancellorModalOpen] =
    useState({
      isOpen: false,
    });
  const [isConfirmReportModalOpen, setIsConfirmReportModalOpen] = useState({
    isOpen: false,
  });
  const [isConfirmResearchChancellorModalOpen, setIsConfirmResearchChancellorModalOpen] =
    useState({
      isOpen: false,
    });
  const [isConfirmStudentChancellorModalOpen, setIsConfirmStudentChancellorModalOpen] =
    useState({
      isOpen: false,
    });
  const [
    isConfirmEducationChancellorModalOpen,
    setIsConfirmEducationChancellorModalOpen,
  ] = useState({
    isOpen: false,
  });
  const [searchParams] = useSearchParams();
  const {
    id,
    isFromWarding,
    type,
    isResearchChancellor,
    isStudentChancellor,
    isEducation,
  } = Object.fromEntries([...searchParams]);
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
  //ارجاع
  const [isReferralReportModalOpen, setIsReferralReportModalOpen] = useState({
    isOpen: false,
    id: -1,
  });

  useTitle({ text: `جزئیات گزارش ${id}` });
  const navigate = useNavigate();

  //! forms
  const [form] = Form.useForm();
  // رد کردن
  const [rejectionForm] = Form.useForm();
  // رفع ارجاع
  const [referralRemovalForm] = Form.useForm();
  //ثبت نظر
  const [registerCommentForm] = Form.useForm();

  //? ================================  Api Calls ================================
  //report detail
  const [
    getReportDetail,
    { data: reportDetailData, isLoading: isReporterDetailLoading },
  ] = useLazyGetReportDetailQuery();

  // رفع ارجاع
  const [getReferralRemoval, { isLoading: isGetReferralRemovalLoading }] =
    useGetRemovalReportReferenceMutation();

  const [referralRemovalSubmit, { isLoading: isReferralRemovalSubmitLoading }] =
    useSendRemovalReportReferenceMutation();

  // رد کردن
  const [
    getReasonsRejectionCharge,
    {
      data: getReasonsRejectionChargeData,
      isLoading: isGetReasonsRejectionChargeLoading,
    },
  ] = useLazyGetReasonsRejectionChargeQuery();

  const [sendRejectingCharge, { isLoading: isSendRejectingChargeLoading }] =
    useSendRejectingChargeMutation();

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

  // ثبت نظر
  const [getRegisterComment, { data: registerCommentData }] =
    useLazyGetRegisterCommentQuery();

  const [
    sendRecordOpinionSecretaryPreliminary,
    { isLoading: isSendRecordOpinionSecretaryPreliminaryLoading },
  ] = useSendRegisteringOpinionReportSecretaryMutation();

  // ثبت نظر حراست
  const [
    sendReportWardingRegisterCommentModal,
    { isLoading: isSendReportWardingRegisterCommentModalLoading },
  ] = useSendReportWardingRegisterCommentModalMutation();

  // ثبت نظر معاونت پژوهشی
  const [
    sendReportResearchChancellorRegisterCommentModal,
    { isLoading: isSendReportResearchChancellorRegisterCommentModalLoading },
  ] = useSendReportResearchChancellorRegisterCommentModalMutation();

  // ثبت نظر معاونت دانشجویی
  const [
    sendReportStudentChancellorRegisterCommentModal,
    { isLoading: isSendReportStudentChancellorRegisterCommentModalLoading },
  ] = useSendReportStudentChancellorRegisterCommentModalMutation();

  // ثبت نظر معاونت آموزشی
  const [
    sendReportEducationChancellorRegisterCommentModal,
    { isLoading: isSendReportEducationChancellorRegisterCommentModalLoading },
  ] = useSendReportEducationChancellorRegisterCommentModalMutation();

  //  تایید کردن حراست
  const [sendConfirmModal, { isLoading: isSendConfirmModalLoading }] =
    useSendConfirmModalMutation();

  //  تایید معاونت پژوهشی
  const [
    sendResearchChancellorConfirmModal,
    { isLoading: isSendResearchChancellorConfirmModalLoading },
  ] = useSendResearchChancellorConfirmModalMutation();

  //  تایید معاونت دانشجویی
  const [
    sendStudentChancellorConfirmModal,
    { isLoading: isSendStudentChancellorConfirmModalLoading },
  ] = useSendStudentChancellorConfirmModalMutation();

  // تایید معاونت آموزشی
  const [
    sendEducationChancellorConfirmModal,
    { isLoading: isSendEducationChancellorConfirmModalLoading },
  ] = useSendEducationChancellorConfirmModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getReportDetail({ id: Number(id) });
    }
  }, [id]);

  useEffect(() => {
    form.setFieldsValue({
      accusedName: reportDetailData?.data?.[0]?.studentName,
      accusedFamilyName: reportDetailData?.data?.[0]?.studentFamily,
      accusedNationalNumber: reportDetailData?.data?.[0]?.nationalCode,
      accusedPhoneNumber: reportDetailData?.data?.[0]?.studentPhoneNumber,
      reportDesc: reportDetailData?.data?.[0]?.eventReport,
      occurPlace: reportDetailData?.data?.[0]?.eventLocation,
      occurDate: reportDetailData?.data?.[0]?.eventDate
        ? moment(reportDetailData?.data?.[0]?.eventDate)
            .locale("fa")
            .format("HH:mm - YYYY/M/D")
        : "-",
    });
  }, [form, reportDetailData?.status]);

  //* ================================ Util Functions ================================
  const setAccusedDataHandler = (data: Partial<User>) => {
    form.setFieldsValue({
      accusedName: data?.firstName,
      accusedFamilyName: data?.lastName,
      accusedNationalNumber: data?.nationalCode,
      accusedStudentNumber: data?.studentNumber,
      accusedPhoneNumber: data?.mobile,
      reporterName: reportDetailData?.data?.[0]?.reporterName,
      reporterFamily: reportDetailData?.data?.[0]?.reporterFamily,
      reporterNationalcode: reportDetailData?.data?.[0]?.reporterNationalcode,
    });
  };

  // Edit Report Modal ثبت اصلاحیه
  const closeEditReportModalHandler = () => {
    setIsEditReportModalOpen({
      isOpen: false,
      id: -1,
    });
  };
  const openEditReportModalHandler = () => {
    if (id) {
      setIsEditReportModalOpen({
        isOpen: true,
        id: +id,
      });
    }
  };

  // ارجاع حراست
  const closeWardingReferralModalHandler = () => {
    setIsWardingReferralModal({ isOpen: false, id: -1 });
  };

  // ارجاع معاونت پژوهشی
  const closeResearchChancellorReferralModalHandler = () => {
    setResearchChancellorReferralModal({ isOpen: false, id: -1 });
  };

  // ارجاع معاونت دانشجویی
  const closeStudentChancellorReferralModalHandler = () => {
    setStudentChancellorReferralModal({ isOpen: false, id: -1 });
  };

  // ارجاع معاونت آموزشی
  const closeEducationChancellorReferralModalHandler = () => {
    setEducationChancellorReferralModal({ isOpen: false, id: -1 });
  };

  // Referral Modal ارجاع
  const closeReferralReportModalHandler = () => {
    setIsReferralReportModalOpen({ isOpen: false, id: -1 });
  };

  const openReferralReportModalHandler = () => {
    if (id) {
      setIsReferralReportModalOpen({ isOpen: true, id: +id });
    }
  };

  // Removal Referral Modal رفع ارجاع
  const closeReferralRemovalModalHandler = () => {
    setIsReferralRemovalModalOpen(false);
  };

  const openReferralRemovalModalHandler = () => {
    setIsReferralRemovalModalOpen(true);
    if (id) {
      getReferralRemoval({
        _data_: {
          id: id,
        },
      })
        .unwrap()
        .then(getReferralRemovalOnSuccess);
    }
  };

  const referralRemovalSubmitOnSuccess = async (
    value: SendRemovalReportReferenceResponse
  ) => {
    if (value?.status === 200) {
      setIsReferralRemovalModalOpen(false);
      toast.success(REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG, {
        toastId: REFERRAL_REMOVAL_SUBMIT_SUCCESS_MSG,
      });
    }
  };

  const referralRemovalHandler = () => {
    const { referralRemovalItems } = referralRemovalForm.getFieldsValue();
    const AssociationReferral = {
      sendToReporter: referralRemovalItems?.includes("sendToReporter"),
      sendToStudentPresident: referralRemovalItems?.includes("sendToStudentPresident"),
      sendToConsultant: referralRemovalItems?.includes("sendToConsultant"),
      sendToProtection: referralRemovalItems?.includes("sendToProtection"),
      sendToResearchAssistant: referralRemovalItems?.includes("sendToResearchAssistant"),
      sendToEducAssistant: referralRemovalItems?.includes("sendToEducAssistant"),
    };

    if (id) {
      referralRemovalSubmit({
        form: "RemovalReportReference",
        id: "4f82d21da05b4dbbbccd4bd7023c929e",
        _data_: {
          AssociationReferral: {
            ...AssociationReferral,
            ...(!AssociationReferral.sendToReporter && {
              reasonSendReporter: null,
              descSendReporter: null,
            }),
            ...(!AssociationReferral.sendToStudentPresident && {
              reasonSendStudentPresident: null,
              descSendStudentPresident: null,
            }),
            ...(!AssociationReferral.sendToConsultant && {
              reasonSendToConsultant: null,
              descSendToConsultant: null,
            }),
            ...(!AssociationReferral.sendToProtection && {
              reasonSendProtection: null,
              descSendProtection: null,
            }),
            ...(!AssociationReferral.sendToResearchAssistant && {
              reasonSendResearchAssistant: null,
              descSendResearchAssistant: null,
            }),
            ...(!AssociationReferral.sendToEducAssistant && {
              reasonSendEducAssistant: null,
              descSendEducAssistant: null,
            }),
          },
          id: +id,
        },
      })
        .unwrap()
        .then(referralRemovalSubmitOnSuccess);
    }
  };

  // submit accusation page ثبت اتهام
  const submitAccusationHandler = () => {
    navigate({
      pathname: COMMITTEE_SUBMIT_INFRINGEMENT_PAGE_ROUTE,
      search: makeSearchParams({ reportId: id }),
    });
  };

  //Register Commit Modal ثبت نظر
  const closeRegisterCommentModalHandler = () => {
    setIsRegisterCommentModalOpen(false);
  };
  const openRegisterCommentModalHandler = () => {
    if (isResearchChancellor) {
      setIsReportResearchChanRegisterCommentModalOpen(true);
    } else if (isFromWarding) {
      setIsReportWardingRegisterCommentModalOpen(true);
    } else if (isStudentChancellor) {
      setIsReportStudentChanRegisterCommentModalOpen(true);
    } else if (isEducation) {
      setIsReportEducationChanRegisterCommentModalOpen(true);
    } else {
      setIsRegisterCommentModalOpen(true);
    }
    getRegisterComment(null);
  };
  const registerCommentHandler = () => {
    const { registerComment, registerDescription } = registerCommentForm.getFieldsValue();
    if (id) {
      sendRecordOpinionSecretaryPreliminary({
        form: "RegisteringOpinionReportSecretary",
        id: "45c76760312444d8bd4114101bf92fa2",
        _data_: {
          AssociationReferral: {
            recordOpinionSecretary: registerComment?.children,
            dateResponseSecretary: new Date().toISOString(),
            descSecretary: registerDescription,
          },
          id: +id,
        },
      })
        .unwrap()
        .then(sendRecordOpinionSecretaryPreliminaryOnSuccess);
    }
  };

  const sendRecordOpinionSecretaryPreliminaryOnSuccess = async (
    value: SendRegisteringOpinionReportSecretaryResponse
  ) => {
    if (value.status === 200) {
      toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
        toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
      });
      closeRegisterCommentModalHandler();
    }
  };

  // (گزارش) ثبت نظر حراست
  const closeReportWardingRegisterCommentModalHandler = () => {
    setIsReportWardingRegisterCommentModalOpen(false);
  };

  const ReportWardingRegisterCommentHandler = () => {
    registerCommentForm?.submit();
    registerCommentForm?.validateFields().then((formData: RegisterCommentType) => {
      sendReportWardingRegisterCommentModal({
        form: "ReportOpinionSecurity",
        id: "e446f03faecf4088aa6096419d99f4e7",
        _data_: {
          id: +id,
          AssociationReferral: {
            reportCommentSecurity: formData?.registerComment?.value,
            reportDescSecurity: formData?.registerDescription,
            reportDateResponseSecurity: new Date().toISOString(),
          },
        },
      })
        .unwrap()
        .then(onSendWardingReferralSuccess);
    });
  };
  const onSendWardingReferralSuccess = async (
    value?: SendReportWardingRegisterCommentModalResponse
  ) => {
    if (value?.status === 200) {
      toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
        toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
      });
      closeReportWardingRegisterCommentModalHandler();
      registerCommentForm.resetFields();
    }
  };

  // (گزارش)ثبت نظر معاونت پژوهشی
  const closeReportResearchChancellorRegisterCommentModalHandler = () => {
    setIsReportResearchChanRegisterCommentModalOpen(false);
  };

  // (گزارش)ثبت نظر معاونت دانشجویی
  const closeReportStudentChancellorRegisterCommentModalHandler = () => {
    setIsReportStudentChanRegisterCommentModalOpen(false);
  };

  // (گزارش)ثبت نظر معاونت آموزشی
  const closeReportEducationChancellorRegisterCommentModalHandler = () => {
    setIsReportEducationChanRegisterCommentModalOpen(false);
  };

  const ReportResearchChancellorRegisterCommentHandler = () => {
    const { registerComment, registerDescription } = registerCommentForm.getFieldsValue();

    sendReportResearchChancellorRegisterCommentModal({
      form: "ReportOpinionResearchAssistant",
      id: "cb522a7f048b491e800b485b36febd61",
      _data_: {
        AssociationReferral: {
          reportCommentResearchAssistant: registerComment?.children,
          reportDateResponseResearchAssistant: new Date().toISOString(),
          reportDescResearchAssistant: registerDescription,
        },
        id: +id,
      },
    })
      .unwrap()
      .then(sendReportResearchChancellorRegisterCommentOnSuccess);
  };
  const sendReportResearchChancellorRegisterCommentOnSuccess = async (
    value: SendReportResearchChancellorRegisterCommentModalResponse
  ) => {
    if (value.status === 200) {
      toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
        toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
      });
      registerCommentForm.resetFields();
      closeReportResearchChancellorRegisterCommentModalHandler();
    }
  };

  // (گزارش)ثبت نظر معاونت دانشجویی
  const ReportStudentChancellorRegisterCommentHandler = () => {
    const { registerComment, registerDescription } = registerCommentForm.getFieldsValue();

    const sendReportStudentChancellorRegisterCommentOnSuccess = async (
      value: SendReportStudentChancellorRegisterCommentModalResponse
    ) => {
      if (value.status === 200) {
        toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
          toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
        });
        registerCommentForm.resetFields();
        closeReportStudentChancellorRegisterCommentModalHandler();
      }
    };

    sendReportStudentChancellorRegisterCommentModal({
      form: "ReportOpinionStudentVice",
      id: "bf3826e97539474ca3e24c21ee35519c",
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
      .then(sendReportStudentChancellorRegisterCommentOnSuccess);
  };

  // (گزارش)ثبت نظر معاونت آموزشی
  const ReportEducationChancellorRegisterCommentHandler = () => {
    const { registerComment, registerDescription } = registerCommentForm.getFieldsValue();

    sendReportEducationChancellorRegisterCommentModal({
      form: "RefToOfficeEducAssis",
      id: "c596d55a374746a6bd3cc86fc43bbd42",
      _data_: {
        AssociationReferral: {
          reportDateResponseStudentVice: new Date().toISOString(),
          reportDescStudentVice: registerDescription,
          reportCommentStudentVice: registerComment?.children,
        },
        id: +id,
      },
    })
      .unwrap()
      .then(sendReportEducationChancellorRegisterCommentOnSuccess);
  };
  const sendReportEducationChancellorRegisterCommentOnSuccess = async (
    value: SendEducationChancellorReferralModalResponse
  ) => {
    if (value.status === 200) {
      toast.success(RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG, {
        toastId: RECORD_OPINION_SECRETARY_PRELIMINARY_SUCCESS_MSG,
      });
      registerCommentForm.resetFields();
      closeReportEducationChancellorRegisterCommentModalHandler();
    }
  };

  // Reject Modal رد کردن
  const closeRejectReportModalHandler = () => {
    setIsRejectReportModalOpen({ isOpen: false });
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
      setIsRejectReportModalOpen({ isOpen: true });
    }
    getReasonsRejectionCharge();
  };

  // رد کردن حراست
  const closeWardingRejectModalHandler = () => {
    setIsWardingRejectModalOpen({ isOpen: false });
  };

  // رد کردن معاونت پژوهشی
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

  // تایید کردن حراست
  const closeConfirmReportModalHandler = () => {
    setIsConfirmReportModalOpen({ isOpen: false });
  };
  const openConfirmReportModalHandler = () => {
    setIsConfirmReportModalOpen({ isOpen: true });
  };

  // تایید کردن معاونت پژوهشی
  const closeConfirmResearchChancellorModalHandler = () => {
    setIsConfirmResearchChancellorModalOpen({ isOpen: false });
  };

  const openConfirmResearchChancellorModalHandler = () => {
    setIsConfirmResearchChancellorModalOpen({ isOpen: true });
  };

  // تایید کردن معاونت دانشجویی
  const closeConfirmStudentChancellorModalHandler = () => {
    setIsConfirmStudentChancellorModalOpen({ isOpen: false });
  };

  const openConfirmStudentChancellorModalHandler = () => {
    setIsConfirmStudentChancellorModalOpen({ isOpen: true });
  };

  //تایید کردن معاونت آموزشی
  const closeConfirmEducationChancellorModalHandler = () => {
    setIsConfirmEducationChancellorModalOpen({ isOpen: false });
  };

  const openConfirmEducationChancellorModalHandler = () => {
    setIsConfirmEducationChancellorModalOpen({ isOpen: true });
  };

  // رد کردن
  const rejectReportHandler = () => {
    const { rejectDescription, rejectReason } = rejectionForm.getFieldsValue();

    const sendRejectingChargeOnSuccess = async (value: SendRejectingChargeResponse) => {
      if (value?.status === 200) {
        closeRejectReportModalHandler();
        toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
          toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
        });
        rejectionForm.resetFields();
      }
    };

    rejectionForm.validateFields({ validateOnly: true }).then(() => {
      if (id) {
        sendRejectingCharge({
          form: "RejectingCharge",
          id: "339ce5755dc942eba4f8ad99f64eadfe",
          _data_: {
            reasonRejectingCharge: rejectReason?.children,
            descRejectingCharge: rejectDescription,
            id: +id,
          },
        })
          .unwrap()
          .then(sendRejectingChargeOnSuccess);
      }
    });
  };

  //  رد کردن حراست
  const sendRejectionWardingOnSuccess = async (value: SendRejectingWardingResponse) => {
    if (value?.status === 200) {
      closeWardingRejectModalHandler();
      toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
        toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
      });
      rejectionForm.resetFields();
    }
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
                reasonClosingSecurity: rejectionData?.rejectReason?.label,
              },
            },
          })
            .unwrap()
            .then(sendRejectionWardingOnSuccess);
        }
      });
  };

  // رد کردن معاونت پژوهشی
  const sendRejectingResearchChancellorOnSuccess = async (
    value: SendRejectingResearchChancellorResponse
  ) => {
    if (value?.status === 200) {
      closeRejectResearchChancellorModalHandler();
      toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
        toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
      });
      rejectionForm.resetFields();
    }
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
                descClosingResearchAssistant: rejectionData?.rejectDescription,
                reasonClosingResearchAssistant: rejectionData?.rejectReason?.label,
              },
            },
          })
            .unwrap()
            .then(sendRejectingResearchChancellorOnSuccess);
        }
      });
  };

  // رد کردن معاونت دانشجویی
  const sendRejectingStudentChancellorOnSuccess = async (
    value: SendRejectingStudentChancellorResponse
  ) => {
    if (value?.status === 200) {
      closeRejectStudentChancellorModalHandler();
      toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
        toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
      });
      rejectionForm.resetFields();
    }
  };

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
                descClosingStudentVice: rejectionData?.rejectDescription,
                reasonClosingStudentVice: rejectionData?.rejectReason?.label,
              },
            },
          })
            .unwrap()
            .then(sendRejectingStudentChancellorOnSuccess);
        }
      });
  };

  // رد کردن معاونت آموزشی
  const sendRejectingEducationChancellorOnSuccess = async (
    value: SendRejectingEducationChancellorResponse
  ) => {
    if (value?.status === 200) {
      closeRejectEducationChancellorModalHandler();
      toast.success(SEND_REJECT_CHARGE_SUCCESS_MSG, {
        toastId: SEND_REJECT_CHARGE_SUCCESS_MSG,
      });
      rejectionForm.resetFields();
    }
  };

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
                descClosingEducationalAssistant: rejectionData?.rejectDescription,
                reasonClosingEducationalAssistant: rejectionData?.rejectReason?.label,
              },
            },
          })
            .unwrap()
            .then(sendRejectingEducationChancellorOnSuccess);
        }
      });
  };

  // مودال تایید حراست
  const sendConfirmModalOnSuccess = async (value: SendConfirmModalResponse) => {
    if (value?.status === 200) {
      closeConfirmReportModalHandler();
      toast.success(SEND_CONFIRM_SUCCESS_MSG, {
        toastId: SEND_CONFIRM_SUCCESS_MSG,
      });
    }
  };

  const confirmReportHandler = () => {
    if (id) {
      sendConfirmModal({
        form: "ApprovalHeadSecurity",
        id: "6e9ee2d01a034d4c9d72f8bd03450198",
        _data_: {
          securityStatus: 3,
          id: +id,
        },
      })
        .unwrap()
        .then(sendConfirmModalOnSuccess);
    }
  };

  // مودال تایید معاونت پژوهشی
  const sendResearchChancellorConfirmOnSuccess = async (
    value: SendResearchChancellorConfirmModalResponse
  ) => {
    if (value?.status === 200) {
      closeConfirmResearchChancellorModalHandler();
      toast.success(SEND_CONFIRM_SUCCESS_MSG, {
        toastId: SEND_CONFIRM_SUCCESS_MSG,
      });
    }
  };

  const confirmResearchChancellorHandler = () => {
    if (id) {
      sendResearchChancellorConfirmModal({
        form: "ApprovalResearchAssistant",
        id: "73302b9a22a94b1a8b8c95eb92e4c1f7",
        _data_: {
          researchAssistantStatus: 3,
          id: +id,
        },
      })
        .unwrap()
        .then(sendResearchChancellorConfirmOnSuccess);
    }
  };

  // مودال تایید معاونت دانشجویی
  const sendStudentChancellorConfirmOnSuccess = async (
    value: SendStudentChancellorConfirmModalResponse
  ) => {
    if (value?.status === 200) {
      closeConfirmStudentChancellorModalHandler();
      toast.success(SEND_CONFIRM_SUCCESS_MSG, {
        toastId: SEND_CONFIRM_SUCCESS_MSG,
      });
    }
  };

  const confirmStudentChancellorHandler = () => {
    if (id) {
      sendStudentChancellorConfirmModal({
        form: "ApprovalStudentVicePresident",
        id: "c4bda5c23760405b86cdbfcd98a1ecf9",
        _data_: {
          studentViceStatus: "3",
          id: +id,
        },
      })
        .unwrap()
        .then(sendStudentChancellorConfirmOnSuccess);
    }
  };

  // مودال تایید معاونت آموزشی
  const sendEducationChancellorConfirmOnSuccess = async (
    value: SendEducationChancellorConfirmModalResponse
  ) => {
    if (value?.status === 200) {
      closeConfirmEducationChancellorModalHandler();
      toast.success(SEND_CONFIRM_SUCCESS_MSG, {
        toastId: SEND_CONFIRM_SUCCESS_MSG,
      });
    }
  };

  const confirmEducationChancellorHandler = () => {
    if (id) {
      sendEducationChancellorConfirmModal({
        form: "ApprovalViceChancellor",
        id: "ad09ce77e6be42f180dc7e204ee0c515",
        _data_: {
          educationalAssistantStatus: "3",
          id: +id,
        },
      })
        .unwrap()
        .then(sendEducationChancellorConfirmOnSuccess);
    }
  };

  // رفع ارجاع
  const getReferralRemovalOnSuccess = async (
    value: GetRemovalReportReferenceResponse
  ) => {
    if (value?.status === 200) {
      referralRemovalForm.setFieldsValue({
        referralRemovalItems: [
          CheckBoxFormGenerator(
            value?.data?.AssociationReferral?.sendToConsultant,
            "sendToConsultant"
          ),
          CheckBoxFormGenerator(
            value?.data?.AssociationReferral?.sendToEducAssistant,
            "sendToEducAssistant"
          ),
          CheckBoxFormGenerator(
            value?.data?.AssociationReferral?.sendToProtection,
            "sendToProtection"
          ),
          CheckBoxFormGenerator(
            value?.data?.AssociationReferral?.sendToReporter,
            "sendToReporter"
          ),
          CheckBoxFormGenerator(
            value?.data?.AssociationReferral?.sendToResearchAssistant,
            "sendToResearchAssistant"
          ),
          CheckBoxFormGenerator(
            value?.data?.AssociationReferral?.sendToStudentPresident,
            "sendToStudentPresident"
          ),
        ],
      });
    }
  };

  const stepItems = [
    {
      title: (
        <div className="step-item-container">
          <h3 className="step-title">اصلاحات کارشناس1</h3>
          <span className="step-subtitle">
            {moment(new Date()).locale("fa").format("HH:mm - YYYY/M/D")}
          </span>
          <div className="step-body">
            <BasicReportDetail
              setAccusedDataHandler={setAccusedDataHandler}
              isEditable={true}
            />
          </div>
        </div>
      ),
    },
    {
      title: (
        <div className="step-item-container">
          <h3 className="step-title">حراست</h3>
          <span className="step-subtitle">
            {moment(new Date()).locale("fa").format("HH:mm - YYYY/M/D")}
          </span>
          <div className="step-body">
            <div className="around-box referral-section">
              <div className="title-container">
                <span className="step-subtitle">ارجاع: </span>
                <h3 className="step-title">
                  {moment(new Date()).locale("fa").format("HH:mm - YYYY/M/D")}
                </h3>
              </div>
              <CustomSelect
                label="نظر"
                name="rejectReportReason"
                options={[]}
                placeholder="انتخاب کنید"
              />
              <CustomTextArea
                label="توضیح"
                name="rejectReportDescription"
                placeholder="توضیحات"
              />
              <div className="attachment-container">
                <h3 className="step-title">پیوست ها</h3>
                <Upload className="upload-container" listType="picture" multiple>
                  <Button icon={<AiOutlineUpload />} className="custom-btn">
                    بارگذاری تصاویر
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];
  const items = [
    {
      label: "جزئیات اولیه گزارش",
      key: "1",
      children: (
        <BasicReportDetail
          setAccusedDataHandler={setAccusedDataHandler}
          isEditable={false}
        />
      ),
    },
    {
      label: "مسیر فرآیند",
      children: (
        <Steps orientation="vertical" size="small" current={1} items={stepItems} />
      ),
      key: "2",
      disabled: true,
    },
  ];

  // onReferralClickHandler
  const onReferralClickHandler = () => {
    if (id) {
      //کمیته پژوهشی
      if (isResearchChancellor) {
        setResearchChancellorReferralModal({ isOpen: true, id: +id });
      } else if (isFromWarding) {
        setIsWardingReferralModal({ isOpen: true, id: +id });
        //کیمته دانشجویی
      } else if (isStudentChancellor) {
        setStudentChancellorReferralModal({ isOpen: true, id: +id });
      } else if (isEducation) {
        setEducationChancellorReferralModal({ isOpen: true, id: +id });
      } else {
        openReferralReportModalHandler();
      }
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form className="committee-report-detail-page-container" form={form}>
      {/* ثبت اصلاحیه */}
      {isEditReportModalOpen?.isOpen && (
        <EditReportModal
          isModalOpen={isEditReportModalOpen}
          closeModalHandler={closeEditReportModalHandler}
        />
      )}

      {/* ارجاع */}
      {isReferralReportModalOpen?.isOpen && (
        <ReferralReportModal
          isModalOpen={isReferralReportModalOpen}
          closeModalHandler={closeReferralReportModalHandler}
        />
      )}

      {/* ارجاع حراست */}
      {isWardingReferralModal?.isOpen && (
        <WardingReferralModal
          isModalOpen={isWardingReferralModal}
          closeModalHandler={closeWardingReferralModalHandler}
        />
      )}

      {/*  ارجاع معاونت پژوهشی */}
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
          width={900}
          content={
            <ReferralRemovalModalContent
              form={referralRemovalForm}
              loading={isGetReferralRemovalLoading}
            />
          }
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

      {/* (گزارش) ثبت نظر حراست */}
      {isReportWardingRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isReportWardingRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeReportWardingRegisterCommentModalHandler}
          onConfirmClickHandler={ReportWardingRegisterCommentHandler}
          isConfirmButtonLoading={isSendReportWardingRegisterCommentModalLoading}
          key={isFromWarding}
          content={
            <RegisterCommentModalContent
              commentList={registerCommentData?.data && registerCommentData?.data}
              form={registerCommentForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* (گزارش) ثبت نظر معاونت پژوهشی */}
      {isReportResearchChanRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isReportResearchChanRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeReportResearchChancellorRegisterCommentModalHandler}
          onConfirmClickHandler={ReportResearchChancellorRegisterCommentHandler}
          isConfirmButtonLoading={
            isSendReportResearchChancellorRegisterCommentModalLoading
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

      {/* (گزارش) ثبت نظر معاونت دانشجویی */}
      {isReportStudentChanRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isReportStudentChanRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeReportStudentChancellorRegisterCommentModalHandler}
          onConfirmClickHandler={ReportStudentChancellorRegisterCommentHandler}
          isConfirmButtonLoading={
            isSendReportStudentChancellorRegisterCommentModalLoading
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

      {/* (گزارش) ثبت نظر معاونت آموزشی */}
      {isReportEducationChanRegisterCommentModalOpen && (
        <ConfirmationModalWithContent
          title="ثبت نظر"
          isModalOpen={isReportEducationChanRegisterCommentModalOpen}
          confirmBtnText="ثبت نظر"
          closeModalHandler={closeReportEducationChancellorRegisterCommentModalHandler}
          onConfirmClickHandler={ReportEducationChancellorRegisterCommentHandler}
          isConfirmButtonLoading={
            isSendReportEducationChancellorRegisterCommentModalLoading
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

      {/* رد کردن */}
      {isRejectReportModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="رد کردن"
          isModalOpen={isRejectReportModalOpen?.isOpen}
          confirmBtnText="رد کردن"
          isDangerous={true}
          closeModalHandler={closeRejectReportModalHandler}
          onConfirmClickHandler={rejectReportHandler}
          isConfirmButtonLoading={isSendRejectingChargeLoading}
          content={
            <RejectReportModalContent
              isLoading={isGetReasonsRejectionChargeLoading}
              options={
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
              options={
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
              options={
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
              options={
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
              options={
                getReasonsRejectionChargeData?.data && getReasonsRejectionChargeData?.data
              }
              form={rejectionForm}
            />
          }
          showIcon={false}
        />
      )}

      {/* تایید کردن */}
      {isConfirmReportModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تایید کردن"
          isModalOpen={isConfirmReportModalOpen?.isOpen}
          confirmBtnText="تایید"
          isDangerous={false}
          closeModalHandler={closeConfirmReportModalHandler}
          onConfirmClickHandler={confirmReportHandler}
          isConfirmButtonLoading={isSendConfirmModalLoading}
          content={ARE_YOU_SURE}
          showIcon={false}
        />
      )}

      {/* تایید کردن معاونت پژوهشی */}
      {isConfirmResearchChancellorModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تایید کردن"
          isModalOpen={isConfirmResearchChancellorModalOpen?.isOpen}
          confirmBtnText="تایید"
          isDangerous={false}
          closeModalHandler={closeConfirmResearchChancellorModalHandler}
          onConfirmClickHandler={confirmResearchChancellorHandler}
          isConfirmButtonLoading={isSendResearchChancellorConfirmModalLoading}
          content={ARE_YOU_SURE}
          showIcon={false}
        />
      )}
      {/* تایید کردن معاونت دانشجویی */}
      {isConfirmStudentChancellorModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تایید کردن"
          isModalOpen={isConfirmStudentChancellorModalOpen?.isOpen}
          confirmBtnText="تایید"
          isDangerous={false}
          closeModalHandler={closeConfirmStudentChancellorModalHandler}
          onConfirmClickHandler={confirmStudentChancellorHandler}
          isConfirmButtonLoading={isSendStudentChancellorConfirmModalLoading}
          content={ARE_YOU_SURE}
          showIcon={false}
        />
      )}
      {/* تایید کردن معاونت آموزشی */}
      {isConfirmEducationChancellorModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تایید کردن"
          isModalOpen={isConfirmEducationChancellorModalOpen?.isOpen}
          confirmBtnText="تایید"
          isDangerous={false}
          closeModalHandler={closeConfirmEducationChancellorModalHandler}
          onConfirmClickHandler={confirmEducationChancellorHandler}
          isConfirmButtonLoading={isSendEducationChancellorConfirmModalLoading}
          content={ARE_YOU_SURE}
          showIcon={false}
        />
      )}
      <CustomCard padding={PADDING_20}>
        <section className="actions">
          {/* <h3 className="title">اقدام</h3> */}
          <CustomDivider text="اقدام" />
          <div className="around-box">
            <div className="actions-button-container">
              {!isFromWarding &&
              !isResearchChancellor &&
              !isStudentChancellor &&
              !isEducation ? (
                <Button
                  type="primary"
                  className="action-btn"
                  onClick={openEditReportModalHandler}
                >
                  ثبت اصلاحیه
                </Button>
              ) : null}
              <Button
                type="primary"
                className="action-btn"
                onClick={onReferralClickHandler}
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
                    onClick={submitAccusationHandler}
                  >
                    ثبت اتهام
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
              {isFromWarding &&
              +type !== 3 &&
              +type !== 4 &&
              +type !== 5 &&
              +type !== 6 ? (
                <Button
                  type="primary"
                  ghost
                  className="action-btn"
                  onClick={openConfirmReportModalHandler}
                >
                  تایید
                </Button>
              ) : isResearchChancellor &&
                +type !== 3 &&
                +type !== 4 &&
                +type !== 5 &&
                +type !== 6 ? (
                <Button
                  type="primary"
                  ghost
                  className="action-btn"
                  onClick={openConfirmResearchChancellorModalHandler}
                >
                  تایید
                </Button>
              ) : isStudentChancellor &&
                +type !== 3 &&
                +type !== 4 &&
                +type !== 5 &&
                +type !== 6 ? (
                <Button
                  type="primary"
                  ghost
                  className="action-btn"
                  onClick={openConfirmStudentChancellorModalHandler}
                >
                  تایید
                </Button>
              ) : isEducation &&
                +type !== 3 &&
                +type !== 4 &&
                +type !== 5 &&
                +type !== 6 ? (
                <Button
                  type="primary"
                  ghost
                  className="action-btn"
                  onClick={openConfirmEducationChancellorModalHandler}
                >
                  تایید
                </Button>
              ) : null}

              <Button
                type="primary"
                danger
                className="action-btn"
                onClick={openRejectReportModalHandler}
              >
                بستن
              </Button>
            </div>
          </div>
        </section>
      </CustomCard>
      <CustomCard padding={PADDING_20} loading={isReporterDetailLoading}>
        <div className="around-box">
          <div className="reporter-info-container">
            <CustomDivider text="اطلاعات هویتی گزارشگر" />
            <Collapse
              expandIcon={({ isActive }) => (
                <IoIosArrowDown rotate={isActive ? 0 : 180} className="collapse-icon" />
              )}
              ghost
              items={ReporterInfo({
                reporterName: reportDetailData?.data?.[0]?.reporterName,
                reporterFamily: reportDetailData?.data?.[0]?.reporterFamily,
                reporterNationalcode: reportDetailData?.data?.[0]?.reporterNationalcode,
                reporterNumber: reportDetailData?.data?.[0]?.reporterNumber,
                reporterPhoneNumber: reportDetailData?.data?.[0]?.reporterPhoneNumber,
              })}
            />
          </div>
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_20} loading={isReporterDetailLoading}>
        <Tabs type="card" items={items} dir="rtl" destroyInactiveTabPane={true} />
      </CustomCard>
      {/* //todo:[ati]:uncomment when api got ready */}
      {/* <CustomCard padding={PADDING_20} className="other-infringements">
        <h3 className="title">دیگر اتهامات این گزارش</h3>
        <div className="around-box">
          <div className="infringement-container">
            <div className="infringement-items-container">
              <SingleVerticalItem label="نوع" value="ثبت نشده" />
              <SingleVerticalItem label="اتهام" value="ثبت نشده" />
              <SingleVerticalItem label="وضعیت" value="بررسی نشده" />
            </div>
             //Todo[atefeh]:un commit when the UI got ready 
            <Button type="text" className="view-button">
                مشاهده
              </Button>
          </div>
        </div>
      </CustomCard> */}
    </Form>
  );
};

export default ReportDetail;
