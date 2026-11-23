import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { GetInterviewDetailResponse } from "../../../@types/@interviewDetail";

const IntervieweeRequest = ({ info }: { info: GetInterviewDetailResponse | null }) => {
  return (
    <div>
      <CustomDivider text="درخواست مصاحبه شونده" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="مقطع درخواستی"
          value={info?.requestOfInterviewee?.degree}
        />
        <SingleVerticalWithCol
          label="رشته درخواستی"
          value={info?.requestOfInterviewee?.field}
        />
        <SingleVerticalWithCol
          label="واحد درخواستی"
          value={info?.requestOfInterviewee?.requestUniversity}
        />
        <SingleVerticalWithCol
          label="ترم تحصیلی درخواستی"
          value={dataPlaceHolder({
            data: info?.requestOfInterviewee?.semesterTitle,
          })}
        />
      </Row>
    </div>
  );
};
export default IntervieweeRequest;
