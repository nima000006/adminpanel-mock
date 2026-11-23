import { useEffect } from "react";

import { Tabs } from "antd";

import useQueryParams from "@infra/hooks/useQueryParams";
import MyFoodSchedulesTableAllTab from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTableAllTab/MyFoodSchedulesTableAllTab";
import MyFoodSchedulesTableInactiveTab from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTableInactiveTab/MyFoodSchedulesTableInactiveTab";
import MyFoodSchedulesTablePastTab from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTablePastTab/MyFoodSchedulesTablePastTab";
import MyFoodSchedulesTableTodayTab from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTableTodayTab/MyFoodSchedulesTableTodayTab";
import MyFoodSchedulesTableTomorrowTab from "@pages/Catering/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/helper/components/MyFoodSchedulesTable/helper/components/MyFoodSchedulesTableTomorrowTab/MyFoodSchedulesTableTomorrowTab";

const MyFoodSchedulesTable = () => {
  const { params, setSearchParams } = useQueryParams();
  const activeKey = params?.tab || "today";
  //? ================================ Effects ================================
  useEffect(() => {
    if (!params?.tab) {
      setSearchParams({ tab: "today" });
    }
  }, [params?.tab]);

  //* ================================ Util Functions ================================
  const onTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const tabsItems = [
    {
      label: "امروز",
      children: <MyFoodSchedulesTableTodayTab />,
      key: "today",
    },
    {
      label: "پیش رو",
      children: <MyFoodSchedulesTableTomorrowTab />,
      key: "tomorrow",
    },
    {
      label: "گذشته",
      children: <MyFoodSchedulesTablePastTab />,
      key: "past",
    },
    {
      label: "غیرفعال شده",
      children: <MyFoodSchedulesTableInactiveTab />,
      key: "inactive",
    },
    {
      label: "همه",
      children: <MyFoodSchedulesTableAllTab />,
      key: "all",
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="mt-5">
      <Tabs
        items={tabsItems}
        type="line"
        className="body-regular"
        activeKey={activeKey}
        destroyOnHidden
        onChange={onTabChange}
      />
    </div>
  );
};

export default MyFoodSchedulesTable;
