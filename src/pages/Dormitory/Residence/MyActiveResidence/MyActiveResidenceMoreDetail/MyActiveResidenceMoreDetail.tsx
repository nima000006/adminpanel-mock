import { useState } from "react";

import { PiPencilLine } from "react-icons/pi";

import { CustomButton } from "@components/CustomInputs";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useQueryParams from "@infra/hooks/useQueryParams";
import { SegmentViewMode } from "@pages/Dormitory/Residence/MyActiveResidence/My_shared/MyUtil";
import MyAdmissionSegmentContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceMoreDetail/helper/components/MyAdmissionSegmentContent/MyAdmissionSegmentContent";
import MyResidenceInfoSegmentContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceMoreDetail/helper/components/MyResidenceInfoSegmentContent/MyResidenceInfoSegmentContent";

const MyActiveResidenceMoreDetail = () => {
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
        <MyResidenceInfoSegmentContent />
      ) : view === SegmentViewMode.admission ? (
        <MyAdmissionSegmentContent />
      ) : null}
    </div>
  );
};
export default MyActiveResidenceMoreDetail;
