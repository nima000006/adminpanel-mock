import { useMemo } from "react";

import CustomChart from "@components/Renderers/CustomChart/CustomChart";
import { PRIMARY_4 } from "@infra/VARS/globalColors/globalColors";

import { BarChartRendererProps } from "./@types/@BarChartRendererProps";

const BarChartRenderer = ({ data, title: _title }: BarChartRendererProps) => {
  return useMemo(() => {
    if (!Array.isArray(data) || !data.length) return null;

    // Filter out null/undefined values and ensure p1_amount is a valid number
    const sanitizedData = data
      .filter((item) => item && item.p1_title && item.p1_amount != null)
      .map((item) => ({
        ...item,
        p1_amount: item.p1_amount ?? 0,
      }));

    if (!sanitizedData.length) return null;

    return (
      <CustomChart
        type="bar"
        data={{
          dataset: sanitizedData,
          yAxis: [
            {
              width: 100,
              scaleType: "band",
              dataKey: "p1_title",
              position: "right",
              tickLabelStyle: {
                textAnchor: "end",
                direction: "rtl",
              },
            },
          ],
          xAxis: [
            {
              scaleType: "linear",
              dataKey: "p1_amount",
              reverse: true,
              tickLabelStyle: { direction: "ltr" },
            },
          ],
          series: [
            {
              dataKey: "p1_amount",
              color: PRIMARY_4,
              layout: "horizontal",
            },
          ],
        }}
        config={{
          height: 700,
          grid: { vertical: true, horizontal: true },
        }}
      />
    );
  }, [data]);
};

export default BarChartRenderer;
