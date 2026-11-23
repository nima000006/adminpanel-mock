import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_CONTRACT_DETAIL_FINANCIAL_RULES_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { ContractsDetailFinancialRulesDetailsBeneficiaryDataTypes } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/helpers/components/ContractsDetailFinancialRulesDetails/helper/components/ContractsDetailFinancialRulesDetailsBeneficiary/@types/@contractsDetailFinancialRulesDetailsBeneficiary";

import ContractsDetailFinancialRulesDetailsBeneficiaryModelTable from "./helper/models/ContractsDetailFinancialRulesDetailsBeneficiaryModelTable";

// Mock data based on the table image
const mockData: ContractsDetailFinancialRulesDetailsBeneficiaryDataTypes[] = [
  {
    id: 1,
    userName: "محمد محمدی",
    nationalCode: "46543513515",
    status: "فعال",
    startDate: "2024-04-21",
    endDate: "2024-04-21",
    share: "10%",
  },
  {
    id: 2,
    userName: "علی احمدی",
    nationalCode: "46543513520",
    status: "فعال",
    startDate: "2024-04-29",
    endDate: "2024-04-29",
    share: "5%",
  },
  {
    id: 3,
    userName: "سمیه رضایی",
    nationalCode: "46543513516",
    status: "فعال",
    startDate: "2024-04-24",
    endDate: "2024-04-24",
    share: "5%",
  },
  {
    id: 4,
    userName: "رضا حسینی",
    nationalCode: "46543513519",
    status: "فعال",
    startDate: "2024-04-27",
    endDate: "2024-04-27",
    share: "20%",
  },
];

const ContractsDetailFinancialRulesDetailsBeneficiary = () => {
  const { params } = useQueryParams();
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500">مدیریت قرارداد ها</span>,
      },
      {
        title: <span className="text-neutral-500">لیست قراردادها</span>,
      },
      {
        title: (
          <span className="text-neutral-500">{params?.title || "جزئیات قرارداد"}</span>
        ),
      },
      {
        title: (
          <Link
            to={CONTRACTS_CONTRACT_DETAIL_FINANCIAL_RULES_PAGE_ROUTE}
            className="text-neutral-500!"
          >
            ذینفعان گروهی
          </Link>
        ),
      },
      {
        title: "کاربران",
      },
    ],
  });

  return (
    <div>
      <div className="bg-neutral-2 body-regular flex flex-col items-center justify-between gap-2 rounded-md p-4!">
        <h3 className="font-bold">ذینفعان گروهی عنوان 1</h3>
        <div className="flex items-center gap-2">
          <span>ایجاد کننده گروه:</span>
          <span>مرکز مشاوره درون</span>
        </div>
        <CustomTag color="purple">کل سهم گروه 40 %</CustomTag>
      </div>
      <CustomDivider text="لیست ذینفعان گروه" className="mt-10!" />
      <CustomTable<ContractsDetailFinancialRulesDetailsBeneficiaryDataTypes>
        className="contracts-detail-financial-rules-details-beneficiary-table-container mt-4!"
        dataSource={mockData}
        columns={ContractsDetailFinancialRulesDetailsBeneficiaryModelTable()}
        // paginationMode=
        rowKey="id"
      />
    </div>
  );
};
export default ContractsDetailFinancialRulesDetailsBeneficiary;
