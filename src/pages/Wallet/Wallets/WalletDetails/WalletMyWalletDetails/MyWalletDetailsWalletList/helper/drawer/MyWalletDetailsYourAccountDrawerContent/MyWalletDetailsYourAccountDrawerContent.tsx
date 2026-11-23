import { useEffect, useState } from "react";

import { Form } from "antd";
import { PiCreditCard } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import {
  useCreateMyWalletBankAccountMutation,
  useLazyGetLegalMyWalletBankAccountsListQuery,
} from "@infra/states/redux/Apis/wallet/wallets/walletsApi";

import {
  MyWalletDetailsAddBankAccountFormDataType,
  MyWalletDetailsGetLegalWalletBankAccountsListResponse,
  MyWalletDetailsYourAccountDrawerContentProps,
  MyWalletLegalDetailsWalletBankAccountsDataType,
} from "./@types/@myWalletDetailsyourAccountDrawerContent";
import WalletAccountInfo from "./helper/components/MyWalletDetailsAccountInfo/MyWalletDetailsAccountInfo";
import MyWalletDetailsAddBankAccountModalContent from "./helper/modals/MyWalletDetailsAddBankAccount/MyWalletDetailsAddBankAccountModalContent";
import emptyImage from "../../../../../../../../../assets/images/empty-image.png";
import "./_myWalletDetailsYourAccountDrawerContent.scss";

type AccountSegmentType = "service" | "all";

const MyWalletDetailsYourAccountDrawerContent = ({
  closeDrawerHandler,
  walletSearchForm,
}: MyWalletDetailsYourAccountDrawerContentProps) => {
  const [bankAccountList, setBankAccountList] = useState<
    MyWalletLegalDetailsWalletBankAccountsDataType[]
  >([]);
  const [activeSegment, setActiveSegment] = useState<AccountSegmentType>("service");
  const [createBankAccountModalOpen, setCreateBankAccountModalOpen] = useState(false);

  const [form] = Form.useForm<MyWalletDetailsAddBankAccountFormDataType>();

  //? ================================  Api Calls ================================
  const [createBankAccount, { isLoading: isCreateBankAccountLoading }] =
    useCreateMyWalletBankAccountMutation();

  const [getBankAccountList, { isFetching: isBankAccountListLoading }] =
    useLazyGetLegalMyWalletBankAccountsListQuery();

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
      .then((value: MyWalletDetailsGetLegalWalletBankAccountsListResponse) => {
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
          content={<MyWalletDetailsAddBankAccountModalContent form={form} />}
        />
      )}
      <div className="my-wallet-details-your-account-drawer-content-container">
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
export default MyWalletDetailsYourAccountDrawerContent;
