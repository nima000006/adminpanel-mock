import { Tabs } from "antd";
import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE } from "@infra/router/routes/contracts";

import ContractsDetailDescription from "../../ContractsDetail/helper/components/ContractsDetailDescription/ContractsDetailDescription";
import ContractsDetailFinancialRules from "../../ContractsDetail/helper/components/ContractsDetailFinancialRules/ContractsDetailFinancialRules";
import ContractsDetailInfo from "../../ContractsDetail/helper/components/ContractsDetailInfo/ContractsDetailInfo";

const ContractsDetail = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params.tab || "1";
  useTitle({
    breadcrumbItems: [
      {
        title: <span className="text-neutral-500"> مدیریت قرارداد ها</span>,
      },
      {
        title: (
          <Link
            to={CONTRACTS_CONTRACTS_ARCHIVE_LIST_PAGE_ROUTE}
            className="text-neutral-500!"
          >
            لیست آرشیو قرارداد ها
          </Link>
        ),
      },
      {
        title: params?.id || "جزئیات آرشیو قرارداد",
      },
    ],
  });
  // ================================ components ================================
  const tabsItems = [
    {
      label: "اطلاعات پایه قرارداد",
      children: <ContractsDetailInfo isArchive />,
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
