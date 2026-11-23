import { lazy, useState } from "react";

import { AiOutlineCalendar, AiOutlineTable } from "react-icons/ai";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { useResponsive } from "@infra/hooks/useResponsive";

import MyFoodScheduleTable from "./helper/components/TableView/MyFoodScheduleTable";
import "./_myFoodSchedules.scss";

const LazyCalendar = lazy(
  () => import("./helper/components/CalendarView/MyFoodScheduleCalendar")
);

const MyFoodSchedulesList = () => {
  const [view, setView] = useState<"table" | "calendar">("table");
  useTitle({ text: "برنامه غذایی من" });
  const { isMobile } = useResponsive();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="my-food-schedules-container">
      <div className="segment-container">
        <CustomSegmented
          vertical={isMobile}
          size="large"
          options={[
            { value: "table", label: "نمایش جدولی", icon: <AiOutlineTable /> },
            { value: "calendar", label: "نمایش تقویمی", icon: <AiOutlineCalendar /> },
          ]}
          onChange={(value) => setView(value as "table" | "calendar")}
        />
      </div>

      {view === "table" ? <MyFoodScheduleTable /> : <LazyCalendar />}
    </div>
  );
};

export default MyFoodSchedulesList;
