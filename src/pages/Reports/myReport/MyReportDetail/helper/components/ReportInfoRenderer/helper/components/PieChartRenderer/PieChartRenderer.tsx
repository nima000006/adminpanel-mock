import { useMemo } from "react";

import CustomChart from "@components/Renderers/CustomChart/CustomChart";

import { PieChartRendererProps } from "./@types/@PieChartRendererProps";

const PieChartRenderer = ({ data, title: _title }: PieChartRendererProps) => {
  return useMemo(() => {
    if (!Array.isArray(data) || !data.length) return null;
    // Handle both data structures
    const transformedData = data
      .map((item) => {
        // New structure: { id, title, amount }
        if (item.amount !== undefined) {
          return {
            id: item.id,
            value: item.amount,
            label: item.title,
          };
        }
        // Old structure: { survey_status_type, status_text, total }
        // return {
        //   id: item.survey_status_type,
        //   value: item.total,
        //   label: item.status_text,
        // };
      })
      .filter((item) => item !== undefined);

    const total = transformedData.reduce((sum, item) => sum + item.value, 0);

    //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

    return (
      <>
        <CustomChart
          type="pie"
          data={{
            series: [
              {
                data: transformedData,
              },
            ],
          }}
          config={{
            height: 400,
            tooltip: { trigger: "item" },
            legend: {
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
            },
          }}
        />
        <div className="body-regular border-t-neutral-5 mt-16! flex flex-col items-center gap-1 border-t p-2!">
          <span className="text-neutral-8">تعداد کل</span>
          <span className="h4-medium">{total}</span>
        </div>
      </>
    );
  }, [data]);
};

export default PieChartRenderer;
