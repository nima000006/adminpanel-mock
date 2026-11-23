import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { HabitantEvacuationDrawerSectionProps } from "../../../@types/@evacuationType";

const HabitantEvacuationDrawerResidenceInfo = ({
  data,
}: HabitantEvacuationDrawerSectionProps) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="اقامتگاه"
        value={data?.AssociationBed_AssociationCategoryDormitory_title}
      />
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="ساختمان"
        value={data?.AssociationBed_AssociationCategoryBuliding_title}
      />
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="طبقه"
        value={data?.AssociationBed_AssociationCategoryFloor_title}
      />
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="اتاق"
        value={data?.AssociationBed_AssociationCategorRoom_title}
      />
      <SingleVerticalWithCol
        xl={12}
        lg={12}
        md={12}
        label="تخت"
        value={data?.AssociationBed_title}
      />
    </Row>
  );
};
export default HabitantEvacuationDrawerResidenceInfo;
