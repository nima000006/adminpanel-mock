import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";
import MyContractsListContracts from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListContracts/MyContractsListContracts";
import MyContractsListRequests from "@pages/Catering/contracts/Contracts/MyContracts/MyContractsList/helper/components/MyContractsListRequests/MyContractsListRequests";

const MyContractsList = () => {
  useTitle({ text: "قراردادهای من" });
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
      children: <MyContractsListContracts />,
      key: "1",
    },
    {
      label: "درخواست‌ها",
      children: <MyContractsListRequests />,
      key: "2",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Tabs
      items={tabsItems}
      type="card"
      className="my-contracts-list-page-container"
      activeKey={activeKey}
      onChange={onTabChange}
      destroyOnHidden
    />
  );
};

export default MyContractsList;
