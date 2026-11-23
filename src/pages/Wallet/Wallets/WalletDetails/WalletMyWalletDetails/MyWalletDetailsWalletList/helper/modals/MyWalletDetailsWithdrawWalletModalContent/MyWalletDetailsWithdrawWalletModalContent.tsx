import { Form, FormInstance, Steps } from "antd";

import { stepStatusCreator } from "@infra/helpers/utils";
import MyWalletDetailsWithdrawWalletOtpStep from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/helper/modals/MyWalletDetailsWithdrawWalletModalContent/helper/components/MyWalletDetailsWithdrawWalletOtpStep/MyWalletDetailsWithdrawWalletOtpStep";

import MyWalletDetailsAccountSelectionStep from "./helper/components/MyWalletDetailsAccountSelectionStep/MyWalletDetailsAccountSelectionStep";
import MyWalletDetailsDeterminingAmountStep from "./helper/components/MyWalletDetailsDeterminingAmountStep/MyWalletDetailsDeterminingAmountStep";
import {
  MyWalletDetailsMyWalletSearchFormType,
  MyWalletDetailsWithdrawalWalletFormType,
} from "../../../@types/@myWalletDetailsList";

import "./_myWalletDetailsWithdrawWalletModalContent.scss";

const MyWalletDetailsWithdrawWalletModalContent = ({
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
  walletSearchForm: FormInstance<MyWalletDetailsMyWalletSearchFormType>;
  withdrawalWalletForm: FormInstance<MyWalletDetailsWithdrawalWalletFormType>;
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
        <MyWalletDetailsDeterminingAmountStep
          walletTotalAmount={walletTotalAmount}
          withdrawalWalletForm={withdrawalWalletForm}
        />
      ),
    },
    {
      id: "2",
      children: (
        <MyWalletDetailsAccountSelectionStep
          walletSearchForm={walletSearchForm}
          stepForm={withdrawalWalletForm}
          closeWithdrawWalletModalHandler={closeWithdrawWalletModalHandler}
        />
      ),
    },
    {
      id: "3",
      children: (
        <MyWalletDetailsWithdrawWalletOtpStep
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
export default MyWalletDetailsWithdrawWalletModalContent;
