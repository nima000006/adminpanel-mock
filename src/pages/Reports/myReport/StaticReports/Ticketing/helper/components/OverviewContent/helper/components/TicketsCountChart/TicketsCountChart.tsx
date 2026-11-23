import { PiInfoThin } from "react-icons/pi";

import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_06 } from "@infra/VARS/globalColors/globalColors";

const chartData = {
  dataset: [
    { date: "فروردین", total: 120, internal: 80, users: 40 },
    { date: "اردیبهشت", total: 150, internal: 100, users: 50 },
    { date: "خرداد", total: 170, internal: 110, users: 60 },
    { date: "تیر", total: 140, internal: 90, users: 50 },
    { date: "مرداد", total: 200, internal: 130, users: 70 },
    { date: "شهریور", total: 180, internal: 120, users: 60 },
    { date: "مهر", total: 220, internal: 150, users: 70 },
  ],

  series: [
    {
      dataKey: "total",
      label: "کل تیکت‌ها",
    },
    {
      dataKey: "internal",
      label: "تیکت‌های داخلی",
    },
    {
      dataKey: "users",
      label: "تیکت‌های کاربران",
    },
  ],
};
const TicketsCountChart = () => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="direction-rtl border-neutral-4 flex h-full flex-col gap-8 rounded-lg border p-6!">
      <CustomDivider
        text="تعداد تیکت‌ها"
        extraContent={<PiInfoThin size={16} color={NEUTRAL_06} />}
      />
      {/* Todo[shirin]: uncomment when api got ready */}
      {/* <Row>
            <Col span={24}>
              <CustomSelect
                label=""
                name="select"
                options={[{ id: "1", title: "همه" }]}
                form={form}
                //   onChange={}
                //   isLoading={}
                mode="multiple"
              />
            </Col>
          </Row> */}
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
            },
            loading: false,
          }}
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
export default TicketsCountChart;
