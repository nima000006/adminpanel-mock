import { useEffect, useState } from "react";

import { Col, Form, Grid, Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidWalletAlt } from "react-icons/bi";
import {
  PiArrowLineUpRight,
  PiCoinsFill,
  PiCreditCardLight,
  PiPlusLight,
} from "react-icons/pi";
import { toast } from "react-toastify";

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
import { useAuth } from "@infra/services/AuthProvider/helper/useAuth";
import {
  useLazyGetMyBusinessAndBranchesWalletsListByAdvanceFilterQuery,
  useLazyGetMyServicesListQuery,
  useMyCreateWalletWithdrawalRequestCheckOtpMutation,
  useMyCreateWalletWithdrawalRequestMutation,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import {
  WALLET_STATUS,
  WALLET_STATUS_COLOR,
  WALLET_STATUS_ICON,
  WALLET_STATUS_TEXT,
} from "@pages/Wallet/Wallets/AllWallets/_shared/utils/walletUtils";
import { MINIMUM_WITHDRAW_VALUE } from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/modals/MyWalletDetailsWithdrawWalletModalContent/helper/components/MyWalletDetailsDeterminingAmountStep/MyWalletDetailsDeterminingAmountStep";

import {
  MyWalletDetailsMyWalletSearchFormType,
  MyWalletDetailsWithdrawalWalletFormType,
} from "./@types/@myWalletDetailsList";
import MyWalletDetailsInfoCard from "./helper/components/MyWalletDetailsInfoCard/MyWalletDetailsInfoCard";
import MyWalletDetailsRequestSegmented from "./helper/components/MyWalletDetailsRequestSegmented/MyWalletDetailsRequestSegmented";
import MyWalletTransactionSegmented from "./helper/components/MyWalletDetailsTransactionSegmented/MyWalletDetailsTransactionSegmented";
import MyWalletDetailsYourAccountDrawerContent from "./helper/drawer/MyWalletDetailsYourAccountDrawerContent/MyWalletDetailsYourAccountDrawerContent";
import MyWalletDetailsWalletChargeModalContent from "./helper/modals/MyWalletDetailsWalletChargeModalContent/MyWalletDetailsWalletChargeModalContent";
import MyWalletDetailsWithdrawWalletModalContent from "./helper/modals/MyWalletDetailsWithdrawWalletModalContent/MyWalletDetailsWithdrawWalletModalContent";

import "./_myWalletDetailsWalletList.scss";

let uuidForWithdrawal: null | string = null;

const WALLET_AMOUNT_MSG =
  " موجودی کیف پول کافی نیست. حداقل مبلغ مورد نیاز برای برداشت 100,000 تومان می باشد.";

const MyWalletDetailsWalletList = () => {
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

  const [tempToken, setTempToken] = useState<{
    token: string | null;
    mobileNo: string | null;
  }>({
    token: null,
    mobileNo: null,
  });

  const [otpForm] = Form.useForm();

  const [walletSearchForm] = Form.useForm<MyWalletDetailsMyWalletSearchFormType>();
  const [withdrawalWalletForm] = Form.useForm<MyWalletDetailsWithdrawalWalletFormType>();
  const selectedService = Form.useWatch("service", walletSearchForm);
  const { user } = useAuth();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  useTitle({
    breadcrumbItems: [
      {
        title: "جزییات کیف پول",
      },
      {
        title: "جزییات کیف پول من",
      },
    ],
  });

  //? ================================  Api Calls ================================

  const [advanceFilter, { data: advanceFilterData, isFetching: isAdvanceFilterLoading }] =
    useLazyGetMyBusinessAndBranchesWalletsListByAdvanceFilterQuery();

  const [createWithdrawalRequest, { isLoading: isCreateWithdrawalRequestLoading }] =
    useMyCreateWalletWithdrawalRequestMutation();

  const [checkOtp, { isLoading: isCheckOtpLoading }] =
    useMyCreateWalletWithdrawalRequestCheckOtpMutation();

  const [
    getMyWalletServices,
    { data: servicesData, isLoading: isGetMyWalletServicesLoading },
  ] = useLazyGetMyServicesListQuery();

  //? ================================ Effects ================================

  useEffect(() => {
    getMyWalletServices();
  }, []);

  useEffect(() => {
    if (user?.staff?.admin) {
      // branch mapping
      const branch = {
        label: user.staff.admin.branchName,
        title: user.staff.admin.branchName,
        value: String(user.staff.admin.branchId),
        key: user.staff.admin.branchId,
        item: {
          id: user.staff.admin.branchId,
          title: user.staff.admin.branchName,
        },
        code: user.staff.admin.branchId,
      };
      // prefill branch, don't set service by default
      walletSearchForm.setFieldsValue({
        branch,
      });
    }
  }, [user, walletSearchForm]);

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
        <MyWalletTransactionSegmented
          walletUuid={advanceFilterData?.content?.[0]?.uuid}
        />
      ),
    },
    {
      id: "1",
      children: (
        <MyWalletDetailsRequestSegmented
          walletUuid={advanceFilterData?.content?.[0]?.uuid}
          walletSearchForm={walletSearchForm}
        />
      ),
    },
  ];

  const serviceChangeHandler = () => {
    const formData = walletSearchForm.getFieldsValue();

    if (!formData?.service?.item?.name) return;

    advanceFilter({
      pageNo: 0,
      pageSize: 1,
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

  const confirmWithdrawWalletModalHandler = async () => {
    if (current === 0) {
      if (
        advanceFilterData?.content?.[0]?.balance?.totalAmount &&
        advanceFilterData?.content?.[0]?.balance?.totalAmount <= MINIMUM_WITHDRAW_VALUE
      ) {
        return toast.warning(WALLET_AMOUNT_MSG, { toastId: WALLET_AMOUNT_MSG });
      } else {
        withdrawalWalletForm.validateFields().then(() => {
          setCurrent(1);
        });
      }
    } else if (current === 1) {
      const formData = withdrawalWalletForm.getFieldsValue(true);
      await withdrawalWalletForm?.validateFields();
      await walletSearchForm?.validateFields();

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
    await withdrawalWalletForm?.validateFields();
    await walletSearchForm?.validateFields();

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
          content={<MyWalletDetailsWalletChargeModalContent />}
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
            <MyWalletDetailsWithdrawWalletModalContent
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
            <MyWalletDetailsYourAccountDrawerContent
              closeDrawerHandler={closeYourAccountDrawer}
              walletSearchForm={walletSearchForm}
            />
          }
        />
      )}

      <div className="my-wallet-detail-list-container">
        <Form form={walletSearchForm}>
          <Row gutter={[16, 16]}>
            <Col xl={6} lg={8} sm={12} xs={24}>
              <CustomSelect
                label="شعبه / واحد"
                name="branch"
                placeholder="انتخاب کنید"
                disabled
                form={walletSearchForm}
                options={undefined}
              />
            </Col>
            <Col xl={6} lg={8} sm={12} xs={24}>
              <CustomSelect
                label="سرویس"
                name="service"
                options={servicesData}
                loading={isGetMyWalletServicesLoading}
                allowClear
                onChange={serviceChangeHandler}
                placeholder="انتخاب کنید"
                form={walletSearchForm}
              />
            </Col>
          </Row>
        </Form>
        {selectedService && advanceFilterData?.content?.[0] ? (
          <Div loading={isAdvanceFilterLoading} className="card-btn-wrapper">
            <div className="card-info-wrapper">
              <MyWalletDetailsInfoCard
                title="شناسه کیف پول"
                value={advanceFilterData?.content?.[0]?.uuid}
                icon={BiSolidWalletAlt}
                tag={{
                  text: WALLET_STATUS_TEXT[
                    advanceFilterData?.content?.[0]?.walletStatus?.walletStatusId
                  ],
                  color:
                    WALLET_STATUS_COLOR[
                      advanceFilterData?.content?.[0]?.walletStatus?.walletStatusId
                    ],
                  icon: WALLET_STATUS_ICON[
                    advanceFilterData?.content?.[0]?.walletStatus?.walletStatusId
                  ],
                }}
              />
              <MyWalletDetailsInfoCard
                title="موجودی فعلی"
                value={
                  dataPlaceHolder({
                    data: advanceFilterData?.content?.[0]?.balance?.totalAmount?.toString(),
                    isPrice: true,
                    isRial: true,
                  }) + " تومان "
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
                  className="segmented-container"
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
                  vertical={screens.xs}
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

export default MyWalletDetailsWalletList;
