import { Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { ManagementMyEstemAmoozeshyarResponse } from "../../@types/@managementMyEstemAmoozeshyar";
import "./_managementMyDetailsEducationInfoModalContent.scss";
const ManagementMyDetailsEducationInfoModalContent = ({
  dataEstemAmoozeshyar,
  isGetUsersEstemAmoozeshyarInfoLoading,
}: {
  isGetUsersEstemAmoozeshyarInfoLoading: boolean;
  dataEstemAmoozeshyar: ManagementMyEstemAmoozeshyarResponse | undefined;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Div loading={isGetUsersEstemAmoozeshyarInfoLoading}>
      <CustomAlert
        className="custom-alert"
        title="نتیجه استعلام آموزشیار به شرح زیر می‌باشد."
        showIcon
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={dataEstemAmoozeshyar?.studentNumber}
          label="شماره دانشجویی"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={dataEstemAmoozeshyar?.branchName}
          label="واحد دانشگاهی"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={dataEstemAmoozeshyar?.levelName}
          label="مقطع تحصیلی"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={dataEstemAmoozeshyar?.fieldName}
          label="رشته تحصیلی"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={
            dataEstemAmoozeshyar?.eduStartDate ? dataEstemAmoozeshyar?.eduStartDate : "-"
          }
          label="سال ورود"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={dataEstemAmoozeshyar?.termName}
          label="نیمسال ورود"
        />

        {/* need this field from backend */}
        {/* <SingleVerticalWithCol lg={12} md={12} value="" label="نام دانشکده" /> */}
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={dataEstemAmoozeshyar?.lastStateName}
          label="وضعیت تحصیلی"
        />
      </Row>
    </Div>
  );
};
export default ManagementMyDetailsEducationInfoModalContent;
