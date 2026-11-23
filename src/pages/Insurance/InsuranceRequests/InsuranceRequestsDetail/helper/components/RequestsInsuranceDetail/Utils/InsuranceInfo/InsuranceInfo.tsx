import { Row } from "antd";
import { useSearchParams } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import {
  INSURED_STATUS,
  PAYMENT_TYPE,
} from "../Constants/RequestsInsuranceDetailConstants";
import { InsuranceInfoProps } from "./@types/@insuranceInfo";
import "./insuranceInfo.scss";

const InsuranceInfo = ({ data }: InsuranceInfoProps) => {
  const [searchParams] = useSearchParams();
  const { insuranceStatus } = Object.fromEntries([...searchParams]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <section className="insurance-info-container">
      <CustomDivider text="اطلاعات بیمه‌نامه" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol md={12} sm={24} label="بیمه‌گر" value={data?.insurer} />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="نوع بیمه"
          value={data?.insuranceType}
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="مبلغ کل (تومان)"
          value={data?.totalPrice?.toString()}
          isPrice
        />

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="بیمه‌شده‌ها (نفر)"
          value={data?.insuredQty?.toString()}
        />

        {insuranceStatus !== INSURED_STATUS.pendingPayment && (
          <>
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="نوع پرداخت"
              value={data?.paymentType === PAYMENT_TYPE?.cash ? "نقدی" : "اقساطی"}
            />

            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تعداد اقساط"
              value={data?.installmentsQty?.toString()}
            />
          </>
        )}

        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شماره درخواست"
          value={data?.requestNumber?.toString()}
        />

        {insuranceStatus !== INSURED_STATUS.pendingPayment &&
          insuranceStatus !== INSURED_STATUS.issuing && (
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="شماره بیمه‌نامه"
              value={data?.insuranceNumber}
            />
          )}
      </Row>
    </section>
  );
};

export default InsuranceInfo;
