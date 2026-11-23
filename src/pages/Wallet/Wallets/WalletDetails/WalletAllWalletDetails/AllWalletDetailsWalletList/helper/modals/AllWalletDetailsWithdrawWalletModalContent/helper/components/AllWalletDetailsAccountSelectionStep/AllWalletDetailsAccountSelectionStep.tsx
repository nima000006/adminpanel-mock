import { useEffect, useState } from "react";

import { Col, FormInstance } from "antd";
import { PiArrowLineUpRight, PiCreditCard } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { useLazyGetLegalWalletBankAccountsListQuery } from "@infra/states/redux/Apis/wallet/wallets/walletsApi";
import { NEUTRAL_10 } from "@infra/VARS/globalColors/globalColors";
import { RequestBankAccountDataType } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";
import { AllWalletDetailsMyWalletSearchFormType } from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/@types/@allWalletDetailsList";

import emptyImage from "../../../../../../../../../../../../assets/images/empty-image.png";
import AccountSelectItem from "../AllWalletDetailsAccountSelectItem/AllWalletDetailsAccountSelectItem";
import "./_allWalletDetailsAccountSelectionStep.scss";

const AllWalletDetailsAccountSelectionStep = ({
  walletSearchForm,
  walletTotalAmount,
  closeWithdrawWalletModalHandler,
}: {
  walletSearchForm: FormInstance<AllWalletDetailsMyWalletSearchFormType>;
  walletTotalAmount: string | undefined;
  closeWithdrawWalletModalHandler: () => void;
}) => {
  const [bankAccountList, setBankAccountList] = useState<RequestBankAccountDataType[]>(
    []
  );

  //? ================================  Api Calls ================================
  const [getBankAccountList, { isFetching: isBankAccountListLoading }] =
    useLazyGetLegalWalletBankAccountsListQuery();

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
    <div className="account-selection-step-container">
      <Col span={24}>
        <WalletDetailCards
          title="موجودی قابل برداشت"
          price={dataPlaceHolder({
            data: walletTotalAmount,
            isPrice: true,
            isRial: true,
          })}
          icon={<PiArrowLineUpRight color={NEUTRAL_10} size={16} />}
          centered
        />
      </Col>
      <Div loading={isBankAccountListLoading} className="bank-account-container">
        {bankAccountList && bankAccountList?.length > 0 ? (
          <CustomRadioGroup
            name="bankAccountId"
            options={bankAccountList?.map((item) => ({
              value: item?.id,
              label: (
                <AccountSelectItem
                  value={item?.id}
                  accountNumber={item.cardNumber}
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
export default AllWalletDetailsAccountSelectionStep;
