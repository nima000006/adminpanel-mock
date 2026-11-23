import { useEffect, useState } from "react";

import { Descriptions, DescriptionsProps, Form, Row } from "antd";
import { Link, useNavigate } from "react-router";

// import keshavarziBank from "/images/keshavarziBank.png";
import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithHorizontalDiffDays from "@components/Renderers/CustomTagWithHorizontalDiffDays/CustomTagWithHorizontalDiffDays";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { emptyString } from "@infra/config/global.vars";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { WALLET_ALL_BANK_ACCOUNT_REQUESTS_PAGE_ROUTE } from "@infra/router/routes/wallet";
import {
  useLazyGetBankAccountDetailQuery,
  useSendSingleConfirmAndRejectMutation,
} from "@infra/states/redux/Apis/wallet/requests/requestsApi";
import { samimServiceNameConvertor } from "@pages/Finance/_shared/utils";

import { reasonRejectModalFormType } from "./@types/@bankAccountDetailTypes";
import { DEMAND_IDS } from "../../_shared/utils";
import SingleRejectModalContent from "./helper/modal/SingleRejectModalContent/SingleRejectModalContent";

import "./_bankAccountDetail.scss";

const BankAccountDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "کیف پول",
      },
      {
        title: (
          <Link to={WALLET_ALL_BANK_ACCOUNT_REQUESTS_PAGE_ROUTE}>
            درخواست ایجاد حساب بانکی
          </Link>
        ),
      },
      {
        title: "جزییات درخواست ایجاد حساب بانکی",
      },
    ],
  });
  const [isOpenAcceptedModal, setIsOpenAcceptedModal] = useState(false);
  const [isOpenRejectedModal, setIsOpenRejectedModal] = useState(false);

  const [form] = Form.useForm<reasonRejectModalFormType>();
  const navigate = useNavigate();

  const { params } = useQueryParams();

  //? ================================  Api Calls ================================
  const [getDetailData, { data: detailData, isFetching: detailDataIsLoading }] =
    useLazyGetBankAccountDetailQuery();

  const [sendSingleConfirmAndReject, { isLoading: isSendSingleConfirmAndRejectLoading }] =
    useSendSingleConfirmAndRejectMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (params?.id) {
      getDetailData(+params.id);
    }
  }, [params?.id]);

  //* ================================ Util Functions ================================

  // const bankLogo: DescriptionsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "",
  //     children: <img src={keshavarziBank} alt="empty" />,
  //   },
  // ];

  const optionalAccountItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "شماره کارت",
      children: dataPlaceHolder({ data: detailData?.cardNumber }),
    },
    {
      key: "2",
      label: "شماره شبا",
      children: dataPlaceHolder({ data: detailData?.iban }),
    },
    {
      key: "3",
      label: "شماره حساب",
      children: dataPlaceHolder({ data: detailData?.bankAccountNumber }),
    },
  ];
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
    sendSingleConfirmAndReject({
      id: +params?.id,
      status: "ACCEPTED",
    })
      .unwrap()
      .then(submitAcceptedModalHandlerIsSuccess);
  };

  const submitRejectModalHandler = () => {
    const reason = form?.getFieldValue("reasonReject");
    sendSingleConfirmAndReject({
      id: +params?.id,
      status: "REJECTED",
      reason: reason?.item?.name,
    })
      .unwrap()
      .then(rejectAcceptedModalHandlerIsSuccess);
  };

  // success
  const submitAcceptedModalHandlerIsSuccess = () => {
    CloseAcceptedModalHandler();
    navigate({
      pathname: WALLET_ALL_BANK_ACCOUNT_REQUESTS_PAGE_ROUTE,
    });
  };
  const rejectAcceptedModalHandlerIsSuccess = () => {
    CloseRejectModalHandler();
    navigate({
      pathname: WALLET_ALL_BANK_ACCOUNT_REQUESTS_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isOpenAcceptedModal && (
        <ConfirmationModalWithContent
          isModalOpen={isOpenAcceptedModal}
          title="آیا از تایید درخواست اطمینان دارید؟"
          backBtnText="انصراف"
          confirmBtnText="تایید درخواست"
          closeModalHandler={CloseAcceptedModalHandler}
          onConfirmClickHandler={submitAcceptedModalHandler}
          content=""
          isConfirmButtonLoading={isSendSingleConfirmAndRejectLoading}
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
          content={<SingleRejectModalContent form={form} />}
          isConfirmButtonLoading={isSendSingleConfirmAndRejectLoading}
        />
      )}

      <Div loading={detailDataIsLoading} className="bank-account-detail-container">
        {params?.status === DEMAND_IDS.pending ? (
          <CustomAlert
            showIcon
            title="این درخواست در انتظار بررسی شما می‌باشد!"
            type="warning"
            className="custom-alert"
          />
        ) : params?.status === DEMAND_IDS.confirm ? (
          <CustomAlert
            showIcon
            title="این درخواست تأیید شده است!"
            type="success"
            className="custom-alert"
          />
        ) : params?.status === DEMAND_IDS.rejected ? (
          <CustomAlert
            showIcon
            title="این درخواست رد شده است!"
            type="error"
            className="custom-alert"
          />
        ) : null}
        <div>
          <CustomDivider
            text="اطلاعات درخواست"
            extraContent={
              params?.status === DEMAND_IDS.pending ? (
                <div className="pending-divider-extra-wrapper">
                  <CustomTag color="gold">در انتظار بررسی</CustomTag>
                  <CustomTagWithHorizontalDiffDays
                    value={detailData?.createdDate ?? ""}
                  />
                </div>
              ) : params?.status === DEMAND_IDS.confirm ? (
                <CustomTag color="green">تأیید شده</CustomTag>
              ) : params?.status === DEMAND_IDS.rejected ? (
                <CustomTag color="red">رد شده</CustomTag>
              ) : null
            }
          />

          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شماره درخواست"
              value={detailData?.id?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ثبت درخواست"
              value={detailData?.createdDate}
              isDate
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="بررسی درخواست"
              value={detailData?.modifiedDate}
              isDate
              // value={
              //   detailData?.status == "REQUESTED"
              //     ? "در انتظار بررسی"
              //     : detailData?.status == "REJECTED"
              //       ? "رد شده"
              //       : detailData?.status == "ACCEPTED"
              //         ? "تایید شده"
              //         : "-"
              // }
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="مسئول بررسی"
              value={
                detailData?.modifierFirstname && detailData?.modifierLastname
                  ? `${detailData.modifierFirstname} ${detailData.modifierLastname}`
                  : undefined
              }
            />
          </Row>
        </div>

        {params?.status === DEMAND_IDS.rejected ? (
          <div>
            <CustomDivider text="علت رد درخواست" />
            <CustomAlert
              showIcon
              title={detailData?.rejectReason?.title}
              description={detailData?.rejectDescription}
              type="error"
              className="custom-alert"
            />
          </div>
        ) : null}

        <div>
          <CustomDivider text="اطلاعات درخواست دهنده" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام کسب و کار "
              value={detailData?.businessFaTitle}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شعبه / واحد"
              value={detailData?.branchFaTitle}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="کد شعبه"
              value={detailData?.branchId?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="استان"
              value={detailData?.cityName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شهر"
              value={detailData?.provinceName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="مسئول کسب وکار"
              value={emptyString}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شماره همراه مسئول"
              value={detailData?.mobileNumber}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="ثبت کننده درخواست"
              value={`${dataPlaceHolder({ data: detailData?.createdByFirstname })} ${dataPlaceHolder({ data: detailData?.createdByLastname })}`}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شماره همراه ثبت کننده درخواست"
              value={detailData?.mobileNumber}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="سرویس"
              value={samimServiceNameConvertor(detailData?.services?.[0])}
            />
          </Row>
        </div>
        <div>
          <CustomDivider
            text={
              params?.status === DEMAND_IDS.pending
                ? "حساب بانکی نیازمند بررسی"
                : params?.status === DEMAND_IDS.confirm
                  ? "حساب بانکی تایید شده"
                  : params?.status === DEMAND_IDS.rejected
                    ? "حساب بانکی رد شده"
                    : "حساب بانکی"
            }
          />
          <div className="description-wrapper">
            {/* //Todo[Atefeh]: uncomment when api got ready */}
            {/* <Descriptions
              column={1}
              items={bankLogo}
              layout="vertical"
              styles={{
                label: {
                  fontWeight: "bold",
                  textAlign: "right",
                  width: "180px",
                },
              }}
            /> */}
            <Descriptions
              className="description-img"
              column={1}
              items={optionalAccountItems}
              layout="vertical"
              styles={{
                label: {
                  fontWeight: "bold",
                  textAlign: "right",
                  width: "180px",
                },
              }}
            />
          </div>
        </div>
        {params?.status === DEMAND_IDS.pending ? (
          <div className="btn-handler">
            <CustomButton type="primary" danger onClick={rejectRequestBtnHandler}>
              رد درخواست
            </CustomButton>
            <CustomButton type="primary" onClick={acceptRequestBtnHandler}>
              تایید درخواست
            </CustomButton>
          </div>
        ) : null}
      </Div>
    </>
  );
};

export default BankAccountDetail;
