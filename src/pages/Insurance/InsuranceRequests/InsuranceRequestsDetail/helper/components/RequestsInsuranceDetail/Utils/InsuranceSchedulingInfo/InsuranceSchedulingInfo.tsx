import { Row } from "antd";
import { useSearchParams } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { INSURED_STATUS } from "../Constants/RequestsInsuranceDetailConstants";
import { InsuranceSchedulingInfoProps } from "./@types/@insuranceSchedulingInfo";
import "./_insuranceSchedulingInfo.scss";

const InsuranceSchedulingInfo = ({ data }: InsuranceSchedulingInfoProps) => {
  const [searchParams] = useSearchParams();
  const { insuranceStatus } = Object.fromEntries([...searchParams]);

  // check four status to render date conditionally
  const checkStatus =
    insuranceStatus === INSURED_STATUS.issued ||
    insuranceStatus === INSURED_STATUS.suspended ||
    insuranceStatus === INSURED_STATUS.cancelled ||
    insuranceStatus === INSURED_STATUS.expired;

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <section className="insurance-scheduling-info-container">
      <CustomDivider text="اطلاعات زمان‌بندی بیمه‌نامه" />
      <Row gutter={[16, 16]}>
        {insuranceStatus === INSURED_STATUS.pendingPayment && (
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="تاریخ صدور فاکتور"
            value={data?.invoiceIssuanceDate}
            isDate
          />
        )}
        {insuranceStatus === INSURED_STATUS.issuing && (
          <>
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تاریخ ثبت درخواست"
              value={data?.registrationDate}
              isDate
            />

            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تاریخ پرداخت"
              value={data?.paymentDate}
              isDate
            />
          </>
        )}
        {insuranceStatus === INSURED_STATUS.issued && (
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="تاریخ شروع بیمه‌نامه"
            value={data?.startDate}
            isDate
          />
        )}
        {insuranceStatus === INSURED_STATUS.suspended && (
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="تاریخ تعلیق بیمه‌نامه"
            value={data?.suspendedDate}
            isDate
          />
        )}
        {insuranceStatus === INSURED_STATUS.cancelled && (
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="تاریخ ابطال بیمه‌نامه"
            value={data?.canceledDate}
            isDate
          />
        )}
        {checkStatus && (
          <>
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تاریخ صدور بیمه نامه "
              value={data?.issuanceDate}
              isDate
            />

            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تاریخ انقضاء بیمه‌نامه"
              value={data?.expiredDate}
              isDate
            />
          </>
        )}
      </Row>
    </section>
  );
};

export default InsuranceSchedulingInfo;
