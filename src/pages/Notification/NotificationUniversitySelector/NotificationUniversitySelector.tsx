import { useState } from "react";

import { Tabs, TabsProps } from "antd";

import { ItemsProps } from "./@types/@notificationUniversitySelector";
import NotificationGroup from "./helper/components/NotificationGroup/NotificationGroup";
import NotificationSingle from "./helper/components/NotificationSingle/NotificationSingle";
import useTitle from "../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import { GROUP, SINGLE } from "../../../infrastructure/models/notification";
import "./_notificationUniversitySelector.scss";

const items: ({
  setIsTableShow,
  setActiveKey,
  isTableShow,
}: ItemsProps) => TabsProps["items"] = ({
  setIsTableShow,
  setActiveKey,
  isTableShow,
}) => {
  return [
    {
      key: SINGLE,
      label: <div className="tabs-label">تکی</div>,
      children: (
        <div className="table-container">
          <NotificationSingle setIsTableShow={setIsTableShow} isTableShow={isTableShow} />
        </div>
      ),
    },
    {
      key: GROUP,
      label: <div className="tabs-label">گروهی</div>,
      children: (
        <div className="table-container">
          <NotificationGroup
            setActiveKey={setActiveKey}
            setIsTableShow={setIsTableShow}
          />
        </div>
      ),
      disabled: true,
    },
  ];
};

const NotificationUniversitySelector = () => {
  const [activeKey, setActiveKey] = useState(SINGLE);
  const [isTableShow, setIsTableShow] = useState(false);
  useTitle({ text: "فیلتر اعلان" });
  return (
    <div className="notification-container">
      <Tabs
        items={items({ setIsTableShow, setActiveKey, isTableShow })}
        dir="rtl"
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        //   defaultActiveKey={SINGLE}
        //   destroyInactiveTabPane={true}
      />
    </div>
  );
};

export default NotificationUniversitySelector;
