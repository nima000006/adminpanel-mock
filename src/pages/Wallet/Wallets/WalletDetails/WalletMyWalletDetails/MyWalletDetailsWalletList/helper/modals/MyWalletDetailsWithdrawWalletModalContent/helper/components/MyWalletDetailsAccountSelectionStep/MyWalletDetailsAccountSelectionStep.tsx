import { useEffect, useState } from "react";

import { Col, FormInstance } from "antd";
import { PiArrowLineUpRight, PiCreditCard } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder, formatByGroups } from "@infra/helpers/utils";
import { useLazyGetLegalMyWalletBankAccountsListQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";
import {
  MyWalletDetailsMyWalletSearchFormType,
  MyWalletDetailsWithdrawalWalletFormType,
} from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/@types/@myWalletDetailsList";

import emptyImage from "../../../../../../../../../../../../assets/images/empty-image.png";
import { MyWalletLegalDetailsWalletBankAccountsDataType } from "../../../../../drawer/MyWalletDetailsYourAccountDrawerContent/@types/@myWalletDetailsyourAccountDrawerContent";
import AccountSelectItem from "../MyWalletDetailsAccountSelectItem/MyWalletDetailsAccountSelectItem";
import "./_myWalletDetailsAccountSelectionStep.scss";

const MyWalletDetailsAccountSelectionStep = ({
  walletSearchForm,
  stepForm,
  closeWithdrawWalletModalHandler,
}: {
  walletSearchForm: FormInstance<MyWalletDetailsMyWalletSearchFormType>;
  stepForm: FormInstance<MyWalletDetailsWithdrawalWalletFormType>;
  closeWithdrawWalletModalHandler: () => void;
}) => {
  const [bankAccountList, setBankAccountList] = useState<
    MyWalletLegalDetailsWalletBankAccountsDataType[]
  >([]);

  //? ================================  Api Calls ================================
  const [getBankAccountList, { isFetching: isBankAccountListLoading }] =
    useLazyGetLegalMyWalletBankAccountsListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getBankAccountListHandler();
  }, []);

  //* ================================ Util Functions ================================
  const getBankAccountListHandler = () => {
    const formData = walletSearchForm.getFieldsValue();
    getBankAccountList({
      pageNumber: 0,
      pageSize: 1000,
      branchId: formData?.branch?.code,
      samimService: formData?.service?.item?.name,
      businessId: formData?.business?.code,
      status: "ACCEPTED",
    })
      .unwrap()
      .then((value) => {
        setBankAccountList(value?.content);
      });
  };

  const addAccountHandler = () => {
    closeWithdrawWalletModalHandler();
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="my-wallet-details-account-selection-step-container">
      <Col span={24}>
        <WalletDetailCards
          title="مبلغ درخواستی شما"
          price={dataPlaceHolder({
            data: stepForm.getFieldValue("withdrawMount"),
            isPrice: true,
            isRial: true,
          })}
          icon={<PiArrowLineUpRight color="var(--app-text)" size={16} />}
          centered
        />
      </Col>
      <Div loading={isBankAccountListLoading} className="bank-account-container">
        {bankAccountList && bankAccountList?.length > 0 ? (
          <CustomRadioGroup
            name="bankAccountId"
            rules={[CUSTOM_REQUIRED_RULE("لطفا یک شماره کارت انتخاب کنید")]}
            options={bankAccountList?.map((item) => ({
              value: item?.id,
              label: (
                <AccountSelectItem
                  value={item?.id}
                  accountNumber={formatByGroups(item.cardNumber)}
                  bankName={item.bankName}
                  iban={item.iban}
                />
              ),
            }))}
          />
        ) : (
          <div className="empty-container">
            <img src={emptyImage} alt="empty" className="empty-image" />
            <p>شما هیچ حساب بانکی‌ای ثبت نکرده‌اید.</p>
            <CustomButton
              type="primary"
              className="custom-button"
              icon={<PiCreditCard />}
              onClick={addAccountHandler}
            >
              ثبت حساب بانکی
            </CustomButton>
          </div>
        )}
      </Div>
    </div>
  );
};
export default MyWalletDetailsAccountSelectionStep;
