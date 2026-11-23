import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidWalletAlt } from "react-icons/bi";
import {
  PiArrowLineUpRight,
  PiCoinsFill,
  PiCreditCardLight,
  PiPlusLight,
} from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { dataPlaceHolder } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetBranchByBusinessQuery } from "@infra/states/redux/Apis/business/business/businessApi";
import { useLazyGetActiveBusinessListQuery } from "@infra/states/redux/Apis/business/businessRequest/businessRequest";
import {
  useAllCreateWalletWithdrawalRequestCheckOtpMutation,
  useCreateWalletWithdrawalRequestMutation,
  useLazyGetBusinessAndBranchesWalletsListByAdvanceFilterQuery,
  useLazyGetServicesListByBranchIdQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { fetchDataIfNeeded, selectNotFoundContent } from "@pages/_shared/utils";
import { BranchItem } from "@pages/Finance/Accountants/_shared/@types/@accountantsType";
import {
  WALLET_STATUS,
  WALLET_STATUS_COLOR,
  WALLET_STATUS_ICON,
  WALLET_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";

import {
  AllWalletDetailsGetServicesListByBranchIdResponse,
  AllWalletDetailsMyWalletSearchFormType,
  AllWalletDetailsWithdrawalWalletFormType,
} from "./@types/@allWalletDetailsList";
import AllWalletDetailsInfoCard from "./helper/components/AllWalletDetailsInfoCard/AllWalletDetailsInfoCard";
import AllWalletDetailsRequestSegmented from "./helper/components/AllWalletDetailsRequestSegmented/AllWalletDetailsRequestSegmented";
import AllWalletDetailsTransactionSegmented from "./helper/components/AllWalletDetailsTransactionSegmented/AllWalletDetailsTransactionSegmented";
import AllWalletDetailsYourAccountDrawerContent from "./helper/drawer/AllWalletDetailsYourAccountDrawerContent/AllWalletDetailsYourAccountDrawerContent";
import AllWalletDetailsWalletChargeModalContent from "./helper/modals/AllWalletDetailsWalletChargeModalContent/AllWalletDetailsWalletChargeModalContent";
import AllWalletDetailsWithdrawWalletModalContent from "./helper/modals/AllWalletDetailsWithdrawWalletModalContent/AllWalletDetailsWithdrawWalletModalContent";

import "./_allWalletDetailsWalletList.scss";

let uuidForWithdrawal: null | string = null;

const AllWalletDetailsWalletList = () => {
  const [view, setView] = useState("0");
  const [pendingView, setPendingView] = useState<"0" | "1" | "2" | null>(null);
  const { params: url, setSearchParams } = useQueryParams();

  const [walletChargeModalIsOpen, setWalletChargeModalIsOpen] = useState({
    isOpen: false,
    id: -1,
  });

  const [withdrawWalletModalIsOpen, setWithdrawWalletModalIsOpen] = useState(false);

  const [yourAccountDrawerIsOpen, setYourAccountDrawerIsOpen] = useState(false);

  const [current, setCurrent] = useState(0);

  const [branchData, setBranchData] = useState<BranchItem[]>([]);
  const [servicesList, setServicesList] =
    useState<AllWalletDetailsGetServicesListByBranchIdResponse>([]);

  const [tempToken, setTempToken] = useState<{
    token: string | null;
    mobileNo: string | null;
  }>({
    token: null,
    mobileNo: null,
  });

  const [otpForm] = Form.useForm();

  const [walletSearchForm] = Form.useForm<AllWalletDetailsMyWalletSearchFormType>();
  const [withdrawalWalletForm] = Form.useForm<AllWalletDetailsWithdrawalWalletFormType>();
  const selectedService = Form.useWatch("service", walletSearchForm);

  useTitle({
    breadcrumbItems: [
      {
        title: "جزییات کیف پول",
      },
      {
        title: " جزییات همه کیف پول ها",
      },
    ],
  });

  //? ================================  Api Calls ================================
  const [
    triggerBusinessQuery,
    { data: businessApiData, isFetching: businessLoading, isSuccess: isBusinessSuccess },
  ] = useLazyGetActiveBusinessListQuery();

  const [triggerBranchQuery, { isFetching: branchLoading, isSuccess: isBranchSuccess }] =
    useLazyGetBranchByBusinessQuery();

  const [getServicesList, { isFetching: isServicesLoading }] =
    useLazyGetServicesListByBranchIdQuery();

  const [advanceFilter, { data: advanceFilterData, isFetching: isAdvanceFilterLoading }] =
    useLazyGetBusinessAndBranchesWalletsListByAdvanceFilterQuery();

  const [createWithdrawalRequest, { isLoading: isCreateWithdrawalRequestLoading }] =
    useCreateWalletWithdrawalRequestMutation();

  const [checkOtp, { isLoading: isCheckOtpLoading }] =
    useAllCreateWalletWithdrawalRequestCheckOtpMutation();

  //* ================================ Util Functions ================================
  const segmentItems = [
    //Todo[Atefeh]:uncomment when api got ready
    // {
    //   id: "0",
    //   children: <MyWalletStatisticsSegmented />,
    // },
    {
      id: "0",
      children: (
        <AllWalletDetailsTransactionSegmented
          walletUuid={advanceFilterData?.content?.[0]?.uuid}
        />
      ),
    },
    {
      id: "1",
      children: (
        <AllWalletDetailsRequestSegmented
          walletUuid={advanceFilterData?.content?.[0]?.uuid}
          walletSearchForm={walletSearchForm}
        />
      ),
    },
  ];

  const getBusinessHandler = () =>
    fetchDataIfNeeded(!isBusinessSuccess, triggerBusinessQuery);

  const onBusinessChangeHandler = (businessId: number) => {
    if (businessId) {
      triggerBranchQuery({ businessIds: [businessId] })
        .unwrap()
        .then((value) => setBranchData(value));
    } else {
      setBranchData([]);
    }

    setServicesList([]);
    walletSearchForm.setFieldsValue({
      branch: undefined,
      service: undefined,
    });
  };

  const onChangeBranchIdHandler = (branchId: number) => {
    walletSearchForm.setFieldsValue({
      service: undefined,
    });
    setServicesList([]);

    if (branchId) {
      getServicesList({ branchId })
        .unwrap()
        .then((value) => setServicesList(value));
    }
  };

  const serviceChangeHandler = () => {
    const formData = walletSearchForm.getFieldsValue();

    if (!formData?.service?.item?.name) return;

    advanceFilter({
      pageNo: 0,
      pageSize: 1,
      businessId: formData?.business?.code?.toString(),
      branchId: formData?.branch?.code?.toString(),
      samimServices: `samimServices=${formData?.service?.item?.name}`,
    });
  };

  // BTN HANDLER
  const chargeWalletBtnHandler = () => {
    setWalletChargeModalIsOpen({
      isOpen: true,
      id: -1,
    });
  };
  const withdrawWalletBtnHandler = () => {
    setWithdrawWalletModalIsOpen(true);
    uuidForWithdrawal = crypto.randomUUID();
  };

  const yourAccountBtnHandler = () => {
    setYourAccountDrawerIsOpen(true);
  };

  // MODAL HANDLER
  const closeWalletChargeModalHandler = () => {
    setWalletChargeModalIsOpen({
      isOpen: false,
      id: -1,
    });
  };
  const closeWithdrawWalletModalHandler = () => {
    setWithdrawWalletModalIsOpen(false);
    setCurrent(0);
    withdrawalWalletForm.resetFields();
  };

  const confirmWalletChargeModalHandler = () => {};

  const confirmWithdrawWalletModalHandler = () => {
    if (current === 0) {
      withdrawalWalletForm.validateFields().then(() => {
        setCurrent(1);
      });
    } else if (current === 1) {
      const formData = withdrawalWalletForm.getFieldsValue(true);

      if (advanceFilterData?.content?.[0]?.uuid && uuidForWithdrawal) {
        createWithdrawalRequest({
          params: {
            amount: formData?.withdrawMount,
            requestUuid: uuidForWithdrawal,
          },
          bankAccountId: formData?.bankAccountId,
          walletUuid: advanceFilterData?.content?.[0]?.uuid,
        })
          .unwrap()
          .then((res) => {
            setTempToken({ token: res?.token, mobileNo: res?.maskedMobileNumber });
            setCurrent(2);
          });
      }
    } else {
      const otpValue = otpForm.getFieldsValue(true)?.otp;

      if (tempToken?.token && otpValue) {
        checkOtp({ token: tempToken?.token, otp: otpValue })
          .unwrap()
          .then(() => {
            closeWithdrawWalletModalHandler();
            serviceChangeHandler();
            otpForm.resetFields();
          });
      }
    }
  };

  const onBackBtnHandler = () => {
    if (current === 0) {
      closeWithdrawWalletModalHandler();
    } else if (current === 1) {
      setCurrent(0);
    } else {
      setCurrent(1);
    }
  };

  // DRAWER HANDLER
  const closeYourAccountDrawer = () => {
    setYourAccountDrawerIsOpen(false);
  };

  const closeWithdrawWalletModalOpenAccountDrawerHandler = () => {
    closeWithdrawWalletModalHandler();
    yourAccountBtnHandler();
  };

  useEffect(() => {
    if (!pendingView) return;
    if ((!url?.page || url.page === "1") && (!url?.pageSize || url.pageSize === "8")) {
      setView(pendingView);
      setPendingView(null);
    }
  }, [pendingView, url?.page, url?.pageSize]);

  const onSegmentChange = (value: "0" | "1" | "2") => {
    if (value === view || pendingView) return;

    // Unmount current segment first so it does not refetch on pagination reset
    setView("");
    setPendingView(value);
    setSearchParams({ page: "1", pageSize: "8" });
  };

  const handleResend = async () => {
    const formData = withdrawalWalletForm.getFieldsValue(true);

    if (advanceFilterData?.content?.[0]?.uuid) {
      createWithdrawalRequest({
        params: {
          amount: formData?.withdrawMount,
          requestUuid: crypto.randomUUID(),
        },
        bankAccountId: formData?.bankAccountId,
        walletUuid: advanceFilterData?.content?.[0]?.uuid,
      })
        .unwrap()
        .then((res) => {
          setTempToken({ token: res?.token, mobileNo: res?.maskedMobileNumber });
        });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* CHARGE WALLET MODAL */}
      {walletChargeModalIsOpen?.isOpen && (
        <ConfirmationModalWithContent
          title="شارژ کیف پول"
          isModalOpen={walletChargeModalIsOpen?.isOpen}
          confirmBtnText="شارژ کیف پول"
          backBtnText="انصراف"
          closeModalHandler={closeWalletChargeModalHandler}
          onConfirmClickHandler={confirmWalletChargeModalHandler}
          showIcon={false}
          content={<AllWalletDetailsWalletChargeModalContent />}
          width={400}
        />
      )}

      {/* WITHDRAW FROM THE WALLET */}
      {withdrawWalletModalIsOpen && (
        <ConfirmationModalWithContent
          title="برداشت از کیف پول"
          isModalOpen={withdrawWalletModalIsOpen}
          confirmBtnText={
            current === 0
              ? "تأیید و انتخاب حساب"
              : current === 1
                ? "تایید و ادامه"
                : "ارسال درخواست برداشت"
          }
          backBtnText={current === 0 ? "انصراف" : "بازگشت"}
          closeModalHandler={closeWithdrawWalletModalHandler}
          onConfirmClickHandler={confirmWithdrawWalletModalHandler}
          onBackBtnHandler={onBackBtnHandler}
          isConfirmButtonLoading={
            current === 1
              ? isCreateWithdrawalRequestLoading
              : current === 2
                ? isCheckOtpLoading
                : false
          }
          showIcon={false}
          content={
            <AllWalletDetailsWithdrawWalletModalContent
              current={current}
              walletTotalAmount={advanceFilterData?.content?.[0]?.balance?.totalAmount?.toString()}
              withdrawalWalletForm={withdrawalWalletForm}
              walletSearchForm={walletSearchForm}
              closeWithdrawWalletModalHandler={
                closeWithdrawWalletModalOpenAccountDrawerHandler
              }
              tempToken={tempToken}
              otpForm={otpForm}
              onResend={handleResend}
              isResetLoading={isCreateWithdrawalRequestLoading}
            />
          }
          width={900}
        />
      )}

      {/* YOUR ACCOUNT */}
      {yourAccountDrawerIsOpen && (
        <CustomDrawer
          onClose={closeYourAccountDrawer}
          open={yourAccountDrawerIsOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <AllWalletDetailsYourAccountDrawerContent
              closeDrawerHandler={closeYourAccountDrawer}
              walletSearchForm={walletSearchForm}
            />
          }
        />
      )}

      <div className="all-wallet-detail-list-container">
        <Form form={walletSearchForm}>
          <Row gutter={[16, 16]}>
            <Col xl={6} lg={8} sm={12} xs={24}>
              <CustomSelect
                label="کسب و کار"
                name="business"
                options={businessApiData || []}
                loading={businessLoading}
                placeholder="انتخاب کنید"
                allowClear
                onChange={(id) => onBusinessChangeHandler(id as number)}
                onClick={getBusinessHandler}
                form={walletSearchForm}
              />
            </Col>
            <Col xl={6} lg={8} sm={12} xs={24}>
              <CustomSelect
                label="شعبه / واحد"
                name="branch"
                options={branchData}
                placeholder="انتخاب کنید"
                loading={branchLoading}
                allowClear
                notFoundContent={isBranchSuccess ? selectNotFoundContent : undefined}
                onChange={(id) => onChangeBranchIdHandler(id as number)}
                disabled={walletSearchForm.getFieldsValue()?.business ? false : true}
                form={walletSearchForm}
              />
            </Col>
            <Col xl={6} lg={8} sm={12} xs={24}>
              <CustomSelect
                label="سرویس"
                name="service"
                options={servicesList}
                loading={isServicesLoading}
                allowClear
                onChange={serviceChangeHandler}
                placeholder="انتخاب کنید"
                disabled={
                  !walletSearchForm.getFieldsValue()?.business ||
                  !walletSearchForm.getFieldsValue()?.branch
                    ? true
                    : false
                }
                form={walletSearchForm}
              />
            </Col>
          </Row>
        </Form>
        {selectedService && advanceFilterData?.content?.[0] ? (
          <Div loading={isAdvanceFilterLoading} className="card-btn-wrapper">
            <div className="card-info-wrapper">
              <AllWalletDetailsInfoCard
                title="شناسه کیف پول"
                value={advanceFilterData?.content?.[0]?.uuid}
                icon={BiSolidWalletAlt}
                tag={{
                  text: WALLET_STATUS_TEXT["1"],
                  color: WALLET_STATUS_COLOR["1"],
                  icon: WALLET_STATUS_ICON["1"],
                }}
              />
              <AllWalletDetailsInfoCard
                title="موجودی فعلی"
                value={
                  dataPlaceHolder({
                    data: advanceFilterData?.content?.[0]?.balance?.totalAmount?.toString(),
                    isPrice: true,
                    isRial: true,
                  }) + "تومان "
                }
                icon={PiCoinsFill}
              />
            </div>
            <div className="btn-wrapper">
              <CustomButton
                className="btn-style"
                type="default"
                icon={<PiCreditCardLight />}
                onClick={yourAccountBtnHandler}
                disabled={
                  advanceFilterData?.content?.[0]?.walletType?.walletTypeId ===
                  WALLET_STATUS.blocked
                    ? true
                    : false
                }
              >
                حساب‌های شما
              </CustomButton>

              <CustomButton
                className="btn-style"
                type="default"
                icon={<PiArrowLineUpRight />}
                onClick={withdrawWalletBtnHandler}
                disabled={
                  advanceFilterData?.content?.[0]?.walletType?.walletTypeId ===
                  WALLET_STATUS.blocked
                    ? true
                    : false
                }
              >
                برداشت از کیف پول
              </CustomButton>

              <CustomButton
                className="btn-style"
                type="default"
                icon={<PiPlusLight />}
                onClick={chargeWalletBtnHandler}
                disabled={
                  advanceFilterData?.content?.[0]?.walletType?.walletTypeId ===
                    WALLET_STATUS.blocked ||
                  advanceFilterData?.content?.[0]?.walletType?.walletTypeId ===
                    WALLET_STATUS.temporaryBlocked
                    ? true
                    : false
                }
              >
                شارژ کیف پول
              </CustomButton>
            </div>

            {advanceFilterData?.content?.[0]?.walletType?.walletTypeId ===
            WALLET_STATUS.blocked ? (
              <div className="alert-wrapper">
                <CustomAlert
                  showIcon
                  title=""
                  description="کیف پول شما مسدود شده است!"
                  type="error"
                  className="custom-alert"
                />
                <CustomAlert
                  showIcon
                  title=""
                  description="برای حل مشکل می‌توانید با پشتیبانی تماس بگیرید."
                  type="info"
                  className="custom-alert"
                />
              </div>
            ) : (
              <div>
                {advanceFilterData?.content?.[0]?.walletStatus?.walletStatusId ===
                WALLET_STATUS.temporaryBlocked ? (
                  <div className="alert-wrapper">
                    <CustomAlert
                      showIcon
                      title=""
                      description="کیف پول غیر فعال شده است!"
                      type="error"
                      className="custom-alert"
                    />
                    <CustomAlert
                      showIcon
                      title=""
                      description="شما می‌توانید از موجودی کیف پول خود برداشت نمایید اما امکان شارژ کیف پول وجود ندارد. در صورت لزوم برای حل مشکل می‌توانید با پشتیبانی تماس بگیرید."
                      type="info"
                      className="custom-alert"
                    />
                  </div>
                ) : null}
                <CustomSegmented
                  className="segment-container"
                  size="large"
                  block
                  options={[
                    //Todo[Nima]:active when api got ready
                    { value: "2", label: "آمار‌", disabled: true },
                    { value: "0", label: "تراکنش‌ها" },
                    { value: "1", label: "درخواست‌ها" },
                  ]}
                  onChange={(value) => onSegmentChange(value as "0" | "1" | "2")}
                  value={view || pendingView || "0"}
                />
                <div>{view ? segmentItems[+view]?.children : null}</div>
              </div>
            )}
          </Div>
        ) : null}
      </div>
    </>
  );
};

export default AllWalletDetailsWalletList;
