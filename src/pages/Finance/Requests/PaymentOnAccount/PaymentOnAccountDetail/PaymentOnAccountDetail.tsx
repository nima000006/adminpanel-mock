import { useState } from "react";

import { Col, Form, Row } from "antd";
import moment from "jalali-moment";
import { PiBriefcase, PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FINANCE_REQUESTS_PAYMENT_ON_ACCOUNT_LIST_PAGE_ROUTE } from "@infra/router/routes/finance";

import { REQUEST_DEMAND_IDS } from "../../_shared/utils";
import PaymentOnAccountAcceptRequestModalContent from "./helper/modal/PaymentOnAccountAcceptRequestModalContent/PaymentOnAccountAcceptRequestModalContent";
import PaymentOnAccountRejectRequestModalContent from "./helper/modal/PaymentOnAccountRejectRequestModalContent/PaymentOnAccountRejectRequestModalContent";
import InfoBoxGroup from "../../_shared/components/InfoBoxGroup/InfoBoxGroup";
import "./_paymentOnAccountDetail.scss";

const PaymentOnAccountDetail = () => {
  const [isOpenAcceptedModal, setIsOpenAcceptedModal] = useState(false);
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false);

  const [form] = Form.useForm<any>();

  const {
    params: { status, date },
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
        title: (
          <Link to={FINANCE_REQUESTS_PAYMENT_ON_ACCOUNT_LIST_PAGE_ROUTE}>
            پرداخت علی الحساب
          </Link>
        ),
      },
      {
        title: "مشاهده درخواست",
      },
    ],
  });

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
  const submitAcceptedModalHandler = () => {};
  const submitRejectModalHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenAcceptedModal && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenAcceptedModal}
          title="تایید درخواست"
          backBtnText="انصراف"
          confirmBtnText="تایید و پرداخت علی الحساب"
          showIcon={false}
          closeModalHandler={CloseAcceptedModalHandler}
          onConfirmClickHandler={submitAcceptedModalHandler}
          content={<PaymentOnAccountAcceptRequestModalContent form={form} />}
          //   isConfirmButtonLoading={}
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
          content={<PaymentOnAccountRejectRequestModalContent form={form} />}
          //   isConfirmButtonLoading={}
        />
      )}

      <Div className="finance-payment-on-account-detail-container">
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
        </div>
        <Row gutter={[16, 16]}>
          <Col lg={status !== REQUEST_DEMAND_IDS.rejected ? 8 : 12}>
            <InfoBoxGroup title="سرویس" value={<SamimServiceTag service="FOOD" />} />
          </Col>
          <Col lg={status !== REQUEST_DEMAND_IDS.rejected ? 8 : 12}>
            <InfoBoxGroup
              title="مبلغ درخواستی"
              value={dataPlaceHolder({
                data: "10000000",
                isPrice: true,
              })}
              isPrice={true}
            />
          </Col>
          {status !== REQUEST_DEMAND_IDS.rejected ? (
            <Col lg={8}>
              <InfoBoxGroup
                title="بدهکاری تسویه نشده (پرداخت علی الحساب)"
                value={dataPlaceHolder({
                  data: "10000000",
                  isPrice: true,
                })}
                isPrice={true}
              />
            </Col>
          ) : null}
        </Row>
        <div>
          <CustomDivider
            text="اطلاعات درخواست"
            extraContent={
              status === REQUEST_DEMAND_IDS.pending ? (
                <div className="pending-divider-extra-wrapper">
                  <CustomTag color="gold">در انتظار بررسی</CustomTag>
                  <div className="badge body-regular flex justify-center pb-5">{`${diffTime} روز`}</div>
                </div>
              ) : status === REQUEST_DEMAND_IDS.confirm ? (
                <CustomTag color="green">تأیید شده</CustomTag>
              ) : status === REQUEST_DEMAND_IDS.rejected ? (
                <CustomTag color="red">رد شده</CustomTag>
              ) : null
            }
          />

          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="شماره درخواست" value={"1222"} />
            <SingleVerticalWithCol
              label="ثبت درخواست"
              value={dataPlaceHolder({ data: "", isDate: true })}
            />
            <SingleVerticalWithCol label="بررسی درخواست" value={""} />
            <SingleVerticalWithCol label="مسئول بررسی" value={""} />
          </Row>
        </div>

        {status === REQUEST_DEMAND_IDS.rejected ? (
          <div>
            <CustomDivider text="علت رد درخواست" />
            <CustomAlert
              showIcon
              message="علت رد درخواست وارد شده توسط ادمین اینجا نمایش داده میشود."
              type="error"
              className="custom-alert"
            />
          </div>
        ) : status === REQUEST_DEMAND_IDS?.confirm ? (
          <div>
            <CustomDivider text="توضیحات تایید درخواست" />
            <CustomAlert
              showIcon
              message="توضیحات ثبت شده توسط مسئول تایید درخواست در اینجا نمایش داده میشود."
              type="success"
              className="custom-alert"
            />
          </div>
        ) : null}

        <div className="applicant-info">
          <CustomDivider
            text="اطلاعات درخواست دهنده"
            extraContent={
              <Link className="custom-link" to="#">
                <PiBriefcase size={16} /> پروفایل کسب و کار
              </Link>
            }
          />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol label="نام کسب و کار " value={""} />
            <SingleVerticalWithCol label="شعبه / واحد" value={""} />
            <SingleVerticalWithCol label="کد شعبه" value={""} />
            <SingleVerticalWithCol label="استان" value={""} />
            <SingleVerticalWithCol label="شهر" value={""} />
            <SingleVerticalWithCol label="مسئول کسب وکار" value={""} />
            <SingleVerticalWithCol label="شماره همراه مسئول" value={""} />
            <SingleVerticalWithCol label="ثبت کننده درخواست" value={""} />
            <SingleVerticalWithCol label="شماره همراه ثبت کننده درخواست" value={""} />
            <SingleVerticalWithCol label="شناسه کیف پول" value={""} />
          </Row>
          <CustomAlert
            showIcon
            message="علت درخواست پرداخت علی الحساب"
            description="متن توضیحات علت درخواست پرداخت علی اللحساب ثبت شده توسط کاربر اینجا قرار میگیرد."
            type="warning"
            className="custom-alert"
          />
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
              تایید و پرداخت علی الحساب
            </CustomButton>
          </div>
        ) : null}
        {status === REQUEST_DEMAND_IDS?.confirm ? (
          <>
            <div>
              <CustomDivider
                text="فاکتور پرداخت علی الحساب"
                extraContent={
                  <Link className="custom-link" to="">
                    <PiReceipt className="icon" />
                    مشاهده فاکتور
                  </Link>
                }
              />
              <Row gutter={[16, 16]}>
                <SingleVerticalWithCol label="مبلغ کل" value={""} />
                <SingleVerticalWithCol label="شماره  فاکتور" value={""} />
                <SingleVerticalWithCol label="تاریخ و زمان صدور فاکتور" value={""} />
              </Row>
            </div>

            <CustomDivider
              text="سند پرداخت علی الحساب"
              extraContent={
                <Link className="custom-link" to="">
                  <PiReceipt className="icon" />
                  مشاهده سند
                </Link>
              }
            />
          </>
        ) : null}
      </Div>
    </>
  );
};

export default PaymentOnAccountDetail;
