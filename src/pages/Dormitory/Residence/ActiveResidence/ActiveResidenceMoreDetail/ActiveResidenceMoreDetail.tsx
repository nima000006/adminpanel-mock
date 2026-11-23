import { useState } from "react";

import { PiPencilLine } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useQueryParams from "@infra/hooks/useQueryParams";
import { SegmentViewMode } from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";
import AdmissionSegmentContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceMoreDetail/helper/components/AdmissionSegmentContent/AdmissionSegmentContent";
import ResidenceInfoSegmentContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceMoreDetail/helper/components/ResidenceInfoSegmentContent/ResidenceInfoSegmentContent";

const ActiveResidenceMoreDetail = () => {
  const [view, setView] = useState("0");
  const { params: url } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="flex flex-col">
      <ToolBox
        rightSide={
          <div className="flex flex-wrap gap-2">
            <span className="text-neutral-13 font-bold!">{url?.residenceTitle} </span>
            <CustomTag
              className="w-fit"
              color={url?.viewStatus === "true" ? "green" : "orange"}
            >
              {url?.viewStatus === "true" ? "قابل نمایش" : "غیر قابل نمایش"}
            </CustomTag>
          </div>
        }
        leftSide={
          <div className="flex gap-4">
            <CustomButton disabled type="dashed" icon={<PiPencilLine />}>
              ویرایش
            </CustomButton>
          </div>
        }
        className="mb-10"
      />

      <CustomSegmented
        options={[
          { value: "0", label: "اطلاعات اقامتگاه" },
          { value: "1", label: "برنامه‌های پذیرش", disabled: false },
        ]}
        block
        onChange={(value) => setView(value as "0" | "1")}
        value={view}
      />

      {view === SegmentViewMode.residenceInfo ? (
        <ResidenceInfoSegmentContent />
      ) : view === SegmentViewMode.admission ? (
        <AdmissionSegmentContent />
      ) : null}
    </div>
  );
};
export default ActiveResidenceMoreDetail;
