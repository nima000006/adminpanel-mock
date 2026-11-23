import { Form, FormInstance, Steps } from "antd";

import { stepStatusCreator } from "@infra/helpers/utils";
import AllWalletDetailsWithdrawWalletOtpStep from "@pages/Wallet/Wallets/WalletDetails/WalletAllWalletDetails/AllWalletDetailsWalletList/helper/modals/AllWalletDetailsWithdrawWalletModalContent/helper/components/AllWalletDetailsWithdrawWalletOtpStep/AllWalletDetailsWithdrawWalletOtpStep";

import AllWalletDetailsAccountSelectionStep from "./helper/components/AllWalletDetailsAccountSelectionStep/AllWalletDetailsAccountSelectionStep";
import AllWalletDetailsDeterminingAmountStep from "./helper/components/AllWalletDetailsDeterminingAmountStep/AllWalletDetailsDeterminingAmountStep";
import {
  AllWalletDetailsMyWalletSearchFormType,
  AllWalletDetailsWithdrawalWalletFormType,
} from "../../../@types/@allWalletDetailsList";

import "./_allWalletDetailsWithdrawWalletModalContent.scss";

const AllWalletDetailsWithdrawWalletModalContent = ({
  current,
  walletTotalAmount,
  withdrawalWalletForm,
  walletSearchForm,
  closeWithdrawWalletModalHandler,
  tempToken,
  otpForm,
  onResend,
  isResetLoading,
}: {
  current: number;
  walletTotalAmount: string | undefined;
  walletSearchForm: FormInstance<AllWalletDetailsMyWalletSearchFormType>;
  withdrawalWalletForm: FormInstance<AllWalletDetailsWithdrawalWalletFormType>;
  closeWithdrawWalletModalHandler: () => void;
  tempToken: { token: string | null; mobileNo: string | null };
  otpForm: FormInstance<{ otp: string }>;
  onResend: () => Promise<void>;
  isResetLoading: boolean;
}) => {
  const stepsItem = [
    {
      id: "1",
      children: (
        <AllWalletDetailsDeterminingAmountStep
          walletTotalAmount={walletTotalAmount}
          withdrawalWalletForm={withdrawalWalletForm}
        />
      ),
    },
    {
      id: "2",
      children: (
        <AllWalletDetailsAccountSelectionStep
          walletSearchForm={walletSearchForm}
          walletTotalAmount={walletTotalAmount}
          closeWithdrawWalletModalHandler={closeWithdrawWalletModalHandler}
        />
      ),
    },
    {
      id: "3",
      children: (
        <AllWalletDetailsWithdrawWalletOtpStep
          otpForm={otpForm}
          tempToken={tempToken}
          onResend={onResend}
          isResetLoading={isResetLoading}
        />
      ),
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form
      form={withdrawalWalletForm}
      className="withdraw-wallet-modal-content-container w-full"
    >
      <Steps
        type="navigation"
        current={current}
        className="stepper-container"
        items={[
          {
            status: stepStatusCreator(current, 0),
            title: "تعیین مبلغ",
          },
          {
            status: stepStatusCreator(current, 1),
            title: "انتخاب حساب",
          },
          {
            status: stepStatusCreator(current, 2),
            title: "کد تایید ",
          },
        ]}
      />
      {stepsItem[current].children}
    </Form>
  );
};
export default AllWalletDetailsWithdrawWalletModalContent;
