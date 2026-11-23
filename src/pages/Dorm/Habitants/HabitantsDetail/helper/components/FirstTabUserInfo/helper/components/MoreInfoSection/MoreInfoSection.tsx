import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { AssociationInfoForEssentialConditionType } from "../../../@types/@firstTabUserInfo";

const MoreInfoSection = ({
  data,
}: {
  data: AssociationInfoForEssentialConditionType | undefined;
}) => {
  return (
    <div>
      <CustomDivider text="اطلاعات بیشتر" />
      <div>
        <CustomDivider text="اطلاعات پدر" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol md={12} sm={24} label="نام" value={data?.fatherName} />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام خانوادگی"
            value={data?.fatherFamily}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تماس"
            value={data?.fatherPhone}
          />
        </Row>
      </div>
      <div>
        <CustomDivider text="اطلاعات مادر" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol md={12} sm={24} label="نام" value={data?.motherName} />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام خانوادگی"
            value={data?.motherFamily}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تماس"
            value={data?.motherPhone}
          />
        </Row>
      </div>
      <div>
        <CustomDivider text="اطلاعات همسر" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol md={12} sm={24} label="نام" value={data?.wifeName} />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام خانوادگی"
            value={data?.wifeFamily}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تماس"
            value={data?.wifePhone}
          />
        </Row>
      </div>
      <div>
        <CustomDivider text="اطلاعات یکی از بستگان نزدیک" />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام"
            value={data?.relativesName}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="نام خانوادگی"
            value={data?.relativesFamily}
          />
          <SingleVerticalWithCol
            md={12}
            sm={24}
            label="شماره تماس"
            value={data?.relativesPhone}
          />
        </Row>
      </div>
    </div>
  );
};

export default MoreInfoSection;
