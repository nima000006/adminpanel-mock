import { PiInfoThin } from "react-icons/pi";

import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { NEUTRAL_06 } from "@infra/VARS/globalColors/globalColors";

const data = [
  { label: "تحویل غذا", value: 85, color: "#36CFC9" },
  { label: "رزرو خوابگاه", value: 72, color: "#597EF7" },
  { label: "ثبت سفارش غذا", value: 65, color: "#73D13D" },
  { label: "پرداخت آنلاین", value: 78, color: "#73D13D" },
  { label: " ورود به سامانه", value: 58, color: "#73D13D" },
  { label: "سایر", value: 45 },
];
const TicketsByProblemChart = () => {
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);
  const colors = data.map((item) => item.color ?? NEUTRAL_06);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="direction-rtl border-neutral-4 flex flex-col rounded-lg border p-6!">
      <CustomDivider
        text="تیکت‌ها بر اساس موضوع مشکل"
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
      <Div className="flex min-h-0 flex-1">
        <CustomChart
          type="bar"
          data={{
            series: data.map((item) => ({
              label: item?.label,
              data: values,
              color: item.color ?? NEUTRAL_06,
            })),
            xAxis: [
              {
                data: labels,
                scaleType: "band",
                tickLabelStyle: {
                  display: "none",
                },
                tickSize: 0,
                reverse: true,
                colorMap: {
                  type: "ordinal",
                  values: labels,
                  colors: colors,
                },
              },
            ],
            yAxis: [
              {
                position: "right",
                tickLabelStyle: {
                  direction: "ltr",
                },
              },
            ],
          }}
          config={{
            height: 300,
            grid: { horizontal: true },
            tooltip: { trigger: "item" },
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
export default TicketsByProblemChart;
