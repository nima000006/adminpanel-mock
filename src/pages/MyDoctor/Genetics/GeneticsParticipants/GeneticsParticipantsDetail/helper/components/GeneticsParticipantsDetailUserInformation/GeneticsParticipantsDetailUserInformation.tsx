import { Row } from "antd";

import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { GeneticsParticipantsDetailUserInformationProps } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailUserInformation/@types/@geneticsParticipantsDetailUserInformation";
import { getGenderLabel } from "@pages/MyDoctor/Genetics/GeneticsParticipants/GeneticsParticipantsDetail/helper/components/GeneticsParticipantsDetailUserInformation/helper/utils";

const GeneticsParticipantsDetailUserInformation = ({
  data,
  loading,
}: GeneticsParticipantsDetailUserInformationProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={loading}>
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol xs={12} value={data?.firstName} label="نام" />
        <SingleVerticalWithCol xs={12} value={data?.lastName} label="نام خانوادگی" />
        <SingleVerticalWithCol xs={12} value={data?.username} label="کد ملی / فراگیر" />
        <SingleVerticalWithCol
          xs={12}
          value={getGenderLabel(data?.gender)}
          label="جنسیت"
        />
        <SingleVerticalWithCol xs={12} value={data?.mobileNumber} label="شماره همراه" />
        <SingleVerticalWithCol xs={12} value={data?.branchName} label="شعبه / واحد" />
        <SingleVerticalWithCol xs={12} value={data?.levelName} label="مقطع تحصیلی" />
        <SingleVerticalWithCol xs={12} value={data?.fieldName} label="رشته تحصیلی" />
      </Row>
    </Div>
  );
};

export default GeneticsParticipantsDetailUserInformation;
