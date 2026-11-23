import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import ResidenceDormList from "./helper/components/ResidenceDormList/ResidenceDormList";
import ResidenceRequestsList from "./helper/components/ResidenceRequestsList/ResidenceRequestsList";
import "./_dormsMainList.scss";

const DormsMainList = () => {
  const { params, setSearchParams } = useQueryParams<{ tab: string }>();
  const activeTab = params?.tab || "1";

  useTitle({ text: "اقامتگاه ها" });

  const items = [
    {
      key: "1",
      label: "اقامتگاه‌ها",
      children: <ResidenceDormList />,
    },
    {
      key: "2",
      label: "درخواست ها",
      children: <ResidenceRequestsList />,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="dorm-main-list-container">
      <Tabs
        items={items}
        type="card"
        activeKey={activeTab}
        className="dorm-main-list-tab-container"
        onChange={(key) => {
          setSearchParams({ tab: key });
        }}
        destroyOnHidden
      />
    </div>
  );
};
export default DormsMainList;
