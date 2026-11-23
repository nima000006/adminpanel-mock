import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { FloorDetailFloorInfoProps } from "./@types/@floorDetailFloorInfo";

const FloorDetailFloorInfo = ({ data, loading }: FloorDetailFloorInfoProps) => {
  return (
    <Div loading={loading}>
      <CustomDivider text="اطلاعات طبقه" />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="اقامتگاه"
          value={data?.AssociationBuilding?.AssociationCategoryDormitory?.title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="ساختمان"
          value={data?.AssociationBuilding?.title}
        />
        <SingleVerticalWithCol xl={8} lg={8} label="نام طبقه" value={data?.title} />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="جنسیت"
          value={data?.AssociationBuilding?.AssociationGender?.title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="درجه کیفی"
          value={data?.AssociationQuality?.title}
        />
        <SingleVerticalWithCol
          xl={8}
          lg={8}
          label="شناسه طبقه"
          value={data?.id?.toString()}
        />
        <SingleVerticalWithCol span={24} label="توضیحات طبقه" value={data?.description} />
      </Row>
    </Div>
  );
};

export default FloorDetailFloorInfo;
