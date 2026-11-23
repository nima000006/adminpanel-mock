import { Tabs, TabsProps } from "antd";

import BusinessBaseTable from "./helper/components/BusinessBaseTable/BusinessBaseTable";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import {
  DENOMINATION,
  COLLEGE,
  TRAINING_COURSE,
  FIELD,
  ETHNICITY,
  RELIGION,
  DEGREE,
  NATIONALITY,
  SEMESTER,
  EDUCATIONAL_GROUP,
} from "../../../infrastructure/models/businessBase";
import "./_businessBase.scss";

const items: TabsProps["items"] = [
  {
    key: DENOMINATION,
    label: <div className="tabs-label">ادیان</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={DENOMINATION} />
      </div>
    ),
  },
  {
    key: COLLEGE,
    label: <div className="tabs-label">دانشکده</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={COLLEGE} />
      </div>
    ),
  },
  {
    key: TRAINING_COURSE,
    label: <div className="tabs-label">دوره آموزشی</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={TRAINING_COURSE} />
      </div>
    ),
  },
  {
    key: FIELD,
    label: <div className="tabs-label">رشته</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={FIELD} />
      </div>
    ),
  },
  {
    key: ETHNICITY,
    label: <div className="tabs-label">قومیت</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={ETHNICITY} />
      </div>
    ),
  },
  {
    key: RELIGION,
    label: <div className="tabs-label">مذاهب</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={RELIGION} />
      </div>
    ),
  },
  {
    key: DEGREE,
    label: <div className="tabs-label">مقاطع</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={DEGREE} />
      </div>
    ),
  },
  {
    key: NATIONALITY,
    label: <div className="tabs-label">ملیت</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={NATIONALITY} />
      </div>
    ),
  },
  {
    key: SEMESTER,
    label: <div className="tabs-label">نیمسال</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={SEMESTER} />
      </div>
    ),
  },
  {
    key: EDUCATIONAL_GROUP,
    label: <div className="tabs-label">گروه آموزشی</div>,
    children: (
      <div className="table-container">
        <BusinessBaseTable tableType={EDUCATIONAL_GROUP} />
      </div>
    ),
  },
];

const BusinessBase = () => {
  useTitle({ text: "پارامتر پایه کسب و کار" });
  return (
    <div className="business-base-container">
      <div className="business-base-top-bar-container">
        <div className="tabs-container">
          <Tabs
            defaultActiveKey={DENOMINATION}
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

export default BusinessBase;
