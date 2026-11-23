import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { PriceSeparatorWithExtraNumbers } from "@infra/helpers/utils";

import { GeneralInstallmentInfoListType } from "./@types/@generalInstallmentInfo";

const GeneralInstallmentInfo = ({
  generalInstallmentInfo,
}: GeneralInstallmentInfoListType) => {
  return (
    <div>
      <CustomDivider text="اطلاعات کلی اقساط" />
      <Row gutter={[16, 16]} className="insurance-box-wrapper">
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="مبلغ کل (تومان)"
          value={PriceSeparatorWithExtraNumbers(generalInstallmentInfo?.totalPrice)}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="تعداد اقساط"
          value={generalInstallmentInfo?.countInstallment}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="اقساط باقیمانده"
          value={generalInstallmentInfo?.remainingInstallments}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="مبلغ باقیمانده (تومان)"
          value={PriceSeparatorWithExtraNumbers(generalInstallmentInfo?.remainingAmount)}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="اقساط پرداخت شده تاکنون"
          value={generalInstallmentInfo?.installmentsPaid}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="مبلغ پرداخت شده تاکنون (تومان)"
          value={PriceSeparatorWithExtraNumbers(generalInstallmentInfo?.amountPaid)}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="مبلغ بدهی تاکنون (تومان)"
          value={PriceSeparatorWithExtraNumbers(generalInstallmentInfo?.amountOwed)}
        />
      </Row>
    </div>
  );
};
export default GeneralInstallmentInfo;
