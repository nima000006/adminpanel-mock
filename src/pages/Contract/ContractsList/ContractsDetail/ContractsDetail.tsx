import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";

import ContractsDetailDescription from "./helper/components/ContractsDetailDescription/ContractsDetailDescription";
import ContractsDetailFinancialRules from "./helper/components/ContractsDetailFinancialRules/ContractsDetailFinancialRules";
import ContractsDetailInfo from "./helper/components/ContractsDetailInfo/ContractsDetailInfo";

const ContractsDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params.tab || "1";
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500">قرارداد ها</span>,
      },
      {
        title: (
          <Link
            to={CONTRACTS_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE}
            className="text-neutral-500!"
          >
            لیست قراردادها
          </Link>
        ),
      },
      {
        title: params?.title || "جزئیات قرارداد",
      },
    ],
  });
  // ================================ components ================================
  const tabsItems = [
    {
      label: "اطلاعات پایه قرارداد",
      children: <ContractsDetailInfo />,
      key: "1",
    },
    {
      label: "شرح قرارداد",
      children: <ContractsDetailDescription />,
      key: "2",
    },
    {
      label: "قانون های مالی",
      children: <ContractsDetailFinancialRules />,
      key: "3",
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div>
      <Tabs
        items={tabsItems}
        type="card"
        onChange={(key) => {
          setSearchParams({ ...params, tab: key });
        }}
        activeKey={activeKey}
        destroyOnHidden
        className="body-regular"
      />
    </div>
  );
};

export default ContractsDetail;
