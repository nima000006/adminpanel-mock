import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { InsuredBankInfoProps } from "./@types/@insuredBankInfo";
import "./_insuredBankInfo.scss";

const InsuredBankInfo = ({
  bankName,
  accountHolderName,
  accountNumber,
  shabaNumber,
}: InsuredBankInfoProps) => {
  return (
    <div className="insured-bank-info-container">
      <CustomDivider text="اطلاعات حساب بانکی" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol md={12} sm={24} label="نام بانک" value={bankName} />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نام صاحب حساب"
          value={accountHolderName}
        />

        <SingleVerticalWithCol md={12} sm={24} label="شماره حساب" value={accountNumber} />

        <SingleVerticalWithCol md={12} sm={24} label="شماره شبا" value={shabaNumber} />
      </Row>
    </div>
  );
};

export default InsuredBankInfo;
