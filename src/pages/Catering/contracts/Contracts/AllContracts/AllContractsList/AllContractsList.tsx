import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import AllContractsListContracts from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListContracts/AllContractsListContracts";
import AllContractsListRequests from "@pages/Catering/contracts/Contracts/AllContracts/AllContractsList/helper/components/AllContractsListRequests/AllContractsListRequests";

const AllContractsList = () => {
  useTitle({ text: "قراردادها" });
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "1";

  //? ================================ Handlers ================================
  const onTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  //? ================================ components ================================
  const tabsItems = [
    {
      label: "قراردادها",
      children: <AllContractsListContracts />,
      key: "1",
    },
    {
      label: "درخواست‌ها",
      children: <AllContractsListRequests />,
      key: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="all-contracts-list-page-container"
      activeKey={activeKey}
      onChange={onTabChange}
      destroyOnHidden
    />
  );
};

export default AllContractsList;
