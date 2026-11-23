import { Grid, Steps } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { stepStatusCreator } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE } from "@infra/router/routes/finance";
import AccountingOperationSettlementDocumentCheckSelectBeneficiary from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/AccountingOperationSettlementDocumentCheckSelectBeneficiary/AccountingOperationSettlementDocumentCheckSelectBeneficiary";
import AccountingOperationSettlementDocumentDescription from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/AccountingOperationSettlementDocumentDescription/AccountingOperationSettlementDocumentDescription";
import { SettlementDocumentFilters } from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/AccountingOperationSettlementDocumentSelectBeneficiary/@types/@accountingOperationSettlementDocumentSelectBeneficiary";
import AccountingOperationSettlementDocumentSelectBeneficiary from "@pages/Finance/Accountants/AccountingOperation/helper/components/AccountingOperationPayable/helper/components/AccountingOperationSettlementDocument/helper/components/AccountingOperationSettlementDocumentSelectBeneficiary/AccountingOperationSettlementDocumentSelectBeneficiary";

const AccountingOperationSettlementDocument = () => {
  const { params, setSearchParams } = useQueryParams();

  const { useBreakpoint } = Grid;

  const step1Filters: SettlementDocumentFilters | undefined = params.filters
    ? JSON.parse(params.filters)
    : undefined;

  useTitle({
    breadcrumbItems: [
      {
        title: "مالی",
      },

      {
        title: "حسابداران",
      },
      {
        title: <Link to={FINANCE_ACCOUNTING_OPERATION_PAGE_ROUTE}>عملیات حسابداری</Link>,
      },
      {
        title: "تسویه اسناد",
      },
    ],
  });

  //* ================================ Util Functions ================================

  const goNextStep = () => {
    const nextStep = step + 1;
    setSearchParams({ ...params, step: String(nextStep) });
  };

  const goPrevStep = () => {
    const prev = step - 1;
    setSearchParams({ ...params, step: String(prev) });
  };

  const handleStep1Next = (filters: SettlementDocumentFilters) => {
    setSearchParams({
      ...params,
      step: "2",
      filters: JSON.stringify(filters),
    });
  };

  const stepFromUrl = parseInt(params?.step, 10);
  const step =
    !isNaN(stepFromUrl) && stepFromUrl >= 1 && stepFromUrl <= 5 ? stepFromUrl : 1;

  const screens = useBreakpoint();

  const stepsItem = [
    {
      key: "1",
      children: (
        <AccountingOperationSettlementDocumentSelectBeneficiary
          onNext={handleStep1Next}
          initialFilters={step1Filters}
        />
      ),
    },
    {
      key: "2",
      children: (
        <AccountingOperationSettlementDocumentCheckSelectBeneficiary
          onNext={goNextStep}
          onBack={goPrevStep}
          filters={step1Filters}
        />
      ),
    },
    {
      key: "3",
      children: (
        <AccountingOperationSettlementDocumentDescription
          filters={step1Filters}
          onNext={goNextStep}
          onBack={goPrevStep}
        />
      ),
    },
  ];
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex h-full flex-col gap-10">
      <Steps
        orientation={screens.xl ? "horizontal" : "vertical"}
        current={step - 1}
        items={[
          {
            status: stepStatusCreator(step, 1),
            title: "تنظیمات و انتخاب ذینفعان",
          },
          {
            status: stepStatusCreator(step, 2),
            title: "بررسی ذینفعان انتخاب شده",
          },
          {
            status: stepStatusCreator(step, 3),
            title: "شرح سند تسویه",
          },
        ]}
        className="body-regular"
      />
      {stepsItem[step - 1].children}
    </div>
  );
};
export default AccountingOperationSettlementDocument;
