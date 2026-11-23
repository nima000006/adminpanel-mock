import { PiInfoThin } from "react-icons/pi";

import CustomChart from "@components/Renderers/CustomChart/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_06 } from "@infra/VARS/globalColors/globalColors";

const chartData = {
  dataset: [
    { date: "فروردین", tickets: 2.7 },
    { date: "اردیبهشت", tickets: 2.5 },
    { date: "خرداد", tickets: 2.4 },
    { date: "تیر", tickets: 2.3 },
    { date: "مرداد", tickets: 2.1 },
    { date: "شهریور", tickets: 2.2 },
    { date: "مهر", tickets: 3.8 }, // spike
    { date: "آبان", tickets: 2.0 },
    { date: "آذر", tickets: 2.1 },
    { date: "دی", tickets: 2.3 },
    { date: "بهمن", tickets: 2.4 },
    { date: "اسفند", tickets: 2.2 },
  ],

  series: [
    {
      dataKey: "tickets",
      label: "",
    },
  ],
};
const AverageWaitingResponseChart = () => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="direction-rtl border-neutral-4 flex flex-col gap-8 rounded-lg border p-6!">
      <CustomDivider
        text="میانگین مدت انتظار پاسخ"
        extraContent={<PiInfoThin size={16} color={NEUTRAL_06} />}
      />

      <Div className="min-h-0 flex-1">
        <CustomChart
          type="line"
          data={{
            dataset: chartData.dataset,
            series: chartData.series.map((item) => ({
              dataKey: item.dataKey,
              label: item.label,
              showMark: false,
            })),
            xAxis: [
              {
                scaleType: "point",
                dataKey: "date",
                reverse: true,
              },
            ],
            yAxis: [
              {
                position: "right",
                tickLabelStyle: {
                  textAnchor: "start",
                  direction: "ltr",
                },
              },
            ],
          }}
          config={{
            height: 300,
            grid: { horizontal: true },
            tooltip: { trigger: "axis" },
            legend: {
              direction: "row",
              position: { vertical: "top", horizontal: "right" },
            },
            loading: false,
          }}
        />
      </Div>

      <div className="body-regular border-t-neutral-5 my-6! mt-auto flex flex-col items-center gap-1 border-t p-2!">
        <span className="text-neutral-8">میانگین کل</span>
        <span className="h4-medium">
          {dataPlaceHolder({ data: "100000", isPrice: true })}
        </span>
      </div>
    </div>
  );
};
export default AverageWaitingResponseChart;
