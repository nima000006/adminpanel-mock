import { useEffect } from "react";

import { Tabs } from "antd";

import useQueryParams from "@infra/hooks/useQueryParams";
import AllFoodSchedulesTableAllTab from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/helper/components/AllFoodSchedulesTable/helper/components/AllFoodSchedulesTableAllTab/AllFoodSchedulesTableAllTab";
import AllFoodSchedulesTableInactiveTab from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/helper/components/AllFoodSchedulesTable/helper/components/AllFoodSchedulesTableInactiveTab/AllFoodSchedulesTableInactiveTab";
import AllFoodSchedulesTablePastTab from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/helper/components/AllFoodSchedulesTable/helper/components/AllFoodSchedulesTablePastTab/AllFoodSchedulesTablePastTab";
import AllFoodSchedulesTableTodayTab from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/helper/components/AllFoodSchedulesTable/helper/components/AllFoodSchedulesTableTodayTab/AllFoodSchedulesTableTodayTab";
import AllFoodSchedulesTableTomorrowTab from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/helper/components/AllFoodSchedulesTable/helper/components/AllFoodSchedulesTableTomorrowTab/AllFoodSchedulesTableTomorrowTab";

const AllFoodSchedulesTable = () => {
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
      children: <AllFoodSchedulesTableTodayTab />,
      key: "today",
    },
    {
      label: "پیش رو",
      children: <AllFoodSchedulesTableTomorrowTab />,
      key: "tomorrow",
    },
    {
      label: "گذشته",
      children: <AllFoodSchedulesTablePastTab />,
      key: "past",
    },
    {
      label: "غیرفعال شده",
      children: <AllFoodSchedulesTableInactiveTab />,
      key: "inactive",
    },
    {
      label: "همه",
      children: <AllFoodSchedulesTableAllTab />,
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

export default AllFoodSchedulesTable;
