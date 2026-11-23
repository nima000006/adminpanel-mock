import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dormVisibilityStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";

import { ResidenceInfoStepBuildingInfoProps } from "./@types/@residenceInfoStepBuildingInfo";

const ResidenceInfoStepBuildingInfo = ({
  buildingData,
}: ResidenceInfoStepBuildingInfoProps) => {
  return (
    <div>
      <CustomDivider
        text="ساختمان"
        extraContent={
          <CustomTag color={dormVisibilityStatusColor[buildingData?.recordStatus]}>
            {buildingData?.AssociationActiveStatus_title}
          </CustomTag>
        }
      />
      <Row gutter={16}>
        <SingleVerticalWithCol label="نام ساختمان" value={buildingData?.title} />
        <SingleVerticalWithCol
          label="جنسیت"
          value={buildingData?.AssociationGender_title}
        />
      </Row>
    </div>
  );
};

export default ResidenceInfoStepBuildingInfo;
