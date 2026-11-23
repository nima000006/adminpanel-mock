import { useEffect, useState } from "react";

import { Col, FormInstance, Row } from "antd";
import { PiWalletFill } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomInputNumber from "@components/CustomInputs/InputNumber/CustomInputNumber";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  NUMBER_MAX_RULE_FORMATTED,
  NUMBER_MIN_RULE_FORMATTED,
  NUMBER_RULE,
  REQUIRED_RULE,
} from "@infra/validation/validationSchema";
import { NEUTRAL_10 } from "@infra/VARS/globalColors/globalColors";
import WalletDetailCards from "@pages/Wallet/Wallets/_shared/components/WalletDetailCards/WalletDetailCards";
import { MyWalletDetailsWithdrawalWalletFormType } from "@pages/Wallet/Wallets/WalletDetails/WalletMyWalletDetails/MyWalletDetailsWalletList/@types/@myWalletDetailsList";
import "./_myWalletDetailsDeterminingAmountStep.scss";

export const MINIMUM_WITHDRAW_VALUE = 1000000;

const MyWalletDetailsDeterminingAmountStep = ({
  walletTotalAmount,
  withdrawalWalletForm,
}: {
  walletTotalAmount: string | undefined;
  withdrawalWalletForm: FormInstance<MyWalletDetailsWithdrawalWalletFormType>;
}) => {
  const walletAmount = (walletTotalAmount && +walletTotalAmount) || 0;

  // CustomInputNumber متن حروفی را از state داخلی می‌سازد و با setFieldsValue آپدیت نمی‌شود؛
  // با عوض کردن key و دادن initialValue، کامپوننت remount می‌شود تا متن درست شود.
  const [withdrawInputKey, setWithdrawInputKey] = useState(0);
  const [withdrawInitialValue, setWithdrawInitialValue] = useState<number | undefined>();

  useEffect(() => {
    withdrawalWalletForm.resetFields();
  }, []);

  return (
    <div className="my-wallet-details-determining-amount-step-container">
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={24} xs={24}>
          <WalletDetailCards
            title="موجودی کیف پول"
            price={dataPlaceHolder({
              data: walletTotalAmount,
              isPrice: true,
              isRial: true,
            })}
            icon={<PiWalletFill color={NEUTRAL_10} size={16} />}
            centered
          />
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <WalletDetailCards
            title="موجودی قابل برداشت"
            price={dataPlaceHolder({
              data: walletTotalAmount,
              isPrice: true,
              isRial: true,
            })}
            icon={<PiWalletFill color={NEUTRAL_10} size={16} />}
            centered
          />
        </Col>
      </Row>
      <div className="alert-wrapper">
        {/* Todo[Atefeh]: uncomment when need in the future */}
        {/* <CustomAlert
          showIcon
          title="توجه!"
          description={
            <>
              <p>سقف برداشت روزانه شما : 200,000,000 تومانء می‌باشد.</p>{" "}
              <p>سقف برداشت ماهانه شما :‌ 1,000,000,000 تومانء می‌باشد.</p>
            </>
          }
          type="warning"
          className="custom-alert"
        /> */}
        <CustomAlert
          showIcon
          title="راهنما"
          description="در صورتی که نیاز به افزایش سقف برداشت روزانه و یا ماهانه دارید با پشتیبانی تماس بگیرید."
          type="info"
          className="custom-alert"
        />
      </div>
      <CustomInputNumber
        key={withdrawInputKey}
        label=""
        name="withdrawMount"
        isPrice={true}
        placeholder="مبلغ مورد نظر را وارد نمایید."
        suffix={"ریال"}
        initialValue={withdrawInitialValue}
        validateTrigger={["onChange", "onBlur"]}
        disabled={!(walletAmount >= MINIMUM_WITHDRAW_VALUE)}
        extra={
          walletAmount >= MINIMUM_WITHDRAW_VALUE ? (
            ""
          ) : (
            <div className="input-subtitle-container body-regular">
              موجودی کیف پول کافی نیست. حداقل مبلغ مورد نیاز برای برداشت 100,000 تومان
              میباشد
            </div>
          )
        }
        rules={[
          NUMBER_RULE,
          NUMBER_MAX_RULE_FORMATTED(walletAmount || 0),
          REQUIRED_RULE,
          NUMBER_MIN_RULE_FORMATTED(MINIMUM_WITHDRAW_VALUE),
        ]}
      />
      <div>
        <CustomButton
          onClick={() => {
            setWithdrawInitialValue(walletAmount);
            withdrawalWalletForm.setFieldsValue({ withdrawMount: walletAmount });
            setWithdrawInputKey((key) => key + 1);
          }}
        >
          برداشت همه موجودی
        </CustomButton>
      </div>
    </div>
  );
};
export default MyWalletDetailsDeterminingAmountStep;
