import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { GetInterviewDetailResponse } from "../../../@types/@interviewDetail";

const IntervieweeIdentityInfo = ({
  info,
}: {
  info: GetInterviewDetailResponse | null;
}) => {
  return (
    <div>
      <CustomDivider text="اطلاعات هویتی مصاحبه شونده" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol label="نام" value={info?.intervieweeIdInfo?.firstName} />
        <SingleVerticalWithCol
          label="نام خانوادگی"
          value={info?.intervieweeIdInfo?.lastName}
        />
        <SingleVerticalWithCol
          label="جنسیت"
          value={info?.intervieweeIdInfo?.genderType}
        />
        <SingleVerticalWithCol label="لقب" value={info?.intervieweeIdInfo?.nickname} />
        <SingleVerticalWithCol
          label="تاریخ تولد"
          value={dataPlaceHolder({
            data: info?.intervieweeIdInfo?.birthDate,
            isDate: true,
          })}
        />
        <SingleVerticalWithCol
          label="ملیت"
          value={info?.intervieweeIdInfo?.nationality}
        />
        <SingleVerticalWithCol
          label="تابعیت"
          value={info?.intervieweeIdInfo?.citizenship}
        />
        <SingleVerticalWithCol label="اقامت" value={info?.intervieweeIdInfo?.residency} />
        <SingleVerticalWithCol
          label="شماره پاسپورت"
          value={info?.intervieweeIdInfo?.passportNumber}
        />
        <SingleVerticalWithCol
          label="شناسه هویتی"
          value={info?.intervieweeIdInfo?.identificationNumber}
        />
      </Row>
    </div>
  );
};
export default IntervieweeIdentityInfo;
