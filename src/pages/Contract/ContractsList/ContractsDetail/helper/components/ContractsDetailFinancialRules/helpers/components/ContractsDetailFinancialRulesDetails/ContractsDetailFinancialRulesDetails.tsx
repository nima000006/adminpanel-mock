import { Row } from "antd";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { contractsDetailFinancialRulesDetailsDataTypes } from "@pages/Contract/ContractsList/ContractsDetail/helper/components/ContractsDetailFinancialRules/helpers/components/ContractsDetailFinancialRulesDetails/@types/@contractsDetailFinancialRulesDetails";

import ContractsDetailFinancialRulesDetailsModelTable from "./helper/models/ContractsDetailFinancialRulesDetailsModelTable";

// Mock data based on the table image
const mockData: contractsDetailFinancialRulesDetailsDataTypes[] = [
  {
    id: 1,
    title: "عنوان ۱",
    groupMembers: "۵",
    status: "فعال",
    creationDate: "2024-04-21",
    endDate: "-",
  },
  {
    id: 2,
    title: "عنوان ۱",
    groupMembers: "۴",
    status: "فعال",
    creationDate: "2024-04-29",
    endDate: "2024-04-29",
  },
  {
    id: 3,
    title: "عنوان ۱",
    groupMembers: "۲",
    status: "فعال",
    creationDate: "2024-04-24",
    endDate: "2024-04-24",
  },
  {
    id: 4,
    title: "عنوان ۱",
    groupMembers: "۳",
    status: "فعال",
    creationDate: "2024-04-27",
    endDate: "2024-04-27",
  },
];

const ContractsDetailFinancialRulesDetails = () => {
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
          <Link to={CONTRACTS_DETAIL_PAGE_ROUTE} className="text-neutral-500!">
            {params?.title || "جزئیات قرارداد"}
          </Link>
        ),
      },
      {
        title: " ذینفعان گروهی",
      },
    ],
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="قالب ذینفع 1" value="قالب گروهی" />
        <SingleVerticalWithCol label="سهم هر گروه " value="10%" />
        <SingleVerticalWithCol label="ایجاد کننده" value="مرکز مشاوره درون" />
      </Row>
      <CustomDivider text="گروه های ایجاد شده (5)" className="mt-10!" />
      <CustomTable<contractsDetailFinancialRulesDetailsDataTypes>
        className="contracts-detail-financial-rules-details-table-container mt-4!"
        dataSource={mockData}
        columns={ContractsDetailFinancialRulesDetailsModelTable()}
        // paginationMode="none"
        rowKey="id"
      />
    </div>
  );
};

export default ContractsDetailFinancialRulesDetails;
