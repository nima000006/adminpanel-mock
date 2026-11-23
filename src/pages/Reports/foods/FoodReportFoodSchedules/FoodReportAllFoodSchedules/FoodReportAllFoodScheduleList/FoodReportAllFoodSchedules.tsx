import { lazy, useState } from "react";

import { AiOutlineCalendar, AiOutlineTable } from "react-icons/ai";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { useResponsive } from "@infra/hooks/useResponsive";

import AllFoodScheduleTableView from "./helper/components/TableView/AllFoodScheduleTableView";
import "./_FoodReportAllFoodSchedules.scss";

const LazyCalendar = lazy(
  () => import("./helper/components/CalendarView/AllFoodScheduleCalendar")
);

const AllFoodScheduleList = () => {
  const [view, setView] = useState<"table" | "calendar">("table");
  const { isMobile } = useResponsive();

  useTitle({ text: "برنامه غذایی‌" });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="all-food-schedules-container">
      <div className="segment-container">
        <CustomSegmented
          size="large"
          vertical={isMobile}
          options={[
            { value: "table", label: "نمایش جدولی", icon: <AiOutlineTable /> },
            { value: "calendar", label: "نمایش تقویمی", icon: <AiOutlineCalendar /> },
          ]}
          onChange={(value) => setView(value as "table" | "calendar")}
        />
      </div>

      {view === "table" ? <AllFoodScheduleTableView /> : <LazyCalendar />}
    </div>
  );
};

export default AllFoodScheduleList;
