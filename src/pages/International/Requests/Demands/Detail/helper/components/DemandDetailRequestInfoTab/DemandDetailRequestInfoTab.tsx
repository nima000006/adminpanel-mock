import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomUploader from "@components/CustomInputs/CustomUploader/CustomUploader";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { INTERNATIONAL_REQUESTS_DEMANDS_ROUTE } from "@infra/router/routes/international";
import {
  useEducationalCheckingStatusMutation,
  useLazyGetDemandDetailQuery,
} from "@infra/states/redux/Apis/international/request/requestApi";
import { DEMAND_IDS } from "@pages/International/Requests/Demands/List/utils/demandConstants";
import { INTERNATIONAL_REASONS_ID } from "@pages/International/utils/internationalUtils";

import {
  GetDemandDetailResponse,
  InternationalReasonsItemsType,
} from "../../../@types/@demandDetail";
import {
  CONFIRM_ERROR_MSG,
  CONFIRM_SUCCESS_MSG,
  EDIT_ERROR_MSG,
  EDIT_SUCCESS_MSG,
  pageMode,
  REJECT_ERROR_MSG,
  REJECT_SUCCESS_MSG,
} from "../../../utils/demandDetail";
import DemandDetailConfirmModalContent from "../../modals/ConfirmModal/DemandDetailConfirmModalContent";
import DemandDetailEditModalContent from "../../modals/EditModal/DemandDetailEditModalContent";
import DemandDetailRejectModalContent from "../../modals/RejectModal/DemandDetailRejectModalContent";

import "./_demandDetailRequestInfoTab.scss";

const generateUploadItem = (value: string): UploadFile[] => {
  return [
    {
      uid: value,
      name: value,
      status: "done",
      url: value,
    },
  ];
};

const DemandDetailRequestInfoTab = () => {
  const [data, setData] = useState<GetDemandDetailResponse | null>(null);

  //required images
  const [degreeCertificate, setDegreeCertificate] = useState<UploadFile[]>([]); //مدرک تحصیلی
  const [transcriptCertificate, setTranscriptCertificate] = useState<UploadFile[]>([]); //ریز نمرات
  const [passport, setPassport] = useState<UploadFile[]>([]); // صفحه اول پاسپورت
  const [passportPhoto, setPassportPhoto] = useState<UploadFile[]>([]); //عکس پرسنلی (3*4)

  // optional images
  const [resume, setResume] = useState<UploadFile[]>([]); // رزومه
  const [statementOfPurpose, setStatementOfPurpose] = useState<UploadFile[]>([]); // انگیزه نامه
  const [preUniversityCertificate, setPreUniversityCertificate] = useState<UploadFile[]>(
    []
  ); // مدرک پیش دانشگاهی
  const [residenceCertificate, setResidenceCertificate] = useState<UploadFile[]>([]); // کارت آمایشی هوشمند

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { params } = useQueryParams();

  const navigate = useNavigate();

  const [editForm] = Form.useForm<{ reason: InternationalReasonsItemsType[] }>();
  const [rejectForm] = Form.useForm<{ reason: InternationalReasonsItemsType[] }>();
  const [confirmForm] = Form.useForm<{ reason: InternationalReasonsItemsType }>();

  //? ================================  Api Calls ================================
  const [getDetailData, { isFetching: isDetailDataLoading }] =
    useLazyGetDemandDetailQuery();

  const [changeStatus, { isLoading: isChangeStatusLoading }] =
    useEducationalCheckingStatusMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.id) {
      getDetailData(params?.id).unwrap().then(getDetailDataSuccess);
    }
  }, [params?.id]);

  //* ================================ Util Functions ================================
  const getDetailDataSuccess = (value: GetDemandDetailResponse) => {
    setData(value);
    const degreeCertificateValue = value?.files?.degreeCertificate;
    const transcriptCertificateValue = value?.files?.transcriptCertificate;
    const passportValue = value?.files?.Passport;
    const passportPhotoValue = value?.files?.passportPhoto;

    const resumeValue = value?.files?.resume;
    const statementOfPurposeValue = value?.files?.["Statement.of.Purpose"];
    const preUniversityCertificateValue = value?.files?.["pre.university.certificate"];
    const residenceCertificateValue = value?.files?.residenceCertificate;

    setDegreeCertificate(generateUploadItem(degreeCertificateValue));
    setTranscriptCertificate(generateUploadItem(transcriptCertificateValue));
    setPassport(generateUploadItem(passportValue));
    setPassportPhoto(generateUploadItem(passportPhotoValue));
    if (resumeValue) {
      setResume(generateUploadItem(resumeValue));
    }
    if (statementOfPurposeValue) {
      setStatementOfPurpose(generateUploadItem(statementOfPurposeValue));
    }
    if (preUniversityCertificateValue) {
      setPreUniversityCertificate(generateUploadItem(preUniversityCertificateValue));
    }
    if (residenceCertificateValue) {
      setResidenceCertificate(generateUploadItem(residenceCertificateValue));
    }
  };

  //edit modal
  const openEditModalHandler = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModalHandler = () => {
    setIsEditModalOpen(false);
    editForm.resetFields();
  };
  const editRequestHandler = () => {
    editForm.submit();
    editForm.validateFields().then((values) => {
      const reasonIds = values?.reason?.map((item) => item?.code);
      if (params?.id) {
        changeStatus({
          reasonIdList: reasonIds,
          reasonTypeId: INTERNATIONAL_REASONS_ID?.editRequest,
          requestId: +params?.id,
        })
          .unwrap()
          .then(changeStatusSuccess)
          .catch(changeStatusError);
      }
    });
  };

  //reject modal
  const openRejectModalHandler = () => {
    setIsRejectModalOpen(true);
  };
  const closeRejectModalHandler = () => {
    setIsRejectModalOpen(false);
    rejectForm.resetFields();
  };
  const rejectRequestHandler = () => {
    rejectForm.submit();
    rejectForm.validateFields().then((values) => {
      const reasonIds = values?.reason?.map((item) => item?.code);
      if (params?.id) {
        changeStatus({
          reasonIdList: reasonIds,
          reasonTypeId: INTERNATIONAL_REASONS_ID?.rejectRequest,
          requestId: +params?.id,
        })
          .unwrap()
          .then(changeStatusSuccess)
          .catch(changeStatusError);
      }
    });
  };

  //accept modal
  const openConfirmModalHandler = () => {
    setIsConfirmModalOpen(true);
  };
  const closeConfirmModalHandler = () => {
    setIsConfirmModalOpen(false);
    confirmForm.resetFields();
  };
  const confirmRequestHandler = () => {
    // todo[Atefeh]:when implement course by interview, edit this section
    if (!data?.haveInterview) {
      confirmForm.submit();
      confirmForm.validateFields().then((values) => {
        const reasonId = values?.reason?.code;

        if (params?.id) {
          changeStatus({
            reasonIdList: reasonId ? [reasonId] : [],
            reasonTypeId: INTERNATIONAL_REASONS_ID?.confirmRequest,
            requestId: +params?.id,
          })
            .unwrap()
            .then(changeStatusSuccess)
            .catch(changeStatusError);
        }
      });
    }
  };

  //api result
  const changeStatusSuccess = () => {
    if (isEditModalOpen) {
      closeEditModalHandler();
      toast.success(EDIT_SUCCESS_MSG, { toastId: EDIT_SUCCESS_MSG });
    } else if (isRejectModalOpen) {
      closeRejectModalHandler();
      toast.success(REJECT_SUCCESS_MSG, { toastId: REJECT_SUCCESS_MSG });
    } else if (isConfirmModalOpen) {
      closeConfirmModalHandler();
      toast.success(CONFIRM_SUCCESS_MSG, { toastId: CONFIRM_SUCCESS_MSG });
    } else {
      return;
    }

    navigate({
      pathname: INTERNATIONAL_REQUESTS_DEMANDS_ROUTE,
      search: makeSearchParams(params),
    });
  };

  const changeStatusError = () => {
    if (isEditModalOpen) {
      closeEditModalHandler();
      toast.error(EDIT_ERROR_MSG, { toastId: EDIT_ERROR_MSG });
    } else if (isRejectModalOpen) {
      closeRejectModalHandler();
      toast.error(REJECT_ERROR_MSG, { toastId: REJECT_ERROR_MSG });
    } else if (isConfirmModalOpen) {
      closeConfirmModalHandler();
      toast.error(CONFIRM_ERROR_MSG, { toastId: CONFIRM_ERROR_MSG });
    } else {
      return;
    }
  };

  return (
    <>
      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <ConfirmationModalWithContent
          title="اصلاح درخواست"
          backBtnText="انصراف"
          confirmBtnText="اصلاح درخواست"
          isModalOpen={isEditModalOpen}
          onConfirmClickHandler={editRequestHandler}
          closeModalHandler={closeEditModalHandler}
          isConfirmButtonLoading={isChangeStatusLoading}
          content={<DemandDetailEditModalContent form={editForm} />}
        />
      )}

      {/* REJECT MODAL */}
      {isRejectModalOpen && (
        <ConfirmationModalWithContent
          title="رد درخواست"
          backBtnText="انصراف"
          confirmBtnText="رد درخواست"
          isDangerous
          isModalOpen={isRejectModalOpen}
          onConfirmClickHandler={rejectRequestHandler}
          closeModalHandler={closeRejectModalHandler}
          isConfirmButtonLoading={isChangeStatusLoading}
          content={<DemandDetailRejectModalContent form={rejectForm} />}
        />
      )}

      {/* CONFIRM MODAL */}
      {isConfirmModalOpen && (
        <ConfirmationModalWithContent
          title="تایید درخواست"
          backBtnText="انصراف"
          confirmBtnText="تایید درخواست"
          isModalOpen={isConfirmModalOpen}
          onConfirmClickHandler={confirmRequestHandler}
          closeModalHandler={closeConfirmModalHandler}
          isConfirmButtonLoading={isChangeStatusLoading}
          content={<DemandDetailConfirmModalContent form={confirmForm} />}
        />
      )}
      <Div
        className="international-demand-detail-page-container"
        loading={isDetailDataLoading}
      >
        <div className="detail-container">
          <CustomTag color={pageMode[params?.status]?.color}>
            <div className="tag-container">
              {pageMode[params?.status]?.icon}
              <span>{pageMode[params?.status]?.text}</span>
            </div>
          </CustomTag>
          <div>
            <CustomDivider text="مشخصات درخواست" />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol label="شماره درخواست" value={params?.id} />
              <SingleVerticalWithCol
                label="مرحله درخواست"
                value={pageMode[params?.status]?.text}
              />
              <SingleVerticalWithCol
                label="وضعیت درخواست"
                value={pageMode[params?.status]?.text}
              />
              <SingleVerticalWithCol
                label="تاریخ ارسال درخواست"
                value={data?.requestDate}
                isDate
              />
            </Row>
          </div>
          <div>
            <CustomDivider text="اطلاعات هویتی متقاضی" />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol label="نام" value={data?.firstName} />
              <SingleVerticalWithCol label="نام خانوادگی" value={data?.lastName} />
              <SingleVerticalWithCol label="جنسیت" value={data?.gender} />
              <SingleVerticalWithCol label="لقب" value={data?.middleName} />
              <SingleVerticalWithCol label="تاریخ تولد" value={data?.birthDate} isDate />
              <SingleVerticalWithCol label="ملیت" value={data?.nationality} />
              <SingleVerticalWithCol label="تابعیت" value={data?.citizenshipRequest} />
              <SingleVerticalWithCol
                label="اقامت"
                value={data?.countryOfResidenceRequest}
              />
              <SingleVerticalWithCol
                label="شماره پاسپورت"
                value={data?.passportNumberRequest}
              />
              <SingleVerticalWithCol
                label="شناسه هویتی"
                value={data?.identificationNumber}
              />
            </Row>
          </div>
          <div>
            <CustomDivider text="درخواست متقاضی" />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                label="مقطع درخواستی"
                value={data?.degreeCourseRequest}
              />
              <SingleVerticalWithCol
                label="رشته درخواستی"
                value={data?.fieldCourseRequest}
              />
              <SingleVerticalWithCol
                label="واحد درخواستی"
                value={data?.branchCourseRequest}
              />
              <SingleVerticalWithCol
                label="ترم تحصیلی درخواستی"
                value={data?.semesterCourseRequest}
              />
            </Row>
          </div>
          <div>
            <CustomDivider text="اطلاعات تحصیلی پیشین متقاضی" />
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol label="مقطع تحصیلی" value={data?.degreeRequest} />
              <SingleVerticalWithCol label="رشته تحصیلی" value={data?.fieldRequest} />
              <SingleVerticalWithCol
                label="کشور محل تحصیل"
                value={data?.countryRequest}
              />
              <SingleVerticalWithCol
                label="موسسه / دانشگاه صادر کننده"
                value={data?.issuingInstitutionRequest}
              />
              <SingleVerticalWithCol
                label="معدل کل"
                value={data?.gpaRequest?.toString()}
              />
              <SingleVerticalWithCol label="معدل کتبی دیپلم" value={data?.iranianGpa} />
            </Row>
          </div>
          <div>
            <CustomDivider text="اسناد و مدارک بارگذاری شده" />
            <Row gutter={[16, 16]}>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomUploader
                  fileList={degreeCertificate}
                  setFileList={setDegreeCertificate}
                  isReadOnly={true}
                  name="degreeCertificate"
                  uploaderText="مدرک تحصیلی"
                  label="مدرک تحصیلی"
                  hasVerticalLabel
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomUploader
                  fileList={transcriptCertificate}
                  setFileList={setTranscriptCertificate}
                  isReadOnly={true}
                  name="transcriptCertificate"
                  uploaderText="ریز نمرات"
                  label="ریز نمرات"
                  hasVerticalLabel
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomUploader
                  fileList={passport}
                  setFileList={setPassport}
                  isReadOnly={true}
                  name="passport"
                  uploaderText="صفحه اول پاسپورت"
                  label="صفحه اول پاسپورت"
                  hasVerticalLabel
                />
              </Col>
              <Col lg={6} md={8} sm={12} xs={24}>
                <CustomUploader
                  fileList={passportPhoto}
                  setFileList={setPassportPhoto}
                  isReadOnly={true}
                  name="passPortPhoto"
                  uploaderText="عکس پرسنلی (3*4)"
                  label="عکس پرسنلی (3*4)"
                  hasVerticalLabel
                />
              </Col>
              {resume?.length === 1 && (
                <Col lg={6} md={8} sm={12} xs={24}>
                  <CustomUploader
                    fileList={resume}
                    setFileList={setResume}
                    isReadOnly={true}
                    name="resume"
                    uploaderText="رزومه"
                    label="رزومه"
                    hasVerticalLabel
                  />
                </Col>
              )}
              {statementOfPurpose?.length === 1 && (
                <Col lg={6} md={8} sm={12} xs={24}>
                  <CustomUploader
                    fileList={statementOfPurpose}
                    setFileList={setStatementOfPurpose}
                    isReadOnly={true}
                    name="statementOfPurpose"
                    uploaderText="انگیزه نامه"
                    label="انگیزه نامه"
                    hasVerticalLabel
                  />
                </Col>
              )}
              {preUniversityCertificate?.length === 1 && (
                <Col lg={6} md={8} sm={12} xs={24}>
                  <CustomUploader
                    fileList={preUniversityCertificate}
                    setFileList={setPreUniversityCertificate}
                    isReadOnly={true}
                    name="preUniversityCertificate"
                    uploaderText="مدرک پیش دانشگاهی"
                    label="مدرک پیش دانشگاهی"
                    hasVerticalLabel
                  />
                </Col>
              )}
              {residenceCertificate?.length === 1 && (
                <Col lg={6} md={8} sm={12} xs={24}>
                  <CustomUploader
                    fileList={residenceCertificate}
                    setFileList={setResidenceCertificate}
                    isReadOnly={true}
                    name="residenceCertificate"
                    uploaderText="کارت آمایشی هوشمند"
                    label="کارت آمایشی هوشمند"
                    hasVerticalLabel
                  />
                </Col>
              )}
            </Row>
          </div>
        </div>
        {params?.status === DEMAND_IDS?.pending && (
          <div className="action-btns-container">
            <CustomButton
              type="primary"
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
      </Div>
    </>
  );
};

export default DemandDetailRequestInfoTab;
