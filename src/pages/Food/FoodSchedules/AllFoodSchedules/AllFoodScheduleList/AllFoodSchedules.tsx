import { lazy, useState } from "react";

import { AiOutlineCalendar, AiOutlineTable } from "react-icons/ai";

import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import { useResponsive } from "@infra/hooks/useResponsive";

import AllFoodScheduleTableView from "./helper/components/TableView/AllFoodScheduleTableView";
import useTitle from "../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import "./_allFoodSchedules.scss";

const LazyCalendar = lazy(
  () => import("./helper/components/CalendarView/AllFoodScheduleCalendar")
);

const AllFoodScheduleList = () => {
  const [view, setView] = useState<"table" | "calendar">("table");
  useTitle({ text: "برنامه غذایی‌" });
  const { isMobile } = useResponsive();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="all-food-schedules-container">
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

      {view === "table" ? <AllFoodScheduleTableView /> : <LazyCalendar />}
    </div>
  );
};

export default AllFoodScheduleList;
