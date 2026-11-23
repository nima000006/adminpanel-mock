import { Row } from "antd";
import { PiLink } from "react-icons/pi";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { multiSelectGenerator } from "@pages/_shared/utils";

import { GetInterviewDetailResponse } from "../../../@types/@interviewDetail";

const InterviewInfo = ({ info }: { info: GetInterviewDetailResponse | null }) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDivider text="اطلاعات مصاحبه" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="تاریخ مصاحبه"
          value={dataPlaceHolder({
            data: info?.interview?.interviewDate,
            isDate: true,
          })}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="زمان مصاحبه"
          value={info?.interview?.interviewTime}
          isTime
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="مدت مصاحبه"
          value={info?.interview?.interviewDurationTime?.toString()}
        />
        <SingleVerticalWithCol
          span={24}
          label="لینک مصاحبه"
          value={dataPlaceHolder({ data: info?.interview?.link })}
          extraContent={<PiLink size={18} className="text-neutral-10" />}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="مسئولین مصاحبه"
          value={dataPlaceHolder({
            data: info?.interviewAdmins,
            callBack: multiSelectGenerator,
          })}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="مصاحبه کنندگان"
          value={dataPlaceHolder({
            data: info?.interviewMembers,
            callBack: multiSelectGenerator,
          })}
        />
      </Row>
    </div>
  );
};
export default InterviewInfo;
