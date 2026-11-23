import { useEffect } from "react";

import { Tabs } from "antd";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import useQueryParams from "@infra/hooks/useQueryParams";

import WorkSpacesAdmissionList from "./helper/components/WorkSpacesAdmissionList/WorkSpacesAdmissionList";
import WorkSpacesDormList from "./helper/components/WorkSpacesDormList/WorkSpacesDormList";
import WorkSpacesTariffList from "./helper/components/WorkSpacesTariffList/WorkSpacesTariffList";
import { workSpaceActiveTab } from "./utils/WorkSpaceListUtils";
import "./_workSpacesList.scss";

const WorkSpacesList = () => {
  useTitle({ text: "کارپوشه" });
  const { params, setSearchParams } = useQueryParams();

  const activeTab = params?.tab || "1";

  //? ================================ Effects ================================
  useEffect(() => {
    setSearchParams({ tab: "1" });
  }, []);

  // ================================ components ================================
  const items = [
    {
      key: "1",
      label: "خوابگاه",
      children: <WorkSpacesDormList activeTab={workSpaceActiveTab?.DORM} />,
    },
    {
      key: "2",
      label: "تعرفه",
      children: <WorkSpacesTariffList activeTab={workSpaceActiveTab?.TARIFF} />,
    },
    {
      key: "3",
      label: "برنامه پذیرش",
      children: <WorkSpacesAdmissionList activeTab={workSpaceActiveTab?.ADMISSION} />,
    },
  ];

  const changeTabHandler = (key: string) => {
    setSearchParams({ tab: key });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="work-spaces-list-tab-page-container">
      <Tabs
        activeKey={activeTab}
        items={items}
        type="card"
        className="work-spaces-list-tab-container"
        onChange={changeTabHandler}
        destroyOnHidden
      />
    </div>
  );
};
export default WorkSpacesList;
