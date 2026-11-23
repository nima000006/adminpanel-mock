import { useEffect, useState } from "react";

import { Col, Form, Row, UploadFile } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { PiArrowLineUpRightBold, PiWalletFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { CustomInput, CustomUploader } from "@components/CustomInputs";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithHorizontalDiffDays from "@components/Renderers/CustomTagWithHorizontalDiffDays/CustomTagWithHorizontalDiffDays";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import {
  dataPlaceHolder,
  formatByGroups,
  getUploadFilePayload,
} from "@infra/helpers/utils";
import { attachmentDownloader } from "@infra/helpers/utils/fileUtils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { WALLET_ALL_WITHDRAWAL_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/wallet";
import {
  useLazyGetRejectReasonSelectListQuery,
  useLazyGetWithdrawalDetailQuery,
  usePaymentUploadFileMutation,
  useWithdrawalAcceptRequestDetailMutation,
  useWithdrawalRejectRequestDetailMutation,
  useWithdrawalSingleRevertToRequestedRequestMutation,
  useWithdrawalSingleSendToBankRequestMutation,
} from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { NEUTRAL_07, RED_6 } from "@infra/VARS/globalColors/globalColors";
import { FONTSIZE_25 } from "@infra/VARS/globalStyles/globalStyles";
import { WithdrawalAcceptDetailParams } from "@pages/Wallet/Requests/Withdrawal/AllWithdrawal/AllWithdrawalDetail/@types/@WithdrawalAcceptDetail";

import { FormTypeWalletRequestRejectedModal } from "./@types/@formTypeWalletRequestRejectedModal";
import { WithdrawalDetailResponse } from "./@types/@withdrawalDetail";
import { GetRejectReasonSelectListResponse } from "../AllWithdrawalList/_shared/components/WalletRequestRejectedDrawer/helper/@types/@getRejectReasonSelectList";

import "./_allWithdrawalDetail.scss";

const SEND_REJECT_SUCCESS_MSG = "درخواست با موفقیت رد شد";
const SEND_ACCEPT_SUCCESS_MSG = "درخواست با موفقیت تایید شد";
const SEND_SENT_TO_BANK_SUCCESS_MSG = "درخواست با موفقیت به بانک ارسال شد";

const RETURN_TO_REQUESTED_SUCCESS_MSG =
  "درخواست با موفقیت به در انتظار بررسی بازگشت داده شد";

const getFileNameFromUrl = (fileUrl: string) =>
  decodeURIComponent(fileUrl.split("/").pop()?.split("?")[0] || "") || "file";

const AllWithdrawalDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="wallet-request-breadcrumb-title">کیف پول</span>,
      },
      {
        title: <span className="wallet-request-breadcrumb-title">درخواست ها</span>,
      },
      {
        title: (
          <Link
            to={WALLET_ALL_WITHDRAWAL_REQUESTS_PAGE_ROUTE}
            className="wallet-request-breadcrumb-title"
          >
            درخواست های برداشت
          </Link>
        ),
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });
  const [isOpenRejected, setIsOpenRejected] = useState(false);
  const [isOpenAccepted, setIsOpenAccepted] = useState(false);
  const [isOpenSentToBank, setIsOpenSentToBank] = useState(false);
  const [isOpenReturnToRequested, setIsOpenReturnToRequested] = useState(false);

  const [rejectReasonOption, setRejectReasonOption] =
    useState<GetRejectReasonSelectListResponse>([]);

  const [detailWithDrawal, setDetailWithDrawal] = useState<WithdrawalDetailResponse>();

  const [form] = Form.useForm<FormTypeWalletRequestRejectedModal>();
  const reasons = Form.useWatch("reason", form);
  const description = Form.useWatch("description", form);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [acceptedForm] = Form.useForm();

  const isDisabled = !reasons || !description;

  const { params } = useQueryParams();

  const navigate = useNavigate();
  //? ================================ Api ================================

  const [getWithDrawalDetail, { isFetching: isGetWithDrawalDetailLoading }] =
    useLazyGetWithdrawalDetailQuery();

  const [
    getRejectReasonSelect,
    {
      isFetching: isGetRejectReasonSelectLoading,
      isSuccess: isGetRejectReasonSelectSuccess,
    },
  ] = useLazyGetRejectReasonSelectListQuery();

  const [withdrawalRejectRequest, { isLoading }] =
    useWithdrawalRejectRequestDetailMutation();

  const [withdrawalAcceptRequest, { isLoading: isAccepting }] =
    useWithdrawalAcceptRequestDetailMutation();

  // Sent to bank api
  const [withdrawalSingleSendToBankRequest, { isLoading: isSendingToBankLoading }] =
    useWithdrawalSingleSendToBankRequestMutation();

  // Return to requested api
  const [
    withdrawalSingleRevertToRequestedRequest,
    { isLoading: isRevertingToRequestedLoading },
  ] = useWithdrawalSingleRevertToRequestedRequestMutation();

  const [paymentUploadFile] = usePaymentUploadFileMutation();

  //? ================================ Effects ================================

  useEffect(() => {
    getWithDrawalDetail({ withdrawalRequestsId: +params?.id })
      .unwrap()
      .then(getWithDrawalDetailOnSuccess);
  }, []);

  useEffect(() => {
    if (isOpenRejected && !isGetRejectReasonSelectSuccess) {
      getRejectReasonSelect().unwrap().then(getRejectReasonSelectOnSuccess);
    }
  }, [isOpenRejected]);

  //* ================================ Util Functions ================================
  const getWithDrawalDetailOnSuccess = (res: WithdrawalDetailResponse) => {
    setDetailWithDrawal(res);
  };
  const getRejectReasonSelectOnSuccess = (res: GetRejectReasonSelectListResponse) => {
    setRejectReasonOption(res);
  };

  const openRejectedModal: () => void = () => {
    setIsOpenRejected(true);
  };

  const openAcceptModal: () => void = () => {
    setIsOpenAccepted(true);
  };
  const confirmBtnHandlerReject = () => {
    const values = form.getFieldsValue(["reason", "description"]);
    const requestData = {
      params: {
        reason: values?.reason?.item?.name,
        description: values.description || "",
      },
      id: +params?.id,
    };

    withdrawalRejectRequest(requestData)
      .unwrap()
      .then(() => {
        setIsOpenRejected(false);
        toast.success(SEND_REJECT_SUCCESS_MSG, {
          toastId: SEND_REJECT_SUCCESS_MSG,
        });
        navigate(WALLET_ALL_WITHDRAWAL_REQUESTS_PAGE_ROUTE);
      });
  };

  const submitHandlerAccept = async () => {
    const requestParams: WithdrawalAcceptDetailParams = {};

    if (fileList?.[0]) {
      const selectedFile = fileList?.[0];
      const formData = new FormData();
      const fileToUpload = getUploadFilePayload(selectedFile);
      if (!fileToUpload) return;

      formData.append("file", fileToUpload as Blob);

      const fileId = await paymentUploadFile({
        body: formData,
      });
      if (fileId?.data?.uuid) {
        requestParams.fileUuid = fileId?.data?.uuid;
      }
    }

    const formData = acceptedForm.getFieldsValue();
    if (formData?.walletRequestDocumentTitle) {
      requestParams.title = formData?.walletRequestDocumentTitle;
    }
    if (formData?.walletRequestDocumentDescription) {
      requestParams.description = formData?.walletRequestDocumentDescription;
    }

    withdrawalAcceptRequest({ id: +params?.id, params: requestParams })
      .unwrap()
      .then(() => {
        setIsOpenAccepted(false);
        toast.success(SEND_ACCEPT_SUCCESS_MSG, {
          toastId: SEND_ACCEPT_SUCCESS_MSG,
        });
        navigate(WALLET_ALL_WITHDRAWAL_REQUESTS_PAGE_ROUTE);
      });
  };

  const closeRejectModalHandler = () => {
    setIsOpenRejected(false);
    form.resetFields();
  };

  // Sent to bank modal
  const submitHandlerSentToBank = () => {
    withdrawalSingleSendToBankRequest({ id: +params?.id })
      .unwrap()
      .then(() => {
        setIsOpenSentToBank(false);
        toast.success(SEND_SENT_TO_BANK_SUCCESS_MSG, {
          toastId: SEND_SENT_TO_BANK_SUCCESS_MSG,
        });
        navigate(WALLET_ALL_WITHDRAWAL_REQUESTS_PAGE_ROUTE);
      });
  };

  // Return to requested modal
  const submitHandlerReturnToRequested = () => {
    withdrawalSingleRevertToRequestedRequest({ id: +params?.id })
      .unwrap()
      .then(() => {
        setIsOpenReturnToRequested(false);
        toast.success(RETURN_TO_REQUESTED_SUCCESS_MSG, {
          toastId: RETURN_TO_REQUESTED_SUCCESS_MSG,
        });
        navigate(WALLET_ALL_WITHDRAWAL_REQUESTS_PAGE_ROUTE);
      });
  };

  const downloadAndOpenFileHandler = (fileUrl: string | null) => {
    if (!fileUrl) return;
    window.open(fileUrl, "_blank", "noopener,noreferrer");

    attachmentDownloader({
      url: fileUrl,
      name: getFileNameFromUrl(fileUrl),
      hasToken: !fileUrl.startsWith("http"),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {isOpenRejected && (
        <ConfirmationModalWithContent
          title="رد درخواست"
          isModalOpen={isOpenRejected}
          closeModalHandler={closeRejectModalHandler}
          backBtnText="انصراف"
          confirmBtnText="رد درخواست"
          isConfirmButtonLoading={isLoading}
          onConfirmClickHandler={() => form.submit()}
          isConfirmButtonDisable={isDisabled}
          content={
            <Form form={form} onFinish={confirmBtnHandlerReject}>
              <CustomSelect
                name="reason"
                label="انتخاب دلیل رد درخواست"
                placeholder="انتخاب کنید"
                rules={[REQUIRED_RULE]}
                options={rejectReasonOption}
                loading={isGetRejectReasonSelectLoading}
                form={form}
              />
              <CustomTextArea
                rules={[REQUIRED_RULE]}
                label="توضیحات"
                placeholder="توضیحات را وارد کنید"
                name="description"
              />
            </Form>
          }
        />
      )}
      {isOpenAccepted && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenAccepted}
          title="تایید درخواست برداشت"
          backBtnText="انصراف"
          confirmBtnText="تایید درخواست"
          closeModalHandler={() => setIsOpenAccepted(false)}
          onConfirmClickHandler={submitHandlerAccept}
          content={
            <Form className="flex flex-col gap-4" layout="vertical" form={acceptedForm}>
              <p>
                یک فایل پیوست برای همه درخواست‌های انتخاب‌شده ذخیره می‌شود. عنوان و
                توضیحات نیز برای همه موارد ثبت خواهد شد.
              </p>
              <CustomInput
                type="text"
                label="عنوان (اختیاری)"
                name="walletRequestDocumentTitle"
                placeholder="مستندات درخواست برداشت"
              />
              <CustomInput
                type="text"
                label="توضیحات (اختیاری)"
                name="walletRequestDocumentDescription"
                placeholder="مستندات این درخواست برای بررسی و پیگیری پرداخت پیوست شده است."
              />
              <div className="withdrawal-accept-modal-uploader">
                <CustomUploader
                  fileList={fileList || []}
                  setFileList={setFileList || (() => {})}
                  isReadOnly={false}
                  label="فایل پیوست (اختیاری)"
                  uploaderText={
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="upload-logo">
                        <AiOutlinePlus />
                      </div>
                      <div className="upload-text">بارگذاری</div>
                    </div>
                  }
                  isDisabled={!!fileList?.length}
                  hasUploaderIcon={false}
                  maxCount={1}
                  UploadSizeLimitConfig={{
                    isActive: true,
                    text: "حداکثر 1 مگابایت",
                    size: 1,
                  }}
                  validFileFormat={["image/png", "image/jpeg", "image/jpg"]}
                  name="file"
                />
                <p>آیا از تایید و تغییر وضعیت این درخواست اطمینان دارید؟</p>
              </div>
            </Form>
          }
          isConfirmButtonLoading={isAccepting}
        />
      )}
      {/* Sent to bank modal */}
      {isOpenSentToBank && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenSentToBank}
          title="ارسال درخواست به بانک"
          backBtnText="انصراف"
          confirmBtnText="ارسال به بانک"
          closeModalHandler={() => setIsOpenSentToBank(false)}
          onConfirmClickHandler={submitHandlerSentToBank}
          content="آیا از ارسال این درخواست به بانک و تغییر وضعیت آن به «ارسال شده به بانک» اطمینان دارید؟"
          isConfirmButtonLoading={isSendingToBankLoading}
        />
      )}
      {/* Return to requested modal */}
      {isOpenReturnToRequested && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenReturnToRequested}
          title="بازگشت به در انتظار بررسی"
          backBtnText="انصراف"
          confirmBtnText="بازگشت به در انتظار بررسی"
          closeModalHandler={() => setIsOpenReturnToRequested(false)}
          onConfirmClickHandler={submitHandlerReturnToRequested}
          content="آیا از بازگشت وضعیت این درخواست به «در انتظار بررسی» اطمینان دارید؟"
          isConfirmButtonLoading={isRevertingToRequestedLoading}
        />
      )}
      <Div
        loading={isGetWithDrawalDetailLoading}
        className="wallet-request-users-detail-container"
      >
        {detailWithDrawal?.status === "REQUESTED" && (
          <CustomAlert
            type="warning"
            message="این درخواست در انتظار بررسی شما می‌باشد!"
            showIcon
          />
        )}
        {detailWithDrawal?.status === "REJECTED" && (
          <CustomAlert type="error" message="این درخواست رد شده است!" showIcon />
        )}
        {detailWithDrawal?.status === "ACCEPTED" && (
          <CustomAlert type="success" message="این درخواست تأیید شده است!" showIcon />
        )}
        <Row gutter={[16, 16]}>
          <Col xl={12} lg={12} md={24} xs={24}>
            <div className="custom-info-box">
              <span>
                <PiArrowLineUpRightBold color={RED_6} />
                <span>مجموع مبالغ درخواستی</span>
              </span>
              <span>
                {dataPlaceHolder({
                  data: detailWithDrawal?.requestAmount?.toString(),
                  isRial: true,
                  isPrice: true,
                })}{" "}
                تومان
              </span>
            </div>
          </Col>
          <Col xl={12} lg={12} md={24} xs={24}>
            <div className="custom-info-box">
              <span>
                <PiWalletFill width={FONTSIZE_25} />
                <span>موجودی فعلی</span>
              </span>
              <span>
                {dataPlaceHolder({
                  data: detailWithDrawal?.currentBalance?.toString(),
                  isRial: true,
                  isPrice: true,
                })}{" "}
                تومان
              </span>
            </div>
          </Col>
        </Row>
        <CustomDivider
          text="اطلاعات درخواست"
          extraContent={
            detailWithDrawal?.status === "REQUESTED" ? (
              <div className="custom-tag-info-box">
                <CustomTag color="warning">در انتظار بررسی</CustomTag>
                <CustomTagWithHorizontalDiffDays value={detailWithDrawal?.createdDate} />
              </div>
            ) : detailWithDrawal?.status === "REJECTED" ? (
              <CustomTag color="error">رد شده</CustomTag>
            ) : detailWithDrawal?.status === "ACCEPTED" ? (
              <CustomTag color="success">تأیید شده</CustomTag>
            ) : null
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="شماره درخواست" value={params?.id} />
          <SingleVerticalWithCol
            label="ثبت درخواست"
            value={detailWithDrawal?.requestDate}
            customDateFormat="HH:mm، YYYY-MM-DD"
            isDate
          />
          <SingleVerticalWithCol
            label="بررسی درخواست"
            value={detailWithDrawal?.modifiedDate}
            customDateFormat="HH:mm، YYYY-MM-DD"
            isDate
          />
          <SingleVerticalWithCol
            label="مسئول بررسی"
            value={
              detailWithDrawal?.adminFirstname && detailWithDrawal?.adminLastname
                ? `${detailWithDrawal?.adminFirstname} ${detailWithDrawal?.adminLastname}`
                : "-"
            }
          />
        </Row>
        {detailWithDrawal?.status === "REJECTED" && detailWithDrawal?.description && (
          <>
            <CustomDivider text="علت رد درخواست" />
            <CustomAlert
              type="error"
              title={dataPlaceHolder({ data: detailWithDrawal?.description })}
              showIcon
            />
          </>
        )}
        <CustomDivider text="اطلاعات درخواست دهنده" />
        <Row gutter={[16, 16]}>
          {params?.walletType === "PERSONAL" && (
            <>
              <SingleVerticalWithCol
                label="نام"
                value={detailWithDrawal?.userStaffDetail?.firstname}
              />
              <SingleVerticalWithCol
                label="نام خانوادگی"
                value={detailWithDrawal?.userStaffDetail?.LastName}
              />
              <SingleVerticalWithCol
                label="کد ملی / کد فراگیر"
                value={detailWithDrawal?.username}
              />
              <SingleVerticalWithCol
                label="شماره دانشجویی"
                value={detailWithDrawal?.userStaffDetail?.code}
              />
              <SingleVerticalWithCol
                label="شماره همراه"
                value={detailWithDrawal?.userStaffDetail?.mobile}
              />
              <SingleVerticalWithCol
                label="مقطع تحصیلی"
                value={detailWithDrawal?.degreeTitle}
              />
              <SingleVerticalWithCol
                label="رشته تحصیلی"
                value={detailWithDrawal?.studyFieldTitle}
              />
              <SingleVerticalWithCol
                label="واحد / شعبه"
                value={detailWithDrawal?.userStaffDetail?.branchName}
              />
              <SingleVerticalWithCol
                label="نام دانشگاه"
                value={detailWithDrawal?.userStaffDetail?.branchName}
              />
              <SingleVerticalWithCol
                label="شناسه کیف پول"
                value={detailWithDrawal?.walletId?.toString()}
              />
            </>
          )}
          {params?.walletType === "LEGAL" && (
            <>
              {" "}
              <SingleVerticalWithCol
                label="نام کسب و کار "
                value={detailWithDrawal?.userStaffDetail?.businessName}
              />
              <SingleVerticalWithCol
                label="شعبه / واحد"
                value={detailWithDrawal?.branchName}
              />
              <SingleVerticalWithCol
                label="کد شعبه"
                value={detailWithDrawal?.userStaffDetail?.branchCode?.toString()}
              />
              <SingleVerticalWithCol
                label="استان"
                value={detailWithDrawal?.userStaffDetail?.province}
              />
              <SingleVerticalWithCol
                label="شهر"
                value={detailWithDrawal?.userStaffDetail?.city}
              />
              <SingleVerticalWithCol
                label="ثبت کننده درخواست"
                value={`${dataPlaceHolder({ data: detailWithDrawal?.requesterFirstName })} ${dataPlaceHolder({ data: detailWithDrawal?.requesterLastName })}`}
              />
              <SingleVerticalWithCol
                label="شماره همراه ثبت کننده درخواست"
                value={detailWithDrawal?.requesterMobile}
              />
              <SingleVerticalWithCol
                label=" شناسه کیف پول"
                value={detailWithDrawal?.walletId?.toString()}
              />
            </>
          )}
        </Row>
        <CustomDivider text="حساب انتخابی کاربر" />
        <div className="wallet-request-bank-info-box">
          <Row>
            {/* //Todo[Atefeh]: uncomment when api got ready */}
            {/* <Col
              xl={2}
              lg={2}
              md={4}
              xs={6}
              className="wallet-request-bank-info-img-container"
            >
              <img
                src=""
                alt={detailWithDrawal?.userStaffDetail?.bankAccount?.bankName}
                onError={(e) => {
                  e.currentTarget.src = "/images/bank-placeholder.png";
                }}
              />
            </Col> */}
            <Col xl={22} lg={22} md={20} xs={18}>
              <div className="wallet-request-bank-info">
                <span>شماره کارت</span>
                <span>
                  {formatByGroups(
                    detailWithDrawal?.userStaffDetail?.bankAccount?.cardNumber
                  ) || "-"}
                </span>
              </div>
              <div className="wallet-request-bank-info">
                <span>شماره شبا</span>
                <span>
                  {dataPlaceHolder({
                    data: detailWithDrawal?.userStaffDetail?.bankAccount?.iban,
                  })}
                </span>
              </div>
              <div className="wallet-request-bank-info">
                <span>شماره حساب</span>
                <span>
                  {dataPlaceHolder({
                    data: detailWithDrawal?.userStaffDetail?.bankAccount?.accountNumber,
                  })}
                </span>
              </div>
            </Col>
          </Row>
        </div>
        {detailWithDrawal?.status === "ACCEPTED" && (
          <div>
            <CustomDivider text="پیوست درخواست" />
            <div className="wallet-request-attachment-card">
              <p className="h5-medium">عنوان: {detailWithDrawal.title || "-"}</p>
              <p className="body-regular">
                توضیحات: {detailWithDrawal.description || "-"}
              </p>
              <div className="bg-neutral-3 flex items-center gap-2 rounded-sm">
                <GrAttachment size={14} color={NEUTRAL_07} />
                <span className="body-regular text-primary-6 flex-1 text-right">
                  {detailWithDrawal.title || "-"}
                </span>
                {detailWithDrawal.fileUrl && (
                  <CustomButton
                    type="link"
                    className="footnote"
                    onClick={() => downloadAndOpenFileHandler(detailWithDrawal.fileUrl)}
                  >
                    دانلود
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        )}

        {detailWithDrawal?.status === "REQUESTED" && (
          <div className="custom-button-container">
            <CustomButton onClick={openRejectedModal} type="primary" danger>
              رد درخواست
            </CustomButton>
            <CustomButton onClick={() => setIsOpenSentToBank(true)} type="primary">
              ارسال به بانک
            </CustomButton>
          </div>
        )}
        {detailWithDrawal?.status === "SENT_TO_BANK" && (
          <div className="custom-button-container">
            <CustomButton onClick={openRejectedModal} type="primary" danger>
              رد درخواست
            </CustomButton>
            <CustomButton onClick={() => setIsOpenReturnToRequested(true)}>
              بازگشت به در انتظار بررسی
            </CustomButton>
            <CustomButton onClick={openAcceptModal} type="primary">
              تایید درخواست
            </CustomButton>
          </div>
        )}
      </Div>
    </>
  );
};
export default AllWithdrawalDetail;
