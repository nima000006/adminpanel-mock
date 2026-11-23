import { useEffect } from "react";

import { useSearchParams } from "react-router";

import Div from "@components/Renderers/Div/Div";
import { useLazyGetFinancialStatusQuery } from "@infra/states/redux/Apis/insuranceService/InsuranceRequests/InsuranceRequests";

import GeneralInstallmentInfo from "./InsuranceDetailThirdTabComponents/GeneralInstallmentInfoComponent/GeneralInstallmentInfo";
import PaymentFactor from "./InsuranceDetailThirdTabComponents/PaymentFactorComponent/PaymentFactor";
import PaymentTypeCash from "./InsuranceDetailThirdTabComponents/PaymentTypeComponent/PaymentTypeCash/PaymentTypeCash";
import PaymentTypeInstallmentComponent from "./InsuranceDetailThirdTabComponents/PaymentTypeComponent/PaymentTypeInstallment/PaymentTypeInstallmentComponent";

const RequestsFinancialStatus = () => {
  const [searchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);

  //? ================================  Api Calls ================================
  const [
    getFinancialStatus,
    { data: financialStatusData, isFetching: isFinancialStatusLoading },
  ] = useLazyGetFinancialStatusQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getFinancialStatus(+id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div className="financial-status-container" loading={isFinancialStatusLoading}>
      <PaymentFactor
        insuranceData={financialStatusData?.data?.insuranceData}
        paymentType={financialStatusData?.data?.paymentType}
        tableData={financialStatusData?.data?.tableData}
      />
      {financialStatusData?.data?.paymentType === "INSTALLMENT" ? (
        <>
          <GeneralInstallmentInfo
            generalInstallmentInfo={
              financialStatusData?.data?.generalInstallmentInfoTabFourAdminDto
            }
          />

          <PaymentTypeInstallmentComponent
            paymentTypeStepsData={financialStatusData?.data?.paymentTypeStepsData}
          />
        </>
      ) : (
        <PaymentTypeCash
          paymentTypeCashData={financialStatusData?.data?.paymentTypeCash}
        />
      )}
    </Div>
  );
};
export default RequestsFinancialStatus;
