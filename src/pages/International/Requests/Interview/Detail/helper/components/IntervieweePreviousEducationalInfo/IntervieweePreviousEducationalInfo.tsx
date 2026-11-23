import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { GetInterviewDetailResponse } from "../../../@types/@interviewDetail";

const IntervieweePreviousEducationalInfo = ({
  info,
}: {
  info: GetInterviewDetailResponse | null;
}) => {
  return (
    <div>
      <CustomDivider text="اطلاعات تحصیلی پیشین مصاحبه شونده" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="مقطع تحصیلی"
          value={info?.preIntervieweeEducationalRecord?.degree}
        />
        <SingleVerticalWithCol
          label="رشته تحصیلی"
          value={info?.preIntervieweeEducationalRecord?.field}
        />
        <SingleVerticalWithCol
          label="کشور محل تحصیل"
          value={info?.preIntervieweeEducationalRecord?.countryReceivingDegree}
        />
        <SingleVerticalWithCol
          label="موسسه / دانشگاه صادر کننده"
          value={info?.preIntervieweeEducationalRecord?.lastInstitution}
        />
        <SingleVerticalWithCol
          label="معدل کل"
          value={info?.preIntervieweeEducationalRecord?.gpa?.toString()}
        />
        <SingleVerticalWithCol
          label="معدل کتبی دیپلم"
          value={
            info?.preIntervieweeEducationalRecord?.diplomaAverage?.toString()
              ? info?.preIntervieweeEducationalRecord?.diplomaAverage?.toString()
              : "-"
          }
        />
      </Row>
    </div>
  );
};
export default IntervieweePreviousEducationalInfo;
