import { useState } from "react";

import { Form, UploadFile } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { PiArrowRight, PiHourglassSimpleHigh } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_APPLICANTS_DETAIL_ROUTE } from "@infra/router/routes/international";
import { InternationalReasonsItemsType } from "@pages/International/Requests/Demands/Detail/@types/@demandDetail";

import { APPLICANTS_IDS } from "../utils/applicantsDetailUtils";
import ApplicantsEducationInfo from "./helper/components/ApplicantsEducationInfo/ApplicantsEducationInfo";
import ApplicantsIdentityInfoApplicant from "./helper/components/ApplicantsIdentityInfoApplicant/ApplicantsIdentityInfoApplicant";
import ApplicantsLocationApplicant from "./helper/components/ApplicantsLocationApplicant/ApplicantsLocationApplicant";
import ApplicantsRequestApplicant from "./helper/components/ApplicantsRequestApplicant/ApplicantsRequestApplicant";
import ApplicantsRequestInfo from "./helper/components/ApplicantsRequestInfo/ApplicantsRequestInfo";
import ApplicantsUploadedDocument from "./helper/components/ApplicantsUploadedDocument/ApplicantsUploadedDocument";
import ApplicantsDetailConfirmModalContent from "./helper/modal/ApplicantsDetailConfirmModalContent/ApplicantsDetailConfirmModalContent";
import ApplicantsDetailEditModalContent from "./helper/modal/ApplicantsDetailEditModalContent/ApplicantsDetailEditModalContent";
import ApplicantsDetailRejectModalContent from "./helper/modal/ApplicantsDetailRejectModalContent/ApplicantsDetailRejectModalContent";

const ApplicantsRequestDetail = () => {
  const [degreeCertificate, setDegreeCertificate] = useState<UploadFile[]>([]); //مدرک تحصیلی
  const [transcriptCertificate, setTranscriptCertificate] = useState<UploadFile[]>([]); //ریز نمرات
  const [passport, setPassport] = useState<UploadFile[]>([]); // صفحه اول پاسپورت
  const [passportPhoto, setPassportPhoto] = useState<UploadFile[]>([]); //عکس پرسنلی (3*4)
  const [resume, setResume] = useState<UploadFile[]>([]); // رزومه
  const [statementOfPurpose, setStatementOfPurpose] = useState<UploadFile[]>([]); // انگیزه نامه
  const [preUniversityCertificate, setPreUniversityCertificate] = useState<UploadFile[]>(
    []
  ); // مدرک پیش دانشگاهی
  const [residenceCertificate, setResidenceCertificate] = useState<UploadFile[]>([]); // کارت آمایشی هوشمند

  // modal
  const [isEditModalOpen, setIsEditModalOpen] = useState({ isOpen: false, id: -1 });
  const [isRejectModalOpen, setIsRejectModalOpen] = useState({ isOpen: false, id: -1 });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState({ isOpen: false, id: -1 });

  const {
    params: { status },
  } = useQueryParams();

  const [editForm] = Form.useForm<{ reason: InternationalReasonsItemsType[] }>();
  const [rejectForm] = Form.useForm<{ reason: InternationalReasonsItemsType[] }>();
  const [confirmForm] = Form.useForm<{ reason: InternationalReasonsItemsType[] }>();

  //* ================================ Util Functions ================================
  // modal handler
  const editConfirmModalHandler = () => {};
  const openEditModalHandler = () => {
    setIsEditModalOpen({ isOpen: true, id: -1 });
  };
  const closeEditModalHandler = () => {
    setIsEditModalOpen({ isOpen: false, id: -1 });
  };

  const rejectConfirmModalHandler = () => {};

  const openRejectModalHandler = () => {
    setIsRejectModalOpen({ isOpen: true, id: -1 });
  };

  const closeRejectModalHandler = () => {
    setIsRejectModalOpen({ isOpen: false, id: -1 });
  };

  const confirmRequestModalHandler = () => {};

  const openConfirmModalHandler = () => {
    setIsConfirmModalOpen({ isOpen: true, id: -1 });
  };
  const closeConfirmModalHandler = () => {
    setIsConfirmModalOpen({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* EDIT MODAL */}
      {isEditModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="اصلاح درخواست"
          backBtnText="انصراف"
          confirmBtnText="اصلاح درخواست"
          isModalOpen={isEditModalOpen?.isOpen}
          onConfirmClickHandler={editConfirmModalHandler}
          closeModalHandler={closeEditModalHandler}
          // isConfirmButtonLoading={}
          content={<ApplicantsDetailEditModalContent form={editForm} />}
        />
      )}

      {/* REJECT MODAL */}
      {isRejectModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="رد درخواست"
          backBtnText="انصراف"
          confirmBtnText="رد درخواست"
          isDangerous
          isModalOpen={isRejectModalOpen?.isOpen}
          onConfirmClickHandler={rejectConfirmModalHandler}
          closeModalHandler={closeRejectModalHandler}
          // isConfirmButtonLoading={}
          content={<ApplicantsDetailRejectModalContent form={rejectForm} />}
        />
      )}

      {/* CONFIRM MODAL */}
      {isConfirmModalOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="تایید درخواست"
          backBtnText="انصراف"
          confirmBtnText="تایید درخواست"
          isModalOpen={isConfirmModalOpen?.isOpen}
          onConfirmClickHandler={confirmRequestModalHandler}
          closeModalHandler={closeConfirmModalHandler}
          // isConfirmButtonLoading={}
          content={<ApplicantsDetailConfirmModalContent form={confirmForm} />}
        />
      )}

      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <Link
            className="flex items-center gap-1"
            to={INTERNATIONAL_APPLICANTS_DETAIL_ROUTE}
          >
            <PiArrowRight className="text-primary-6" size={16} />
            <span className="text-primary-6 font-[DanaFaNum]">بازگشت به پروفایل</span>
          </Link>
          <CustomTag
            className="flex gap-1"
            color={
              +status === APPLICANTS_IDS?.reject
                ? "red"
                : +status === APPLICANTS_IDS?.waitingReChecking
                  ? "orange"
                  : "default"
            }
            icon={
              +status === APPLICANTS_IDS?.reject ? (
                <AiOutlineClose />
              ) : +status === APPLICANTS_IDS?.waitingReChecking ||
                +status === APPLICANTS_IDS?.pending ? (
                <PiHourglassSimpleHigh />
              ) : null
            }
          >
            {+status === APPLICANTS_IDS?.reject
              ? "رد شده"
              : +status === APPLICANTS_IDS?.waitingReChecking
                ? " در انتظار بررسی مجدد"
                : +status === APPLICANTS_IDS?.pending
                  ? "در انتظار بررسی"
                  : "-"}
          </CustomTag>
        </div>

        {/* مشخصات درخواست */}
        <ApplicantsRequestInfo />

        {/* اطلاعات هویتی متقاضی */}
        <ApplicantsIdentityInfoApplicant />

        {/* موقعیت مکانی */}
        {+status === APPLICANTS_IDS?.reject ? <ApplicantsLocationApplicant /> : null}

        {/* درخواست متقاضی */}
        <ApplicantsRequestApplicant />

        {/* اطلاعات تحصیلی پیشین متقاضی */}
        <ApplicantsEducationInfo />
        {/* اسناد و مدارک بارگذاری شده */}
        <ApplicantsUploadedDocument
          degreeCertificate={degreeCertificate}
          setDegreeCertificate={setDegreeCertificate}
          transcriptCertificate={transcriptCertificate}
          setTranscriptCertificate={setTranscriptCertificate}
          passport={passport}
          setPassport={setPassport}
          passportPhoto={passportPhoto}
          setPassportPhoto={setPassportPhoto}
          resume={resume}
          setResume={setResume}
          statementOfPurpose={statementOfPurpose}
          setStatementOfPurpose={setStatementOfPurpose}
          preUniversityCertificate={preUniversityCertificate}
          setPreUniversityCertificate={setPreUniversityCertificate}
          residenceCertificate={residenceCertificate}
          setResidenceCertificate={setResidenceCertificate}
        />
        {(+status === APPLICANTS_IDS?.pending ||
          +status === APPLICANTS_IDS?.waitingReChecking) && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <CustomButton
              type="primary"
              isWarning
              className="action-btn edit-btn"
              onClick={openEditModalHandler}
            >
              اصلاح درخواست
            </CustomButton>

            <CustomButton
              type="primary"
              danger
              className="action-btn"
              onClick={openRejectModalHandler}
            >
              رد درخواست
            </CustomButton>

            <CustomButton
              type="primary"
              className="action-btn"
              onClick={openConfirmModalHandler}
            >
              تایید درخواست
            </CustomButton>
          </div>
        )}
      </div>
    </>
  );
};
export default ApplicantsRequestDetail;
