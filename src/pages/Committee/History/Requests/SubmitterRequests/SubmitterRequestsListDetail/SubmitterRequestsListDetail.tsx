import { Tabs } from "antd";

import "./_submitterRequestsListDetail.scss";
import PacketInformationTab from "./helper/components/PacketInformationTab/PacketInformationTab";
import PacketResultTab from "./helper/components/PacketResultTab/PacketResultTab";
import RequestInfoTab from "./helper/components/RequestInfoTab/RequestInfoTab";

const SubmitterRequestsListDetail = () => {
  const items = [
    {
      label: "اطلاعات درخواست",
      children: <RequestInfoTab />,
      key: "1",
    },
    {
      label: "اطلاعات نامه",
      children: <PacketInformationTab />,
      key: "2",
    },
    {
      label: "نتیجه نامه",
      children: <PacketResultTab />,
      key: "3",
    },
  ];

  return (
    <div>
      <Tabs
        items={items}
        dir="rtl"
        className="submit-request-tab-container"
        // onChange={(e) => onTabsChange(e as BusinessBaseTableTypes)}
        // destroyInactiveTabPane={true}
      />
    </div>
  );
};

export default SubmitterRequestsListDetail;
