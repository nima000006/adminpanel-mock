import { useState } from "react";

import { Form, Row, UploadFile } from "antd";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { InternationalReasonsItemsType } from "@pages/International/Requests/Demands/Detail/@types/@demandDetail";
import { PRE_REGISTRATION_IDS } from "@pages/International/Requests/PreRegistration/List/helper/utils/preRegistrationListUtils";

import { preRegistrationPageMode } from "../../utils/preRegistrationUtils";
import PreRegistrationEducationInfo from "./helper/components/PreRegistrationEducationInfo/PreRegistrationEducationInfo";
import PreRegistrationIdentityInfoApplicant from "./helper/components/PreRegistrationIdentityInfoApplicant/PreRegistrationIdentityInfoApplicant";
import PreRegistrationLocationApplicant from "./helper/components/PreRegistrationLocationApplicant/PreRegistrationLocationApplicant";
import PreRegistrationRequestApplicant from "./helper/components/PreRegistrationRequestApplicant/PreRegistrationRequestApplicant";
import PreRegistrationRequestInfo from "./helper/components/PreRegistrationRequestInfo/PreRegistrationRequestInfo";
import PreRegistrationUploadedDocument from "./helper/components/PreRegistrationUploadedDocument/PreRegistrationUploadedDocument";
import PreRegistrationDetailConfirmModalContent from "./helper/modal/PreRegistrationDetailConfirmModalContent/PreRegistrationDetailConfirmModalContent";
import PreRegistrationDetailEditModalContent from "./helper/modal/PreRegistrationDetailEditModalContent/PreRegistrationDetailEditModalContent";
import PreRegistrationDetailRejectModalContent from "./helper/modal/PreRegistrationDetailRejectModalContent/PreRegistrationDetailRejectModalContent";

const PreRegistrationDetailRequestInfoTab = () => {
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

  const { params } = useQueryParams();

  const [editForm] = Form.useForm<{ reason: InternationalReasonsItemsType[] }>();
  const [rejectForm] = Form.useForm<{ reason: InternationalReasonsItemsType[] }>();
  const [confirmForm] = Form.useForm<{ reason: InternationalReasonsItemsType }>();

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
          content={<PreRegistrationDetailEditModalContent form={editForm} />}
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
          content={<PreRegistrationDetailRejectModalContent form={rejectForm} />}
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
          content={<PreRegistrationDetailConfirmModalContent form={confirmForm} />}
        />
      )}

      <div className="flex flex-col gap-10">
        <CustomTag color={preRegistrationPageMode[params?.status]?.color}>
          <div className="flex items-center gap-1">
            {preRegistrationPageMode[params?.status]?.icon}
            <span>{preRegistrationPageMode[params?.status]?.text}</span>
          </div>
        </CustomTag>
        {/* مشخصات درخواست */}
        <PreRegistrationRequestInfo />

        {/* کد سائورگ */}
        <div>
          <CustomDivider text="سائورگ" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="کد سائورگ" value={params?.id} />
          </Row>
        </div>

        {/* اطلاعات هویتی متقاضی */}
        <PreRegistrationIdentityInfoApplicant />

        {/* موقعیت مکانی */}
        <PreRegistrationLocationApplicant />

        {/* درخواست متقاضی */}
        <PreRegistrationRequestApplicant />

        {/* اطلاعات تحصیلی پیشین متقاضی */}
        <PreRegistrationEducationInfo />
        {/* اسناد و مدارک بارگذاری شده */}
        <PreRegistrationUploadedDocument
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
        {(params?.status === PRE_REGISTRATION_IDS?.pending ||
          params?.status === PRE_REGISTRATION_IDS?.waitingReChecking) && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <CustomButton
              type="primary"
              color="green"
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
export default PreRegistrationDetailRequestInfoTab;
