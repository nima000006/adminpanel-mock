import { useState } from "react";

import { Grid } from "antd";
import { PiCalendar, PiTable } from "react-icons/pi";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import AllFoodSchedulesCalendar from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/helper/components/AllFoodSchedulesCalendar/AllFoodSchedulesCalendar";
import AllFoodSchedulesTable from "@pages/Catering/FoodSchedules/AllFoodSchedules/AllFoodSchedulesList/helper/components/AllFoodSchedulesTable/AllFoodSchedulesTable";

const AllFoodSchedulesList = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: "تغذیه",
      },
      {
        title: "برنامه غذایی",
      },
    ],
  });

  const [view, setView] = useState<0 | 1>(0);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  //* ================================ Util Functions ================================
  const segmentItems = [
    {
      id: "0",
      children: <AllFoodSchedulesCalendar />,
    },
    {
      id: "1",
      children: <AllFoodSchedulesTable />,
    },
  ];
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <div className="flex justify-center">
        <CustomSegmented
          size="large"
          options={[
            { value: 0, label: "نمایش تقویمی", icon: <PiCalendar /> },
            { value: 1, label: "نمایش جدولی", icon: <PiTable /> },
          ]}
          onChange={(value) => setView(value as 0 | 1)}
          value={view}
          vertical={screens.xs}
        />
      </div>
      <div>{segmentItems[+view]?.children}</div>
    </div>
  );
};

export default AllFoodSchedulesList;
