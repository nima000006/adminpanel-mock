import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import BranchCallInfoReadOnly from "../../../../../components/BranchCallInfoReadOnly/BranchCallInfoReadOnly";
import BranchInfoReadOnly from "../../../../../components/BranchInfoReadOnly/BranchInfoReadOnly";
import BranchLocationInfoReadOnly from "../../../../../components/BranchLocationInfoReadOnly/BranchLocationInfoReadOnly";
import BranchOtherDescReadOnly from "../../../../../components/BranchOtherDescReadOnly/BranchOtherDescReadOnly";
import "./_branchInfoSegmentedContent.scss";

const BranchInfoSegmentedContent = () => {
  return (
    <div className="branch-info-segmented-content-container">
      {/* BRANCH INFO */}
      <BranchInfoReadOnly />

      {/* CALL INFO */}
      <BranchCallInfoReadOnly />

      {/* LOCATIONiNFO */}
      <BranchLocationInfoReadOnly />

      {/* OTHER DESC */}
      <BranchOtherDescReadOnly />
      <div className="creator-wrapper">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol xl={8} lg={8} label="ایجاد شده توسط" value={"مجید"} />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="تاریخ ایجاد"
            value={dateTimeCombiner("1403-02-02 , 12:22")}
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="تاریخ آخرین ویرایش"
            value={dateTimeCombiner("1403-02-02 , 12:22")}
          />
        </Row>
      </div>
    </div>
  );
};
export default BranchInfoSegmentedContent;
