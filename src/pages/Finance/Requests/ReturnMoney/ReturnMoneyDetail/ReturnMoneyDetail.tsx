import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import moment from "jalali-moment";
import { PiReceipt, PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FINANCE_REQUESTS_RETURN_MONEY_LIST_PAGE_ROUTE } from "@infra/router/routes/finance";
import { TOP_BAR_PROFILE_PAGE_ROUTE } from "@infra/router/routes/topBarItem";
import {
  useLazyGetRefundRequestDetailQuery,
  useSendSingleRejectAndConfirmRefundRequestMutation,
} from "@infra/states/redux/Apis/finance/requestsApi";

import { REQUEST_DEMAND_IDS } from "../../_shared/utils";
import ReturnMoneyRejectRequestModalContent from "./helper/component/modal/ReturnMoneyRejectRequestModalContent/ReturnMoneyRejectRequestModalContent";
import InfoBoxGroup from "../../_shared/components/InfoBoxGroup/InfoBoxGroup";
import "./_returnMoneyDetail.scss";

const ReturnMoneyDetail = () => {
  const [isOpenAcceptedModal, setIsOpenAcceptedModal] = useState(false);
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false);

  const [form] = Form.useForm<any>();

  const {
    params: { status, date, uuid },
  } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },
      {
        title: "درخواست‌ها",
      },
      {
        title: <Link to={FINANCE_REQUESTS_RETURN_MONEY_LIST_PAGE_ROUTE}>عودت وجه</Link>,
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [getRefundDetail, { data: getRefundDetailData }] =
    useLazyGetRefundRequestDetailQuery();

  const [sendSingleRejectAndConfirm, { isLoading: isSendSingleRejectAndConfirm }] =
    useSendSingleRejectAndConfirmRefundRequestMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getRefundDetail(uuid);
  }, []);

  //* ================================ Util Functions ================================
  const diffTime = moment(new Date(), "YYYY/M/D HH:mm:ss").diff(
    moment(date ?? new Date()),
    "days"
  );

  // BTN HANDLER
  const acceptRequestBtnHandler = () => {
    setIsOpenAcceptedModal(true);
  };
  const rejectRequestBtnHandler = () => {
    setIsOpenRejectedModal(true);
  };

  // MODAL HANDLER
  const CloseAcceptedModalHandler = () => {
    setIsOpenAcceptedModal(false);
  };
  const CloseRejectModalHandler = () => {
    setIsOpenRejectedModal(false);
  };
  const submitAcceptedModalHandler = () => {
    sendSingleRejectAndConfirm({
      id: uuid,
      params: { status: status },
    });
  };

  const submitRejectModalHandler = () => {
    form.validateFields().then(() => {
      const { reasonReject } = form.getFieldsValue();
      sendSingleRejectAndConfirm({
        id: uuid,
        params: { status: status, rejectReason: reasonReject?.item?.name },
      })
        .unwrap()
        .then(submitRejectModalHandlerIsSuccess);
    });
  };

  const submitRejectModalHandlerIsSuccess = () => {
    form.resetFields();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenAcceptedModal && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenAcceptedModal}
          title="تایید درخواست"
          backBtnText="انصراف"
          confirmBtnText="تایید و عودت وجه"
          closeModalHandler={CloseAcceptedModalHandler}
          onConfirmClickHandler={submitAcceptedModalHandler}
          content={
            <InfoBoxGroup
              title="مبلغ عودت درخواستی"
              value={dataPlaceHolder({
                data: getRefundDetailData?.refundAmount?.amount?.toString(),
                isPrice: true,
              })}
              isPrice={true}
            />
          }
          isConfirmButtonLoading={isSendSingleRejectAndConfirm}
        />
      )}
      {isOpenRejectedModal && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenRejectedModal}
          title="رد درخواست"
          backBtnText="انصراف"
          confirmBtnText="رد درخواست"
          isDangerous
          closeModalHandler={CloseRejectModalHandler}
          onConfirmClickHandler={submitRejectModalHandler}
          content={<ReturnMoneyRejectRequestModalContent form={form} />}
          isConfirmButtonLoading={isSendSingleRejectAndConfirm}
        />
      )}

      <Div className="finance-return-money-detail-container">
        <div className="alert-wrapper">
          {status === REQUEST_DEMAND_IDS.pending ? (
            <CustomAlert
              showIcon
              message="این درخواست در انتظار بررسی شما می‌باشد!"
              type="warning"
              className="custom-alert"
            />
          ) : status === REQUEST_DEMAND_IDS.confirm ? (
            <CustomAlert
              showIcon
              message="این درخواست تأیید شده است!"
              type="success"
              className="custom-alert"
            />
          ) : status === REQUEST_DEMAND_IDS.rejected ? (
            <CustomAlert
              showIcon
              message="این درخواست رد شده است!"
              type="error"
              className="custom-alert"
            />
          ) : null}
          <CustomAlert
            showIcon
            message="تایید اولیه توسط مسئول مربوطه!"
            description="متن توضیحات مسئول مربوطه برای علت تایید درخواست عودت وجه اینجا قرار میگیرد."
            type="success"
            className="custom-alert"
          />
        </div>
        <Row gutter={[16, 16]}>
          <Col lg={6} md={12} xs={24}>
            <InfoBoxGroup
              title="سرویس"
              value={
                getRefundDetailData?.service ? (
                  <SamimServiceTag service={getRefundDetailData.service} />
                ) : (
                  "-"
                )
              }
            />
          </Col>

          <Col lg={6} md={12} xs={24}>
            <InfoBoxGroup
              title="مبلغ خرید"
              value={dataPlaceHolder({
                data: getRefundDetailData?.buyAmount?.amount?.toString(),
                isPrice: true,
              })}
              isPrice={true}
            />
          </Col>
          <Col lg={6} md={12} xs={24}>
            <InfoBoxGroup
              title="مبلغ عودت درخواستی"
              value={dataPlaceHolder({
                data: getRefundDetailData?.refundAmount?.amount?.toString(),
                isPrice: true,
              })}
              isPrice={true}
            />
          </Col>
          <Col lg={6} md={12} xs={24}>
            <InfoBoxGroup
              title="بدهکاری"
              value={dataPlaceHolder({
                data: getRefundDetailData?.owedAmount?.amount?.toString(),
                isPrice: true,
              })}
              isPrice={true}
            />
          </Col>
        </Row>
        <div>
          <CustomDivider
            text="اطلاعات درخواست"
            extraContent={
              status === REQUEST_DEMAND_IDS.pending ? (
                <div className="pending-divider-extra-wrapper">
                  <CustomTag color="gold">در انتظار بررسی</CustomTag>
                  <div className="badge body-regular flex items-center justify-center pb-5">{`${diffTime} روز`}</div>
                </div>
              ) : status === REQUEST_DEMAND_IDS.confirm ? (
                <CustomTag color="green">تأیید شده</CustomTag>
              ) : status === REQUEST_DEMAND_IDS.rejected ? (
                <CustomTag color="red">رد شده</CustomTag>
              ) : null
            }
          />

          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="شماره درخواست"
              value={getRefundDetailData?.uuid}
            />
            <SingleVerticalWithCol
              label="ثبت درخواست"
              value={dataPlaceHolder({
                data: getRefundDetailData?.createdDate,
                isDate: true,
              })}
            />
            <SingleVerticalWithCol label="بررسی درخواست" value={emptyString} />
            <SingleVerticalWithCol label="مسئول بررسی" value={emptyString} />
          </Row>
        </div>

        {status === REQUEST_DEMAND_IDS.rejected ? (
          <div>
            <CustomDivider text="علت رد درخواست" />
            <CustomAlert
              showIcon
              message={getRefundDetailData?.description || "-"}
              type="error"
              className="custom-alert"
            />
          </div>
        ) : null}

        <div className="applicant-info">
          <CustomDivider
            text="اطلاعات درخواست دهنده"
            extraContent={
              <Link className="custom-link" to={TOP_BAR_PROFILE_PAGE_ROUTE}>
                <PiUser />
                مشاهده پروفایل
              </Link>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="نام" value={getRefundDetailData?.firstname} />
            <SingleVerticalWithCol
              label="نام خانوادگی"
              value={getRefundDetailData?.lastname}
            />
            <SingleVerticalWithCol
              label="کد ملی / کد فراگیر"
              value={getRefundDetailData?.username}
            />
            <SingleVerticalWithCol
              label="شماره دانشجویی"
              value={getRefundDetailData?.personalCode}
            />
            <SingleVerticalWithCol
              label="شماره همراه"
              value={getRefundDetailData?.mobileNumber}
            />
            <SingleVerticalWithCol
              label="مقطع تحصیلی"
              value={getRefundDetailData?.degreeName}
            />
            <SingleVerticalWithCol
              label="رشته تحصیلی"
              value={getRefundDetailData?.fieldName}
            />
            <SingleVerticalWithCol
              label="شعبه / واحد"
              value={getRefundDetailData?.branchName}
            />
            <SingleVerticalWithCol
              label="نام دانشکده"
              value={getRefundDetailData?.unitName}
            />
          </Row>
          <CustomAlert
            showIcon
            message="علت عودت وجه"
            description="متن توضیحات علت عودت وجه ثبت شده توسط کاربر اینجا قرار میگیرد."
            type="warning"
            className="custom-alert"
          />
        </div>
        <div>
          <CustomDivider
            text="فاکتور"
            extraContent={
              <Link className="custom-link" to="">
                <PiReceipt className="icon" />
                مشاهده فاکتور
              </Link>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="مبلغ کل"
              value={getRefundDetailData?.totalAmount?.amount?.toString()}
            />
            <SingleVerticalWithCol
              label="شماره  فاکتور"
              value={getRefundDetailData?.invoiceNumber}
            />
            <SingleVerticalWithCol
              label="تاریخ و زمان صدور فاکتور"
              value={dataPlaceHolder({
                data: getRefundDetailData?.createdDate,
                isDate: true,
              })}
            />
            <SingleVerticalWithCol
              label="تامین کننده"
              value={getRefundDetailData?.vendorName}
            />
          </Row>
        </div>
        {status === REQUEST_DEMAND_IDS.pending ? (
          <div className="btn-handler">
            <CustomButton
              color="danger"
              variant="outlined"
              danger
              onClick={rejectRequestBtnHandler}
            >
              رد درخواست
            </CustomButton>
            <CustomButton type="primary" onClick={acceptRequestBtnHandler}>
              تایید درخواست
            </CustomButton>
          </div>
        ) : null}
        {status === REQUEST_DEMAND_IDS?.confirm ? (
          <CustomDivider
            text="سند عودت وجه"
            extraContent={
              <Link className="custom-link" to="">
                <PiReceipt className="icon" />
                مشاهده سند
              </Link>
            }
          />
        ) : null}
      </Div>
    </>
  );
};

export default ReturnMoneyDetail;
