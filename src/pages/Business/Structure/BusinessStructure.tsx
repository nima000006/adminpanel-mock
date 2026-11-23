import { Tabs, TabsProps } from "antd";

import BusinessPositionTable from "./helper/components/BusinessPosition/BusinessPosition";
import BusinessRoleTable from "./helper/components/BusinessRole/BusinessRoleTable";
import BusinessStaffTable from "./helper/components/BusinessStaff/BusinessStaff";
import BusinessStructureTable from "./helper/components/BusinessStructure/BusinessStructure";
import BusinessStructureGraph from "./helper/components/BusinessStructureGraph/BusinessStructureGraph";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  BUSINESS_GRAPH,
  BUSINESS_POSITION,
  BUSINESS_ROLE,
  BUSINESS_STAFF,
  BUSINESS_STRUCTURE,
} from "../../../infrastructure/models/businessStructure";
import "./_businessStructure.scss";

const items: TabsProps["items"] = [
  {
    key: BUSINESS_GRAPH,
    label: <div className="tabs-label">نمودار سازمانی</div>,
    children: (
      <div className="table-container">
        <BusinessStructureGraph />
      </div>
    ),
  },
  {
    key: BUSINESS_STRUCTURE,
    label: <div className="tabs-label">ساختار</div>,
    children: (
      <div className="table-container">
        <BusinessStructureTable />
      </div>
    ),
  },
  {
    key: BUSINESS_POSITION,
    label: <div className="tabs-label">پوزیشن</div>,
    children: (
      <div className="table-container">
        <BusinessPositionTable />
      </div>
    ),
  },
  {
    key: BUSINESS_ROLE,
    label: <div className="tabs-label">نقش</div>,
    children: (
      <div className="table-container">
        <BusinessRoleTable />
      </div>
    ),
  },
  {
    key: BUSINESS_STAFF,
    label: <div className="tabs-label">کارکنان</div>,
    children: (
      <div className="table-container">
        <BusinessStaffTable />
      </div>
    ),
  },
];

const BusinessStructure = () => {
  useTitle({ text: "تعریف ساختار سازمانی" });
  return (
    <div className="business-base-container">
      <div className="business-base-top-bar-container">
        <div className="tabs-container">
          <Tabs
            defaultActiveKey={BUSINESS_GRAPH}
            items={items}
            // Todo[atefeh]:edit after the design completed
            // onChange={(e) => onTabsChange(e as BusinessBaseTableTypes)}
            dir="rtl"
            destroyInactiveTabPane={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessStructure;
