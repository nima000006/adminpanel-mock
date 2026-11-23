import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { AdmissionDetailMockData } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

const AllAdmissionDetailApplicantInfo = ({ data }: { data: AdmissionDetailMockData }) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <CustomDivider text="اطلاعات درخواست دهنده" />

      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          label="نام"
          value={data.applicantFirstName}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label="نام خانوادگی"
          value={data.applicantLastName}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label="کد ملی / فراگیر"
          value={data.applicantNationalCode}
          lg={6}
          md={12}
        />
        <SingleVerticalWithCol
          label="شماره همراه"
          value={data.applicantMobile}
          lg={6}
          md={12}
        />
      </Row>
    </div>
  );
};

export default AllAdmissionDetailApplicantInfo;
