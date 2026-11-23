import { Row } from "antd";

import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import "./_managementAllDetailsEducationInfoModalContent.scss";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { ManagementAllEstemAmoozeshyarResponse } from "../../@types/@managementAllEstemAmoozeshyar";

const ManagementAllDetailsEducationInfoModalContent = ({
  dataEstemAmoozeshyar,
  isGetUsersEstemAmoozeshyarInfoLoading,
}: {
  isGetUsersEstemAmoozeshyarInfoLoading: boolean;
  dataEstemAmoozeshyar: ManagementAllEstemAmoozeshyarResponse | undefined;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isGetUsersEstemAmoozeshyarInfoLoading}>
      <CustomAlert
        className="custom-alert"
        message="نتیجه استعلام آموزشیار به شرح زیر می‌باشد."
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
          value={
            dataEstemAmoozeshyar?.termName
            // Todo[Atefeh]:remove if not needed in the feature
            //   (() => {
            //   const code = dataEstemAmoozeshyar?.eduStartCode?.toString();
            //   if (!code) return "-";
            //   // Example: 9901 → "99" year, "1" semester
            //   const year = code.slice(0, -1); // "990"
            //   const semesterDigit = code.slice(-1); // "1"
            //   let semesterLabel = "";
            //   if (semesterDigit === "1") semesterLabel = "نیمسال اول";
            //   else if (semesterDigit === "2") semesterLabel = "نیمسال دوم";

            //   return `${semesterLabel} ${year}`;
            // })()
          }
          label="نیمسال ورود"
        />

        {/* need this field from backend */}
        {/* <SingleVerticalWithCol lg={12} md={12} value="" label="نام دانشکده" /> */}
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          value={
            dataEstemAmoozeshyar?.lastStateName
            // dataEstemAmoozeshyar?.isActive
            //   ? "در حال تحصیل"
            //   : dataEstemAmoozeshyar?.isActive === false
            //     ? "غیر فعال"
            //     : ""
          }
          label="وضعیت تحصیلی"
        />
      </Row>
    </Div>
  );
};
export default ManagementAllDetailsEducationInfoModalContent;
