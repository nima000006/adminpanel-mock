import { useEffect, useState } from "react";

import { Form } from "antd";
import { PiCreditCard } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import {
  useCreateWalletBankAccountMutation,
  useLazyGetLegalWalletBankAccountsListQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";

import {
  AllWalletDetailsAddBankAccountFormDataType,
  AllWalletDetailsGetLegalWalletBankAccountsListResponse,
  AllWalletDetailsYourAccountDrawerContentProps,
} from "./@types/@allWalletDetailsyourAccountDrawerContent";
import WalletAccountInfo from "./helper/components/AllWalletDetailsAccountInfo/AllWalletDetailsAccountInfo";
import AllWalletDetailsAddBankAccountModalContent from "./helper/modals/AllWalletDetailsAddBankAccount/AllWalletDetailsAddBankAccountModalContent";
import emptyImage from "../../../../../../../../../assets/images/empty-image.png";
import "./_allWalletDetailsYourAccountDrawerContent.scss";

type AccountSegmentType = "service" | "all";

const AllWalletDetailsYourAccountDrawerContent = ({
  closeDrawerHandler,
  walletSearchForm,
}: AllWalletDetailsYourAccountDrawerContentProps) => {
  const [bankAccountList, setBankAccountList] = useState<RequestBankAccountDataType[]>(
    []
  );
  const [activeSegment, setActiveSegment] = useState<AccountSegmentType>("service");
  const [createBankAccountModalOpen, setCreateBankAccountModalOpen] = useState(false);

  const [form] = Form.useForm<AllWalletDetailsAddBankAccountFormDataType>();

  //? ================================  Api Calls ================================
  const [createBankAccount, { isLoading: isCreateBankAccountLoading }] =
    useCreateWalletBankAccountMutation();

  const [getBankAccountList, { isFetching: isBankAccountListLoading }] =
    useLazyGetLegalWalletBankAccountsListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getBankAccountListHandler("service");
  }, []);

  //* ================================ Util Functions ================================
  const getBankAccountListHandler = (segment: AccountSegmentType = activeSegment) => {
    const formData = walletSearchForm.getFieldsValue();
    getBankAccountList({
      pageNumber: 0,
      pageSize: 1000,
      branchId: formData?.branch?.code,
      businessId: formData?.business?.code,
      ...(segment === "service" ? { samimService: formData?.service?.item?.name } : {}),
    })
      .unwrap()
      .then((value: AllWalletDetailsGetLegalWalletBankAccountsListResponse) => {
        setBankAccountList(value?.content);
      });
  };

  const onSegmentChangeHandler = (value: unknown) => {
    const segment = value as AccountSegmentType;
    setActiveSegment(segment);
    getBankAccountListHandler(segment);
  };

  const onCloseDrawerHandler = () => {
    closeDrawerHandler();
  };

  // add account
  const openBankAccountModalHandler = () => setCreateBankAccountModalOpen(true);
  const closeBankAccountModalHandler = () => setCreateBankAccountModalOpen(false);

  const addAccountHandler = () => {
    form.validateFields().then((value) => {
      createBankAccount({
        cardNumber: value?.cardNumber,
        samimServices: [value?.service?.item?.name],
        iban: `IR${value?.iban}`,
        ...(value?.accountNumber ? { bankAccountNumber: value?.accountNumber } : {}),
        branchId: walletSearchForm.getFieldsValue()?.branch?.code,
      })
        .unwrap()
        .then(() => {
          getBankAccountListHandler();
          closeBankAccountModalHandler();
        });
    });
  };

  const hasBankAccount = bankAccountList && bankAccountList.length > 0;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {createBankAccountModalOpen && (
        <ConfirmationModalWithContent
          title="افزودن حساب بانکی"
          backBtnText="انصراف"
          confirmBtnText="افزودن حساب"
          isModalOpen={createBankAccountModalOpen}
          onConfirmClickHandler={addAccountHandler}
          closeModalHandler={closeBankAccountModalHandler}
          isConfirmButtonLoading={isCreateBankAccountLoading}
          content={
            <AllWalletDetailsAddBankAccountModalContent
              form={form}
              branchId={walletSearchForm.getFieldsValue()?.branch?.code}
            />
          }
        />
      )}
      <div className="your-account-drawer-content-container">
        <CustomDrawerHeader
          title="حساب‌های بانکی"
          leftSideContent={
            <div className="drawer-action-btn">
              <CustomButton onClick={onCloseDrawerHandler}>بستن</CustomButton>
              {hasBankAccount ? (
                <CustomButton
                  type="primary"
                  className="custom-button"
                  icon={<PiCreditCard />}
                  onClick={openBankAccountModalHandler}
                >
                  ثبت حساب بانکی
                </CustomButton>
              ) : null}
            </div>
          }
          closeDrawerHandler={closeDrawerHandler}
        />

        <div className="account-segment-wrapper">
          <CustomSegmented
            options={[
              { value: "service", label: "حساب های این سرویس" },
              { value: "all", label: "همه حساب‌ها" },
            ]}
            value={activeSegment}
            onChange={onSegmentChangeHandler}
          />
        </div>

        <Div loading={isBankAccountListLoading}>
          {hasBankAccount ? (
            <div className="wallet-account-info-wrapper">
              {bankAccountList.map((item) => (
                <WalletAccountInfo
                  data={item}
                  key={item?.id}
                  showServices={activeSegment === "all"}
                />
              ))}
            </div>
          ) : (
            <div className="empty-container">
              <img src={emptyImage} alt="empty" className="empty-image" />
              <p>شما هیچ حساب بانکی‌ای ثبت نکرده‌اید.</p>
              <CustomButton
                type="primary"
                className="custom-button"
                icon={<PiCreditCard />}
                onClick={openBankAccountModalHandler}
              >
                ثبت حساب بانکی
              </CustomButton>
            </div>
          )}
        </Div>
      </div>
    </>
  );
};
export default AllWalletDetailsYourAccountDrawerContent;
