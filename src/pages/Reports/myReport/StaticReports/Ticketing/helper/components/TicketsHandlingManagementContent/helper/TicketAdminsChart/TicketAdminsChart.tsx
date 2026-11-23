import { useMemo } from "react";

import { PiInfoThin } from "react-icons/pi";

import CustomChart from "@components/Renderers/CustomChart/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_06 } from "@infra/VARS/globalColors/globalColors";
import { ChartDataItem } from "@pages/Reports/myReport/StaticReports/Dorm/helper/components/DormitoryManagementContent/helper/components/ManagementType/@types/@dormitoryManagementType";

const data = [
  {
    id: 1,
    amount: 1,
    title: "کارشناسان",
  },
  {
    id: 2,
    amount: 1,
    title: "کارشناسان ارشد",
  },
];
const TicketAdminsChart = () => {
  //? ================================  Transform Data for Chart ================================
  const chartData = useMemo<ChartDataItem[]>(() => {
    return data
      .filter((item) => item && item.amount != null)
      .map((item) => ({
        id: item.id,
        value: item.amount ?? 0,
        label: item.title,
      }));
  }, [data]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border p-6!">
      <CustomDivider
        text="ادمین‌های تیکت"
        extraContent={<PiInfoThin size={16} color={NEUTRAL_06} />}
      />
      <Div className="min-h-0 flex-1">
        <CustomChart
          type="pie"
          data={{
            series: [
              {
                data: chartData,
                innerRadius: 80,
              },
            ],
          }}
          config={{ height: 200, loading: false }}
          className="mx-auto! mb-10! w-50"
        />
      </Div>

      <div className="body-regular border-t-neutral-5 my-6! mt-auto flex flex-col items-center gap-1 border-t p-2!">
        <span className="text-neutral-8">تعداد کل</span>
        <span className="h4-medium">
          {dataPlaceHolder({ data: "100000", isPrice: true })}
        </span>
      </div>
    </div>
  );
};
export default TicketAdminsChart;
