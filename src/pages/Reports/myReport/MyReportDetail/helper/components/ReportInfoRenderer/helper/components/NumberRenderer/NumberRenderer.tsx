import { useMemo } from "react";

import CustomCard from "@components/CustomCard/CustomCard";

import { NumberRendererProps } from "./@types/@NumberRendererProps";

const NumberRenderer = ({ data, title, reportTitle }: NumberRendererProps) => {
  return useMemo(() => {
    if (!Array.isArray(data) || !data.length) return null;
    return (
      <CustomCard className="report-card">
        <p className="report-label">{reportTitle || "بدون عنوان"}</p>
        <div className="report-value">
          {Object.entries(data[0]).map(([key, value]) => (
            <div key={key}>{String(value)}</div>
          ))}
        </div>
      </CustomCard>
    );
  }, [data, title]);
};

export default NumberRenderer;
