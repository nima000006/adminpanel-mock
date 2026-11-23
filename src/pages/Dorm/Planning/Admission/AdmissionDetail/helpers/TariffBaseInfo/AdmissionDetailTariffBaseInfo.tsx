import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { AdmissionDetailTariffBaseInfoProps } from "./@types/@admissionDetailTariffBaseInfo";

const AdmissionDetailTariffBaseInfo = ({
  data,
  loading,
}: AdmissionDetailTariffBaseInfoProps) => {
  return (
    <Div loading={loading}>
      <CustomDivider text="اطلاعات اولیه" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          sm={24}
          label="عنوان"
          value={data?.data[0]?.title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="شناسه تعرفه"
          value={data?.data[0]?.id?.toString()}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="واحد دانشگاهی"
          value={data?.data[0]?.AssociationBranchid_title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="اقامتگاه"
          value={data?.data[0]?.AssociationDormitory_title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="واحد پول"
          value={data?.data[0]?.AssociationCurrencyId_title}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="مالیات"
          value={data?.data[0]?.tax?.toString()}
        />
        <SingleVerticalWithCol
          md={12}
          sm={24}
          label="عوارض"
          value={data?.data[0]?.toll?.toString()}
        />
        <SingleVerticalWithCol
          span={24}
          label="توضیحات"
          value={data?.data[0]?.description}
        />
      </Row>
    </Div>
  );
};

export default AdmissionDetailTariffBaseInfo;
